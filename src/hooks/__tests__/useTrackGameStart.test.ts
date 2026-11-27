import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useTrackGameStart } from '../useTrackGameStart';
import { getStatsStore } from '../../store/statsStore';
import { boardKey, getGameStore, resetAllStores } from '../../store/gameStore';

const trackGameEvent = vi.fn();
vi.mock('../../services/analytics/gameEvents', () => ({
  trackGameEvent: (...args: unknown[]) => trackGameEvent(...args),
}));

const DATE = '2026-11-24';

function firstMove() {
  act(() => {
    getGameStore(boardKey('films', DATE)).getState().selectItem(1);
  });
}

beforeEach(() => {
  trackGameEvent.mockReset();
  localStorage.clear();
  resetAllStores();
  getStatsStore().setState({ gameHistory: [] });
  getGameStore(boardKey('films', DATE)).getState().initializeGame(
    [{ id: 1, title: 'A' }],
    [],
  );
});

describe('useTrackGameStart', () => {
  // Crawlers render pages and run effects but never tap a tile. A start
  // logged on load counted every bot visit as a dropped game.
  it('does not send started when the board only loads', () => {
    renderHook(() => useTrackGameStart('films', DATE, 'daily', true));

    expect(trackGameEvent).not.toHaveBeenCalled();
  });

  it('sends started on the first tile selection', () => {
    renderHook(() => useTrackGameStart('films', DATE, 'daily', true));
    firstMove();

    expect(trackGameEvent).toHaveBeenCalledTimes(1);
    expect(trackGameEvent).toHaveBeenCalledWith('started', expect.objectContaining({
      genre: 'films', puzzleDate: DATE, mode: 'daily',
    }));
  });

  it('sends started once even after more moves', () => {
    renderHook(() => useTrackGameStart('films', DATE, 'daily', true));
    firstMove();
    act(() => {
      getGameStore(boardKey('films', DATE)).getState().deselectAll();
    });
    firstMove();

    expect(trackGameEvent).toHaveBeenCalledTimes(1);
  });

  it('sends a first-time signal for a player with no history', () => {
    renderHook(() => useTrackGameStart('films', DATE, 'daily', true));
    firstMove();

    expect(trackGameEvent).toHaveBeenCalledWith('started', expect.objectContaining({
      returning: { priorGames: 0, daysSinceLast: null },
    }));
  });

  it('sends prior games for a returning player', () => {
    getStatsStore().setState({
      gameHistory: [{ date: '2026-11-20', genre: 'films', won: true, mistakes: 0, completedAt: Date.now() }],
    });

    renderHook(() => useTrackGameStart('films', DATE, 'daily', true));
    firstMove();

    expect(trackGameEvent.mock.calls[0][1].returning.priorGames).toBe(1);
  });
});
