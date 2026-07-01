import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";

vi.mock("../organisms/Logo", () => ({
  Logo: (props: Record<string, unknown>) => (
    <span data-testid="logo" data-genre={props.genre as string} />
  ),
}));

import { AppSplash } from "../AppSplash";

type WindowWithCapacitor = Window & {
  Capacitor?: { isNativePlatform?: () => boolean };
};

describe("AppSplash", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Force the native condition so the splash renders.
    (window as WindowWithCapacitor).Capacitor = {
      isNativePlatform: () => true,
    };
  });

  afterEach(() => {
    vi.useRealTimers();
    delete (window as WindowWithCapacitor).Capacitor;
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

  it("does not render on regular web (non-native, non-standalone)", () => {
    delete (window as WindowWithCapacitor).Capacitor;
    const { container } = render(<AppSplash />);
    expect(container.querySelector(".app-splash")).toBeNull();
  });
});
