import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArchiveGameView } from "./ArchiveGameView";
import { ToastProvider } from "../providers/ToastProvider";
import { mockPuzzle } from "../__mocks__/puzzleData";
import { resetAllStores } from "../store/gameStore";
import { resetStatsStore, STATS_STORAGE_KEY } from "../store/statsStore";
import "../App.css";

const DATE = "2026-10-01";

const meta: Meta<typeof ArchiveGameView> = {
  title: "Views/ArchiveGameView",
  component: ArchiveGameView,
  parameters: { layout: "fullscreen" },
  args: { genre: "films", puzzleDate: DATE, puzzle: mockPuzzle },
  // Stores are app singletons: start every story from a clean slate.
  beforeEach: () => {
    localStorage.removeItem(STATS_STORAGE_KEY);
    resetStatsStore();
    resetAllStores();
  },
  decorators: [(Story) => <ToastProvider>{Story()}</ToastProvider>],
};

export default meta;
type Story = StoryObj<typeof ArchiveGameView>;

/** Never played: board is live, answers hidden. */
export const Unplayed: Story = {};

/** Already finished on this device: opens straight to the result. */
export const AlreadyPlayed: Story = {
  beforeEach: () => {
    localStorage.setItem(
      STATS_STORAGE_KEY,
      JSON.stringify({
        gameHistory: [
          { date: DATE, genre: "films", won: true, mistakes: 1, completedAt: 1, archive: true },
        ],
      }),
    );
  },
};
