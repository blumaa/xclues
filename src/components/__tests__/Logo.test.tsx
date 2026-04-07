import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import gsap from "gsap";

import { Logo } from "../organisms/Logo";

/** Advance both fake timers (for useEffect) and GSAP's global timeline. */
let gsapTime: number;
function advanceGSAP(ms: number) {
  vi.advanceTimersByTime(ms);
  gsapTime += ms / 1000;
  gsap.globalTimeline.time(gsapTime);
}

describe("Logo", () => {
  beforeEach(() => {
    gsapTime = 0;
    vi.useFakeTimers();
    gsap.ticker.lagSmoothing(0);
    gsap.globalTimeline.time(0);
  });

  afterEach(() => {
    gsap.globalTimeline.clear();
    vi.useRealTimers();
  });

  // Requirement 1: shows "xClues" with correct casing
  it("renders xClues with lowercase x, uppercase C, lowercase lues", () => {
    const { container } = render(<Logo genre="films" static />);
    const logo = container.querySelector(".logo");
    // aria-label carries the display name; Clues text is always visible
    expect(logo?.getAttribute("aria-label")).toBe("xClues");
    expect(logo?.textContent).toContain("Clues");
  });

  // Requirement 2: starts on x, cycles through icons, settles on genre
  it("starts showing x", () => {
    const { container } = render(<Logo genre="films" />);
    expect(container.querySelector('[data-slot="x"]')).toBeTruthy();
  });

  it("settles on films icon after animation", () => {
    const { container } = render(<Logo genre="films" />);
    act(() => { advanceGSAP(3000); });
    expect(container.querySelector('[data-slot="films"]')).toBeTruthy();
  });

  it("settles on books icon after animation", () => {
    const { container } = render(<Logo genre="books" />);
    act(() => { advanceGSAP(3000); });
    expect(container.querySelector('[data-slot="books"]')).toBeTruthy();
  });

  it("settles on music icon after animation", () => {
    const { container } = render(<Logo genre="music" />);
    act(() => { advanceGSAP(3000); });
    expect(container.querySelector('[data-slot="music"]')).toBeTruthy();
  });

  it("cycles through icons like a slot machine before landing on target", () => {
    const { container } = render(<Logo genre="books" />);

    // Starts at x
    expect(container.querySelector('[data-slot="x"]')).toBeTruthy();

    // Collect all slots seen during animation by advancing in small increments
    const seen: string[] = ["x"];
    for (let ms = 0; ms < 3000; ms += 50) {
      act(() => { advanceGSAP(50); });
      const slot = container.querySelector("[data-slot]")?.getAttribute("data-slot");
      if (slot && slot !== seen[seen.length - 1]) {
        seen.push(slot);
      }
    }

    // Should have cycled through all icons multiple times (3 full cycles + partial)
    const filmsCount = seen.filter((s) => s === "films").length;
    const booksCount = seen.filter((s) => s === "books").length;
    const musicCount = seen.filter((s) => s === "music").length;
    expect(filmsCount).toBeGreaterThanOrEqual(3);
    expect(booksCount).toBeGreaterThanOrEqual(3);
    expect(musicCount).toBeGreaterThanOrEqual(3);

    // Must end on the target
    expect(seen[seen.length - 1]).toBe("books");
  });

  // Requirement 3: "Clues" must not shift — the x text is always in the slot
  it("slot always contains the x character for consistent width", () => {
    const { container } = render(<Logo genre="films" />);
    const slot = container.querySelector(".logo-slot") as HTMLElement;
    expect(slot).toBeTruthy();
    // The "x" text is always present in the slot (even when icon is showing)
    expect(slot.querySelector(".logo-x")).toBeTruthy();
    expect(slot.querySelector(".logo-x")?.textContent).toBe("x");
  });

  // Requirement 4: static prop skips animation
  it("shows target immediately when static prop is true", () => {
    const { container } = render(<Logo genre="music" static />);
    expect(container.querySelector('[data-slot="music"]')).toBeTruthy();
  });

  it("shows x immediately when static with no genre", () => {
    const { container } = render(<Logo static />);
    expect(container.querySelector('[data-slot="x"]')).toBeTruthy();
  });

  // Requirement 5: accessible
  it("has role img and aria-label", () => {
    const { container } = render(<Logo genre="films" static />);
    const logo = container.querySelector(".logo");
    expect(logo?.getAttribute("role")).toBe("img");
    expect(logo?.getAttribute("aria-label")).toBe("xClues");
  });

  // Requirement 6: "Clues" text is always present
  it("always shows Clues text", () => {
    const { container } = render(<Logo genre="films" />);
    expect(container.textContent).toContain("Clues");

    act(() => { advanceGSAP(3000); });
    expect(container.textContent).toContain("Clues");
  });
});
