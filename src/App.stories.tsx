import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Box, ThemeProvider } from "@mond-design-system/theme";
import { ToastProvider } from "./providers/ToastProvider";
import { ThemeContextProvider } from "./providers/ThemeContext";
import { useThemeContext } from "./providers/useThemeContext";
import { StorageProvider } from "./providers/StorageProvider";
import { StatsProvider } from "./providers/StatsProvider";
import { SiteProvider } from "./providers/SiteProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import { Footer } from "./components/Footer";
import { GameBoard } from "./components/game/GameBoard";
import { useGameStore } from "./store/gameStore";
import { puzzleKeys } from "./lib/supabase/storage";
import type { Item, Group, SavedPuzzle } from "./types";

const mockItems: Item[] = [
  { id: 1, title: "Pulp Fiction", year: 1994 },
  { id: 2, title: "Kill Bill", year: 2003 },
  { id: 3, title: "Reservoir Dogs", year: 1992 },
  { id: 4, title: "Django Unchained", year: 2012 },
  { id: 5, title: "The Godfather", year: 1972 },
  { id: 6, title: "Goodfellas", year: 1990 },
  { id: 7, title: "Casino", year: 1995 },
  { id: 8, title: "Scarface", year: 1983 },
  { id: 9, title: "Inception", year: 2010 },
  { id: 10, title: "The Matrix", year: 1999 },
  { id: 11, title: "Tenet", year: 2020 },
  { id: 12, title: "Memento", year: 2000 },
  { id: 13, title: "Interstellar", year: 2014 },
  { id: 14, title: "Arrival", year: 2016 },
  { id: 15, title: "2001: A Space Odyssey", year: 1968 },
  { id: 16, title: "Contact", year: 1997 },
];

const mockGroups: Group[] = [
  { id: "1", items: mockItems.slice(0, 4), connection: "Directed by Quentin Tarantino", difficulty: "easy", color: "yellow" },
  { id: "2", items: mockItems.slice(4, 8), connection: "Classic mob films", difficulty: "medium", color: "green" },
  { id: "3", items: mockItems.slice(8, 12), connection: "Mind-bending narratives", difficulty: "hard", color: "blue" },
  { id: "4", items: mockItems.slice(12, 16), connection: "Films about space/time", difficulty: "hardest", color: "purple" },
];

const mockPuzzle: SavedPuzzle = {
  id: "mock-puzzle-1",
  items: mockItems,
  groups: mockGroups,
  createdAt: Date.now(),
};

// Initialize game store with mock data
function StoreInitializer() {
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    useGameStore.getState().initializeGame(mockItems, mockGroups, today);
  }, []);
  return null;
}

// Create query client with pre-seeded puzzle data
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

function ThemedApp() {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider colorScheme={theme}>
      <ToastProvider>
        <BrowserRouter>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
            <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem", zIndex: 10 }}>
              <ThemeToggle />
            </div>
            <Box display="flex" flexDirection="column" alignItems="center" padding="4" justifyContent="center" flex="1">
              <StoreInitializer />
              <GameBoard />
            </Box>
            <Footer />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
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
              <ThemedApp />
            </ThemeContextProvider>
          </StatsProvider>
        </StorageProvider>
      </QueryClientProvider>
    </SiteProvider>
  );
}

const meta: Meta = {
  title: "App/FullLayout",
  component: MockApp,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
