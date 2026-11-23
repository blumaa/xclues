import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ArchiveIndexView } from "./ArchiveIndexView";
import { findArchiveMonth, groupDatesByMonth } from "../utils/archiveDates";

// Newest-first, like fetchPublishedDatesForGenre.
const months = groupDatesByMonth([
  "2026-07-01",
  "2026-06-30",
  "2026-06-29",
  "2026-06-28",
  "2026-05-31",
]);

const baseProps = {
  genre: "films" as const,
  siteName: "Filmclues",
  archive: findArchiveMonth(months, "2026-06"),
};

describe("ArchiveIndexView", () => {
  it("links each puzzle day to its archive-date page with descriptive anchor text", () => {
    render(<ArchiveIndexView {...baseProps} />);
    expect(screen.getAllByRole("link", { name: /Filmclues puzzle,/ })).toHaveLength(3);
    const june30 = screen.getByRole("link", { name: "Filmclues puzzle, Tuesday, June 30, 2026: not played" });
    expect(june30).toHaveAttribute("href", "/films/archive/2026-06-30");
  });

  it("shows an empty state and no calendar when nothing is published", () => {
    render(<ArchiveIndexView {...baseProps} archive={null} />);
    expect(screen.getByText("No puzzles published yet.")).toBeInTheDocument();
    expect(screen.queryByRole("table")).toBeNull();
    expect(screen.queryByRole("navigation", { name: "Archive months" })).toBeNull();
  });

  it("invites play and says streaks are safe, never promises revealed answers", () => {
    render(<ArchiveIndexView {...baseProps} />);
    expect(screen.getByText(/play any past/i)).toBeInTheDocument();
    expect(screen.getByText(/streak/i)).toBeInTheDocument();
    expect(screen.queryByText(/revealed/i)).toBeNull();
  });

  it("has no breadcrumb trail; the header logo already links home", () => {
    render(<ArchiveIndexView {...baseProps} />);
    expect(screen.queryByRole("navigation", { name: "Breadcrumb" })).toBeNull();
  });

  it("puts the calendar right under the title, before the intro note", () => {
    render(<ArchiveIndexView {...baseProps} />);
    const title = screen.getByRole("heading", { level: 1 });
    const calendar = screen.getByRole("table", { name: "June 2026" });
    const note = screen.getByText(/play any past/i);
    const follows = document.DOCUMENT_POSITION_FOLLOWING;
    expect(title.compareDocumentPosition(calendar) & follows).toBeTruthy();
    expect(calendar.compareDocumentPosition(note) & follows).toBeTruthy();
  });

  describe("month switcher", () => {
    const nav = () => screen.getByRole("navigation", { name: "Archive months" });

    it("names the current month as the calendar heading", () => {
      render(<ArchiveIndexView {...baseProps} />);
      expect(within(nav()).getByRole("heading", { level: 2 })).toHaveTextContent("June 2026");
      expect(screen.getByRole("table", { name: "June 2026" })).toBeInTheDocument();
    });

    it("links the earlier month by its month path", () => {
      render(<ArchiveIndexView {...baseProps} />);
      expect(within(nav()).getByRole("link", { name: "Earlier month: May 2026" })).toHaveAttribute(
        "href",
        "/films/archive/month/2026-05",
      );
    });

    it("links the newest month to the bare hub", () => {
      render(<ArchiveIndexView {...baseProps} />);
      expect(within(nav()).getByRole("link", { name: "Later month: July 2026" })).toHaveAttribute(
        "href",
        "/films/archive",
      );
    });

    it("links a later month that is not the newest by its month path", () => {
      render(<ArchiveIndexView {...baseProps} archive={findArchiveMonth(months, "2026-05")} />);
      expect(within(nav()).getByRole("link", { name: "Later month: June 2026" })).toHaveAttribute(
        "href",
        "/films/archive/month/2026-06",
      );
    });

    it("has no later link on the newest month and no earlier link on the oldest", () => {
      render(<ArchiveIndexView {...baseProps} archive={findArchiveMonth(months, null)} />);
      expect(within(nav()).queryByRole("link", { name: /Later month/ })).toBeNull();
      expect(within(nav()).getByRole("link", { name: /Earlier month/ })).toBeInTheDocument();
    });
  });

  describe("as a calendar month", () => {
    const table = () => screen.getByRole("table", { name: "June 2026" });

    it("shows weekday column headers, Sunday first", () => {
      render(<ArchiveIndexView {...baseProps} />);
      const headers = within(table()).getAllByRole("columnheader").map((h) => h.textContent);
      expect(headers).toEqual(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    });

    it("lays out every day of the month, in order, after the first-week offset", () => {
      render(<ArchiveIndexView {...baseProps} />);
      // June 1 2026 is a Monday: 1 blank + 30 days, padded to full weeks.
      expect(within(table()).getAllByRole("row")).toHaveLength(6); // header + 5 weeks
      const cells = within(table()).getAllByRole("cell");
      expect(cells).toHaveLength(35);
      expect(cells[0]).toHaveTextContent("");
      expect(cells[1]).toHaveTextContent("1");
      expect(cells[30]).toHaveTextContent("30");
    });

    it("shows days without a puzzle as plain, unlinked numbers", () => {
      render(<ArchiveIndexView {...baseProps} />);
      const cells = within(table()).getAllByRole("cell");
      expect(within(cells[1]).queryByRole("link")).toBeNull();
      expect(within(cells[30]).getByRole("link")).toBeInTheDocument();
    });
  });

  describe("with this device's results", () => {
    const results = {
      "2026-06-30": { won: true, mistakes: 1 },
      "2026-06-29": { won: false, mistakes: 4 },
      "2026-05-31": { won: true, mistakes: 0 }, // other month: not counted
    };

    it("labels each tile solved, lost or to play in text, not color alone", () => {
      render(<ArchiveIndexView {...baseProps} results={results} />);
      const solved = screen.getByRole("link", { name: /June 30, 2026/ });
      const lost = screen.getByRole("link", { name: /June 29, 2026/ });
      const unplayed = screen.getByRole("link", { name: /June 28, 2026/ });
      expect(solved).toHaveTextContent("Solved");
      expect(solved).toHaveAccessibleName("Filmclues puzzle, Tuesday, June 30, 2026: solved, 1 mistake");
      expect(lost).toHaveTextContent("Lost");
      expect(lost).toHaveAccessibleName("Filmclues puzzle, Monday, June 29, 2026: lost");
      expect(unplayed).toHaveTextContent("Play");
    });

    it("sums up this month only, one stat per status in solved, lost, unplayed order", () => {
      render(<ArchiveIndexView {...baseProps} results={results} />);
      const summary = screen.getByRole("list", { name: "Your progress this month" });
      const stats = within(summary).getAllByRole("listitem").map((li) => li.textContent);
      expect(stats).toEqual(["1 Solved", "1 Lost", "1 Unplayed"]);
    });
  });

  it("hides the summary when nothing this month has been played", () => {
    render(<ArchiveIndexView {...baseProps} />);
    expect(screen.queryByRole("list", { name: "Your progress this month" })).toBeNull();
  });
});
