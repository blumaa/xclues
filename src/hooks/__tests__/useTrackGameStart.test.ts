import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTrackGameStart } from '../useTrackGameStart';
import { getStatsStore } from '../../store/statsStore';

const trackGameEvent = vi.fn();
vi.mock('../../services/analytics/gameEvents', () => ({
  trackGameEvent: (...args: unknown[]) => trackGameEvent(...args),
}));

beforeEach(() => {
  trackGameEvent.mockReset();
  localStorage.clear();
  getStatsStore().setState({ gameHistory: [] });
});

describe('useTrackGameStart', () => {
  it('sends a first-time signal for a player with no history', () => {
    renderHook(() => useTrackGameStart('films', '2026-11-24', 'daily', true));

    expect(trackGameEvent).toHaveBeenCalledWith('started', expect.objectContaining({
      returning: { priorGames: 0, daysSinceLast: null },
    }));
  });

  it('sends prior games for a returning player', () => {
    getStatsStore().setState({
      gameHistory: [{ date: '2026-11-20', genre: 'films', won: true, mistakes: 0, completedAt: Date.now() }],
    });

    renderHook(() => useTrackGameStart('films', '2026-11-24', 'daily', true));

    expect(trackGameEvent.mock.calls[0][1].returning.priorGames).toBe(1);
  });
});
