import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import { GamePage } from '../game-page';
import { resetAppStore } from '../../src/store/appStore';
import { resetStatsStore } from '../../src/store/statsStore';
import { resetAllStores, getGameStore } from '../../src/store/gameStore';
import type { SavedPuzzle } from '../../src/types';

const insertMock = vi.fn();

vi.mock('../../src/lib/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({ insert: insertMock })),
  },
}));

vi.mock('../../src/components/organisms/GameBoard', () => ({
  GameBoard: () => <div data-testid="game-board">Board</div>,
}));

vi.mock('../../src/providers/useToast', () => ({
  useToast: () => ({ showInfo: vi.fn() }),
}));

const puzzle: SavedPuzzle = {
  id: 'p1',
  items: [
    { id: 1, title: 'A' },
    { id: 2, title: 'B' },
    { id: 3, title: 'C' },
    { id: 4, title: 'D' },
  ],
  groups: [
    {
      id: 'g1',
      items: [
        { id: 1, title: 'A' },
        { id: 2, title: 'B' },
        { id: 3, title: 'C' },
        { id: 4, title: 'D' },
      ],
      connection: 'x',
      difficulty: 'easy',
      color: 'yellow',
    },
  ],
  createdAt: Date.now(),
};

const DATE = '2026-04-23';

describe('GamePage → supabase insert', () => {
  beforeEach(() => {
    insertMock.mockReset();
    insertMock.mockResolvedValue({ error: null });
    localStorage.clear();
    resetAppStore();
    resetStatsStore();
    resetAllStores();
  });

  it('calls supabase insert with event_type="lost" on loss', async () => {
    render(
      <GamePage
        initialGenre="films"
        puzzleDate={DATE}
        puzzles={{ films: puzzle, books: puzzle, music: puzzle }}
      />,
    );

    await waitFor(() => {
      expect(insertMock).toHaveBeenCalled();
    });

    insertMock.mockClear();

    await act(async () => {
      getGameStore('films').setState({ gameStatus: 'lost', mistakes: 4 });
    });

    await waitFor(() => {
      const lostCall = insertMock.mock.calls.find(
        (c) => (c[0] as { event_type: string }).event_type === 'lost',
      );
      expect(lostCall).toBeDefined();
      expect(lostCall?.[0]).toMatchObject({
        event_type: 'lost',
        genre: 'films',
        puzzle_date: DATE,
      });
    });
  });
});
