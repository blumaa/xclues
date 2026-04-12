import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";

vi.mock("@capacitor/core", () => ({
  Capacitor: { isNativePlatform: () => true },
}));

vi.mock("../organisms/Logo", () => ({
  Logo: (props: Record<string, unknown>) => (
    <span data-testid="logo" data-genre={props.genre} />
  ),
}));

import { AppSplash } from "../AppSplash";

describe("AppSplash", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the Logo component", () => {
    render(<AppSplash />);
    expect(screen.getByTestId("logo")).toBeTruthy();
  });

  it("renders a fullscreen overlay with the splash class", () => {
    const { container } = render(<AppSplash />);
    const overlay = container.querySelector(".app-splash");
    expect(overlay).toBeTruthy();
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

    // Trigger fade-out
    act(() => {
      vi.advanceTimersByTime(2200);
    });

    // Fade-out transition duration
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

  it("does not render on regular web (non-native, non-standalone)", async () => {
    vi.resetModules();
    vi.doMock("@capacitor/core", () => ({
      Capacitor: { isNativePlatform: () => false },
    }));
    vi.doMock("../organisms/Logo", () => ({
      Logo: (props: Record<string, unknown>) => (
        <span data-testid="logo" data-genre={props.genre} />
      ),
    }));
    const { AppSplash: WebAppSplash } = await import("../AppSplash");
    const { container } = render(<WebAppSplash />);
    expect(container.querySelector(".app-splash")).toBeNull();
  });
});
