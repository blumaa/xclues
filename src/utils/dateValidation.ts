const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export function isValidDateFormat(date: string): boolean {
  return DATE_REGEX.test(date);
}

/** Today's date as a UTC `YYYY-MM-DD` string. Single source of truth for "today". */
export function getUtcToday(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * True only for dates strictly before today (UTC). Today's puzzle is the live,
 * in-progress game, so it must be excluded from every archive surface (hub list,
 * sitemap, date pages) or players could read the answers early and cheat.
 */
export function isPastDate(date: string): boolean {
  return date < getUtcToday();
}

export function formatDateForDisplay(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
