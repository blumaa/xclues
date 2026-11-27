import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import { ArchiveGameView } from './ArchiveGameView';
import { resetAppStore, getAppStore } from '../store/appStore';
import { resetStatsStore, getStatsStore } from '../store/statsStore';
import { resetAllStores, getGameStore, boardKey } from '../store/gameStore';
import type { SavedPuzzle } from '../types';

const trackGameEventMock = vi.fn();

vi.mock('../services/analytics/gameEvents', () => ({
  trackGameEvent: (...args: unknown[]) => trackGameEventMock(...args),
}));

vi.mock('../providers/useToast', () => ({
  useToast: () => ({ showInfo: vi.fn() }),
}));

const group = (id: string, start: number, color: 'yellow' | 'green' | 'blue' | 'purple') => ({
  id,
  items: [0, 1, 2, 3].map((i) => ({ id: start + i, title: `${id}-${i}` })),
  connection: `Connection ${id}`,
  difficulty: 'easy' as const,
  color,
});

const groups = [group('g1', 1, 'yellow'), group('g2', 5, 'green'), group('g3', 9, 'blue'), group('g4', 13, 'purple')];

const puzzle: SavedPuzzle = {
  id: 'archive-puzzle',
  items: groups.flatMap((g) => g.items),
  groups,
  createdAt: Date.now(),
};

const DATE = '2026-10-01';
const TODAY = '2026-11-23';

function renderView() {
  return render(<ArchiveGameView genre="books" puzzleDate={DATE} puzzle={puzzle} />);
}

describe('ArchiveGameView', () => {
  beforeEach(() => {
    trackGameEventMock.mockReset();
    localStorage.clear();
    resetAppStore();
    resetStatsStore();
    resetAllStores();
  });

  it('shows the playable tiles, not the answers', async () => {
    renderView();
    await waitFor(() => expect(screen.getAllByRole('button', { name: /g1-0/ }).length).toBe(1));
    expect(screen.queryByText('Connection g1')).toBeNull();
  });

  it('sets the header genre to the archive genre', async () => {
    renderView();
    await waitFor(() => expect(getAppStore().getState().activeGenre).toBe('books'));
  });

  it('does not reuse the daily board of the same genre', async () => {
    getGameStore(boardKey('books', TODAY)).getState().initializeGame(
      [{ id: 99, title: 'Today item' }],
      [],
    );
    renderView();
    await waitFor(() => expect(screen.getAllByRole('button', { name: /g1-0/ }).length).toBe(1));
    expect(screen.queryByText('Today item')).toBeNull();
  });

  it('does not log started when the page only loads', async () => {
    renderView();
    await waitFor(() => expect(getGameStore(boardKey('books', DATE)).getState().groups.length).toBe(4));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
    expect(trackGameEventMock.mock.calls.some((c) => c[0] === 'started')).toBe(false);
  });

  it('logs started with mode archive on the first move', async () => {
    renderView();
    await waitFor(() => expect(getGameStore(boardKey('books', DATE)).getState().groups.length).toBe(4));
    await act(async () => {
      getGameStore(boardKey('books', DATE)).getState().selectItem(1);
    });
    await waitFor(() => {
      const start = trackGameEventMock.mock.calls.find((c) => c[0] === 'started');
      expect(start?.[1]).toMatchObject({ genre: 'books', puzzleDate: DATE, mode: 'archive' });
    });
  });

  it('records a finished game as an archive play and logs it with mode archive', async () => {
    renderView();
    await waitFor(() => expect(getGameStore(boardKey('books', DATE)).getState().groups.length).toBe(4));

    await act(async () => {
      getGameStore(boardKey('books', DATE)).setState({ gameStatus: 'won', mistakes: 1 });
    });

    await waitFor(() => {
      const result = getStatsStore().getState().getCompletedGame('books', DATE);
      expect(result).toMatchObject({ won: true, archive: true });
    });
    const won = trackGameEventMock.mock.calls.find((c) => c[0] === 'won');
    expect(won?.[1]).toMatchObject({ genre: 'books', puzzleDate: DATE, mode: 'archive' });
  });

  it('restores a date already played as a finished game', async () => {
    localStorage.setItem(
      'xclues-stats',
      JSON.stringify({
        gameHistory: [{ date: DATE, genre: 'books', won: false, mistakes: 4, completedAt: Date.now() }],
      }),
    );
    renderView();
    await waitFor(() =>
      expect(getGameStore(boardKey('books', DATE)).getState().gameStatus).toBe('lost'),
    );
    expect(trackGameEventMock.mock.calls.some((c) => c[0] === 'started')).toBe(false);
  });
});
