import { describe, it, expect } from "vitest";
import { archiveResultsByDate } from "../archiveResults";
import type { GameResult } from "../../types/stats";

const game = (over: Partial<GameResult>): GameResult => ({
  date: "2026-06-30",
  genre: "films",
  won: true,
  mistakes: 0,
  completedAt: 1,
  ...over,
});

describe("archiveResultsByDate", () => {
  it("maps each finished game of the genre to its date", () => {
    const results = archiveResultsByDate(
      [
        game({ date: "2026-06-30", won: true, mistakes: 2 }),
        game({ date: "2026-06-29", won: false, mistakes: 4 }),
      ],
      "films",
    );
    expect(results).toEqual({
      "2026-06-30": { won: true, mistakes: 2 },
      "2026-06-29": { won: false, mistakes: 4 },
    });
  });

  it("ignores other genres and games with no genre", () => {
    const results = archiveResultsByDate(
      [game({ genre: "books" }), game({ genre: undefined, date: "2026-06-29" })],
      "films",
    );
    expect(results).toEqual({});
  });

  it("counts daily plays too: a date played live shows as played in the archive", () => {
    const results = archiveResultsByDate([game({ archive: false })], "films");
    expect(results["2026-06-30"]).toEqual({ won: true, mistakes: 0 });
  });
});
