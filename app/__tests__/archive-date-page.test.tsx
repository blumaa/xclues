import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { mockPuzzle } from "../../src/__mocks__/puzzleData";
import ArchivePage from "../[genre]/archive/[date]/page";

vi.mock("../../src/lib/supabase/puzzleQueries", () => ({
  fetchPuzzleByDate: vi.fn(async () => mockPuzzle),
  fetchPublishedDatesForGenre: vi.fn(async () => [
    "2026-06-30",
    "2026-07-01",
    "2026-07-02",
  ]),
}));

async function renderPage() {
  const ui = await ArchivePage({
    params: Promise.resolve({ genre: "films", date: "2026-07-01" }),
  });
  return render(ui);
}

describe("archive date page", () => {
  it("renders breadcrumbs on top, then the board, then the date nav", async () => {
    const { container } = await renderPage();

    const wrap = container.querySelector(".archive-date");
    const children = [...(wrap?.children ?? [])].map((c) => c.className);
    const crumbsIdx = children.findIndex((c) => c.includes("breadcrumbs"));
    const boardIdx = children.findIndex((c) => c.includes("puzzle-reveal"));
    const navIdx = children.findIndex((c) => c.includes("archive-date-nav"));

    expect(crumbsIdx).toBeGreaterThan(-1);
    expect(crumbsIdx).toBeLessThan(boardIdx);
    expect(boardIdx).toBeLessThan(navIdx);
  });

  it("renders the group cards in the shared game grid", async () => {
    const { container } = await renderPage();
    expect(
      container.querySelectorAll(".game-grid > .group-card")
    ).toHaveLength(4);
  });

  it("404s today's live puzzle so its answers aren't revealed in the archive", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-11T12:00:00Z"));

    // notFound() throws; the page must not render today's board.
    await expect(
      ArchivePage({
        params: Promise.resolve({ genre: "films", date: "2026-07-11" }),
      })
    ).rejects.toThrow();

    vi.useRealTimers();
  });
});
