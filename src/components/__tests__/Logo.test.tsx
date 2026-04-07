import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";

import { Logo } from "../organisms/Logo";

describe("Logo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Requirement 1: shows "xClues" with correct casing
  it("renders xClues with lowercase x, uppercase C, lowercase lues", () => {
    const { container } = render(<Logo genre="films" static />);
    const text = container.querySelector(".logo")?.textContent;
    expect(text).toBe("xClues");
  });

  // Requirement 2: starts on x, cycles through icons, settles on genre
  it("starts showing x", () => {
    const { container } = render(<Logo genre="films" />);
    expect(container.querySelector('[data-slot="x"]')).toBeTruthy();
  });

  it("settles on films icon after animation", () => {
    const { container } = render(<Logo genre="films" />);
    act(() => { vi.advanceTimersByTime(3000); });
    expect(container.querySelector('[data-slot="films"]')).toBeTruthy();
  });

  it("settles on books icon after animation", () => {
    const { container } = render(<Logo genre="books" />);
    act(() => { vi.advanceTimersByTime(3000); });
    expect(container.querySelector('[data-slot="books"]')).toBeTruthy();
  });

  it("settles on music icon after animation", () => {
    const { container } = render(<Logo genre="music" />);
    act(() => { vi.advanceTimersByTime(3000); });
    expect(container.querySelector('[data-slot="music"]')).toBeTruthy();
  });

  it("cycles through x → films → books → music → target", () => {
    const { container } = render(<Logo genre="films" />);

    expect(container.querySelector('[data-slot="x"]')).toBeTruthy();

    act(() => { vi.advanceTimersByTime(500); });
    expect(container.querySelector('[data-slot="films"]')).toBeTruthy();

    act(() => { vi.advanceTimersByTime(500); });
    expect(container.querySelector('[data-slot="books"]')).toBeTruthy();

    act(() => { vi.advanceTimersByTime(500); });
    expect(container.querySelector('[data-slot="music"]')).toBeTruthy();

    act(() => { vi.advanceTimersByTime(500); });
    expect(container.querySelector('[data-slot="films"]')).toBeTruthy();
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

    act(() => { vi.advanceTimersByTime(3000); });
    expect(container.textContent).toContain("Clues");
  });
});
