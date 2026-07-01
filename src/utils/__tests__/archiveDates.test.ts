import { describe, it, expect } from "vitest";
import { archivePagePath, getAdjacentDates } from "../archiveDates";

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
