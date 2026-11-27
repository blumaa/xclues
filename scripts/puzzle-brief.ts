/**
 * The construction brief — what a board should be, decided before any item exists.
 *
 * The failure the archive shows most often is a connection reverse-engineered from a
 * bag of items: the sentence grows qualifiers until it covers whatever was already on
 * the table, and that is where the false items come from. The fix is order. Choose the
 * four axes, the difficulty each sits at, and the kind of thing the tiles will be —
 * then go and find items that satisfy the plan, and drop the plan if they do not exist.
 *
 * The planner also rotates axes between difficulty slots by date, so no slot keeps the
 * same shape for days at a stretch, and gives the three genres different plans on the
 * same day so a player of all three does not meet one puzzle three times.
 *
 * Pure: the archive's used connections arrive as an argument (puzzle-audit.ts reads
 * them from Supabase).
 */
import { GENRE_CONFIGS, GENRE_ORDER, getTomorrowDate, type Genre } from './puzzle-model';
import { fetchAllPages, getPuzzleClient } from './puzzle-db';
import { DIFFICULTY_ORDER, type Axis, type TileKind } from './puzzle-rubric';

export type Difficulty = (typeof DIFFICULTY_ORDER)[number];

export interface SlotPlan {
  difficulty: Difficulty;
  axis: Axis;
  itemKind: string;
  guidance: string;
}

export interface Brief {
  date: string;
  genre: Genre;
  slots: SlotPlan[];
  bridge: string;
  bans: string[];
  text: string;
}

/**
 * Tiles do not have to be titles. Each genre's kinds split by what a solver sees on the
 * tile: the title of a work, or the name of a person or character. Both lists run most
 * to least recognisable.
 *
 * The split is the point. One group of names among three groups of titles (or the
 * reverse) sorts itself by tile type before anyone thinks — so every board plans two of
 * each, and the audit fails a lone kind (see classifyTileKind in puzzle-rubric.ts).
 */
export const ITEM_KINDS: Record<Genre, Record<TileKind, string[]>> = {
  films: { work: ['film titles'], name: ['actors', 'directors', 'characters', 'screenwriters'] },
  music: { work: ['song titles', 'albums'], name: ['artists or bands', 'composers', 'songwriters'] },
  books: { work: ['book titles', 'poems'], name: ['authors', 'characters', 'translators'] },
};

/** Name kinds a solver recognises on sight; the easy and medium slots stay inside these. */
const ACCESSIBLE_NAMES = 2;

/** What each axis is for, and what it must not become. */
const AXIS_GUIDANCE: Record<Axis, string> = {
  creator:
    'who made it — a director, author, artist, or the writer of the source. Closed set, so a solver can confirm rather than guess.',
  canon:
    'what it belongs to — an award, a label, a movement, an era, a studio. Name the body, not your opinion of it. NEVER a franchise or the entries of one series: that is a list, recognised from one tile.',
  content:
    'what is inside it — a prop, a scene, a plot mechanism, a technique. This is where a hidden link lives.',
  wordplay:
    'what it is called — a pattern in the title or the name. Verify the four items are works people know before you keep the pattern. ' +
    'Titles hiding or containing a category word run once per 14 days across all sites (audit fails otherwise). Rotate instead: ' +
    'drop/add/change a letter, anagram, palindrome, misspelled name, same word added (___ Man), title is also a city/job/game/drink, ' +
    'title is a command/sentence/year, spelled-out or phone-number title, homophone, missing number.',
};

/**
 * Difficulty measures how hidden the link is, not how obscure the items are and not
 * which axis the group uses. A pattern visible on the tile is easy even though it is
 * wordplay; a director nobody can name from four films is hardest even though it is a
 * creator list. If the plan puts an axis somewhere it does not belong for the connection
 * you have in mind, move the connection, not the difficulty.
 */
const DIFFICULTY_GUIDANCE: Record<Difficulty, string> = {
  easy: 'the way in. Recognised on sight, no trivia — a pattern the solver can see on the tile belongs here. Do not make it self-solving: the tiles must not all repeat a word.',
  medium: 'one domain fact away. A pairing, a source, a period.',
  hard: 'specialist knowledge, but a set the solver can verify once named.',
  hardest:
    'famous items, hidden link. If the difficulty comes from nobody knowing the items, the group is a quiz question — rewrite it.',
};

/**
 * Difficulty-skew trial: one month of deliberately softer boards.
 *
 * Measured over puzzle dates 2026-07-01 → 2026-08-20, the win rate among players who
 * finish a board was books 44%, films 57%, music 60%, and single days swung from 0% to
 * 100%. The in-game survey agreed — "a bit hard" was the most common answer, and it came
 * from weekly players rather than from daily ones. So the trial aims every genre at
 * 65-75% and, more importantly, stops the wall days.
 *
 * The window opens at the first board actually authored under it — everything through
 * 2026-09-02 was already written and scheduled at the old calibration, so counting those
 * days as trial days would compare the change against itself. Bounded by date rather
 * than by a flag so it expires without anyone remembering to turn it off: a brief for a
 * date past the window plans at the normal calibration. The
 * feedback survey is paused for the duration (see services/feedback/survey.ts) and comes
 * back afterwards, so the second round of answers describes one curve rather than two.
 */
export const DIFFICULTY_TRIAL = {
  start: '2026-09-03',
  end: '2026-09-23',
} as const;

const TRIAL_TARGET = '65-75%';

/** Win rate among finishers, per genre, over 2026-07-01 → 2026-08-20. */
const TRIAL_BASELINE: Record<Genre, number> = { films: 57, books: 44, music: 60 };

/** What each genre's own number says it has to change. */
const TRIAL_NOTES: Record<Genre, string> = {
  films:
    'Films sits mid-band but owns most of the wall days — 0% and 12% boards are all here. The average is not the problem; the swing is. No board with two links this genre has never run before.',
  books:
    'Books is the hardest genre by a wide margin and needs the largest move. Every title, author and character on the board should be one a general reader can name, and the canon behind the link should be the well-known one.',
  music:
    'Music is the easiest genre already, so it moves least. Hold it where it is by keeping the hardest link inside a set the solver can verify once it is named.',
};

export interface TrialCalibration {
  /** Win rate among finishers this genre measured before the trial, as a percentage. */
  measuredWinRate: number;
  /** Where the trial is aiming that number. */
  targetWinRate: string;
  note: string;
}

/** The trial calibration in force on a date, or null once the window has passed. */
export function trialCalibration(date: string, genre: Genre): TrialCalibration | null {
  if (date < DIFFICULTY_TRIAL.start || date > DIFFICULTY_TRIAL.end) return null;
  return {
    measuredWinRate: TRIAL_BASELINE[genre],
    targetWinRate: TRIAL_TARGET,
    note: TRIAL_NOTES[genre],
  };
}

/**
 * The ladder shifted down one rung: hardest asks what hard used to, hard asks what
 * medium used to, and easy becomes genuinely free. The four slots stay — they carry the
 * board's colours — so only what each rung demands changes.
 */
const TRIAL_DIFFICULTY_GUIDANCE: Record<Difficulty, string> = {
  easy: 'free, and it should look free. Two tiles are enough to name the link. This is the group that keeps a losing board from ending 0-for-4.',
  medium:
    'what easy used to ask: recognised on sight, no trivia. A pattern the solver can see on the tile belongs here.',
  hard: 'one domain fact away — a pairing, a source, a period. Not specialist knowledge this month.',
  hardest:
    'the only real resistance on the board. Specialist, but a set the solver can verify the moment it is named. Famous items, hidden link — never obscure items.',
};

/**
 * Every ordering of the four axes across the four slots.
 *
 * An earlier version banned wordplay from easy and creator/canon from hardest, on the
 * theory that title patterns read hard and plain lists read easy. That is not true: a
 * pattern a solver can see on the tile is the easy way in, and a creator link nobody
 * knows is the hardest thing on a board. Difficulty is how hidden the link is, and no
 * property of the axis measures it — the writer decides, slot by slot.
 */
function validAssignments(): Axis[][] {
  const axes: Axis[] = ['creator', 'canon', 'content', 'wordplay'];
  const out: Axis[][] = [];
  const permute = (rest: Axis[], acc: Axis[]) => {
    if (!rest.length) {
      out.push(acc);
      return;
    }
    rest.forEach((axis, i) => permute([...rest.slice(0, i), ...rest.slice(i + 1)], [...acc, axis]));
  };
  permute(axes, []);
  return out;
}

/** Small stable hash so a date+genre always plans the same board. */
function seed(text: string): number {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

/** Days since epoch — the rotation counter, so consecutive days move the axes. */
function dayIndex(date: string): number {
  return Math.floor(new Date(`${date}T00:00:00Z`).getTime() / 86_400_000);
}

export function planBoard(date: string, genre: Genre): SlotPlan[] {
  const trial = trialCalibration(date, genre);
  const difficultyGuidance = trial ? TRIAL_DIFFICULTY_GUIDANCE : DIFFICULTY_GUIDANCE;
  const assignments = validAssignments();
  const genreOffset = seed(genre);
  const assignment = assignments[(dayIndex(date) + genreOffset) % assignments.length];

  // The trial takes the least recognisable name kind off the table for the month.
  const { work, name } = ITEM_KINDS[genre];
  const names = trial ? name.slice(0, -1) : name;
  const slotKinds = pickKinds(work, names, dayIndex(date) + genreOffset);
  return assignment.map((axis, i) => {
    const difficulty = DIFFICULTY_ORDER[i];
    return {
      difficulty,
      axis,
      itemKind: slotKinds[i],
      guidance: `${AXIS_GUIDANCE[axis]} At ${difficulty}: ${difficultyGuidance[difficulty]}`,
    };
  });
}

/** Every way to seat the two title groups among the four slots. */
const WORK_SLOTS = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];

/**
 * Two slots of titles, two of names, the seating rotated by date.
 *
 * The two name slots never share a kind — two groups of actors read as one idea twice.
 * Title kinds may repeat (Filmclues has only one). A name slot at easy or medium stays
 * inside the recognisable names.
 */
function pickKinds(work: string[], names: string[], rotation: number): string[] {
  const workSlots = WORK_SLOTS[rotation % WORK_SLOTS.length];
  const kinds: string[] = [];
  let w = rotation;
  let n = rotation;
  for (let slot = 0; slot < 4; slot++) {
    if (workSlots.includes(slot)) {
      kinds.push(work[w++ % work.length]);
      continue;
    }
    const pool = (slot < 2 ? names.slice(0, ACCESSIBLE_NAMES) : names).filter(
      (k) => !kinds.includes(k),
    );
    kinds.push(pool[n++ % pool.length]);
  }
  return kinds;
}

const BRIDGE =
  'Build one deliberate trap: an item that reads into another group until the solver looks closer — a shared word in two senses, or a category the other group explicitly excludes. Near-misses are the puzzle; an item that genuinely satisfies two connections is a broken board.';

function render(date: string, genre: Genre, slots: SlotPlan[], bans: string[]): string {
  const config = GENRE_CONFIGS[genre];
  const lines = [
    `${config.emoji}  ${config.siteName} — construction brief for ${date}`,
    '',
    'Write each connection first. Then find the four items. If the four best items do',
    'not exist, throw the connection away — do not reach for a fifth-choice item.',
    '',
  ];
  const trial = trialCalibration(date, genre);
  if (trial) {
    lines.push(
      `DIFFICULTY TRIAL — ${DIFFICULTY_TRIAL.start} to ${DIFFICULTY_TRIAL.end}`,
      `  Boards run a rung softer this month. ${genre} won ${trial.measuredWinRate}% of finished`,
      `  games before the trial; the target is ${trial.targetWinRate}.`,
      `  ${trial.note}`,
      '  Name kinds are already capped at the recognisable end of the list for the month.',
      '',
    );
  }
  for (const slot of slots) {
    lines.push(
      `${slot.difficulty.toUpperCase().padEnd(8)} axis: ${slot.axis}   tiles: ${slot.itemKind}`,
      `         ${slot.guidance}`,
      '',
    );
  }
  lines.push('TRAP', `  ${BRIDGE}`, '');
  lines.push('CHECKS BEFORE WRITING', ...[
    '  · two groups of titles and two of names — a lone kind sorts itself by tile type',
    '  · no franchise or series-entry group — four films of one franchise is a list, not a connection',
    '  · every item satisfies exactly one of the four connections',
    '  · no group where all four tiles share a word, or repeat a word from the connection',
    '  · connection under ~12 words, no stacked qualifiers, no taste words (famous / iconic / landmark)',
    '  · membership is a fact a solver can check, not a judgement',
  ]);
  if (bans.length) {
    lines.push('', `BANNED — connections already used (${bans.length}):`);
    for (const ban of bans) lines.push(`  · ${ban}`);
  }
  return lines.join('\n');
}

export function buildBrief(date: string, genre: Genre, usedConnections: string[]): Brief {
  const slots = planBoard(date, genre);
  const bans = [...usedConnections];
  return {
    date,
    genre,
    slots,
    bridge: BRIDGE,
    bans,
    text: render(date, genre, slots, bans),
  };
}

/**
 * CLI: print briefs for a date, one per genre (or one genre with --genre).
 *
 *   bun run --env-file=.env.local puzzle:brief --date 2026-08-13 [--genre films]
 *
 * The ban list is every connection the genre has ever run; it is long by design,
 * because the reuse the archive actually suffers from is thematic, not verbatim.
 */
async function main(): Promise<void> {
  const argv = process.argv;
  const arg = (name: string) => {
    const i = argv.indexOf(`--${name}`);
    return i === -1 ? undefined : argv[i + 1];
  };

  const date = arg('date') ?? getTomorrowDate();
  const only = arg('genre') as Genre | undefined;
  if (only && !GENRE_ORDER.includes(only)) {
    throw new Error(`Unknown genre "${only}". Expected ${GENRE_ORDER.join(' | ')}.`);
  }

  const client = getPuzzleClient();
  const data = await fetchAllPages<{ genre: string; groups: unknown }>((from, to) =>
    client
      .from('puzzles')
      .select('genre, groups')
      .not('puzzle_date', 'is', null)
      .order('id')
      .range(from, to),
  );

  for (const genre of only ? [only] : GENRE_ORDER) {
    const used = new Set<string>();
    for (const row of data ?? []) {
      if (row.genre !== genre) continue;
      for (const group of (row.groups ?? []) as Array<{ connection: string }>) {
        used.add(group.connection);
      }
    }
    console.log(`\n${buildBrief(date, genre, [...used].sort()).text}\n`);
  }
}

if ((import.meta as { main?: boolean }).main) {
  main().catch((err) => {
    console.error(`❌ ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  });
}
