import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Footer } from "./Footer";
import { getAppStore, resetAppStore } from "../../store/appStore";

describe("Footer", () => {
  beforeEach(() => resetAppStore());

  it("links Archive to the active genre's archive hub (default films)", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Archive" })).toHaveAttribute(
      "href",
      "/films/archive",
    );
  });

  it("reflects the active genre in the Archive link", () => {
    render(<Footer />);
    act(() => {
      getAppStore().getState().setActiveGenre("books");
    });
    expect(screen.getByRole("link", { name: "Archive" })).toHaveAttribute(
      "href",
      "/books/archive",
    );
  });
});
