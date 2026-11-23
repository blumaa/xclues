import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";

vi.mock("../organisms/Logo", () => ({
  Logo: (props: Record<string, unknown>) => (
    <span data-testid="logo" data-genre={props.genre as string} />
  ),
}));

import { AppSplash } from "../AppSplash";

/** Pretend the site runs as an installed PWA (or a normal tab). */
function setStandalone(standalone: boolean) {
  vi.mocked(window.matchMedia).mockImplementation(
    (query: string) =>
      ({ matches: standalone && query === "(display-mode: standalone)", media: query }) as ReturnType<typeof window.matchMedia>,
  );
}

describe("AppSplash", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setStandalone(true);
  });

  afterEach(() => {
    vi.useRealTimers();
    setStandalone(false);
  });

  it("renders the Logo component", () => {
    render(<AppSplash />);
    expect(screen.getByTestId("logo")).toBeTruthy();
  });

  it("renders a fullscreen overlay with the splash class", () => {
    const { container } = render(<AppSplash />);
    expect(container.querySelector(".app-splash")).toBeTruthy();
  });

  it("adds the fade-out class after the animation duration", () => {
    const { container } = render(<AppSplash />);
    const overlay = container.querySelector(".app-splash");
    expect(overlay?.classList.contains("app-splash--fade-out")).toBe(false);

    act(() => {
      vi.advanceTimersByTime(2200);
    });

    expect(overlay?.classList.contains("app-splash--fade-out")).toBe(true);
  });

  it("removes itself from the DOM after fade-out completes", () => {
    const { container } = render(<AppSplash />);
    expect(container.querySelector(".app-splash")).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(2200);
    });
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(container.querySelector(".app-splash")).toBeNull();
  });

  it("has aria-hidden true since it is decorative", () => {
    const { container } = render(<AppSplash />);
    const overlay = container.querySelector(".app-splash");
    expect(overlay?.getAttribute("aria-hidden")).toBe("true");
  });

  it("does not render in a regular browser tab", () => {
    setStandalone(false);
    const { container } = render(<AppSplash />);
    expect(container.querySelector(".app-splash")).toBeNull();
  });
});
