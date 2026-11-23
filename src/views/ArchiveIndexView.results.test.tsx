import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { ArchiveIndexView } from "./ArchiveIndexView";
import { resetStatsStore, STATS_STORAGE_KEY } from "../store/statsStore";
import { findArchiveMonth, groupDatesByMonth } from "../utils/archiveDates";

const archive = findArchiveMonth(
  groupDatesByMonth(["2026-06-30", "2026-06-29", "2026-06-28"]),
  null,
);

const props = { genre: "films" as const, siteName: "Filmclues", archive };

describe("ArchiveIndexView with no results prop (live page)", () => {
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
    render(<ArchiveIndexView {...props} />);
    expect(
      await screen.findByRole("link", { name: /June 30, 2026: solved, 1 mistake$/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /June 29, 2026: lost$/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /June 28, 2026: not played$/ })).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Your progress this month" })).toBeInTheDocument();
  });

  it("shows every day unplayed when nothing is saved", () => {
    render(<ArchiveIndexView {...props} />);
    expect(screen.getAllByRole("link", { name: /: not played$/ })).toHaveLength(3);
    expect(screen.queryByRole("list", { name: "Your progress this month" })).toBeNull();
  });

  it("stays a server component; only the status pieces ship to the browser", () => {
    const source = readFileSync(join(__dirname, "ArchiveIndexView.tsx"), "utf8");
    expect(source).not.toMatch(/^\s*["']use client["']/);
  });
});
