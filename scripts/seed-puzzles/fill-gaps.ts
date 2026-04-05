import { supabase } from './supabase-client';
import { musicGapPuzzles } from './music-gaps';
import { bookGapPuzzles } from './book-gaps';
import type { PuzzleDef } from './types';

const MUSIC_GAP_DATES = [
  '2026-04-07', '2026-04-09', '2026-04-10', '2026-04-14', '2026-04-16',
  '2026-04-19', '2026-04-23', '2026-04-24', '2026-04-26', '2026-04-30',
  '2026-05-03', '2026-05-09', '2026-05-14', '2026-05-15', '2026-05-26', '2026-05-27',
];

const BOOK_GAP_DATES = [
  '2026-04-03', '2026-04-07', '2026-04-10', '2026-04-11', '2026-05-09', '2026-06-02',
];

async function insertPuzzleForDate(puzzle: PuzzleDef, date: string, genre: string, itemIdBase: number): Promise<boolean> {
  // Build items with IDs
  const groupInserts = [];
  let itemId = itemIdBase;

  for (const group of puzzle.groups) {
    const items = group.items.map(item => ({
      id: itemId++,
      title: item.title,
      ...(item.year !== undefined && { year: item.year }),
      ...(item.artist !== undefined && { artist: item.artist }),
      ...(item.album !== undefined && { album: item.album }),
    }));

    groupInserts.push({
      items: items as unknown,
      connection: group.connection,
      connection_type: group.connection_type,
      difficulty_score: group.difficulty_score,
      color: group.color,
      difficulty: group.difficulty,
      status: 'approved',
    });
  }

  // Upsert groups
  const { error: groupError } = await supabase
    .from('connection_groups')
    .upsert(groupInserts as never[], { onConflict: 'connection', ignoreDuplicates: true });

  if (groupError) {
    console.error(`  Failed to upsert groups for ${date}: ${groupError.message}`);
    return false;
  }

  // Fetch group IDs
  const connections = groupInserts.map(g => g.connection);
  const { data: groupRows, error: fetchError } = await supabase
    .from('connection_groups')
    .select('id, connection')
    .in('connection', connections);

  if (fetchError || !groupRows) {
    console.error(`  Failed to fetch group IDs for ${date}: ${fetchError?.message}`);
    return false;
  }

  const connectionToId = new Map(groupRows.map(r => [r.connection, r.id]));

  // Build snapshot
  itemId = itemIdBase;
  const groupIds: string[] = [];
  const groupsSnapshot: Array<Record<string, unknown>> = [];

  for (const group of puzzle.groups) {
    const groupId = connectionToId.get(group.connection);
    if (!groupId) {
      console.error(`  No group ID for: "${group.connection}"`);
      return false;
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

  // Insert puzzle
  const { error: puzzleError } = await supabase
    .from('puzzles')
    .insert({
      group_ids: groupIds,
      puzzle_date: date,
      status: 'published',
      genre,
      source: 'system',
      groups: groupsSnapshot as unknown,
    } as never);

  if (puzzleError) {
    console.error(`  Failed to insert puzzle for ${date}: ${puzzleError.message}`);
    return false;
  }

  return true;
}

// Fill music gaps
console.log('--- Filling music gaps ---');
let musicFilled = 0;
for (let i = 0; i < MUSIC_GAP_DATES.length && i < musicGapPuzzles.length; i++) {
  const ok = await insertPuzzleForDate(musicGapPuzzles[i], MUSIC_GAP_DATES[i], 'music', 300000 + i * 16);
  if (ok) {
    console.log(`  Filled ${MUSIC_GAP_DATES[i]}`);
    musicFilled++;
  }
  await new Promise(r => setTimeout(r, 150));
}
console.log(`Music: filled ${musicFilled} of ${MUSIC_GAP_DATES.length} gaps`);

// Fill book gaps
console.log('\n--- Filling book gaps ---');
let booksFilled = 0;
for (let i = 0; i < BOOK_GAP_DATES.length && i < bookGapPuzzles.length; i++) {
  const ok = await insertPuzzleForDate(bookGapPuzzles[i], BOOK_GAP_DATES[i], 'books', 400000 + i * 16);
  if (ok) {
    console.log(`  Filled ${BOOK_GAP_DATES[i]}`);
    booksFilled++;
  }
  await new Promise(r => setTimeout(r, 150));
}
console.log(`Books: filled ${booksFilled} of ${BOOK_GAP_DATES.length} gaps`);

console.log('\nDone!');
