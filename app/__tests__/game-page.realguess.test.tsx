import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import { GamePage } from '../game-page';
import { resetAppStore } from '../../src/store/appStore';
import { resetStatsStore } from '../../src/store/statsStore';
import { resetAllStores, getGameStore } from '../../src/store/gameStore';
import type { SavedPuzzle, Item, Group } from '../../src/types';

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

function makeItem(id: number): Item {
  return { id, title: `Item ${id}` };
}

function makeGroup(id: string, itemIds: number[]): Group {
  return {
    id,
    items: itemIds.map(makeItem),
    connection: `Connection ${id}`,
    difficulty: 'easy',
    color: 'yellow',
  };
}

function makePuzzle(): SavedPuzzle {
  return {
    id: 'p1',
    items: Array.from({ length: 16 }, (_, i) => makeItem(i + 1)),
    groups: [
      makeGroup('g1', [1, 2, 3, 4]),
      makeGroup('g2', [5, 6, 7, 8]),
      makeGroup('g3', [9, 10, 11, 12]),
      makeGroup('g4', [13, 14, 15, 16]),
    ],
    createdAt: Date.now(),
  };
}

const DATE = '2026-04-23';

describe('GamePage → submitGuess wrong 4x → supabase insert lost', () => {
  beforeEach(() => {
    insertMock.mockReset();
    insertMock.mockResolvedValue({ error: null });
    localStorage.clear();
    resetAppStore();
    resetStatsStore();
    resetAllStores();
  });

  it('inserts a "lost" event after 4 wrong guesses via submitGuess', async () => {
    const puzzle = makePuzzle();
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

    const store = getGameStore('films');

    // Wrong guess pattern: pick one from each group
    const wrongGuesses = [
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [4, 8, 12, 16],
    ];

    for (const ids of wrongGuesses) {
      await act(async () => {
        store.setState({ selectedItemIds: ids });
        store.getState().submitGuess();
      });
    }

    expect(store.getState().gameStatus).toBe('lost');
    expect(store.getState().mistakes).toBe(4);

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
