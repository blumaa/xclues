import { createStore, type StoreApi } from 'zustand/vanilla';
import { useStore } from 'zustand';
import type { Genre } from '../config/seoConfig';

interface AppStoreState {
  activeGenre: Genre;
  puzzleDate: string;
  puzzlesReady: Record<Genre, boolean>;
  initialized: boolean;

  setActiveGenre(genre: Genre): void;
  markPuzzleReady(genre: Genre): void;
  initialize(genre: Genre, puzzleDate: string): void;
}

function createAppStore(): StoreApi<AppStoreState> {
  return createStore<AppStoreState>((set, get) => ({
    activeGenre: 'films',
    puzzleDate: '',
    puzzlesReady: { films: false, books: false, music: false },
    initialized: false,

    setActiveGenre(genre: Genre) {
      set({ activeGenre: genre });
    },

    markPuzzleReady(genre: Genre) {
      set((state) => ({
        puzzlesReady: { ...state.puzzlesReady, [genre]: true },
      }));
    },

    initialize(genre: Genre, puzzleDate: string) {
      // Only set activeGenre on first initialization — subsequent route
      // navigations (e.g., returning from how-to-play) should not reset it.
      if (get().initialized) return;
      set({ activeGenre: genre, puzzleDate, initialized: true });
    },
  }));
}

// Singleton instance
let appStoreInstance: StoreApi<AppStoreState> | null = null;

export function getAppStore(): StoreApi<AppStoreState> {
  if (!appStoreInstance) {
    appStoreInstance = createAppStore();
  }
  return appStoreInstance;
}

export function useAppStore<T>(selector: (state: AppStoreState) => T): T {
  return useStore(getAppStore(), selector);
}

export function resetAppStore(): void {
  appStoreInstance = null;
}
