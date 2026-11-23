import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("../../../providers/useSite", () => ({
  useSite: () => ({ genre: "books" }),
}));

import { AboutLinks } from "../AboutLinks";

describe("AboutLinks", () => {
  it.each([
    ["filmclues.space", "https://filmclues.space"],
    ["litclues.space", "https://litclues.space"],
    ["musiclues.space", "https://musiclues.space"],
  ])("links %s to its live site in a new tab", (label, href) => {
    render(<AboutLinks />);
    const link = screen.getByRole("link", { name: label });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
