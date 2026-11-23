import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArchiveIndexLive } from "./ArchiveIndexLive";
import { resetStatsStore, STATS_STORAGE_KEY } from "../store/statsStore";
import { findArchiveMonth, groupDatesByMonth } from "../utils/archiveDates";

const archive = findArchiveMonth(
  groupDatesByMonth(["2026-06-30", "2026-06-29", "2026-06-28"]),
  null,
);

const props = { genre: "films" as const, siteName: "Filmclues", archive };

describe("ArchiveIndexLive", () => {
  beforeEach(() => {
    localStorage.removeItem(STATS_STORAGE_KEY);
    resetStatsStore();
  });

  it("shows this device's saved results on the calendar", async () => {
    localStorage.setItem(
      STATS_STORAGE_KEY,
      JSON.stringify({
        gameHistory: [
          { date: "2026-06-30", genre: "films", won: true, mistakes: 1, completedAt: 1, archive: true },
          { date: "2026-06-29", genre: "films", won: false, mistakes: 4, completedAt: 2 },
          { date: "2026-06-28", genre: "books", won: true, mistakes: 0, completedAt: 3 },
        ],
      }),
    );
    render(<ArchiveIndexLive {...props} />);
    expect(
      await screen.findByRole("link", { name: /June 30, 2026: solved, 1 mistake$/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /June 29, 2026: lost$/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /June 28, 2026: not played$/ })).toBeInTheDocument();
  });

  it("shows every day unplayed when nothing is saved", () => {
    render(<ArchiveIndexLive {...props} />);
    expect(screen.getAllByRole("link", { name: /: not played$/ })).toHaveLength(3);
    expect(screen.queryByRole("list", { name: "Your progress this month" })).toBeNull();
  });
});
