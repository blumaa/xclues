export type EventType = 'started' | 'won' | 'lost';

export interface GameEventRow {
  event_type: EventType;
  created_at: string;
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
