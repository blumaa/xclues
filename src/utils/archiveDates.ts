import { type Genre, getSeoConfig } from "../config/seoConfig";
import { isPastDate } from "./dateValidation";

/** Dates per page of the retired /archive/page/N hub. Only maps old URLs. */
const LEGACY_PAGE_SIZE = 30;

/**
 * URL for one archive month. The newest month (null) is the bare
 * `/[genre]/archive` hub so it carries the clean canonical.
 */
export function archiveMonthPath(genre: Genre, month: string | null): string {
  return month ? `/${genre}/archive/month/${month}` : `/${genre}/archive`;
}

/** YYYY-MM with a real month number. */
export function isValidMonthKey(key: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(key);
}

/** Month a retired /archive/page/N started on, or null past the end. */
export function legacyPageMonth(dates: string[], page: number): string | null {
  return dates[(page - 1) * LEGACY_PAGE_SIZE]?.slice(0, 7) ?? null;
}

export interface AdjacentDates {
  /** The chronologically newer published date, or null if this is the latest. */
  newer: string | null;
  /** The chronologically older published date, or null if this is the earliest. */
  older: string | null;
}

/**
 * Neighbouring published dates for prev/next navigation on an archive-date page.
 * `dates` MUST be sorted newest-first (as `fetchAllPublishedDates` returns), so
 * the newer neighbour is the preceding index and the older is the following one.
 * Because the list only contains published dates, unpublished gaps are skipped
 * automatically.
 */
export function getAdjacentDates(dates: string[], date: string): AdjacentDates {
  const i = dates.indexOf(date);
  if (i === -1) return { newer: null, older: null };
  return {
    newer: i > 0 ? dates[i - 1] : null,
    older: i < dates.length - 1 ? dates[i + 1] : null,
  };
}

/** Path of one archived puzzle. */
export function archiveDatePath(genre: Genre, date: string): string {
  return `/${genre}/archive/${date}`;
}

/** Absolute URL of one archived puzzle, on the genre's own domain. */
export function archiveDateUrl(genre: Genre, date: string): string {
  return `https://${getSeoConfig(genre).domain}${archiveDatePath(genre, date)}`;
}

/**
 * Where to view a puzzle. Only past dates are archived (the archive route 404s
 * today and later), so today's puzzle links to the live game instead.
 */
export function puzzleUrl(genre: Genre, date: string): string {
  return isPastDate(date) ? archiveDateUrl(genre, date) : `https://${getSeoConfig(genre).domain}`;
}

function utcDate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export interface MonthGroup {
  /** YYYY-MM */
  key: string;
  /** e.g. "June 2026" */
  label: string;
  dates: string[];
}

/** "2026-06" -> "June 2026". */
export function monthLabel(key: string): string {
  return utcDate(`${key}-01`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Buckets dates (any order) by calendar month, preserving input order. */
export function groupDatesByMonth(dates: string[]): MonthGroup[] {
  const groups: MonthGroup[] = [];
  for (const date of dates) {
    const key = date.slice(0, 7);
    let group = groups.find((g) => g.key === key);
    if (!group) {
      group = { key, label: monthLabel(key), dates: [] };
      groups.push(group);
    }
    group.dates.push(date);
  }
  return groups;
}

export interface DateParts {
  weekdayShort: string;
  weekday: string;
  day: number;
}

/** Calendar-tile pieces of a YYYY-MM-DD date, in UTC like the puzzle schedule. */
export function dateParts(date: string): DateParts {
  const d = utcDate(date);
  const weekday = (style: "short" | "long") =>
    d.toLocaleDateString("en-US", { weekday: style, timeZone: "UTC" });
  return { weekdayShort: weekday("short"), weekday: weekday("long"), day: d.getUTCDate() };
}

export interface MonthCalendar {
  /** Empty cells before day 1 in a Sunday-first week. */
  leadingBlanks: number;
  /** Every date of the month, YYYY-MM-DD, ascending. */
  days: string[];
}

/** Full calendar month for a YYYY-MM key, in UTC. */
export function monthCalendar(key: string): MonthCalendar {
  const [year, month] = key.split("-").map(Number);
  const first = new Date(Date.UTC(year, month - 1, 1));
  const length = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const days = Array.from({ length }, (_, i) => `${key}-${String(i + 1).padStart(2, "0")}`);
  return { leadingBlanks: first.getUTCDay(), days };
}

export interface ArchiveMonth {
  month: MonthGroup;
  /** Next month with puzzles, later in time. */
  newer: MonthGroup | null;
  /** Previous month with puzzles, earlier in time. */
  older: MonthGroup | null;
  /** `newer` is the newest month, which lives at the bare hub URL. */
  newerIsLatest: boolean;
}

/**
 * One month of a newest-first month list plus its neighbours. `key` null means
 * the newest month. Null when that month has no puzzles.
 */
export function findArchiveMonth(months: MonthGroup[], key: string | null): ArchiveMonth | null {
  const index = key === null ? 0 : months.findIndex((m) => m.key === key);
  const month = months[index];
  if (!month) return null;
  return {
    month,
    newer: months[index - 1] ?? null,
    older: months[index + 1] ?? null,
    newerIsLatest: index === 1,
  };
}
