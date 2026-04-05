import { supabase } from './supabase-client';
import type { PuzzleDef } from './types';
import { findDuplicateSongsInPuzzle } from './validate-puzzles';

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split('T')[0];
}

async function fetchExistingConnections(): Promise<Set<string>> {
  const connections = new Set<string>();
  let offset = 0;
  const batchSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from('connection_groups')
      .select('connection')
      .range(offset, offset + batchSize - 1);

    if (error) throw new Error(`Failed to fetch connections: ${error.message}`);
    if (!data || data.length === 0) break;

    for (const row of data) {
      connections.add(row.connection);
    }
    if (data.length < batchSize) break;
    offset += batchSize;
  }

  return connections;
}

async function fetchScheduledDates(genre: string): Promise<Set<string>> {
  const dates = new Set<string>();
  const { data, error } = await supabase
    .from('puzzles')
    .select('puzzle_date')
    .eq('genre', genre)
    .eq('status', 'published')
    .not('puzzle_date', 'is', null);

  if (error) throw new Error(`Failed to fetch scheduled dates: ${error.message}`);
  if (data) {
    for (const row of data) {
      if (row.puzzle_date) dates.add(row.puzzle_date);
    }
  }
  return dates;
}

async function upsertGroupsBatch(groups: Array<{
  items: unknown;
  connection: string;
  connection_type: string;
  difficulty_score: number;
  color: string;
  difficulty: string;
  status: string;
}>): Promise<void> {
  const { error } = await supabase
    .from('connection_groups')
    .upsert(groups as never[], {
      onConflict: 'connection',
      ignoreDuplicates: true,
    });

  if (error) throw new Error(`Failed to upsert groups: ${error.message}`);
}

async function fetchGroupIdsByConnections(connections: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  // Query in batches of 100 to stay within URL length limits
  for (let i = 0; i < connections.length; i += 100) {
    const batch = connections.slice(i, i + 100);
    const { data, error } = await supabase
      .from('connection_groups')
      .select('id, connection')
      .in('connection', batch);

    if (error) throw new Error(`Failed to fetch group IDs: ${error.message}`);
    if (data) {
      for (const row of data) {
        map.set(row.connection, row.id);
      }
    }
  }
  return map;
}

export async function seedPuzzles(
  puzzles: PuzzleDef[],
  genre: string,
  startDate: string,
  itemIdOffset: number
): Promise<void> {
  console.log(`\n--- Seeding ${genre} puzzles ---`);

  // Step 1: Fetch existing data
  const [existingConnections, scheduledDates] = await Promise.all([
    fetchExistingConnections(),
    fetchScheduledDates(genre),
  ]);
  console.log(`Found ${existingConnections.size} existing connections, ${scheduledDates.size} scheduled dates for ${genre}`);

  // Step 2: Determine available dates and filter puzzles
  const puzzlesToInsert: Array<{ puzzle: PuzzleDef; date: string }> = [];
  let dateIndex = 0;

  for (const puzzle of puzzles) {
    // Find next available date
    let date = addDays(startDate, dateIndex);
    while (scheduledDates.has(date)) {
      dateIndex++;
      date = addDays(startDate, dateIndex);
    }

    // Check if any connection already exists
    const hasExistingConnection = puzzle.groups.some(g => existingConnections.has(g.connection));
    if (hasExistingConnection) {
      const dupes = puzzle.groups.filter(g => existingConnections.has(g.connection)).map(g => g.connection);
      console.log(`  Skipping puzzle for ${date}: duplicate connections: ${dupes.join(', ')}`);
      dateIndex++;
      continue;
    }

    // Check for duplicate songs within the puzzle
    const duplicateSongs = findDuplicateSongsInPuzzle(puzzle);
    if (duplicateSongs.length > 0) {
      console.log(`  Skipping puzzle for ${date}: duplicate songs: ${duplicateSongs.join(', ')}`);
      dateIndex++;
      continue;
    }

    puzzlesToInsert.push({ puzzle, date });
    dateIndex++;
  }

  console.log(`Will insert ${puzzlesToInsert.length} puzzles for ${genre}`);

  if (puzzlesToInsert.length === 0) {
    console.log('Nothing to insert.');
    return;
  }

  // Step 3: Upsert all groups
  const allGroupInserts = [];
  let itemId = itemIdOffset;

  for (const { puzzle } of puzzlesToInsert) {
    for (const group of puzzle.groups) {
      const items = group.items.map(item => ({
        id: itemId++,
        title: item.title,
        ...(item.year !== undefined && { year: item.year }),
        ...(item.artist !== undefined && { artist: item.artist }),
        ...(item.album !== undefined && { album: item.album }),
      }));

      allGroupInserts.push({
        items: items as unknown,
        connection: group.connection,
        connection_type: group.connection_type,
        difficulty_score: group.difficulty_score,
        color: group.color,
        difficulty: group.difficulty,
        status: 'approved',
      });
    }
  }

  // Batch upsert groups (50 at a time)
  for (let i = 0; i < allGroupInserts.length; i += 50) {
    const batch = allGroupInserts.slice(i, i + 50);
    await upsertGroupsBatch(batch);
    console.log(`  Upserted groups ${i + 1}-${Math.min(i + 50, allGroupInserts.length)} of ${allGroupInserts.length}`);
    await new Promise(r => setTimeout(r, 200));
  }

  // Step 4: Fetch group IDs by connection string
  const allConnections = allGroupInserts.map(g => g.connection);
  const connectionToId = await fetchGroupIdsByConnections(allConnections);

  // Step 5: Insert puzzles with snapshots
  const puzzleInserts = [];
  itemId = itemIdOffset; // Reset to rebuild items with same IDs

  for (const { puzzle, date } of puzzlesToInsert) {
    const groupIds: string[] = [];
    const groupsSnapshot: Array<{
      id: string;
      items: Array<Record<string, unknown>>;
      connection: string;
      difficulty: string;
      color: string;
    }> = [];

    for (const group of puzzle.groups) {
      const groupId = connectionToId.get(group.connection);
      if (!groupId) {
        console.error(`  ERROR: No group ID found for connection: "${group.connection}"`);
        continue;
      }

      const items = group.items.map(item => ({
        id: itemId++,
        title: item.title,
        ...(item.year !== undefined && { year: item.year }),
        ...(item.artist !== undefined && { artist: item.artist }),
        ...(item.album !== undefined && { album: item.album }),
      }));

      groupIds.push(groupId);
      groupsSnapshot.push({
        id: groupId,
        items,
        connection: group.connection,
        difficulty: group.difficulty,
        color: group.color,
      });
    }

    if (groupIds.length !== 4) {
      console.error(`  Skipping puzzle for ${date}: only ${groupIds.length} groups resolved`);
      continue;
    }

    puzzleInserts.push({
      group_ids: groupIds,
      puzzle_date: date,
      status: 'published' as const,
      genre,
      source: 'system' as const,
      groups: groupsSnapshot as unknown,
    });
  }

  // Batch insert puzzles (20 at a time)
  for (let i = 0; i < puzzleInserts.length; i += 20) {
    const batch = puzzleInserts.slice(i, i + 20);
    const { error } = await supabase
      .from('puzzles')
      .insert(batch as never[]);

    if (error) {
      console.error(`  Failed to insert puzzles batch ${i + 1}: ${error.message}`);
    } else {
      console.log(`  Inserted puzzles ${i + 1}-${Math.min(i + 20, puzzleInserts.length)} of ${puzzleInserts.length}`);
    }
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`Done seeding ${genre}: ${puzzleInserts.length} puzzles inserted.`);
}
