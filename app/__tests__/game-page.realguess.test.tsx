import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import { GamePage } from '../game-page';
import { resetAppStore } from '../../src/store/appStore';
import { resetStatsStore } from '../../src/store/statsStore';
import { resetAllStores, getGameStore, boardKey } from '../../src/store/gameStore';
import type { SavedPuzzle, Item, Group } from '../../src/types';

const fetchMock = vi.fn();

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
    editedAt: Date.now(),
  };
}

const DATE = '2026-04-23';

function parseFetchBody(call: unknown[]): Record<string, unknown> {
  return JSON.parse((call[1] as { body: string }).body);
}

describe('GamePage → submitGuess wrong 4x → fetch insert lost', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    fetchMock.mockResolvedValue({ ok: true, status: 201 });
    vi.stubGlobal('fetch', fetchMock);
    localStorage.clear();
    resetAppStore();
    resetStatsStore();
    resetAllStores();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
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

    // Board ready. No fetch yet: started logs on the first move.
    await waitFor(() => {
      expect(getGameStore(boardKey('films', DATE)).getState().items.length).toBeGreaterThan(0);
    });

    fetchMock.mockClear();

    const store = getGameStore(boardKey('films', DATE));

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
      const lostCall = fetchMock.mock.calls.find(
        (c) => parseFetchBody(c).event_type === 'lost',
      );
      expect(lostCall).toBeDefined();
      expect(parseFetchBody(lostCall!)).toMatchObject({
        event_type: 'lost',
        genre: 'films',
        puzzle_date: DATE,
      });
    });
  });
});
