import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import { GamePage } from '../game-page';
import { resetAppStore } from '../../src/store/appStore';
import { resetStatsStore } from '../../src/store/statsStore';
import { resetAllStores, getGameStore } from '../../src/store/gameStore';
import type { SavedPuzzle } from '../../src/types';

const trackGameEventMock = vi.fn();

vi.mock('../../src/services/analytics/gameEvents', () => ({
  trackGameEvent: (...args: unknown[]) => trackGameEventMock(...args),
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

function renderFresh() {
  return render(
    <GamePage
      initialGenre="films"
      puzzleDate={DATE}
      puzzles={{ films: puzzle, books: puzzle, music: puzzle }}
    />,
  );
}

describe('GamePage completion → trackGameEvent', () => {
  beforeEach(() => {
    trackGameEventMock.mockReset();
    localStorage.clear();
    resetAppStore();
    resetStatsStore();
    resetAllStores();
  });

  it('fires trackGameEvent("started") per genre on mount', async () => {
    renderFresh();
    await waitFor(() => {
      const starts = trackGameEventMock.mock.calls.filter((c) => c[0] === 'started');
      expect(starts.length).toBe(3);
    });
  });

  it('fires trackGameEvent("lost") when a genre game transitions to lost', async () => {
    renderFresh();

    await waitFor(() => {
      expect(trackGameEventMock.mock.calls.some((c) => c[0] === 'started')).toBe(true);
    });

    await act(async () => {
      const filmsStore = getGameStore('films');
      filmsStore.setState({ gameStatus: 'lost', mistakes: 4 });
    });

    await waitFor(() => {
      const lost = trackGameEventMock.mock.calls.find((c) => c[0] === 'lost');
      expect(lost).toBeDefined();
      expect(lost?.[1]).toMatchObject({ genre: 'films', puzzleDate: DATE });
    });
  });

  it('fires trackGameEvent("won") when a genre game transitions to won', async () => {
    renderFresh();

    await waitFor(() => {
      expect(trackGameEventMock.mock.calls.some((c) => c[0] === 'started')).toBe(true);
    });

    await act(async () => {
      const booksStore = getGameStore('books');
      booksStore.setState({ gameStatus: 'won', mistakes: 1 });
    });

    await waitFor(() => {
      const won = trackGameEventMock.mock.calls.find((c) => c[0] === 'won');
      expect(won).toBeDefined();
      expect(won?.[1]).toMatchObject({ genre: 'books', puzzleDate: DATE });
    });
  });
});
