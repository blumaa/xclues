import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PuzzleReveal } from "../PuzzleReveal";
import { mockPuzzle, mockGroups } from "../../../__mocks__/puzzleData";

describe("PuzzleReveal", () => {
  it("renders all 4 GroupCards", () => {
    render(<PuzzleReveal puzzle={mockPuzzle} genre="films" date="2026-04-14" />);

    for (const group of mockGroups) {
      expect(screen.getByText(group.connection)).toBeInTheDocument();
    }
  });

  it("renders formatted date in heading", () => {
    render(<PuzzleReveal puzzle={mockPuzzle} genre="films" date="2026-04-14" />);

    expect(screen.getByText(/April 14, 2026/)).toBeInTheDocument();
  });

  it("renders genre site name in heading", () => {
    render(<PuzzleReveal puzzle={mockPuzzle} genre="films" date="2026-04-14" />);

    expect(screen.getByText(/Filmclues/)).toBeInTheDocument();
  });

  it("renders link back to today's puzzle", () => {
    render(<PuzzleReveal puzzle={mockPuzzle} genre="films" date="2026-04-14" />);

    const link = screen.getByRole("link", { name: /today/i });
    expect(link).toHaveAttribute("href", "/films");
  });

  it("renders items within each group", () => {
    render(<PuzzleReveal puzzle={mockPuzzle} genre="films" date="2026-04-14" />);

    expect(screen.getByText(/Pulp Fiction/)).toBeInTheDocument();
    expect(screen.getByText(/The Godfather/)).toBeInTheDocument();
  });

  it("renders group cards inside the shared game grid (same sizing as the game board)", () => {
    const { container } = render(
      <PuzzleReveal puzzle={mockPuzzle} genre="films" date="2026-04-14" />
    );

    const grid = container.querySelector(".game-grid");
    expect(grid).toBeTruthy();
    expect(grid?.querySelectorAll(".group-card")).toHaveLength(4);
    expect(container.querySelector(".puzzle-reveal__grid")).toBeNull();
  });

  it("keeps the h1 for SEO but styles it at a modest size", () => {
    const { container } = render(
      <PuzzleReveal puzzle={mockPuzzle} genre="films" date="2026-04-14" />
    );

    const h1 = container.querySelector("h1");
    expect(h1).toBeTruthy();
    expect(h1?.className).toContain("xheading--md");
  });

  it("renders groups in difficulty order", () => {
    render(<PuzzleReveal puzzle={mockPuzzle} genre="films" date="2026-04-14" />);

    const groupCards = screen.getAllByRole("status");
    expect(groupCards).toHaveLength(4);
    expect(groupCards[0]).toHaveTextContent("Directed by Quentin Tarantino");
    expect(groupCards[1]).toHaveTextContent("Classic mob films");
    expect(groupCards[2]).toHaveTextContent("Mind-bending narratives");
    expect(groupCards[3]).toHaveTextContent("Films about space/time");
  });
});
