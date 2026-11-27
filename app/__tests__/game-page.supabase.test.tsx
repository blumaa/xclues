import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import { GamePage } from '../game-page';
import { resetAppStore } from '../../src/store/appStore';
import { resetStatsStore } from '../../src/store/statsStore';
import { resetAllStores, getGameStore, boardKey } from '../../src/store/gameStore';
import type { SavedPuzzle } from '../../src/types';

const fetchMock = vi.fn();

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
  editedAt: Date.now(),
};

const DATE = '2026-04-23';

function parseFetchBody(call: unknown[]): Record<string, unknown> {
  return JSON.parse((call[1] as { body: string }).body);
}

describe('GamePage → fetch insert', () => {
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

  it('calls fetch with event_type="lost" on loss', async () => {
    render(
      <GamePage
        initialGenre="films"
        puzzleDate={DATE}
        puzzles={{ films: puzzle, books: puzzle, music: puzzle }}
      />,
    );

    await waitFor(() => {
      expect(getGameStore(boardKey('films', DATE)).getState().items.length).toBeGreaterThan(0);
    });

    fetchMock.mockClear();

    await act(async () => {
      getGameStore(boardKey('films', DATE)).setState({ gameStatus: 'lost', mistakes: 4 });
    });

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

  it('fires started event only for initialGenre, never a spurious films event', async () => {
    render(
      <GamePage
        initialGenre="books"
        puzzleDate={DATE}
        puzzles={{ films: puzzle, books: puzzle, music: puzzle }}
      />,
    );

    await waitFor(() => {
      expect(getGameStore(boardKey('books', DATE)).getState().items.length).toBeGreaterThan(0);
    });
    // Started logs on the first move, so the player moves on their board.
    await act(async () => {
      getGameStore(boardKey('books', DATE)).getState().selectItem(1);
    });
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    // Wait for all effects to settle
    await act(async () => {});

    const startedCalls = fetchMock.mock.calls.filter(
      (c) => parseFetchBody(c).event_type === 'started',
    );

    // Exactly one started event, for 'books' (the initialGenre)
    expect(startedCalls).toHaveLength(1);
    expect(parseFetchBody(startedCalls[0])).toMatchObject({
      event_type: 'started',
      genre: 'books',
    });

    // No started event for 'films' (the store default) should leak through
    const filmsStarted = startedCalls.filter(
      (c) => parseFetchBody(c).genre === 'films',
    );
    expect(filmsStarted).toHaveLength(0);
  });
});
