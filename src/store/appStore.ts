import { createStore, type StoreApi } from 'zustand/vanilla';
import { useStore } from 'zustand';
import type { Genre } from '../config/seoConfig';

interface AppStoreState {
  activeGenre: Genre;
  puzzleDate: string;
  initialized: boolean;

  setActiveGenre(genre: Genre): void;
  initialize(genre: Genre, puzzleDate: string): void;
}

function createAppStore(): StoreApi<AppStoreState> {
  return createStore<AppStoreState>((set) => ({
    activeGenre: 'films',
    puzzleDate: '',
    initialized: false,

    setActiveGenre(genre: Genre) {
      set({ activeGenre: genre });
    },

    initialize(genre: Genre, puzzleDate: string) {
      // The route's genre always wins. Links back to the game carry the
      // current genre (header logo), so a pick survives side pages.
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
