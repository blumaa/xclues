/**
 * Create a puzzle that does not exist yet, from the same candidate JSON that
 * `puzzle:audit --file` reads.
 *
 *   bun run --env-file=.env.local puzzle:create --file board.json
 *   bun run --env-file=.env.local puzzle:create --file board.json --replace
 *
 * `puzzle:set-group` can only replace one group at a time in a board that already exists,
 * so an audited whole board had no path through the tooling: an empty date had none at
 * all, and a full date meant retyping all sixteen items as CLI flags. This closes both.
 * `--replace` overwrites the board already published for that date.
 *
 * Two rows are written, in the order the schema needs them. First the four
 * `connection_groups` rows, which own the group ids; then the `puzzles` row, which
 * references those ids *and* carries a full snapshot in `groups`. The game reads the
 * snapshot and only falls back to the ids, but writing one without the other would leave
 * the two representations describing different boards.
 *
 * That table is keyed by the connection text, so a group whose wording already exists is
 * rewritten under the id it owns rather than inserted a second time.
 */
import { readFileSync } from 'node:fs';
import type { SupabaseClient } from '@supabase/supabase-js';
import { parseCandidate, type Candidate } from './puzzle-audit';
import { classifyAxis } from './puzzle-rubric';
import { colorForDifficulty, getPuzzleClient, scoreForDifficulty } from './puzzle-db';
import { GENRE_CONFIGS, type PuzzleGroup } from './puzzle-model';

interface GroupItem {
  id: number;
  title: string;
  year?: number;
  artist?: string;
}

export interface GroupRow {
  connection: string;
  connection_type: string;
  difficulty: string;
  difficulty_score: number;
  color: string;
  genre: string;
  status: string;
  items: GroupItem[];
}

/** The half of a board that changes when it is replaced: which groups it is made of. */
export interface PuzzleUpdate {
  group_ids: string[];
  groups: PuzzleGroup[];
}

export interface PuzzleRow extends PuzzleUpdate {
  puzzle_date: string;
  genre: string;
  status: string;
  source: string;
}

/**
 * `itemIdBase` seeds ids that are unique across the whole board rather than per group:
 * the game flattens every group into one list of tiles, so two tiles sharing an id
 * collide. Callers pass a base high enough not to meet the seeded archive.
 */
export function buildGroupRows(candidate: Candidate, itemIdBase: number): GroupRow[] {
  let itemId = itemIdBase;
  return candidate.groups.map((g) => ({
    connection: g.connection,
    // Not a second taxonomy — the rubric's axis wearing the column's name.
    connection_type: classifyAxis(g.connection),
    difficulty: g.difficulty,
    difficulty_score: scoreForDifficulty(g.difficulty),
    color: colorForDifficulty(g.difficulty),
    genre: candidate.genre,
    status: 'approved',
    items: g.items.map((it) => ({
      id: itemId++,
      title: it.title,
      ...(it.year !== undefined && { year: it.year }),
      ...(it.artist !== undefined && { artist: it.artist }),
    })),
  }));
}

/**
 * `group_ids` and the `groups` snapshot always move together. The game reads the
 * snapshot and falls back to the ids, so writing one without the other leaves the two
 * describing different boards.
 */
export function buildPuzzleUpdate(
  candidate: Candidate,
  groupIds: string[],
  itemIdBase = 0,
): PuzzleUpdate {
  if (groupIds.length !== candidate.groups.length) {
    throw new Error(
      `Got ${groupIds.length} group ids for ${candidate.groups.length} groups — refusing to write a mismatched board.`,
    );
  }
  // Same base as the connection_groups insert, so a tile has one id whichever path reads it.
  const rows = buildGroupRows(candidate, itemIdBase);
  return {
    group_ids: groupIds,
    groups: candidate.groups.map((g, i) => ({
      id: groupIds[i],
      connection: g.connection,
      difficulty: g.difficulty,
      color: colorForDifficulty(g.difficulty),
      items: rows[i].items,
    })),
  };
}

export function buildPuzzleRow(
  candidate: Candidate,
  groupIds: string[],
  itemIdBase = 0,
): PuzzleRow {
  return {
    puzzle_date: candidate.date,
    genre: candidate.genre,
    status: 'published',
    source: 'system',
    ...buildPuzzleUpdate(candidate, groupIds, itemIdBase),
  };
}

export interface GroupSplit {
  updates: { id: string; row: GroupRow }[];
  inserts: GroupRow[];
}

/**
 * connection_groups is keyed by the connection text itself, so a board cannot blind-insert
 * its groups: on a replace, the connections whose wording did not change are already in the
 * table from the previous write and the insert dies on unique_connection. Those rows are
 * rewritten in place under the id they already own, which also keeps a reused connection
 * from accumulating a duplicate row per board that uses it.
 */
export function splitExistingGroups(rows: GroupRow[], existing: Map<string, string>): GroupSplit {
  const split: GroupSplit = { updates: [], inserts: [] };
  for (const row of rows) {
    const id = existing.get(row.connection);
    if (id) split.updates.push({ id, row });
    else split.inserts.push(row);
  }
  return split;
}

/** Returns one id per row, in the order the rows were given. */
async function upsertGroups(client: SupabaseClient, rows: GroupRow[]): Promise<string[]> {
  const { data: found, error: findError } = await client
    .from('connection_groups')
    .select('id, connection')
    .in(
      'connection',
      rows.map((r) => r.connection),
    );
  if (findError) throw new Error(`Group lookup failed: ${findError.message}`);

  const byConnection = new Map(
    (found ?? []).map((r) => [r.connection as string, r.id as string]),
  );
  const { updates, inserts } = splitExistingGroups(rows, byConnection);

  for (const { id, row } of updates) {
    const { error } = await client
      .from('connection_groups')
      .update(row as never)
      .eq('id', id);
    if (error) throw new Error(`Group update failed for "${row.connection}": ${error.message}`);
  }

  if (inserts.length > 0) {
    const { data, error } = await client
      .from('connection_groups')
      .insert(inserts as never[])
      .select('id, connection');
    if (error) throw new Error(`Group insert failed: ${error.message}`);
    if (!data || data.length !== inserts.length) {
      throw new Error(`Inserted ${data?.length ?? 0} groups, expected ${inserts.length}.`);
    }
    // Insert order is not guaranteed to be returned in order; match on the connection.
    for (const r of data) byConnection.set(r.connection as string, r.id as string);
  }

  return rows.map((r) => {
    const id = byConnection.get(r.connection);
    if (!id) throw new Error(`No id came back for "${r.connection}".`);
    return id;
  });
}

interface CliArgs {
  file: string;
  itemIdBase: number;
  replace: boolean;
}

function parseArgs(argv: string[]): CliArgs {
  const flags: Record<string, string> = {};
  const rest = argv.filter((a) => a !== '--replace');
  for (let i = 0; i < rest.length; i += 2) {
    const key = rest[i]?.replace(/^--/, '');
    const value = rest[i + 1];
    if (!key || value === undefined) throw new Error(`Missing value for flag "${rest[i]}".`);
    flags[key] = value;
  }
  if (!flags.file) throw new Error('--file <candidate.json> is required.');
  return {
    file: flags.file,
    // Well clear of the seeded archive, which numbers items in the low hundreds of thousands.
    itemIdBase: flags['item-id-base'] ? Number(flags['item-id-base']) : 900000,
    replace: argv.includes('--replace'),
  };
}

async function main(): Promise<void> {
  const { file, itemIdBase, replace } = parseArgs(process.argv.slice(2));
  const candidate = parseCandidate(readFileSync(file, 'utf8'));
  const config = GENRE_CONFIGS[candidate.genre];

  const client = getPuzzleClient();
  const { data: existing } = await client
    .from('puzzles')
    .select('id')
    .eq('puzzle_date', candidate.date)
    .eq('genre', candidate.genre)
    .eq('status', 'published')
    .maybeSingle();

  if (existing && !replace) {
    throw new Error(
      `${config.siteName} already has a board for ${candidate.date}. Pass --replace to overwrite it.`,
    );
  }

  const groupIds = await upsertGroups(client, buildGroupRows(candidate, itemIdBase));

  let groups: PuzzleGroup[];
  if (existing) {
    const update = buildPuzzleUpdate(candidate, groupIds, itemIdBase);
    const { error } = await client
      .from('puzzles')
      .update(update as never)
      .eq('id', existing.id as string);
    if (error) throw new Error(`Puzzle update failed: ${error.message}`);
    groups = update.groups;
  } else {
    const row = buildPuzzleRow(candidate, groupIds, itemIdBase);
    const { error } = await client.from('puzzles').insert(row as never);
    if (error) throw new Error(`Puzzle insert failed: ${error.message}`);
    groups = row.groups;
  }

  console.log(
    `${config.emoji}  ${config.siteName} ${candidate.date} — ${existing ? 'replaced' : 'created'}`,
  );
  for (const g of groups) {
    console.log(`   ${g.difficulty.padEnd(7)} ${g.connection}`);
    console.log(`           ${g.items.map((i) => i.title).join(', ')}`);
  }
}

if ((import.meta as { main?: boolean }).main) {
  main().catch((err) => {
    console.error(`❌ ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  });
}
