export type EventType = 'started' | 'won' | 'lost';

export interface GameEventRow {
  event_type: EventType;
  created_at: string;
  genre?: string;
  source?: string | null;
  game_id?: string | null;
}

export interface Counts {
  started: number;
  won: number;
  lost: number;
  /** Started games that never reached won/lost. */
  dropped: number;
}

export interface SourceBucket extends Counts {
  source: string;
}

export interface DailyBucket extends Counts {
  date: string;
}

export interface WeeklyBucket extends Counts {
  isoWeek: string;
}

export interface AggregatedEvents {
  daily: DailyBucket[];
  weekly: WeeklyBucket[];
}

const DAILY_WINDOW = 30;
const WEEKLY_WINDOW = 12;

function utcDateKey(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addUTCDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setUTCDate(out.getUTCDate() + days);
  return out;
}

function isoWeekKey(d: Date): string {
  const tmp = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil((((tmp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${tmp.getUTCFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

function finishedGameIds(rows: GameEventRow[]): Set<string> {
  const ids = new Set<string>();
  for (const row of rows) {
    if (row.event_type !== 'started' && row.game_id) ids.add(row.game_id);
  }
  return ids;
}

// Counts one bucket's rows. Rows with a game_id give an exact drop-off: a
// started id with no finish anywhere in the data, charged to the bucket where
// it started. Rows from before game_id existed fall back to started minus
// finished, floored because a game finished after a bucket boundary counts
// its finish in the later bucket.
function tally(rows: GameEventRow[], finished: Set<string>): Counts {
  const counts: Counts = { started: 0, won: 0, lost: 0, dropped: 0 };
  let legacyStarted = 0;
  let legacyFinished = 0;

  for (const row of rows) {
    counts[row.event_type] += 1;
    if (row.game_id) {
      if (row.event_type === 'started' && !finished.has(row.game_id)) counts.dropped += 1;
    } else if (row.event_type === 'started') {
      legacyStarted += 1;
    } else {
      legacyFinished += 1;
    }
  }

  counts.dropped += Math.max(0, legacyStarted - legacyFinished);
  return counts;
}

function groupBy(rows: GameEventRow[], keyOf: (row: GameEventRow) => string): Map<string, GameEventRow[]> {
  const groups = new Map<string, GameEventRow[]>();
  for (const row of rows) {
    const key = keyOf(row);
    const group = groups.get(key);
    if (group) group.push(row);
    else groups.set(key, [row]);
  }
  return groups;
}

export function aggregateEvents(rows: GameEventRow[], now: Date = new Date()): AggregatedEvents {
  const finished = finishedGameIds(rows);

  const byDay = groupBy(rows, (row) => utcDateKey(new Date(row.created_at)));
  const daily: DailyBucket[] = [];
  for (let i = 0; i < DAILY_WINDOW; i++) {
    const date = utcDateKey(addUTCDays(now, -i));
    daily.push({ date, ...tally(byDay.get(date) ?? [], finished) });
  }

  const byWeek = groupBy(rows, (row) => isoWeekKey(new Date(row.created_at)));
  const weekly: WeeklyBucket[] = [];
  const seenWeeks = new Set<string>();
  for (let i = 0; i < WEEKLY_WINDOW; i++) {
    const isoWeek = isoWeekKey(addUTCDays(now, -i * 7));
    if (seenWeeks.has(isoWeek)) continue;
    seenWeeks.add(isoWeek);
    weekly.push({ isoWeek, ...tally(byWeek.get(isoWeek) ?? [], finished) });
  }

  return { daily, weekly };
}

const SOURCE_WINDOW_DAYS = 30;

// Groups plays by traffic source over the trailing window. Untagged traffic
// (organic search, dark social) collapses into a single 'organic' bucket.
// Sorted by started desc so the highest-volume channels surface first.
export function aggregateBySource(
  rows: GameEventRow[],
  now: Date = new Date(),
  windowDays: number = SOURCE_WINDOW_DAYS,
): SourceBucket[] {
  const cutoff = addUTCDays(now, -windowDays).getTime();
  const finished = finishedGameIds(rows);
  const inWindow = rows.filter((row) => new Date(row.created_at).getTime() >= cutoff);
  const bySource = groupBy(inWindow, (row) => row.source ?? 'organic');

  return [...bySource]
    .map(([source, group]) => ({ source, ...tally(group, finished) }))
    .sort((a, b) => b.started - a.started);
}

export type GenreAggregations = Record<'films' | 'books' | 'music' | 'all', AggregatedEvents>;

export function aggregateEventsByGenre(rows: GameEventRow[], now: Date = new Date()): GenreAggregations {
  const grouped: Record<string, GameEventRow[]> = { films: [], books: [], music: [], all: [] };

  for (const row of rows) {
    const genre = row.genre ?? 'films';
    if (genre in grouped) {
      grouped[genre].push(row);
    }
    grouped.all.push(row);
  }

  return {
    films: aggregateEvents(grouped.films, now),
    books: aggregateEvents(grouped.books, now),
    music: aggregateEvents(grouped.music, now),
    all: aggregateEvents(grouped.all, now),
  };
}
