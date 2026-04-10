import { describe, it, expect, beforeEach } from 'vitest';
import { getStatsStore, resetStatsStore } from '../statsStore';
import type { GameResult } from '../../types/stats';

const STORAGE_KEY = 'test-stats';

function makeResult(overrides: Partial<GameResult> = {}): GameResult {
  return {
    date: '2026-04-10',
    genre: 'films',
    won: true,
    mistakes: 1,
    completedAt: Date.now(),
    guessHistory: [],
    ...overrides,
  };
}

describe('statsStore', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStatsStore();
  });

  describe('hydrate', () => {
    it('initializes with empty stats when localStorage is empty', () => {
      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      expect(store.getState().gameHistory).toEqual([]);
    });

    it('loads existing game history from localStorage', () => {
      const history: GameResult[] = [
        makeResult({ genre: 'films', date: '2026-04-09' }),
        makeResult({ genre: 'books', date: '2026-04-10', won: false, mistakes: 4 }),
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ gameHistory: history }));

      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      expect(store.getState().gameHistory).toHaveLength(2);
      expect(store.getState().gameHistory[0].genre).toBe('films');
      expect(store.getState().gameHistory[1].genre).toBe('books');
    });

    it('handles corrupted localStorage gracefully', () => {
      localStorage.setItem(STORAGE_KEY, 'not-valid-json');

      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      expect(store.getState().gameHistory).toEqual([]);
    });
  });

  describe('getCompletedGame', () => {
    it('returns undefined when no matching game exists', () => {
      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      expect(store.getState().getCompletedGame('films', '2026-04-10')).toBeUndefined();
    });

    it('returns the matching game result', () => {
      const result = makeResult({ genre: 'films', date: '2026-04-10' });
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ gameHistory: [result] }));

      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      const found = store.getState().getCompletedGame('films', '2026-04-10');
      expect(found).toBeDefined();
      expect(found!.won).toBe(true);
      expect(found!.mistakes).toBe(1);
    });

    it('does not match different genre or date', () => {
      const result = makeResult({ genre: 'films', date: '2026-04-10' });
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ gameHistory: [result] }));

      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      expect(store.getState().getCompletedGame('books', '2026-04-10')).toBeUndefined();
      expect(store.getState().getCompletedGame('films', '2026-04-09')).toBeUndefined();
    });
  });

  describe('recordCompletion', () => {
    it('adds a game result to history', () => {
      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      const result = makeResult();
      store.getState().recordCompletion(result);

      expect(store.getState().gameHistory).toHaveLength(1);
      expect(store.getState().gameHistory[0]).toEqual(result);
    });

    it('persists to localStorage', () => {
      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      store.getState().recordCompletion(makeResult());

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      expect(stored.gameHistory).toHaveLength(1);
    });

    it('prevents duplicate recording for same date+genre', () => {
      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      store.getState().recordCompletion(makeResult({ date: '2026-04-10', genre: 'films' }));
      store.getState().recordCompletion(makeResult({ date: '2026-04-10', genre: 'films' }));

      expect(store.getState().gameHistory).toHaveLength(1);
    });

    it('allows same date different genre', () => {
      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      store.getState().recordCompletion(makeResult({ date: '2026-04-10', genre: 'films' }));
      store.getState().recordCompletion(makeResult({ date: '2026-04-10', genre: 'books' }));

      expect(store.getState().gameHistory).toHaveLength(2);
    });
  });

  describe('getGenreStats', () => {
    it('returns zero stats for genre with no games', () => {
      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      const stats = store.getState().getGenreStats('films');
      expect(stats.gamesPlayed).toBe(0);
      expect(stats.gamesWon).toBe(0);
      expect(stats.currentStreak).toBe(0);
      expect(stats.maxStreak).toBe(0);
    });

    it('computes stats for a specific genre only', () => {
      const history: GameResult[] = [
        makeResult({ genre: 'films', date: '2026-04-08', won: true }),
        makeResult({ genre: 'books', date: '2026-04-08', won: false, mistakes: 4 }),
        makeResult({ genre: 'films', date: '2026-04-09', won: true }),
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ gameHistory: history }));

      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      const filmsStats = store.getState().getGenreStats('films');
      expect(filmsStats.gamesPlayed).toBe(2);
      expect(filmsStats.gamesWon).toBe(2);

      const booksStats = store.getState().getGenreStats('books');
      expect(booksStats.gamesPlayed).toBe(1);
      expect(booksStats.gamesWon).toBe(0);
    });

    it('computes streaks per genre', () => {
      const history: GameResult[] = [
        makeResult({ genre: 'films', date: '2026-04-08', won: true }),
        makeResult({ genre: 'films', date: '2026-04-09', won: true }),
        makeResult({ genre: 'films', date: '2026-04-10', won: true }),
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ gameHistory: history }));

      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      const stats = store.getState().getGenreStats('films');
      expect(stats.currentStreak).toBe(3);
      expect(stats.maxStreak).toBe(3);
    });

    it('breaks streak on loss', () => {
      const history: GameResult[] = [
        makeResult({ genre: 'films', date: '2026-04-08', won: true }),
        makeResult({ genre: 'films', date: '2026-04-09', won: false, mistakes: 4 }),
        makeResult({ genre: 'films', date: '2026-04-10', won: true }),
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ gameHistory: history }));

      const store = getStatsStore();
      store.getState().hydrate(STORAGE_KEY);

      const stats = store.getState().getGenreStats('films');
      expect(stats.currentStreak).toBe(1);
      expect(stats.maxStreak).toBe(1);
    });
  });
});
