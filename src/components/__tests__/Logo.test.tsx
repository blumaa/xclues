import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import gsap from "gsap";

import { Logo } from "../organisms/Logo";

let gsapTime: number;
function advanceGSAP(ms: number) {
  vi.advanceTimersByTime(ms);
  gsapTime += ms / 1000;
  gsap.globalTimeline.time(gsapTime);
}

async function flushGsapImport() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
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

  it("renders xClues with lowercase x, uppercase C, lowercase lues", () => {
    const { container } = render(<Logo genre="films" static />);
    const logo = container.querySelector(".logo");
    expect(logo?.getAttribute("aria-label")).toBe("xClues");
    expect(logo?.textContent).toContain("Clues");
  });

  it("starts showing x", () => {
    const { container } = render(<Logo genre="films" />);
    expect(container.querySelector('[data-slot="x"]')).toBeTruthy();
  });

  it("settles on films icon after animation", async () => {
    const { container } = render(<Logo genre="films" />);
    await flushGsapImport();
    act(() => { advanceGSAP(3000); });
    expect(container.querySelector('[data-slot="films"]')).toBeTruthy();
  });

  it("settles on books icon after animation", async () => {
    const { container } = render(<Logo genre="books" />);
    await flushGsapImport();
    act(() => { advanceGSAP(3000); });
    expect(container.querySelector('[data-slot="books"]')).toBeTruthy();
  });

  it("settles on music icon after animation", async () => {
    const { container } = render(<Logo genre="music" />);
    await flushGsapImport();
    act(() => { advanceGSAP(3000); });
    expect(container.querySelector('[data-slot="music"]')).toBeTruthy();
  });

  it("slot always contains the x character for consistent width", () => {
    const { container } = render(<Logo genre="films" />);
    const slot = container.querySelector(".logo-slot") as HTMLElement;
    expect(slot).toBeTruthy();
    expect(slot.querySelector(".logo-x")).toBeTruthy();
    expect(slot.querySelector(".logo-x")?.textContent).toBe("x");
  });

  it("shows target immediately when static prop is true", () => {
    const { container } = render(<Logo genre="music" static />);
    expect(container.querySelector('[data-slot="music"]')).toBeTruthy();
  });

  it("has role img and aria-label", () => {
    const { container } = render(<Logo genre="films" static />);
    const logo = container.querySelector(".logo");
    expect(logo?.getAttribute("role")).toBe("img");
    expect(logo?.getAttribute("aria-label")).toBe("xClues");
  });

  it("only ever translates the reel to whole-item positions (no partial frame shows a sliver of the neighbouring slot)", async () => {
    // jsdom has no layout, so force a measurable item height for the reel.
    const ITEM_H = 24;
    const rect = {
      height: ITEM_H, width: 0, top: 0, left: 0, right: 0, bottom: ITEM_H,
      x: 0, y: 0, toJSON: () => ({}),
    };
    const rectSpy = vi
      .spyOn(window.Element.prototype, "getBoundingClientRect")
      .mockReturnValue(rect);
    const setSpy = vi.spyOn(gsap, "set");

    try {
      render(<Logo genre="books" />);
      await flushGsapImport();
      // Step through the spin so intermediate onUpdate frames actually fire
      // (a single large jump would skip them and hide a continuous scroll).
      act(() => { for (let i = 0; i < 60; i++) advanceGSAP(33); });

      const ys = setSpy.mock.calls
        .map(([, vars]) => (vars as { y?: number })?.y)
        .filter((y): y is number => typeof y === "number");

      expect(ys.length).toBeGreaterThan(0);
      // Every reel position must be an exact multiple of the item height —
      // a fractional multiple parks the reel between two items, exposing the
      // "strange part of the x" the target should have replaced.
      for (const y of ys) {
        expect(Number.isInteger(y / ITEM_H)).toBe(true);
      }
    } finally {
      setSpy.mockRestore();
      rectSpy.mockRestore();
    }
  });

  it("always shows Clues text", async () => {
    const { container } = render(<Logo genre="films" />);
    expect(container.textContent).toContain("Clues");

    await flushGsapImport();
    act(() => { advanceGSAP(3000); });
    expect(container.textContent).toContain("Clues");
  });
});
