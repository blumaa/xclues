import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LocalStatsStorage } from '../LocalStatsStorage';
import type { GameResult } from '../../types/stats';

// Mock localStorage with an in-memory implementation
function createMockLocalStorage() {
  const store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      for (const key of Object.keys(store)) {
        delete store[key];
      }
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((_index: number) => null),
  };
}

// Mock the date utilities used inside LocalStatsStorage
vi.mock('../../utils/index', () => ({
  getTodayDate: vi.fn(() => '2025-06-15'),
  getYesterdayDate: vi.fn(() => '2025-06-14'),
}));

import { getTodayDate, getYesterdayDate } from '../../utils/index';

const mockedGetTodayDate = vi.mocked(getTodayDate);
const mockedGetYesterdayDate = vi.mocked(getYesterdayDate);

describe('LocalStatsStorage', () => {
  let storage: LocalStatsStorage;

  beforeEach(() => {
    const mockLS = createMockLocalStorage();
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockLS,
      writable: true,
      configurable: true,
    });
    mockedGetTodayDate.mockReturnValue('2025-06-15');
    mockedGetYesterdayDate.mockReturnValue('2025-06-14');
    storage = new LocalStatsStorage('xclues');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function makeResult(overrides: Partial<GameResult> = {}): GameResult {
    return {
      date: '2025-06-15',
      genre: 'films',
      won: true,
      mistakes: 0,
      completedAt: Date.now(),
      ...overrides,
    };
  }

  describe('getStats', () => {
    it('returns default stats when localStorage is empty', async () => {
      const stats = await storage.getStats();
      expect(stats).toEqual({
        gamesPlayed: 0,
        gamesWon: 0,
        winRate: 0,
        currentStreak: 0,
        maxStreak: 0,
        lastPlayedDate: null,
        gameHistory: [],
      });
    });

    it('returns stored stats', async () => {
      const storedStats = {
        gamesPlayed: 5,
        gamesWon: 3,
        winRate: 60,
        currentStreak: 2,
        maxStreak: 4,
        lastPlayedDate: '2025-06-14',
        gameHistory: [],
      };
      localStorage.setItem('xclues-stats', JSON.stringify(storedStats));
      const stats = await storage.getStats();
      expect(stats).toEqual(storedStats);
    });
  });

  describe('recordCompletion', () => {
    it('increments gamesPlayed and gamesWon on a win', async () => {
      const stats = await storage.recordCompletion(makeResult({ won: true }));
      expect(stats.gamesPlayed).toBe(1);
      expect(stats.gamesWon).toBe(1);
    });

    it('increments gamesPlayed but not gamesWon on a loss', async () => {
      const stats = await storage.recordCompletion(makeResult({ won: false }));
      expect(stats.gamesPlayed).toBe(1);
      expect(stats.gamesWon).toBe(0);
    });

    it('calculates winRate correctly', async () => {
      // First game: win
      await storage.recordCompletion(makeResult({ won: true }));

      // Second game: loss on a new day
      mockedGetTodayDate.mockReturnValue('2025-06-16');
      mockedGetYesterdayDate.mockReturnValue('2025-06-15');
      const stats = await storage.recordCompletion(makeResult({ won: false }));
      expect(stats.winRate).toBe(50);
    });

    it('prevents duplicate recording for the same day and genre', async () => {
      await storage.recordCompletion(makeResult());
      const stats = await storage.recordCompletion(makeResult());
      expect(stats.gamesPlayed).toBe(1);
    });

    it('allows recording different genres on the same day', async () => {
      await storage.recordCompletion(makeResult({ genre: 'films' }));
      const stats = await storage.recordCompletion(makeResult({ genre: 'books' }));
      expect(stats.gamesPlayed).toBe(2);
      expect(stats.gameHistory).toHaveLength(2);
      expect(stats.gameHistory[0].genre).toBe('films');
      expect(stats.gameHistory[1].genre).toBe('books');
    });
  });

  describe('streak logic', () => {
    it('first win sets streak to 1', async () => {
      const stats = await storage.recordCompletion(makeResult({ won: true }));
      expect(stats.currentStreak).toBe(1);
    });

    it('consecutive day win increments streak', async () => {
      // Day 1: win
      await storage.recordCompletion(makeResult({ won: true }));

      // Day 2: win (today becomes day 2, yesterday becomes day 1)
      mockedGetTodayDate.mockReturnValue('2025-06-16');
      mockedGetYesterdayDate.mockReturnValue('2025-06-15');
      const stats = await storage.recordCompletion(makeResult({ won: true }));
      expect(stats.currentStreak).toBe(2);
    });

    it('missed day resets streak to 1 on next win', async () => {
      // Day 1: win
      await storage.recordCompletion(makeResult({ won: true }));

      // Day 3: win (skipped day 2)
      mockedGetTodayDate.mockReturnValue('2025-06-17');
      mockedGetYesterdayDate.mockReturnValue('2025-06-16');
      const stats = await storage.recordCompletion(makeResult({ won: true }));
      expect(stats.currentStreak).toBe(1);
    });

    it('loss resets streak to 0', async () => {
      // Day 1: win
      await storage.recordCompletion(makeResult({ won: true }));

      // Day 2: loss
      mockedGetTodayDate.mockReturnValue('2025-06-16');
      mockedGetYesterdayDate.mockReturnValue('2025-06-15');
      const stats = await storage.recordCompletion(makeResult({ won: false }));
      expect(stats.currentStreak).toBe(0);
    });

    it('tracks maxStreak across resets', async () => {
      // Day 1: win (streak 1)
      await storage.recordCompletion(makeResult({ won: true }));

      // Day 2: win (streak 2)
      mockedGetTodayDate.mockReturnValue('2025-06-16');
      mockedGetYesterdayDate.mockReturnValue('2025-06-15');
      await storage.recordCompletion(makeResult({ won: true }));

      // Day 3: loss (streak 0, maxStreak stays 2)
      mockedGetTodayDate.mockReturnValue('2025-06-17');
      mockedGetYesterdayDate.mockReturnValue('2025-06-16');
      const stats = await storage.recordCompletion(makeResult({ won: false }));
      expect(stats.currentStreak).toBe(0);
      expect(stats.maxStreak).toBe(2);
    });
  });

  describe('resetStats', () => {
    it('clears stored data', async () => {
      await storage.recordCompletion(makeResult());
      await storage.resetStats();
      const stats = await storage.getStats();
      expect(stats.gamesPlayed).toBe(0);
    });
  });

  describe('genre-based storage key isolation', () => {
    it('uses different keys for different prefixes', async () => {
      const filmStorage = new LocalStatsStorage('filmclues');
      await storage.recordCompletion(makeResult());

      const filmStats = await filmStorage.getStats();
      expect(filmStats.gamesPlayed).toBe(0);

      const xcluesStats = await storage.getStats();
      expect(xcluesStats.gamesPlayed).toBe(1);
    });
  });
});
