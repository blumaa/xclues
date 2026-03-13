import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { GenreSwitch } from "./GenreSwitch";

vi.mock("../providers/useSite", () => ({
  useSite: vi.fn(),
}));

import { useSite } from "../providers/useSite";

const mockUseSite = vi.mocked(useSite);
const mockSetGenre = vi.fn();

function mockSite(genre: "films" | "books" | "music") {
  mockUseSite.mockReturnValue({
    genre,
    siteName: "Test",
    siteDescription: "",
    itemName: "",
    itemNamePlural: "",
    domain: "test.space",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    analyticsPrefix: "",
    storagePrefix: "",
    setGenre: mockSetGenre,
  });
}

describe("GenreSwitch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockSetGenre.mockClear();
    mockSite("films");
  });

  it("renders 3 buttons with correct labels", () => {
    render(<GenreSwitch />);

    expect(screen.getByRole("button", { name: "Films" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Lit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Music" })).toBeInTheDocument();
  });

  it("highlights the active genre", () => {
    mockSite("books");
    render(<GenreSwitch />);

    const litButton = screen.getByRole("button", { name: "Lit" });
    expect(litButton).toHaveClass("genre-switch__button--active");

    const filmsButton = screen.getByRole("button", { name: "Films" });
    expect(filmsButton).not.toHaveClass("genre-switch__button--active");
  });

  it("in dev mode, calls setGenre and persists to localStorage", async () => {
    const user = userEvent.setup();
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    // jsdom hostname is "localhost" by default, so dev mode is active
    render(<GenreSwitch />);

    await user.click(screen.getByRole("button", { name: "Music" }));

    expect(setItemSpy).toHaveBeenCalledWith("xclues-dev-genre", "music");
    expect(mockSetGenre).toHaveBeenCalledWith("music");
  });

  it("in production, navigates to the correct domain", async () => {
    const user = userEvent.setup();
    const assignSpy = vi.fn();
    Object.defineProperty(window, "location", {
      value: { ...window.location, hostname: "filmclues.space", assign: assignSpy },
      writable: true,
      configurable: true,
    });

    render(<GenreSwitch />);

    await user.click(screen.getByRole("button", { name: "Music" }));

    expect(assignSpy).toHaveBeenCalledWith("https://musiclues.space");
  });

  it("does nothing when clicking the already active genre", async () => {
    const user = userEvent.setup();

    render(<GenreSwitch />);

    await user.click(screen.getByRole("button", { name: "Films" }));

    expect(mockSetGenre).not.toHaveBeenCalled();
  });

  describe("hover prefetch (production)", () => {
    beforeEach(() => {
      Object.defineProperty(window, "location", {
        value: {
          ...window.location,
          hostname: "filmclues.space",
          assign: vi.fn(),
        },
        writable: true,
        configurable: true,
      });
      // Clean up any prefetch links/scripts from previous tests
      document.head
        .querySelectorAll('link[rel="prefetch"], script[type="speculationrules"]')
        .forEach((el) => el.remove());
    });

    it("injects a prefetch link on hover over a sibling genre", async () => {
      const user = userEvent.setup();
      render(<GenreSwitch />);

      await user.hover(screen.getByRole("button", { name: "Music" }));

      const prefetchLink = document.head.querySelector(
        'link[rel="prefetch"][href="https://musiclues.space/"]'
      );
      expect(prefetchLink).toBeTruthy();
      expect(prefetchLink?.getAttribute("as")).toBe("document");
    });

    it("does not inject duplicate prefetch links on repeated hovers", async () => {
      const user = userEvent.setup();
      render(<GenreSwitch />);

      const musicBtn = screen.getByRole("button", { name: "Music" });
      await user.hover(musicBtn);
      await user.unhover(musicBtn);
      await user.hover(musicBtn);

      const prefetchLinks = document.head.querySelectorAll(
        'link[rel="prefetch"][href="https://musiclues.space/"]'
      );
      expect(prefetchLinks).toHaveLength(1);
    });

    it("does not prefetch when hovering the active genre", async () => {
      const user = userEvent.setup();
      render(<GenreSwitch />);

      await user.hover(screen.getByRole("button", { name: "Films" }));

      const prefetchLinks = document.head.querySelectorAll(
        'link[rel="prefetch"]'
      );
      expect(prefetchLinks).toHaveLength(0);
    });

    it("does not prefetch in dev mode", async () => {
      Object.defineProperty(window, "location", {
        value: { ...window.location, hostname: "localhost" },
        writable: true,
        configurable: true,
      });

      const user = userEvent.setup();
      render(<GenreSwitch />);

      await user.hover(screen.getByRole("button", { name: "Music" }));

      const prefetchLinks = document.head.querySelectorAll(
        'link[rel="prefetch"]'
      );
      expect(prefetchLinks).toHaveLength(0);
    });
  });
});
