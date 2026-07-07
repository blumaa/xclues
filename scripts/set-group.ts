/**
 * Daily-program step: replace a whole puzzle group with a new connection + 4 items.
 *
 * This is the routine "swap group N for a brand-new connection" path used during the
 * daily puzzle review. Reuses the group's existing item ids and color; sets a new
 * connection, the four items (with correct year / artist metadata), and optionally a
 * new difficulty. Writes the `puzzles.groups` JSONB the game reads.
 *
 * Item spec per genre (pipe-delimited, pipe never appears in titles):
 *   films / books : "Title|Year"            e.g. --item "Up|2009"
 *   music         : "Title|Artist[|Year]"   e.g. --item "Roxanne|The Police|1978"
 *
 * Usage (exactly one --item per slot; item count must match the group size, i.e. 4):
 *   bun run puzzle:set-group --genre films --date 2026-07-07 --group 1 \
 *     --connection "Pixar films" \
 *     --item "Up|2009" --item "Coco|2017" --item "Brave|2012" --item "Ratatouille|2007"
 */
import {
  GENRE_ORDER,
  getTomorrowDate,
  type Genre,
  type PuzzleGroup,
} from './post-daily-bluesky';
import { getPuzzleClient, fetchPuzzleRow, writeGroups } from './puzzle-db';

export interface NewItem {
  title: string;
  year?: number;
  artist?: string;
}

export interface GroupReplacement {
  connection?: string;
  difficulty?: string;
  items: NewItem[];
}

export function replacePuzzleGroup(
  groups: PuzzleGroup[],
  group: number,
  repl: GroupReplacement,
): PuzzleGroup[] {
  const gi = group - 1;
  if (gi < 0 || gi >= groups.length) {
    throw new Error(`Group ${group} out of range (1–${groups.length}).`);
  }
  const target = groups[gi];
  if (repl.items.length !== target.items.length) {
    throw new Error(
      `Group ${group} needs exactly ${target.items.length} items, got ${repl.items.length}.`,
    );
  }

  const next: PuzzleGroup[] = groups.map((g) => ({
    ...g,
    items: g.items.map((it) => ({ ...it })),
  }));
  const g = next[gi];
  if (repl.connection !== undefined) g.connection = repl.connection;
  if (repl.difficulty !== undefined) g.difficulty = repl.difficulty;

  // Rebuild each item from scratch (reusing the id) so no stale field survives.
  g.items = repl.items.map((ni, i) => ({
    id: target.items[i].id,
    title: ni.title,
    ...(ni.year !== undefined && { year: ni.year }),
    ...(ni.artist !== undefined && { artist: ni.artist }),
  }));

  return next;
}

export function parseItemSpec(genre: Genre, spec: string): NewItem {
  const parts = spec.split('|').map((p) => p.trim());
  const title = parts[0];
  if (!title) throw new Error(`Item spec "${spec}" has an empty title.`);

  const item: NewItem = { title };
  if (genre === 'music') {
    // Title | Artist | Year(optional)
    if (parts[1]) item.artist = parts[1];
    if (parts[2]) item.year = Number(parts[2]);
  } else {
    // films / books: Title | Year(optional)
    if (parts[1]) item.year = Number(parts[1]);
  }
  if (item.year !== undefined && Number.isNaN(item.year)) {
    throw new Error(`Item spec "${spec}" has a non-numeric year.`);
  }
  return item;
}

/* ─────────────────────────────── CLI ─────────────────────────────── */

interface CliArgs {
  genre: Genre;
  date: string;
  group: number;
  connection?: string;
  difficulty?: string;
  items: NewItem[];
}

function parseArgs(argv: string[]): CliArgs {
  const single: Record<string, string> = {};
  const itemSpecs: string[] = [];
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i]?.replace(/^--/, '');
    const value = argv[i + 1];
    if (!key || value === undefined) throw new Error(`Missing value for flag "${argv[i]}".`);
    if (key === 'item') itemSpecs.push(value);
    else single[key] = value;
  }

  const genre = (single.genre ?? '') as Genre;
  if (!GENRE_ORDER.includes(genre)) {
    throw new Error(`--genre must be one of: ${GENRE_ORDER.join(', ')}.`);
  }
  if (single.group === undefined) throw new Error('--group is required.');
  if (itemSpecs.length === 0) throw new Error('Pass one --item per slot (e.g. 4 of them).');

  return {
    genre,
    date: single.date ?? getTomorrowDate(),
    group: Number(single.group),
    ...(single.connection !== undefined && { connection: single.connection }),
    ...(single.difficulty !== undefined && { difficulty: single.difficulty }),
    items: itemSpecs.map((s) => parseItemSpec(genre, s)),
  };
}

function fmt(g: PuzzleGroup): string {
  const items = g.items
    .map((it) => (it.artist ? `${it.title} — ${it.artist}` : it.title))
    .join(', ');
  return `${g.connection} | ${items}`;
}

async function main(): Promise<void> {
  const { genre, date, group, connection, difficulty, items } = parseArgs(process.argv.slice(2));

  const client = getPuzzleClient();
  const { id, groups } = await fetchPuzzleRow(client, genre, date);

  const after = replacePuzzleGroup(groups, group, { connection, difficulty, items });
  const gi = group - 1;
  console.log(`${genre} ${date} — group ${group}:`);
  console.log(`  before: ${fmt(groups[gi])}`);
  console.log(`  after:  ${fmt(after[gi])}`);

  await writeGroups(client, id, after);
  console.log('✅ Saved.');
}

if ((import.meta as { main?: boolean }).main) {
  main().catch((err) => {
    console.error(`❌ ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  });
}
