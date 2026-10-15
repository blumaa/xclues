import { type Genre, getSeoConfig } from "../config/seoConfig";
import { isPastDate } from "./dateValidation";

/** Dates listed per archive hub page. */
export const ARCHIVE_PAGE_SIZE = 30;

/**
 * URL for a given archive page. Page 1 is the bare `/[genre]/archive` hub so it
 * carries the clean canonical; deeper pages use path segments (better for SEO
 * than a `?page=` query param — distinct, crawlable, self-canonical URLs).
 */
export function archivePagePath(genre: Genre, page: number): string {
  return page <= 1 ? `/${genre}/archive` : `/${genre}/archive/page/${page}`;
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
