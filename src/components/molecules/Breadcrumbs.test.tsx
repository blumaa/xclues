import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  const items = [
    { label: "Filmclues", href: "/" },
    { label: "Archive", href: "/films/archive" },
    { label: "June 30, 2026" },
  ];

  it("links every crumb except the last", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole("link", { name: "Filmclues" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Archive" })).toHaveAttribute(
      "href",
      "/films/archive",
    );
    expect(screen.queryByRole("link", { name: "June 30, 2026" })).toBeNull();
  });

  it("marks the final crumb as the current page", () => {
    render(<Breadcrumbs items={items} />);
    const current = screen.getByText("June 30, 2026");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("exposes an accessible breadcrumb landmark", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });
});
