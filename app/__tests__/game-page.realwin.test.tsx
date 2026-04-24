import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import { GamePage } from '../game-page';
import { resetAppStore } from '../../src/store/appStore';
import { resetStatsStore } from '../../src/store/statsStore';
import { resetAllStores, getGameStore } from '../../src/store/gameStore';
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
  };
}

const DATE = '2026-04-23';

function parseFetchBody(call: unknown[]): Record<string, unknown> {
  return JSON.parse((call[1] as { body: string }).body);
}

describe('GamePage → submitGuess correct 4x → fetch insert won', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    fetchMock.mockResolvedValue({ ok: true, status: 201 });
    vi.stubGlobal('fetch', fetchMock);
    localStorage.clear();
    resetAppStore();
    resetStatsStore();
    resetAllStores();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('inserts a "won" event after 4 correct guesses via submitGuess', async () => {
    const puzzle = makePuzzle();
    render(
      <GamePage
        initialGenre="films"
        puzzleDate={DATE}
        puzzles={{ films: puzzle, books: puzzle, music: puzzle }}
      />,
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    fetchMock.mockClear();

    const store = getGameStore('films');

    const correctGuesses = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    for (const ids of correctGuesses) {
      await act(async () => {
        store.setState({ selectedItemIds: ids });
        store.getState().submitGuess();
        await vi.advanceTimersByTimeAsync(1000);
      });
    }

    expect(store.getState().gameStatus).toBe('won');

    await waitFor(() => {
      const wonCall = fetchMock.mock.calls.find(
        (c) => parseFetchBody(c).event_type === 'won',
      );
      expect(wonCall).toBeDefined();
      expect(parseFetchBody(wonCall!)).toMatchObject({
        event_type: 'won',
        genre: 'films',
        puzzle_date: DATE,
      });
    });
  });
});
