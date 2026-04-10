import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { GamePage } from '../game-page';
import { resetAppStore, getAppStore } from '../../src/store/appStore';
import { resetStatsStore, getStatsStore } from '../../src/store/statsStore';
import { resetAllStores } from '../../src/store/gameStore';

const mockInitializeGame = vi.fn();
const mockRestoreCompletedGame = vi.fn();

let storeState: Record<string, unknown> = {};

vi.mock('../../src/store/gameStore', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/store/gameStore')>();
  return {
    ...actual,
    useGameStore: (_genre: string, selector: (s: Record<string, unknown>) => unknown) => {
      return selector(storeState);
    },
  };
});

vi.mock('../../src/components/organisms/GameBoard', () => ({
  GameBoard: ({ isLoading, hasNoPuzzle }: { isLoading?: boolean; hasNoPuzzle?: boolean; [key: string]: unknown }) => {
    if (isLoading) return <div role="status" aria-label="Loading puzzle">Loading</div>;
    if (hasNoPuzzle) return <div>No puzzle available for today</div>;
    return <div data-testid="game-board">Game Board</div>;
  },
}));

vi.mock('../../src/providers/useToast', () => ({
  useToast: () => ({ showInfo: vi.fn() }),
}));

const mockPuzzleData: import('../../src/types').SavedPuzzle = {
  id: 'test-puzzle',
  items: [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
    { id: 4, title: 'Item 4' },
  ],
  groups: [
    {
      id: 'g1',
      items: [
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
        { id: 3, title: 'Item 3' },
        { id: 4, title: 'Item 4' },
      ],
      connection: 'Test connection',
      difficulty: 'easy' as const,
      color: 'yellow' as const,
    },
  ],
  createdAt: Date.now(),
};

function renderGamePage(genre: import('../../src/config/seoConfig').Genre = 'films', puzzleDate = '2026-04-08') {
  return render(
    <GamePage
      initialGenre={genre}
      puzzleDate={puzzleDate}
      puzzles={{ films: mockPuzzleData, books: mockPuzzleData, music: mockPuzzleData }}
    />
  );
}

describe('GamePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    resetAppStore();
    resetStatsStore();
    resetAllStores();
    storeState = {
      gameStatus: 'playing',
      groups: mockPuzzleData.groups,
      mistakes: 0,
      previousGuesses: [],
      selectedItemIds: [],
      notification: null,
      initializeGame: mockInitializeGame,
      restoreCompletedGame: mockRestoreCompletedGame,
      submitGuess: vi.fn(),
      shuffleItems: vi.fn(),
      deselectAll: vi.fn(),
    };
  });

  it('renders all 3 genre boards in carousel', async () => {
    renderGamePage();

    await waitFor(() => {
      // Carousel renders all 3 boards
      expect(screen.getAllByTestId('game-board')).toHaveLength(3);
    });
  });

  it('shows no puzzle message when all puzzles are null', async () => {
    render(
      <GamePage
        initialGenre="films"
        puzzleDate="2026-04-08"
        puzzles={{ films: null, books: null, music: null }}
      />
    );

    await waitFor(() => {
      // All 3 panels show "no puzzle"
      expect(screen.getAllByText('No puzzle available for today')).toHaveLength(3);
    });
  });

  it('initializes appStore with the initial genre and puzzle date', async () => {
    renderGamePage('books', '2026-04-10');

    await waitFor(() => {
      expect(getAppStore().getState().activeGenre).toBe('books');
      expect(getAppStore().getState().puzzleDate).toBe('2026-04-10');
    });
  });

  it('hydrates stats from localStorage on mount', async () => {
    const result = {
      date: '2026-04-08',
      genre: 'films',
      won: true,
      mistakes: 1,
      completedAt: Date.now(),
    };
    localStorage.setItem('xclues-stats', JSON.stringify({ gameHistory: [result] }));

    renderGamePage();

    await waitFor(() => {
      const completed = getStatsStore().getState().getCompletedGame('films', '2026-04-08');
      expect(completed).toBeDefined();
      expect(completed!.won).toBe(true);
    });
  });
});
