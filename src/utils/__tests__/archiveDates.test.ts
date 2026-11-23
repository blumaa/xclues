import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  archiveDateUrl,
  archiveMonthPath,
  findArchiveMonth,
  isValidMonthKey,
  legacyPageMonth,
  getAdjacentDates,
  puzzleUrl,
  groupDatesByMonth,
  dateParts,
  monthCalendar,
  monthLabel,
} from "../archiveDates";

describe("archiveMonthPath", () => {
  it("puts a month under /archive/month/YYYY-MM", () => {
    expect(archiveMonthPath("films", "2026-06")).toBe("/films/archive/month/2026-06");
  });

  it("uses the bare archive hub for the newest month", () => {
    expect(archiveMonthPath("music", null)).toBe("/music/archive");
  });
});

describe("isValidMonthKey", () => {
  it.each(["2026-06", "1999-12", "2030-01"])("accepts %s", (key) => {
    expect(isValidMonthKey(key)).toBe(true);
  });

  it.each(["2026-13", "2026-00", "2026-6", "2026-06-01", "june", ""])("rejects %s", (key) => {
    expect(isValidMonthKey(key)).toBe(false);
  });
});

describe("findArchiveMonth", () => {
  // Newest-first, like fetchPublishedDatesForGenre.
  const months = groupDatesByMonth(["2026-07-02", "2026-07-01", "2026-06-30", "2026-05-31"]);

  it("defaults to the newest month, with only an older neighbour", () => {
    const found = findArchiveMonth(months, null)!;
    expect(found.month.key).toBe("2026-07");
    expect(found.newer).toBeNull();
    expect(found.older?.key).toBe("2026-06");
    expect(found.newerIsLatest).toBe(false);
  });

  it("finds a middle month with both neighbours", () => {
    const found = findArchiveMonth(months, "2026-06")!;
    expect(found.month.dates).toEqual(["2026-06-30"]);
    expect(found.newer?.key).toBe("2026-07");
    expect(found.older?.key).toBe("2026-05");
    // Newer is the newest month: link to the bare hub, not /month/2026-07.
    expect(found.newerIsLatest).toBe(true);
  });

  it("flags a newer month that is not the newest", () => {
    expect(findArchiveMonth(months, "2026-05")!.newerIsLatest).toBe(false);
  });

  it("returns null for a month with no puzzles", () => {
    expect(findArchiveMonth(months, "2025-01")).toBeNull();
  });

  it("returns null when nothing is published", () => {
    expect(findArchiveMonth([], null)).toBeNull();
  });
});

describe("legacyPageMonth", () => {
  // Old hub: 30 dates per /archive/page/N, newest-first.
  const dates = Array.from({ length: 45 }, (_, i) => {
    const d = new Date(Date.UTC(2026, 6, 15 - i));
    return d.toISOString().slice(0, 10);
  });

  it("maps an old page to the month of its first date", () => {
    // Page 2 started at index 30: 2026-07-15 minus 30 days = 2026-06-15.
    expect(legacyPageMonth(dates, 2)).toBe("2026-06");
  });

  it("returns null for a page past the end", () => {
    expect(legacyPageMonth(dates, 3)).toBeNull();
  });
});

describe("getAdjacentDates", () => {
  // `dates` is newest-first, mirroring fetchAllPublishedDates().
  const dates = ["2026-06-30", "2026-06-29", "2026-06-28"];

  it("returns both neighbours for a middle date", () => {
    expect(getAdjacentDates(dates, "2026-06-29")).toEqual({
      newer: "2026-06-30",
      older: "2026-06-28",
    });
  });

  it("has no newer neighbour for the most recent date", () => {
    expect(getAdjacentDates(dates, "2026-06-30")).toEqual({
      newer: null,
      older: "2026-06-29",
    });
  });

  it("has no older neighbour for the earliest date", () => {
    expect(getAdjacentDates(dates, "2026-06-28")).toEqual({
      newer: "2026-06-29",
      older: null,
    });
  });

  it("returns both null when the date is absent", () => {
    expect(getAdjacentDates(dates, "2020-01-01")).toEqual({
      newer: null,
      older: null,
    });
  });

  it("returns both null for a single-item list", () => {
    expect(getAdjacentDates(["2026-06-30"], "2026-06-30")).toEqual({
      newer: null,
      older: null,
    });
  });
});

describe("archiveDateUrl", () => {
  it("returns the absolute archive URL on the genre's own domain", () => {
    expect(archiveDateUrl("films", "2026-10-14")).toBe(
      "https://filmclues.space/films/archive/2026-10-14",
    );
    expect(archiveDateUrl("books", "2026-10-14")).toBe(
      "https://litclues.space/books/archive/2026-10-14",
    );
  });
});

describe("puzzleUrl", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-15T12:00:00Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("links a past puzzle to its archive page", () => {
    expect(puzzleUrl("films", "2026-10-14")).toBe(
      "https://filmclues.space/films/archive/2026-10-14",
    );
  });

  it("links today's puzzle to the live game, since the archive 404s until tomorrow", () => {
    expect(puzzleUrl("music", "2026-10-15")).toBe("https://musiclues.space");
  });
});

describe("groupDatesByMonth", () => {
  it("groups newest-first dates under month labels, keeping order", () => {
    expect(groupDatesByMonth(["2026-07-01", "2026-06-30", "2026-06-29"])).toEqual([
      { key: "2026-07", label: "July 2026", dates: ["2026-07-01"] },
      { key: "2026-06", label: "June 2026", dates: ["2026-06-30", "2026-06-29"] },
    ]);
  });

  it("returns nothing for no dates", () => {
    expect(groupDatesByMonth([])).toEqual([]);
  });
});

describe("dateParts", () => {
  it("gives short + long weekday and day of month in UTC", () => {
    expect(dateParts("2026-06-30")).toEqual({ weekdayShort: "Tue", weekday: "Tuesday", day: 30 });
  });
});

describe("monthCalendar", () => {
  it("lists every day of the month with Sunday-first leading blanks", () => {
    // June 1 2026 is a Monday: one blank (Sunday) before it.
    const june = monthCalendar("2026-06");
    expect(june.leadingBlanks).toBe(1);
    expect(june.days).toHaveLength(30);
    expect(june.days[0]).toBe("2026-06-01");
    expect(june.days[29]).toBe("2026-06-30");
  });

  it("handles leap-year February and a Sunday start", () => {
    // Feb 1 2032 is a Sunday; 2032 is a leap year.
    const feb = monthCalendar("2032-02");
    expect(feb.leadingBlanks).toBe(0);
    expect(feb.days).toHaveLength(29);
  });
});

describe("monthLabel", () => {
  it("spells out a YYYY-MM key", () => {
    expect(monthLabel("2026-06")).toBe("June 2026");
    expect(monthLabel("2027-01")).toBe("January 2027");
  });
});
