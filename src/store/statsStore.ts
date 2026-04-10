import { createStore, type StoreApi } from 'zustand/vanilla';
import { useStore } from 'zustand';
import type { GameResult, UserStats } from '../types/stats';

interface StatsStoreState {
  gameHistory: GameResult[];
  storageKey: string | null;

  hydrate(storageKey: string): void;
  recordCompletion(result: GameResult): void;
  getCompletedGame(genre: string, date: string): GameResult | undefined;
  getGenreStats(genre: string): UserStats;
}

function computeGenreStats(gameHistory: GameResult[], genre: string): UserStats {
  const genreGames = gameHistory
    .filter((g) => g.genre === genre)
    .sort((a, b) => a.date.localeCompare(b.date));

  const gamesPlayed = genreGames.length;
  const gamesWon = genreGames.filter((g) => g.won).length;
  const winRate = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;

  let currentStreak = 0;
  let maxStreak = 0;
  let streak = 0;
  let lastDate: string | null = null;

  for (const game of genreGames) {
    if (!game.won) {
      streak = 0;
    } else if (!lastDate) {
      streak = 1;
    } else {
      const prev = new Date(lastDate + 'T00:00:00Z');
      const curr = new Date(game.date + 'T00:00:00Z');
      const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
      streak = diffDays === 1 ? streak + 1 : 1;
    }
    lastDate = game.date;
    if (streak > maxStreak) maxStreak = streak;
  }
  currentStreak = streak;

  const lastPlayedDate = genreGames.length > 0 ? genreGames[genreGames.length - 1].date : null;

  return {
    gamesPlayed,
    gamesWon,
    winRate,
    currentStreak,
    maxStreak,
    lastPlayedDate,
    gameHistory: genreGames,
  };
}

function persistToLocalStorage(storageKey: string, gameHistory: GameResult[]) {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ gameHistory }));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

function createStatsStore(): StoreApi<StatsStoreState> {
  return createStore<StatsStoreState>((set, get) => ({
    gameHistory: [],
    storageKey: null,

    hydrate(storageKey: string) {
      let gameHistory: GameResult[] = [];
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && Array.isArray(parsed.gameHistory)) {
            gameHistory = parsed.gameHistory;
          }
        }
      } catch {
        // Corrupted data — start fresh
      }
      set({ gameHistory, storageKey });
    },

    recordCompletion(result: GameResult) {
      const { gameHistory, storageKey } = get();

      // Prevent duplicate for same date+genre
      const alreadyExists = gameHistory.some(
        (g) => g.date === result.date && g.genre === result.genre,
      );
      if (alreadyExists) return;

      const newHistory = [...gameHistory, result];
      set({ gameHistory: newHistory });

      if (storageKey) {
        persistToLocalStorage(storageKey, newHistory);
      }
    },

    getCompletedGame(genre: string, date: string): GameResult | undefined {
      return get().gameHistory.find((g) => g.genre === genre && g.date === date);
    },

    getGenreStats(genre: string): UserStats {
      return computeGenreStats(get().gameHistory, genre);
    },
  }));
}

// Singleton instance
let statsStoreInstance: StoreApi<StatsStoreState> | null = null;

export function getStatsStore(): StoreApi<StatsStoreState> {
  if (!statsStoreInstance) {
    statsStoreInstance = createStatsStore();
  }
  return statsStoreInstance;
}

export function useStatsStore<T>(selector: (state: StatsStoreState) => T): T {
  return useStore(getStatsStore(), selector);
}

export function resetStatsStore(): void {
  statsStoreInstance = null;
}
