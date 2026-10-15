import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { archiveDateUrl, archivePagePath, getAdjacentDates, puzzleUrl } from "../archiveDates";

describe("archivePagePath", () => {
  it("returns the bare archive path for page 1", () => {
    expect(archivePagePath("films", 1)).toBe("/films/archive");
  });

  it("returns a /page/[n] path for pages beyond the first", () => {
    expect(archivePagePath("films", 2)).toBe("/films/archive/page/2");
    expect(archivePagePath("music", 5)).toBe("/music/archive/page/5");
  });

  it("clamps page numbers below 1 to the bare archive path", () => {
    expect(archivePagePath("books", 0)).toBe("/books/archive");
    expect(archivePagePath("books", -3)).toBe("/books/archive");
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
