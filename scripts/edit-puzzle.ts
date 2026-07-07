/**
 * Daily-program step: adjust a puzzle after reviewing it.
 *
 * Patches the `puzzles.groups` JSONB snapshot the game actually reads. Group and
 * item indices are 1-based to match the numbering in `bun run puzzle:review`.
 *
 * Scope: item text (title/artist), a group's connection, or a group's
 * difficulty. Structural swaps (replace a whole group) belong in the admin app
 * (puzzlecules), which keeps `group_ids` in sync — this tool only touches the
 * self-contained `groups` snapshot, so use it for in-place daily fixes.
 *
 * Usage:
 *   bun run puzzle:edit --genre films --date 2026-07-07 --group 2 --item 3 --title "Alien"
 *   bun run puzzle:edit --genre films --date 2026-07-07 --group 2 --connection "Ridley Scott films"
 *   bun run puzzle:edit --genre music --date 2026-07-07 --group 1 --item 2 --artist "Queen"
 *   bun run puzzle:edit --genre books --date 2026-07-07 --group 4 --difficulty hardest
 */
import {
  GENRE_ORDER,
  getTomorrowDate,
  type Genre,
  type PuzzleGroup,
} from './post-daily-bluesky';
import { getPuzzleClient, fetchPuzzleRow, writeGroups } from './puzzle-db';

export interface PuzzleEdit {
  /** 1-based group index. */
  group: number;
  /** 1-based item index (required for item-level edits). */
  item?: number;
  title?: string;
  artist?: string;
  connection?: string;
  difficulty?: string;
}

export function applyPuzzleEdit(groups: PuzzleGroup[], edit: PuzzleEdit): PuzzleGroup[] {
  const gi = edit.group - 1;
  if (gi < 0 || gi >= groups.length) {
    throw new Error(`Group ${edit.group} out of range (1–${groups.length}).`);
  }

  const hasItemFields = edit.title !== undefined || edit.artist !== undefined;
  const hasGroupFields = edit.connection !== undefined || edit.difficulty !== undefined;
  if (!hasItemFields && !hasGroupFields) {
    throw new Error('Nothing to change — pass --title/--artist (with --item), --connection, or --difficulty.');
  }
  if (hasItemFields && edit.item === undefined) {
    throw new Error('Item fields (--title/--artist) require --item.');
  }

  // Deep-clone so the input is never mutated.
  const next: PuzzleGroup[] = groups.map((g) => ({
    ...g,
    items: g.items.map((it) => ({ ...it })),
  }));
  const group = next[gi];

  if (edit.connection !== undefined) group.connection = edit.connection;
  if (edit.difficulty !== undefined) group.difficulty = edit.difficulty;

  if (hasItemFields) {
    const ii = (edit.item as number) - 1;
    if (ii < 0 || ii >= group.items.length) {
      throw new Error(`Item ${edit.item} out of range (1–${group.items.length}).`);
    }
    if (edit.title !== undefined) group.items[ii].title = edit.title;
    if (edit.artist !== undefined) group.items[ii].artist = edit.artist;
  }

  return next;
}

/* ─────────────────────────────── CLI ─────────────────────────────── */

interface CliArgs {
  genre: Genre;
  date: string;
  edit: PuzzleEdit;
}

function parseArgs(argv: string[]): CliArgs {
  const flags: Record<string, string> = {};
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i]?.replace(/^--/, '');
    const value = argv[i + 1];
    if (!key || value === undefined) throw new Error(`Missing value for flag "${argv[i]}".`);
    flags[key] = value;
  }

  const genre = (flags.genre ?? '') as Genre;
  if (!GENRE_ORDER.includes(genre)) {
    throw new Error(`--genre must be one of: ${GENRE_ORDER.join(', ')}.`);
  }
  const date = flags.date ?? getTomorrowDate();
  if (flags.group === undefined) throw new Error('--group is required.');

  const edit: PuzzleEdit = {
    group: Number(flags.group),
    ...(flags.item !== undefined && { item: Number(flags.item) }),
    ...(flags.title !== undefined && { title: flags.title }),
    ...(flags.artist !== undefined && { artist: flags.artist }),
    ...(flags.connection !== undefined && { connection: flags.connection }),
    ...(flags.difficulty !== undefined && { difficulty: flags.difficulty }),
  };
  return { genre, date, edit };
}

async function main(): Promise<void> {
  const { genre, date, edit } = parseArgs(process.argv.slice(2));

  const client = getPuzzleClient();
  const { id, groups: before } = await fetchPuzzleRow(client, genre, date);
  const after = applyPuzzleEdit(before, edit);

  const g = edit.group - 1;
  console.log(`${genre} ${date} — group ${edit.group}:`);
  console.log(`  before: ${before[g].connection} | ${before[g].items.map((i) => i.title).join(', ')}`);
  console.log(`  after:  ${after[g].connection} | ${after[g].items.map((i) => i.title).join(', ')}`);

  await writeGroups(client, id, after);
  console.log('✅ Saved.');
}

if ((import.meta as { main?: boolean }).main) {
  main().catch((err) => {
    console.error(`❌ ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  });
}
