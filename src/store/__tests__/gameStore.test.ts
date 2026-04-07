import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import type { Item, Group } from '../../types';

import { getGameStore } from '../gameStore';

const GENRE = 'films';
const store = () => getGameStore(GENRE);

// --- Test data helpers ---

function makeItem(id: number, title?: string): Item {
  return { id, title: title ?? `Item ${id}` };
}

function makeGroup(
  id: string,
  itemIds: number[],
  overrides?: Partial<Group>
): Group {
  return {
    id,
    items: itemIds.map((i) => makeItem(i)),
    connection: `Connection ${id}`,
    difficulty: 'easy',
    color: 'yellow',
    ...overrides,
  };
}

function createTestGroups(): Group[] {
  return [
    makeGroup('g1', [1, 2, 3, 4], { difficulty: 'easy', color: 'yellow' }),
    makeGroup('g2', [5, 6, 7, 8], { difficulty: 'medium', color: 'green' }),
    makeGroup('g3', [9, 10, 11, 12], { difficulty: 'hard', color: 'blue' }),
    makeGroup('g4', [13, 14, 15, 16], {
      difficulty: 'hardest',
      color: 'purple',
    }),
  ];
}

function createTestItems(): Item[] {
  return Array.from({ length: 16 }, (_, i) => makeItem(i + 1));
}

function initializeTestGame() {
  const items = createTestItems();
  const groups = createTestGroups();
  store().getState().initializeGame(items, groups, '2026-04-05');
}

// --- Tests ---

describe('gameStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    store().getState().resetGame();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // =========================================================
  // selectItem
  // =========================================================
  describe('selectItem', () => {
    beforeEach(() => {
      initializeTestGame();
    });

    it('selects an item by adding its id to selectedItemIds', () => {
      store().getState().selectItem(1);
      expect(store().getState().selectedItemIds).toEqual([1]);
    });

    it('toggles an already-selected item off', () => {
      store().getState().selectItem(1);
      store().getState().selectItem(1);
      expect(store().getState().selectedItemIds).toEqual([]);
    });

    it('allows up to 4 selections', () => {
      store().getState().selectItem(1);
      store().getState().selectItem(2);
      store().getState().selectItem(3);
      store().getState().selectItem(4);
      expect(store().getState().selectedItemIds).toEqual([1, 2, 3, 4]);
    });

    it('rejects the 5th selection and sets rejectedItemId', () => {
      store().getState().selectItem(1);
      store().getState().selectItem(2);
      store().getState().selectItem(3);
      store().getState().selectItem(4);
      store().getState().selectItem(5);

      const state = store().getState();
      expect(state.selectedItemIds).toEqual([1, 2, 3, 4]);
      expect(state.rejectedItemId).toBe(5);
    });

    it('clears rejectedItemId after 500ms', () => {
      store().getState().selectItem(1);
      store().getState().selectItem(2);
      store().getState().selectItem(3);
      store().getState().selectItem(4);
      store().getState().selectItem(5);

      expect(store().getState().rejectedItemId).toBe(5);
      vi.advanceTimersByTime(500);
      expect(store().getState().rejectedItemId).toBeNull();
    });

    it('is a no-op when game status is won', () => {
      store().setState({ gameStatus: 'won' });
      store().getState().selectItem(1);
      expect(store().getState().selectedItemIds).toEqual([]);
    });

    it('is a no-op when game status is lost', () => {
      store().setState({ gameStatus: 'lost' });
      store().getState().selectItem(1);
      expect(store().getState().selectedItemIds).toEqual([]);
    });
  });

  // =========================================================
  // submitGuess
  // =========================================================
  describe('submitGuess', () => {
    beforeEach(() => {
      initializeTestGame();
    });

    it('does nothing when fewer than 4 items are selected', () => {
      store().getState().selectItem(1);
      store().getState().selectItem(2);
      store().getState().submitGuess();

      expect(store().getState().mistakes).toBe(0);
      expect(store().getState().previousGuesses).toEqual([]);
    });

    describe('correct guess', () => {
      it('clears selection and records guess immediately', () => {
        // Select items for group 1: ids 1,2,3,4
        [1, 2, 3, 4].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();

        const state = store().getState();
        expect(state.selectedItemIds).toEqual([]);
        expect(state.previousGuesses).toEqual([[1, 2, 3, 4]]);
      });

      it('triggers staggered jump animation for matched items', () => {
        [1, 2, 3, 4].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();

        // After 0ms, first item should be jumping
        vi.advanceTimersByTime(0);
        expect(store().getState().jumpingItemIds).toContain(1);

        // After 100ms, second item added
        vi.advanceTimersByTime(100);
        expect(store().getState().jumpingItemIds).toContain(2);

        // After 200ms, third item
        vi.advanceTimersByTime(100);
        expect(store().getState().jumpingItemIds).toContain(3);

        // After 300ms, fourth item
        vi.advanceTimersByTime(100);
        expect(store().getState().jumpingItemIds).toContain(4);
      });

      it('updates foundGroups and removes matched items after animation completes', () => {
        [1, 2, 3, 4].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();

        // Total animation time = (4 * 100) + 400 = 800ms
        vi.advanceTimersByTime(800);

        const state = store().getState();
        expect(state.foundGroups).toHaveLength(1);
        expect(state.foundGroups[0].id).toBe('g1');
        expect(state.items.map((i) => i.id)).not.toContain(1);
        expect(state.items.map((i) => i.id)).not.toContain(2);
        expect(state.jumpingItemIds).toEqual([]);
      });

    });

    describe('wrong guess', () => {
      it('increments mistakes and records previous guess', () => {
        // Select 3 from group 1 + 1 from group 2 = wrong
        [1, 2, 3, 5].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();

        const state = store().getState();
        expect(state.mistakes).toBe(1);
        expect(state.previousGuesses).toEqual([[1, 2, 3, 5]]);
        expect(state.gameStatus).toBe('playing');
      });

      it('sets isShaking and clears it after 500ms', () => {
        [1, 2, 3, 5].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();

        expect(store().getState().isShaking).toBe(true);
        vi.advanceTimersByTime(500);
        expect(store().getState().isShaking).toBe(false);
      });

    });

    describe('one-away notification', () => {
      it('shows "One away!" when 3 out of 4 items match a group', () => {
        // 3 from g1 (1,2,3) + 1 from g2 (5) = one away from g1
        [1, 2, 3, 5].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();

        expect(store().getState().notification).toBe('One away!');
      });

      it('clears one-away notification after 2000ms', () => {
        [1, 2, 3, 5].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();

        expect(store().getState().notification).toBe('One away!');
        vi.advanceTimersByTime(2000);
        expect(store().getState().notification).toBeNull();
      });

      it('does not show one-away when fewer than 3 match', () => {
        // 2 from g1, 2 from g2 = not one away
        [1, 2, 5, 6].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();

        expect(store().getState().notification).toBeNull();
      });
    });

    describe('duplicate guess detection', () => {
      it('shows "Already tried!" for duplicate guesses', () => {
        [1, 2, 3, 5].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();
        vi.advanceTimersByTime(2000); // clear first notification

        // Wrong guess does not clear selection, so deselect first
        store().getState().deselectAll();
        [1, 2, 3, 5].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();

        expect(store().getState().notification).toBe('Already tried!');
      });

      it('clears "Already tried!" after 2000ms', () => {
        [1, 2, 3, 5].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();
        vi.advanceTimersByTime(2000);

        store().getState().deselectAll();
        [1, 2, 3, 5].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();

        expect(store().getState().notification).toBe('Already tried!');
        vi.advanceTimersByTime(2000);
        expect(store().getState().notification).toBeNull();
      });

      it('does not increment mistakes for duplicate guess', () => {
        [1, 2, 3, 5].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();
        const mistakesAfterFirst = store().getState().mistakes;

        [1, 2, 3, 5].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();

        expect(store().getState().mistakes).toBe(mistakesAfterFirst);
      });

      it('detects duplicates regardless of selection order', () => {
        [5, 3, 1, 2].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();
        vi.advanceTimersByTime(2000);

        // Wrong guess does not clear selection, so deselect first
        store().getState().deselectAll();
        // Same items, different order
        [1, 2, 3, 5].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();

        expect(store().getState().notification).toBe('Already tried!');
      });
    });

    describe('game won', () => {
      it('sets gameStatus to won when all 4 groups are found', () => {
        // Find groups 1-3 first
        const groupIds = [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 16],
        ];

        for (const ids of groupIds) {
          ids.forEach((id) => store().getState().selectItem(id));
          store().getState().submitGuess();
          // Wait for animation to complete: (4 * 100) + 400 = 800ms
          vi.advanceTimersByTime(800);
        }

        expect(store().getState().gameStatus).toBe('won');
        expect(store().getState().foundGroups).toHaveLength(4);
      });

      it('foundGroups are in the order the player solved them', () => {
        // Solve in reverse order: g4, g3, g2, g1
        const solveOrder = [
          [13, 14, 15, 16], // g4 (purple)
          [9, 10, 11, 12],  // g3 (blue)
          [5, 6, 7, 8],     // g2 (green)
          [1, 2, 3, 4],     // g1 (yellow)
        ];

        for (const ids of solveOrder) {
          ids.forEach((id) => store().getState().selectItem(id));
          store().getState().submitGuess();
          vi.advanceTimersByTime(800);
        }

        const found = store().getState().foundGroups;
        expect(found[0].id).toBe('g4');
        expect(found[1].id).toBe('g3');
        expect(found[2].id).toBe('g2');
        expect(found[3].id).toBe('g1');
      });

    });

    describe('game lost', () => {
      it('sets gameStatus to lost after 4 mistakes', () => {
        const wrongGuesses = [
          [1, 2, 3, 5],
          [1, 2, 5, 6],
          [1, 5, 6, 7],
          [1, 2, 5, 9],
        ];

        for (const ids of wrongGuesses) {
          ids.forEach((id) => store().getState().selectItem(id));
          store().getState().submitGuess();
          // Clear selections for next guess (wrong guess does not clear them)
          store().getState().deselectAll();
          vi.advanceTimersByTime(500); // clear shake
        }

        const state = store().getState();
        expect(state.gameStatus).toBe('lost');
        expect(state.mistakes).toBe(4);
      });

      it('reveals all groups and clears items on loss', () => {
        const wrongGuesses = [
          [1, 2, 3, 5],
          [1, 2, 5, 6],
          [1, 5, 6, 7],
          [1, 2, 5, 9],
        ];

        for (const ids of wrongGuesses) {
          ids.forEach((id) => store().getState().selectItem(id));
          store().getState().submitGuess();
          store().getState().deselectAll();
          vi.advanceTimersByTime(500);
        }

        const state = store().getState();
        expect(state.foundGroups).toHaveLength(4);
        expect(state.items).toEqual([]);
      });

      it('on loss, shows found groups first then remaining groups', () => {
        // Find g4 first, then lose
        [13, 14, 15, 16].forEach((id) => store().getState().selectItem(id));
        store().getState().submitGuess();
        vi.advanceTimersByTime(800);

        // Now make 4 wrong guesses to lose
        const wrongGuesses = [
          [1, 2, 3, 5],
          [1, 2, 5, 6],
          [1, 5, 6, 7],
          [1, 2, 5, 9],
        ];

        for (const ids of wrongGuesses) {
          ids.forEach((id) => store().getState().selectItem(id));
          store().getState().submitGuess();
          store().getState().deselectAll();
          vi.advanceTimersByTime(500);
        }

        const found = store().getState().foundGroups;
        expect(found).toHaveLength(4);
        // g4 was found by the player — should be first
        expect(found[0].id).toBe('g4');
        // Remaining groups (g1, g2, g3) appended after
        const remainingIds = found.slice(1).map((g) => g.id);
        expect(remainingIds).toContain('g1');
        expect(remainingIds).toContain('g2');
        expect(remainingIds).toContain('g3');
      });

    });
  });

  // =========================================================
  // shuffleItems
  // =========================================================
  describe('shuffleItems', () => {
    it('keeps the same items after shuffling', () => {
      initializeTestGame();
      const originalIds = store().getState()
        .items.map((i: Item) => i.id)
        .sort((a: number, b: number) => a - b);

      store().getState().shuffleItems();

      const shuffledIds = store().getState()
        .items.map((i: Item) => i.id)
        .sort((a: number, b: number) => a - b);

      expect(shuffledIds).toEqual(originalIds);
    });

    it('has the same number of items after shuffling', () => {
      initializeTestGame();
      const originalLength = store().getState().items.length;
      store().getState().shuffleItems();
      expect(store().getState().items.length).toBe(originalLength);
    });

  });

  // =========================================================
  // deselectAll
  // =========================================================
  describe('deselectAll', () => {
    it('clears all selected item ids', () => {
      initializeTestGame();
      store().getState().selectItem(1);
      store().getState().selectItem(2);
      store().getState().selectItem(3);

      expect(store().getState().selectedItemIds).toHaveLength(3);

      store().getState().deselectAll();
      expect(store().getState().selectedItemIds).toEqual([]);
    });
  });

  // =========================================================
  // initializeGame
  // =========================================================
  describe('initializeGame', () => {
    it('sets items and groups', () => {
      const items = createTestItems();
      const groups = createTestGroups();
      store().getState().initializeGame(items, groups);

      const state = store().getState();
      expect(state.groups).toEqual(groups);
      // Items are shuffled, but should have same ids
      const stateIds = state.items.map((i) => i.id).sort((a, b) => a - b);
      const inputIds = items.map((i) => i.id).sort((a, b) => a - b);
      expect(stateIds).toEqual(inputIds);
    });

    it('resets all game state', () => {
      // Set up some dirty state first
      store().setState({
        selectedItemIds: [1, 2],
        mistakes: 3,
        gameStatus: 'lost',
        foundGroups: [makeGroup('g1', [1, 2, 3, 4])],
        previousGuesses: [[1, 2, 3, 4]],
        jumpingItemIds: [1, 2],
      });

      const items = createTestItems();
      const groups = createTestGroups();
      store().getState().initializeGame(items, groups);

      const state = store().getState();
      expect(state.selectedItemIds).toEqual([]);
      expect(state.foundGroups).toEqual([]);
      expect(state.previousGuesses).toEqual([]);
      expect(state.mistakes).toBe(0);
      expect(state.gameStatus).toBe('playing');
      expect(state.isLoading).toBe(false);
      expect(state.jumpingItemIds).toEqual([]);
    });
  });

  // =========================================================
  // restoreCompletedGame
  // =========================================================
  describe('restoreCompletedGame', () => {
    it('restores a won game state', () => {
      const groups = createTestGroups();
      store().getState().restoreCompletedGame(groups, true, 2);

      const state = store().getState();
      expect(state.gameStatus).toBe('won');
      expect(state.foundGroups).toEqual(groups);
      expect(state.groups).toEqual(groups);
      expect(state.mistakes).toBe(2);
      expect(state.items).toEqual([]);
      expect(state.selectedItemIds).toEqual([]);
    });

    it('restores a lost game state', () => {
      const groups = createTestGroups();
      store().getState().restoreCompletedGame(groups, false, 4);

      const state = store().getState();
      expect(state.gameStatus).toBe('lost');
      expect(state.foundGroups).toEqual(groups);
      expect(state.mistakes).toBe(4);
      expect(state.items).toEqual([]);
    });

    it('clears transient state', () => {
      store().setState({
        notification: 'test',
        isShaking: true,
        jumpingItemIds: [1, 2],
      });

      const groups = createTestGroups();
      store().getState().restoreCompletedGame(groups, true, 0);

      const state = store().getState();
      expect(state.notification).toBeNull();
      expect(state.isShaking).toBe(false);
      expect(state.jumpingItemIds).toEqual([]);
    });
  });

});
