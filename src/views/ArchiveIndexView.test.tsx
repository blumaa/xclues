import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ArchiveIndexView } from "./ArchiveIndexView";

describe("ArchiveIndexView", () => {
  const baseProps = {
    genre: "films" as const,
    siteName: "Filmclues",
    dates: ["2026-06-30", "2026-06-29", "2026-06-28"],
    page: 1,
    totalPages: 1,
  };

  it("links each date to its archive-date page with descriptive anchor text", () => {
    render(<ArchiveIndexView {...baseProps} />);
    const links = screen.getAllByRole("link", { name: /Filmclues puzzle —/ });
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/films/archive/2026-06-30");
  });

  it("shows an empty state and no date links when there are no dates", () => {
    render(<ArchiveIndexView {...baseProps} dates={[]} totalPages={0} />);
    expect(screen.getByText("No puzzles published yet.")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Filmclues puzzle —/ })).toBeNull();
  });

  it("hides the pager on a single page", () => {
    render(<ArchiveIndexView {...baseProps} />);
    expect(screen.queryByRole("navigation", { name: "Archive pages" })).toBeNull();
  });

  it("links older/newer pages with correct paths on a middle page", () => {
    render(<ArchiveIndexView {...baseProps} page={4} totalPages={8} />);
    const pager = screen.getByRole("navigation", { name: "Archive pages" });
    expect(within(pager).getByRole("link", { name: "← Newer" })).toHaveAttribute(
      "href",
      "/films/archive/page/3",
    );
    expect(within(pager).getByRole("link", { name: "Older →" })).toHaveAttribute(
      "href",
      "/films/archive/page/5",
    );
  });

  it("uses the bare archive path when paging back to page 1", () => {
    render(<ArchiveIndexView {...baseProps} page={2} totalPages={8} />);
    const pager = screen.getByRole("navigation", { name: "Archive pages" });
    expect(within(pager).getByRole("link", { name: "← Newer" })).toHaveAttribute(
      "href",
      "/films/archive",
    );
  });

  it("disables the newer control on the first page", () => {
    render(<ArchiveIndexView {...baseProps} page={1} totalPages={8} />);
    const pager = screen.getByRole("navigation", { name: "Archive pages" });
    expect(within(pager).queryByRole("link", { name: "← Newer" })).toBeNull();
    expect(within(pager).getByText("← Newer")).toHaveAttribute("aria-disabled", "true");
  });
});
