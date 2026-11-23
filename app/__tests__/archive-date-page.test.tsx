import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { mockPuzzle } from "../../src/__mocks__/puzzleData";
import ArchivePage from "../[genre]/archive/[date]/page";
import { ToastProvider } from "../../src/providers/ToastProvider";

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
  // Root layout supplies ToastProvider in the app.
  return render(<ToastProvider>{ui}</ToastProvider>);
}

describe("archive date page", () => {
  it("renders title, then the playable game, then the date nav", async () => {
    const { container } = await renderPage();

    const wrap = container.querySelector(".archive-date");
    const children = [...(wrap?.children ?? [])].map((c) => c.className);
    const titleIdx = children.findIndex((c) => c.includes("archive-date__title"));
    const gameIdx = children.findIndex((c) => c.includes("homepage-game"));
    const navIdx = children.findIndex((c) => c.includes("archive-date-nav"));

    expect(titleIdx).toBe(0);
    expect(titleIdx).toBeLessThan(gameIdx);
    expect(gameIdx).toBeLessThan(navIdx);
  });

  it("has no breadcrumb trail or BreadcrumbList data; the board needs the room", async () => {
    const { container, queryByRole } = await renderPage();
    expect(queryByRole("navigation", { name: "Breadcrumb" })).toBeNull();
    expect(container.innerHTML).not.toContain("BreadcrumbList");
  });

  it("keeps an h1 naming the puzzle and date", async () => {
    const { getByRole } = await renderPage();
    expect(getByRole("heading", { level: 1 }).textContent).toMatch(/July 1, 2026/);
  });

  it("does not reveal the answers before the game is played", async () => {
    const { container, queryByText } = await renderPage();
    expect(container.querySelectorAll(".group-card")).toHaveLength(0);
    expect(queryByText(mockPuzzle.groups[0].connection)).toBeNull();
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

describe("archive date metadata", () => {
  it("invites play instead of promising revealed answers", async () => {
    const { generateMetadata } = await import("../[genre]/archive/[date]/page");
    const meta = await generateMetadata({
      params: Promise.resolve({ genre: "films", date: "2026-07-01" }),
    });
    expect(meta.description).toMatch(/^Play /);
    expect(meta.description).not.toMatch(/revealed/i);
  });
});
