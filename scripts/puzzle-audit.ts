/**
 * Run the rubric over published boards, or over a candidate before it is written.
 *
 * Two modes:
 *   bun run --env-file=.env.local puzzle:audit --from 2026-08-06 --to 2026-08-12
 *   bun run --env-file=.env.local puzzle:audit --file films.json --file music.json
 *
 * FAIL findings are mechanical — a broken board, fix before it publishes. FLAG findings
 * are judgement calls the rubric cannot settle (is this the fourth-best item, is the
 * difficulty in the link or in the obscurity); they are the list a human reads.
 *
 * The archive context is every earlier group in the same genre, so connection reuse is
 * caught by similarity rather than by whichever keyword someone thought to grep for.
 */
import { readFileSync } from 'node:fs';
import { GENRE_CONFIGS, GENRE_ORDER, type Genre, type PuzzleGroup } from './puzzle-model';
import { getPuzzleClient, colorForDifficulty, fetchAllPages } from './puzzle-db';
import {
  auditBoard,
  auditDay,
  normalize,
  type ArchiveContext,
  type DayBoard,
  type Finding,
} from './puzzle-rubric';

export interface ArchiveRow {
  genre: string;
  puzzle_date: string;
  groups: Array<{
    id: string;
    color: string;
    difficulty: string;
    connection: string;
    items: Array<{ id: number; title: string; hidden?: string }>;
  }>;
}

export interface Candidate {
  genre: Genre;
  date: string;
  groups: PuzzleGroup[];
}

/**
 * Prior groups are same-genre and strictly earlier (a board must not read as a
 * duplicate of itself). allGenreGroups is every other board, any genre, any date —
 * motif spacing looks both ways because the schedule runs weeks ahead. Item frequency spans every genre — it is a crude "does the
 * culture know this title" signal used to spot filler.
 */
export function buildArchiveContext(
  rows: ArchiveRow[],
  genre: Genre,
  onDate: string,
): ArchiveContext {
  const priorGroups: ArchiveContext['priorGroups'] = [];
  const allGenreGroups: NonNullable<ArchiveContext['allGenreGroups']> = [];
  const itemFrequency = new Map<string, number>();

  for (const row of rows) {
    const isSelf = row.genre === genre && row.puzzle_date === onDate;
    for (const group of row.groups ?? []) {
      if (!isSelf) {
        allGenreGroups.push({ date: row.puzzle_date, genre: row.genre, connection: group.connection });
      }
      for (const item of group.items ?? []) {
        const key = normalize(item.title);
        itemFrequency.set(key, (itemFrequency.get(key) ?? 0) + 1);
      }
      if (row.genre === genre && row.puzzle_date < onDate) {
        priorGroups.push({
          date: row.puzzle_date,
          connection: group.connection,
          items: (group.items ?? []).map((i) => i.title),
        });
      }
    }
  }
  return { priorGroups, allGenreGroups, itemFrequency };
}

/** Parse a board proposed as JSON, before it exists in the database. */
export function parseCandidate(json: string): Candidate {
  const raw = JSON.parse(json) as {
    genre?: string;
    date?: string;
    groups?: Array<{
      connection?: string;
      difficulty?: string;
      items?: Array<{ title?: string; year?: number; artist?: string; hidden?: string }>;
    }>;
  };
  if (!raw.genre || !GENRE_ORDER.includes(raw.genre as Genre)) {
    throw new Error(`Candidate needs a genre (${GENRE_ORDER.join(' | ')}).`);
  }
  if (!raw.date) throw new Error('Candidate needs a date (YYYY-MM-DD).');
  if (!raw.groups?.length) throw new Error('Candidate needs groups.');

  const groups: PuzzleGroup[] = raw.groups.map((g, gi) => {
    if (!g.connection) throw new Error(`Group ${gi + 1} needs a connection.`);
    if (!g.difficulty) throw new Error(`Group ${gi + 1} needs a difficulty.`);
    return {
      id: `candidate-${gi + 1}`,
      connection: g.connection,
      difficulty: g.difficulty,
      // Colour is never authored — it is the difficulty wearing a different name.
      color: colorForDifficulty(g.difficulty),
      items: (g.items ?? []).map((it, i) => {
        if (!it.title) throw new Error(`Group ${gi + 1} item ${i + 1} needs a title.`);
        return {
          id: i + 1,
          title: it.title,
          ...(it.year !== undefined && { year: it.year }),
          ...(it.artist !== undefined && { artist: it.artist }),
          ...(it.hidden !== undefined && { hidden: it.hidden }),
        };
      }),
    };
  });

  return { genre: raw.genre as Genre, date: raw.date, groups };
}

/**
 * Every genre's board for one date: candidates first, the archive for genres no
 * candidate covers. Lets a new board be checked against what the other sites run that day.
 */
export function buildDayBoards(
  candidates: Candidate[],
  rows: ArchiveRow[],
  date: string,
): DayBoard[] {
  const boards: DayBoard[] = candidates
    .filter((c) => c.date === date)
    .map((c) => ({ genre: c.genre, groups: c.groups }));
  for (const row of rows) {
    if (row.puzzle_date !== date || boards.some((b) => b.genre === row.genre)) continue;
    boards.push({ genre: row.genre, groups: row.groups as PuzzleGroup[] });
  }
  return boards;
}

export function formatFindings(findings: Finding[]): string {
  if (!findings.length) return '   ✓ clean';
  const line = (f: Finding) =>
    `   ${f.severity === 'fail' ? 'FAIL' : 'FLAG'}  ${f.rule}${
      f.group ? ` (group ${f.group})` : ''
    }: ${f.message}`;
  return [
    ...findings.filter((f) => f.severity === 'fail').map(line),
    ...findings.filter((f) => f.severity === 'flag').map(line),
  ].join('\n');
}

async function fetchArchive(): Promise<ArchiveRow[]> {
  const client = getPuzzleClient();
  return fetchAllPages<ArchiveRow>((from, to) =>
    client
      .from('puzzles')
      .select('genre, puzzle_date, groups')
      .not('puzzle_date', 'is', null)
      .order('puzzle_date')
      .order('id')
      .range(from, to),
  );
}

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1];
}

function args(name: string): string[] {
  return process.argv.flatMap((a, i) => (a === `--${name}` ? [process.argv[i + 1]] : []));
}

async function main() {
  const archive = await fetchArchive();
  const files = args('file');

  if (files.length) {
    const candidates = files.map((f) => parseCandidate(readFileSync(f, 'utf8')));
    // Candidates join the archive context, so a week of drafts is checked against itself.
    const asRows: ArchiveRow[] = candidates.map((c) => ({
      genre: c.genre,
      puzzle_date: c.date,
      groups: c.groups,
    }));
    const pool = [
      ...archive.filter(
        (r) => !candidates.some((c) => c.genre === r.genre && c.date === r.puzzle_date),
      ),
      ...asRows,
    ];
    let failed = false;
    for (const candidate of candidates) {
      const ctx = buildArchiveContext(pool, candidate.genre, candidate.date);
      const findings = auditBoard(candidate.groups, ctx, { date: candidate.date });
      console.log(
        `\n${GENRE_CONFIGS[candidate.genre].emoji}  candidate — ${GENRE_CONFIGS[candidate.genre].siteName} ${candidate.date}`,
      );
      console.log(formatFindings(findings));
      failed ||= findings.some((f) => f.severity === 'fail');
    }
    for (const date of [...new Set(candidates.map((c) => c.date))].sort()) {
      const dayFindings = auditDay(buildDayBoards(candidates, archive, date));
      if (!dayFindings.length) continue;
      console.log(`\n📅  ${date} — across genres`);
      console.log(formatFindings(dayFindings));
      failed = true;
    }
    process.exit(failed ? 1 : 0);
  }

  const from = arg('from');
  const to = arg('to') ?? from;
  if (!from) {
    console.error('Usage: puzzle:audit --from YYYY-MM-DD [--to YYYY-MM-DD] | --file board.json');
    process.exit(1);
  }

  let failures = 0;
  const dates = [...new Set(archive.map((r) => r.puzzle_date))]
    .filter((d) => d >= from && d <= to!)
    .sort();

  for (const date of dates) {
    const dayFindings = auditDay(buildDayBoards([], archive, date));
    if (dayFindings.length) {
      console.log(`\n📅  ${date} — across genres`);
      console.log(formatFindings(dayFindings));
      failures += dayFindings.length;
    }
    for (const genre of GENRE_ORDER) {
      const row = archive.find((r) => r.puzzle_date === date && r.genre === genre);
      const config = GENRE_CONFIGS[genre];
      if (!row) {
        console.log(`\n${config.emoji}  ${config.siteName} ${date}`);
        console.log('   FAIL  missing-puzzle: no board for this date.');
        failures++;
        continue;
      }
      const ctx = buildArchiveContext(archive, genre, date);
      // Published boards never stored hidden-word answers; those tiles were checked at draft time.
      const findings = auditBoard(row.groups as PuzzleGroup[], ctx, {
        date,
        requireHiddenAnswers: false,
      });
      failures += findings.filter((f) => f.severity === 'fail').length;
      console.log(`\n${config.emoji}  ${config.siteName} ${date}`);
      for (const group of row.groups) {
        console.log(`   ${group.difficulty.padEnd(7)} ${group.connection}`);
      }
      console.log(formatFindings(findings));
    }
  }
  process.exit(failures ? 1 : 0);
}

if ((import.meta as { main?: boolean }).main) {
  main().catch((err) => {
    console.error(`❌ ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  });
}
