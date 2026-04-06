import { create } from 'zustand';
import type { GameState, Group, Item } from '../types';
import { shuffleArray } from '../utils';
import { trackEvent, EVENTS } from '../services/analytics';

interface GameActions {
  selectItem: (itemId: number) => void;
  deselectAll: () => void;
  submitGuess: () => void;
  shuffleItems: () => void;
  initializeGame: (items: Item[], groups: Group[], puzzleDate: string, genre?: string) => void;
  restoreCompletedGame: (groups: Group[], won: boolean, mistakes: number) => void;
  restoreInProgressGame: (puzzleDate: string, groups: Group[], genre?: string) => boolean;
  resetGame: () => void;
  clearNotification: () => void;
}

function getGameStorageKey(puzzleDate: string, genre?: string): string {
  return genre ? `xclues-game-${puzzleDate}-${genre}` : `xclues-game-${puzzleDate}`;
}

interface SavedGameState {
  items: Item[];
  foundGroups: Group[];
  previousGuesses: number[][];
  mistakes: number;
  gameStatus: 'playing' | 'won' | 'lost';
  selectedItemIds: number[];
}

function saveGameState(state: GameState, genre?: string): void {
  if (!state.puzzleDate || state.gameStatus !== 'playing') return;
  const key = getGameStorageKey(state.puzzleDate, genre);
  const saved: SavedGameState = {
    items: state.items,
    foundGroups: state.foundGroups,
    previousGuesses: state.previousGuesses,
    mistakes: state.mistakes,
    gameStatus: state.gameStatus,
    selectedItemIds: state.selectedItemIds,
  };
  try {
    localStorage.setItem(key, JSON.stringify(saved));
  } catch {
    // localStorage full or unavailable
  }
}

function loadGameState(puzzleDate: string, genre?: string): SavedGameState | null {
  try {
    const raw = localStorage.getItem(getGameStorageKey(puzzleDate, genre));
    if (!raw) return null;
    return JSON.parse(raw) as SavedGameState;
  } catch {
    return null;
  }
}

function clearGameState(puzzleDate: string, genre?: string): void {
  try {
    localStorage.removeItem(getGameStorageKey(puzzleDate, genre));
  } catch {
    // ignore
  }
}

type GameStore = GameState & GameActions;

const MAX_MISTAKES = 4;
const MAX_SELECTIONS = 4;

export const useGameStore = create<GameStore>((set, get) => ({
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
  puzzleDate: null,
  puzzleGenre: null,
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

    const { puzzleDate } = get();
    const wasOneAway = !!oneAwayGroup;

    if (matchedGroup) {
      // Correct guess! First trigger staggered jump animation
      const matchedItemIds = matchedGroup.items.map((item) => item.id);

      set({
        selectedItemIds: [],
        previousGuesses: [...previousGuesses, sortedGuess],
      });

      // Track guess event immediately
      trackEvent(EVENTS.GUESS_SUBMITTED, {
        puzzleDate,
        isCorrect: true,
        mistakeCount: mistakes,
        wasOneAway: false,
      });

      // Stagger the jump animation - add each item with a delay
      const staggerDelay = 100; // ms between each tile jump
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

        trackEvent(EVENTS.GROUP_FOUND, {
          puzzleDate,
          groupIndex: newFoundGroups.length,
          difficulty: matchedGroup.difficulty,
          mistakesSoFar: currentState.mistakes,
        });

        if (isGameWon) {
          trackEvent(EVENTS.GAME_WON, {
            puzzleDate,
            mistakes: currentState.mistakes,
            groupsFound: 4,
          });
        }
      }, totalAnimationTime);
    } else {
      // Wrong guess
      const newMistakes = mistakes + 1;
      const isGameLost = newMistakes >= MAX_MISTAKES;

      set({
        mistakes: newMistakes,
        previousGuesses: [...previousGuesses, sortedGuess],
        gameStatus: isGameLost ? 'lost' : 'playing',
        // Reveal all groups when game is lost — player's found groups first, then remaining
        foundGroups: isGameLost
          ? [...foundGroups, ...groups.filter((g) => !foundGroups.some((f) => f.id === g.id))]
          : foundGroups,
        items: isGameLost ? [] : items,
        isShaking: true,
      });

      // Track events
      trackEvent(EVENTS.GUESS_SUBMITTED, {
        puzzleDate,
        isCorrect: false,
        mistakeCount: newMistakes,
        wasOneAway,
      });

      if (isGameLost) {
        trackEvent(EVENTS.GAME_LOST, {
          puzzleDate,
          mistakes: newMistakes,
          groupsFound: foundGroups.length,
        });
      }

      // Reset shake animation after 500ms
      setTimeout(() => set({ isShaking: false }), 500);
    }
  },

  shuffleItems: () => {
    const { items, puzzleDate } = get();
    set({ items: shuffleArray(items) });
    trackEvent(EVENTS.ITEMS_SHUFFLED, { puzzleDate });
  },

  /**
   * Initialize game with puzzle data from storage.
   * Replaces the old newGame() method which generated puzzles.
   *
   * @param items - Shuffled array of items
   * @param groups - Array of groups
   * @param puzzleDate - Date of puzzle in YYYY-MM-DD format
   */
  initializeGame: (items: Item[], groups: Group[], puzzleDate: string, genre?: string) => {
    set({
      items: shuffleArray(items),
      groups,
      selectedItemIds: [],
      foundGroups: [],
      previousGuesses: [],
      mistakes: 0,
      gameStatus: 'playing',
      isLoading: false,
      puzzleDate,
      puzzleGenre: genre ?? null,
          jumpingItemIds: [],
    });
  },

  /**
   * Restore a completed game state (for users who already played today).
   * Shows the final state without allowing replay.
   *
   * @param groups - Array of groups from the puzzle
   * @param won - Whether user won
   * @param mistakes - Number of mistakes made
   */
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

  /**
   * Restore an in-progress game from localStorage.
   * Returns true if game was restored, false if no saved state found.
   */
  restoreInProgressGame: (puzzleDate: string, groups: Group[], genre?: string): boolean => {
    const saved = loadGameState(puzzleDate, genre);
    if (!saved || saved.gameStatus !== 'playing') return false;

    set({
      items: saved.items,
      groups,
      selectedItemIds: saved.selectedItemIds,
      foundGroups: saved.foundGroups,
      previousGuesses: saved.previousGuesses,
      mistakes: saved.mistakes,
      gameStatus: 'playing',
      isLoading: false,
      puzzleDate,
      puzzleGenre: genre ?? null,
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
      puzzleDate: null,
      puzzleGenre: null,
          jumpingItemIds: [],
    });
  },

  clearNotification: () => {
    set({ notification: null });
  },
}));

// Persist game state to localStorage on changes
useGameStore.subscribe((state) => {
  if (state.gameStatus === 'playing' && state.puzzleDate) {
    saveGameState(state, state.puzzleGenre ?? undefined);
  } else if (state.puzzleDate && (state.gameStatus === 'won' || state.gameStatus === 'lost')) {
    clearGameState(state.puzzleDate, state.puzzleGenre ?? undefined);
  }
});
