export type EventType = 'started' | 'won' | 'lost';

export interface GameEventRow {
  event_type: EventType;
  created_at: string;
  genre?: string;
  source?: string | null;
}

export interface SourceBucket {
  source: string;
  started: number;
  won: number;
  lost: number;
}

export interface DailyBucket {
  date: string;
  started: number;
  won: number;
  lost: number;
}

export interface WeeklyBucket {
  isoWeek: string;
  started: number;
  won: number;
  lost: number;
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

export function aggregateEvents(rows: GameEventRow[], now: Date = new Date()): AggregatedEvents {
  const daily: DailyBucket[] = [];
  const dailyIndex = new Map<string, DailyBucket>();
  for (let i = 0; i < DAILY_WINDOW; i++) {
    const date = utcDateKey(addUTCDays(now, -i));
    const bucket: DailyBucket = { date, started: 0, won: 0, lost: 0 };
    daily.push(bucket);
    dailyIndex.set(date, bucket);
  }

  const weekly: WeeklyBucket[] = [];
  const weeklyIndex = new Map<string, WeeklyBucket>();
  for (let i = 0; i < WEEKLY_WINDOW; i++) {
    const isoWeek = isoWeekKey(addUTCDays(now, -i * 7));
    if (weeklyIndex.has(isoWeek)) continue;
    const bucket: WeeklyBucket = { isoWeek, started: 0, won: 0, lost: 0 };
    weekly.push(bucket);
    weeklyIndex.set(isoWeek, bucket);
  }

  for (const row of rows) {
    const d = new Date(row.created_at);
    const dayBucket = dailyIndex.get(utcDateKey(d));
    if (dayBucket) dayBucket[row.event_type] += 1;
    const weekBucket = weeklyIndex.get(isoWeekKey(d));
    if (weekBucket) weekBucket[row.event_type] += 1;
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
  const index = new Map<string, SourceBucket>();

  for (const row of rows) {
    if (new Date(row.created_at).getTime() < cutoff) continue;
    const source = row.source ?? 'organic';
    let bucket = index.get(source);
    if (!bucket) {
      bucket = { source, started: 0, won: 0, lost: 0 };
      index.set(source, bucket);
    }
    bucket[row.event_type] += 1;
  }

  return [...index.values()].sort((a, b) => b.started - a.started);
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
