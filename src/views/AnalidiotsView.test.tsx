import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { AnalidiotsView } from "./AnalidiotsView";
import { aggregateEventsByGenre, type GameEventRow } from "../services/analytics/aggregateEvents";

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

function renderView() {
  render(
    <AnalidiotsView
      data={aggregateEventsByGenre(rows(), now)}
      bySource={[{ source: "reddit", started: 3, won: 1, lost: 0, dropped: 2 }]}
      feedback={[]}
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
