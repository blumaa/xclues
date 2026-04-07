import { createStore, type StoreApi } from 'zustand/vanilla';
import { useStore } from 'zustand';
import type { GameState, Group, Item } from '../types';
import { shuffleArray } from '../utils';

interface GameActions {
  selectItem: (itemId: number) => void;
  deselectAll: () => void;
  submitGuess: () => void;
  shuffleItems: () => void;
  initializeGame: (items: Item[], groups: Group[], puzzleDate?: string, genre?: string) => void;
  restoreCompletedGame: (groups: Group[], won: boolean, mistakes: number) => void;
  restoreInProgressGame: (savedState: SavedGameState) => boolean;
  resetGame: () => void;
  clearNotification: () => void;
}

interface SavedGameState {
  items: Item[];
  foundGroups: Group[];
  previousGuesses: number[][];
  mistakes: number;
  gameStatus: 'playing' | 'won' | 'lost';
  selectedItemIds: number[];
}

export type GameStore = GameState & GameActions;

const MAX_MISTAKES = 4;
const MAX_SELECTIONS = 4;

function createGameStoreInstance(): StoreApi<GameStore> {
  return createStore<GameStore>((set, get) => ({
    // Initial state
    items: [],
    groups: [],
    selectedItemIds: [],
    foundGroups: [],
    previousGuesses: [],
    mistakes: 0,
    gameStatus: 'playing',
    isLoading: false,
    notification: null,
    isShaking: false,
    jumpingItemIds: [],
    rejectedItemId: null,

    // Actions
    selectItem: (itemId: number) => {
      const { selectedItemIds, gameStatus } = get();

      // Can't select if game is over
      if (gameStatus !== 'playing') return;

      // Toggle selection
      if (selectedItemIds.includes(itemId)) {
        set({ selectedItemIds: selectedItemIds.filter((id) => id !== itemId) });
      } else {
        // Can't select more than 4 - shake the rejected tile
        if (selectedItemIds.length >= MAX_SELECTIONS) {
          set({ rejectedItemId: itemId });
          setTimeout(() => set({ rejectedItemId: null }), 500);
          return;
        }
        set({ selectedItemIds: [...selectedItemIds, itemId] });
      }
    },

    deselectAll: () => {
      set({ selectedItemIds: [] });
    },

    submitGuess: () => {
      const {
        selectedItemIds,
        groups,
        foundGroups,
        previousGuesses,
        mistakes,
        items,
      } = get();

      // Need exactly 4 selections
      if (selectedItemIds.length !== MAX_SELECTIONS) return;

      // Sort for comparison
      const sortedGuess = [...selectedItemIds].sort((a, b) => a - b);

      // Check if this exact combination was tried before
      const isDuplicate = previousGuesses.some(
        (guess) =>
          guess.length === sortedGuess.length &&
          guess.every((id, index) => id === sortedGuess[index])
      );

      if (isDuplicate) {
        set({ notification: 'Already tried!' });
        setTimeout(() => set({ notification: null }), 2000);
        return;
      }

      // Check if guess matches any group
      const matchedGroup = groups.find((group) => {
        const groupItemIds = group.items.map((f) => f.id).sort((a, b) => a - b);
        return (
          groupItemIds.length === sortedGuess.length &&
          groupItemIds.every((id, index) => id === sortedGuess[index])
        );
      });

      // Check if user is "one away" (3 out of 4 correct)
      const oneAwayGroup = !matchedGroup
        ? groups.find((group) => {
            const groupItemIds = group.items.map((f) => f.id);
            return sortedGuess.filter((id) => groupItemIds.includes(id)).length === 3;
          })
        : null;

      if (oneAwayGroup) {
        set({ notification: 'One away!' });
        setTimeout(() => set({ notification: null }), 2000);
      }

      if (matchedGroup) {
        // Correct guess!
        const matchedItemIds = matchedGroup.items.map((item) => item.id);

        set({
          selectedItemIds: [],
          previousGuesses: [...previousGuesses, sortedGuess],
        });

        // Stagger the jump animation
        const staggerDelay = 100;
        matchedItemIds.forEach((itemId, index) => {
          setTimeout(() => {
            set((state) => ({
              jumpingItemIds: [...state.jumpingItemIds, itemId],
            }));
          }, index * staggerDelay);
        });

        // After all jumps complete, update foundGroups
        const totalAnimationTime = (matchedItemIds.length * staggerDelay) + 400;
        setTimeout(() => {
          const currentState = get();
          const newFoundGroups = [...currentState.foundGroups, matchedGroup];
          const remainingItems = currentState.items.filter(
            (item) => !matchedGroup.items.some((f) => f.id === item.id)
          );

          const isGameWon = newFoundGroups.length === 4;

          set({
            foundGroups: newFoundGroups,
            items: remainingItems,
            jumpingItemIds: [],
            gameStatus: isGameWon ? 'won' : 'playing',
          });
        }, totalAnimationTime);
      } else {
        // Wrong guess
        const newMistakes = mistakes + 1;
        const isGameLost = newMistakes >= MAX_MISTAKES;

        set({
          mistakes: newMistakes,
          previousGuesses: [...previousGuesses, sortedGuess],
          gameStatus: isGameLost ? 'lost' : 'playing',
          foundGroups: isGameLost
            ? [...foundGroups, ...groups.filter((g) => !foundGroups.some((f) => f.id === g.id))]
            : foundGroups,
          items: isGameLost ? [] : items,
          isShaking: true,
        });

        setTimeout(() => set({ isShaking: false }), 500);
      }
    },

    shuffleItems: () => {
      const { items } = get();
      set({ items: shuffleArray(items) });
    },

    initializeGame: (items: Item[], groups: Group[], _puzzleDate?: string, _genre?: string) => {
      set({
        items: shuffleArray(items),
        groups,
        selectedItemIds: [],
        foundGroups: [],
        previousGuesses: [],
        mistakes: 0,
        gameStatus: 'playing',
        isLoading: false,
        jumpingItemIds: [],
      });
    },

    restoreCompletedGame: (groups: Group[], won: boolean, mistakes: number) => {
      set({
        items: [],
        groups,
        selectedItemIds: [],
        foundGroups: groups,
        previousGuesses: [],
        mistakes,
        gameStatus: won ? 'won' : 'lost',
        isLoading: false,
        notification: null,
        isShaking: false,
        jumpingItemIds: [],
      });
    },

    restoreInProgressGame: (savedState: SavedGameState): boolean => {
      if (savedState.gameStatus !== 'playing') return false;

      set({
        items: savedState.items,
        selectedItemIds: savedState.selectedItemIds,
        foundGroups: savedState.foundGroups,
        previousGuesses: savedState.previousGuesses,
        mistakes: savedState.mistakes,
        gameStatus: 'playing',
        isLoading: false,
        jumpingItemIds: [],
      });
      return true;
    },

    resetGame: () => {
      set({
        items: [],
        groups: [],
        selectedItemIds: [],
        foundGroups: [],
        previousGuesses: [],
        mistakes: 0,
        gameStatus: 'playing',
        isLoading: false,
        notification: null,
        isShaking: false,
        jumpingItemIds: [],
        rejectedItemId: null,
      });
    },

    clearNotification: () => {
      set({ notification: null });
    },
  }));
}

// Per-genre store instances — each genre gets its own isolated game state
const storeMap = new Map<string, StoreApi<GameStore>>();

/**
 * Get or create a store instance for a specific genre.
 */
export function getGameStore(genre: string): StoreApi<GameStore> {
  if (!storeMap.has(genre)) {
    storeMap.set(genre, createGameStoreInstance());
  }
  return storeMap.get(genre)!;
}

/**
 * React hook for genre-scoped game state.
 * Usage: const gameStatus = useGameStore('films', s => s.gameStatus);
 */
export function useGameStore<T>(genre: string, selector: (state: GameStore) => T): T {
  return useStore(getGameStore(genre), selector);
}

/**
 * Clear all store instances (for testing).
 */
export function resetAllStores(): void {
  storeMap.forEach((store) => store.getState().resetGame());
  storeMap.clear();
}
