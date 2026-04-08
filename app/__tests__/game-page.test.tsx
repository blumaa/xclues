import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GamePage } from '../game-page';

// Mock the game store
vi.mock('../../src/store/gameStore', () => ({
  useGameStore: () => () => undefined,
}));

// Mock useStats
vi.mock('../../src/providers/useStats', () => ({
  useStats: () => ({
    getStats: () => Promise.resolve({ gameHistory: [] }),
    recordCompletion: () => Promise.resolve(),
  }),
}));

// Mock GameBoard and ResultsModal — we're testing query behavior, not UI
vi.mock('../../src/components/organisms/GameBoard', () => ({
  GameBoard: () => <div data-testid="game-board">Game Board</div>,
}));
vi.mock('../../src/components/organisms/ResultsModal', () => ({
  ResultsModal: () => null,
}));

const mockPuzzleData = {
  id: 'test-puzzle',
  items: [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
    { id: 4, title: 'Item 4' },
  ],
  groups: [
    {
      id: '1',
      items: [
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
        { id: 3, title: 'Item 3' },
        { id: 4, title: 'Item 4' },
      ],
      connection: 'Test connection',
      difficulty: 'easy',
      color: 'yellow',
    },
  ],
  createdAt: Date.now(),
};

// Mock useStorage to return a storage instance that resolves puzzle data
vi.mock('../../src/providers/useStorage', () => ({
  useStorage: () => ({
    getDailyPuzzle: () => Promise.resolve(mockPuzzleData),
  }),
}));

describe('GamePage puzzle fetching', () => {
  it('fetches puzzle data from Supabase when no hydrated data exists', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 0,
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <GamePage genre="films" puzzleDate="2026-04-08" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('game-board')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.queryByText('No puzzle available for today')).not.toBeInTheDocument();
  });
});
