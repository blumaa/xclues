import { describe, it, expect } from 'vitest';
import { returnSignal } from '../returnSignal';
import type { GameResult } from '../../../types/stats';

const NOW = new Date('2026-11-24T15:00:00Z');

function game(genre: string, completedAt: string, extra: Partial<GameResult> = {}): GameResult {
  return { date: completedAt.slice(0, 10), genre, won: true, mistakes: 0, completedAt: Date.parse(completedAt), ...extra };
}

describe('returnSignal', () => {
  it('first-time player: no prior games, no gap', () => {
    expect(returnSignal([], 'films', NOW)).toEqual({ priorGames: 0, daysSinceLast: null });
  });

  it('counts prior completed games for the genre only', () => {
    const history = [
      game('films', '2026-11-20T10:00:00Z'),
      game('films', '2026-11-22T10:00:00Z'),
      game('books', '2026-11-23T10:00:00Z'),
    ];
    expect(returnSignal(history, 'films', NOW).priorGames).toBe(2);
  });

  it('days since last play uses UTC calendar days from the latest completion', () => {
    const history = [
      game('films', '2026-11-20T10:00:00Z'),
      game('films', '2026-11-23T23:59:00Z'),
    ];
    expect(returnSignal(history, 'films', NOW).daysSinceLast).toBe(1);
  });

  it('same-day return gives 0', () => {
    expect(returnSignal([game('films', '2026-11-24T01:00:00Z')], 'films', NOW).daysSinceLast).toBe(0);
  });

  it('archive plays count as prior games and as the last visit', () => {
    const history = [game('films', '2026-11-21T10:00:00Z', { date: '2026-10-01', archive: true })];
    expect(returnSignal(history, 'films', NOW)).toEqual({ priorGames: 1, daysSinceLast: 3 });
  });
});
