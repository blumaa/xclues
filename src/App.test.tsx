import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

// Mock Capacitor modules before importing App
vi.mock("@capacitor/core", () => ({
  Capacitor: {
    isNativePlatform: vi.fn(),
  },
}));

vi.mock("@capacitor/splash-screen", () => ({
  SplashScreen: {
    hide: vi.fn(),
  },
}));

vi.mock("@capacitor/status-bar", () => ({
  StatusBar: {
    setStyle: vi.fn(),
    hide: vi.fn(),
  },
  Style: { Dark: "DARK" },
}));

vi.mock("@capacitor/screen-orientation", () => ({
  ScreenOrientation: {
    lock: vi.fn(),
  },
}));

// Mock providers to isolate App setup logic
vi.mock("./providers/SiteProvider", () => ({
  SiteProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("./providers/StorageProvider", () => ({
  StorageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("./providers/StatsProvider", () => ({
  StatsProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("./providers/AuthProvider", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("./pages/ResetPasswordPage", () => ({
  ResetPasswordPage: () => <div>ResetPasswordPage</div>,
}));

vi.mock("./providers/ThemeContext", () => ({
  ThemeContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock("./providers/useThemeContext", () => ({
  useThemeContext: () => ({ theme: "light" }),
}));

vi.mock("./providers/useSite", () => ({
  useSite: () => ({ genre: "films" }),
}));

vi.mock("@tanstack/react-query", () => ({
  QueryClient: class MockQueryClient {},
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock pages to avoid deep rendering
vi.mock("./pages/HomePage", () => ({
  HomePage: () => <div>HomePage</div>,
}));

vi.mock("./pages/PrivacyPage", () => ({
  PrivacyPage: () => <div>PrivacyPage</div>,
}));

vi.mock("./pages/AboutPage", () => ({
  AboutPage: () => <div>AboutPage</div>,
}));

vi.mock("./pages/NotFoundPage", () => ({
  NotFoundPage: () => <div>NotFoundPage</div>,
}));

import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar } from "@capacitor/status-bar";
import { ScreenOrientation } from "@capacitor/screen-orientation";
import App from "./App";

const mockCapacitor = vi.mocked(Capacitor);
const mockSplashScreen = vi.mocked(SplashScreen);
const mockStatusBar = vi.mocked(StatusBar);
const mockScreenOrientation = vi.mocked(ScreenOrientation);

describe("App native setup", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders on web without waiting for native setup", () => {
    mockCapacitor.isNativePlatform.mockReturnValue(false);

    render(<App />);

    expect(screen.getByRole("img", { name: "xClues" })).toBeInTheDocument();
  });

  it("renders after successful native setup", async () => {
    mockCapacitor.isNativePlatform.mockReturnValue(true);
    mockScreenOrientation.lock.mockResolvedValue();
    mockStatusBar.setStyle.mockResolvedValue();
    mockStatusBar.hide.mockResolvedValue();
    mockSplashScreen.hide.mockResolvedValue();

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("img", { name: "xClues" })).toBeInTheDocument();
    });
  });

  it("renders even when ScreenOrientation.lock throws", async () => {
    mockCapacitor.isNativePlatform.mockReturnValue(true);
    mockScreenOrientation.lock.mockRejectedValue(
      new Error("Not supported on iPad")
    );
    mockStatusBar.setStyle.mockResolvedValue();
    mockStatusBar.hide.mockResolvedValue();
    mockSplashScreen.hide.mockResolvedValue();

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("img", { name: "xClues" })).toBeInTheDocument();
    });
  });

  it("renders even when StatusBar APIs throw", async () => {
    mockCapacitor.isNativePlatform.mockReturnValue(true);
    mockScreenOrientation.lock.mockResolvedValue();
    mockStatusBar.setStyle.mockRejectedValue(new Error("StatusBar error"));
    mockStatusBar.hide.mockRejectedValue(new Error("StatusBar error"));
    mockSplashScreen.hide.mockResolvedValue();

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("img", { name: "xClues" })).toBeInTheDocument();
    });
  });

  it("renders even when SplashScreen.hide throws", async () => {
    mockCapacitor.isNativePlatform.mockReturnValue(true);
    mockScreenOrientation.lock.mockResolvedValue();
    mockStatusBar.setStyle.mockResolvedValue();
    mockStatusBar.hide.mockResolvedValue();
    mockSplashScreen.hide.mockRejectedValue(
      new Error("Already dismissed")
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("img", { name: "xClues" })).toBeInTheDocument();
    });
  });

  it("renders even when ALL native plugins throw", async () => {
    mockCapacitor.isNativePlatform.mockReturnValue(true);
    mockScreenOrientation.lock.mockRejectedValue(new Error("fail"));
    mockStatusBar.setStyle.mockRejectedValue(new Error("fail"));
    mockStatusBar.hide.mockRejectedValue(new Error("fail"));
    mockSplashScreen.hide.mockRejectedValue(new Error("fail"));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("img", { name: "xClues" })).toBeInTheDocument();
    });
  });
});
