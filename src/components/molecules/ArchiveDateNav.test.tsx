import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArchiveDateNav } from "./ArchiveDateNav";

describe("ArchiveDateNav", () => {
  it("links to the adjacent published dates with rel hints", () => {
    render(<ArchiveDateNav genre="films" older="2026-06-28" newer="2026-06-30" />);

    const prev = screen.getByRole("link", { name: /← .*2026/ });
    const next = screen.getByRole("link", { name: /2026.* →/ });

    expect(prev).toHaveAttribute("href", "/films/archive/2026-06-28");
    expect(prev).toHaveAttribute("rel", "prev");
    expect(next).toHaveAttribute("href", "/films/archive/2026-06-30");
    expect(next).toHaveAttribute("rel", "next");
  });

  it("renders an inert label instead of a link at the newest end", () => {
    render(<ArchiveDateNav genre="films" older="2026-06-29" newer={null} />);

    expect(screen.getByRole("link", { name: /← .*2026/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /→/ })).toBeNull();
    expect(screen.getByText("Next puzzle →")).toHaveAttribute("aria-disabled", "true");
  });

  it("renders an inert label instead of a link at the earliest end", () => {
    render(<ArchiveDateNav genre="films" older={null} newer="2026-06-29" />);

    expect(screen.getByText("← Previous puzzle")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("link", { name: /→/ })).toBeInTheDocument();
  });
});
