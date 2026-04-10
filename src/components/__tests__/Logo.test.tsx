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

  it("always shows Clues text", async () => {
    const { container } = render(<Logo genre="films" />);
    expect(container.textContent).toContain("Clues");

    await flushGsapImport();
    act(() => { advanceGSAP(3000); });
    expect(container.textContent).toContain("Clues");
  });
});
