import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { AnalidiotsView } from "./AnalidiotsView";
import { aggregateEventsByGenre, type GameEventRow } from "../services/analytics/aggregateEvents";
import type { PuzzleFeedbackRow } from "../services/feedback/puzzleFeedback";
import { puzzleUrl } from "../utils/archiveDates";

const now = new Date();
const today = now.toISOString();

function rows(): GameEventRow[] {
  return [
    { event_type: "started", created_at: today, genre: "films", source: "reddit" },
    { event_type: "started", created_at: today, genre: "films", source: "reddit" },
    { event_type: "started", created_at: today, genre: "films", source: "reddit" },
    { event_type: "won", created_at: today, genre: "films", source: "reddit" },
  ];
}

const PUZZLE_FEEDBACK: PuzzleFeedbackRow[] = [
  {
    id: 1,
    created_at: "2026-10-14T18:00:00Z",
    genre: "books",
    puzzle_date: "2026-10-14",
    rating: 2,
    comment: "Purple was a stretch.",
  },
  {
    id: 2,
    created_at: "2026-10-15T09:00:00Z",
    genre: "films",
    puzzle_date: "2026-10-15",
    rating: 5,
    comment: null,
  },
];

function renderView() {
  render(
    <AnalidiotsView
      data={aggregateEventsByGenre(rows(), now)}
      bySource={[{ source: "reddit", started: 3, won: 1, lost: 0, dropped: 2 }]}
      feedback={[]}
      puzzleFeedback={PUZZLE_FEEDBACK}
    />,
  );
}

describe("AnalidiotsView drop-off", () => {
  it("shows a dropped total in the 30-day totals", () => {
    renderView();
    const totals = screen.getByRole("heading", { name: "30-day totals" }).closest("section")!;
    const tile = within(totals).getByText("Dropped").parentElement!;
    expect(within(tile).getByText("2")).toBeInTheDocument();
  });

  it.each(["Per day", "Per week"])("adds a Dropped column to the %s table", (title) => {
    renderView();
    const section = screen.getByRole("heading", { name: title }).closest("section")!;
    const table = within(section).getByRole("table");
    expect(within(table).getByRole("columnheader", { name: "Dropped" })).toBeInTheDocument();
    const firstRow = within(table).getAllByRole("row")[1];
    const cells = within(firstRow).getAllByRole("cell").map((c) => c.textContent);
    expect(cells).toEqual([expect.any(String), "3", "1", "0", "2", "100%"]);
  });

  it("adds a Dropped column to the traffic sources table", () => {
    renderView();
    const section = screen.getByRole("heading", { name: /Traffic sources/ }).closest("section")!;
    const table = within(section).getByRole("table");
    expect(within(table).getByRole("columnheader", { name: "Dropped" })).toBeInTheDocument();
    const cells = within(within(table).getAllByRole("row")[1])
      .getAllByRole("cell")
      .map((c) => c.textContent);
    expect(cells).toEqual(["reddit", "3", "1", "2", "33%"]);
  });
});

describe("AnalidiotsView puzzle feedback", () => {
  function feedbackTable() {
    const section = screen.getByRole("heading", { name: /Puzzle feedback/ }).closest("section")!;
    return within(section).getByRole("table");
  }

  it("has date, genre, rating and feedback columns", () => {
    renderView();
    const headers = within(feedbackTable())
      .getAllByRole("columnheader")
      .map((h) => h.textContent);
    expect(headers).toEqual(["Puzzle date", "Genre", "Rating", "Feedback"]);
  });

  it("lists newest first, one row per response", () => {
    renderView();
    const rows = within(feedbackTable()).getAllByRole("row").slice(1);
    const cells = rows.map((r) => within(r).getAllByRole("cell").map((c) => c.textContent));
    expect(cells).toEqual([
      ["2026-10-15", "films", "5/5", "—"],
      ["2026-10-14", "books", "2/5", "Purple was a stretch."],
    ]);
  });

  it("links the date to that puzzle's archive page", () => {
    renderView();
    const link = within(feedbackTable()).getByRole("link", { name: "2026-10-14" });
    expect(link).toHaveAttribute("href", puzzleUrl("books", "2026-10-14"));
  });
});
