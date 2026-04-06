import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Link } from "react-router-dom";
import { ToastProvider } from "./providers/ToastProvider";
import { ThemeContextProvider } from "./providers/ThemeContext";
import { StorageProvider } from "./providers/StorageProvider";
import { StatsProvider } from "./providers/StatsProvider";
import { SiteProvider } from "./providers/SiteProvider";
import { useSite } from "./providers/useSite";
import { ThemeToggle } from "./components/ThemeToggle";
import { HowToPlayButton } from "./components/HowToPlayModal";
import { GenreSwitch } from "./components/GenreSwitch";
import { Logo } from "./components/Logo";
import { Footer } from "./components/Footer";
import { GameBoard } from "./components/game/GameBoard";
import { useGameStore } from "./store/gameStore";
import { puzzleKeys } from "./lib/supabase/storage";
import { mockItems, mockGroups, mockPuzzle } from "./__mocks__/puzzleData";
import "./App.css";

function StoreInitializer({ genre }: { genre: string }) {
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    useGameStore.getState().resetGame();
    useGameStore.getState().initializeGame(mockItems, mockGroups, today, genre);
  }, [genre]);
  return null;
}

function createMockQueryClient() {
  const today = new Date().toISOString().split("T")[0];
  const client = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity, retry: false },
    },
  });
  client.setQueryData(puzzleKeys.daily(today, "films"), mockPuzzle);
  return client;
}

/** The complete app layout — header, game, footer */
function CompleteApp() {
  const { genre } = useSite();

  return (
    <ToastProvider>
      <BrowserRouter>
        <div className="app-layout">
          <a href="#main-content" className="sr-only">Skip to content</a>
          <header className="app-header">
            <Link to="/" className="app-header-brand" aria-label="xClues home">
              <span className="app-header-logo"><Logo genre={genre} /></span>
            </Link>
            <GenreSwitch />
            <div className="app-header-actions">
              <HowToPlayButton />
              <ThemeToggle />
            </div>
          </header>
          <main id="main-content" className="app-main">
            <StoreInitializer genre={genre} />
            <GameBoard key={genre} />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
}

function MockApp() {
  const queryClient = createMockQueryClient();
  return (
    <SiteProvider>
      <QueryClientProvider client={queryClient}>
        <StorageProvider>
          <StatsProvider>
            <ThemeContextProvider>
              <CompleteApp />
            </ThemeContextProvider>
          </StatsProvider>
        </StorageProvider>
      </QueryClientProvider>
    </SiteProvider>
  );
}

const meta: Meta = {
  title: "App/Complete",
  component: MockApp,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
