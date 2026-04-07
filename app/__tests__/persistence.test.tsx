import { describe, it, expect, beforeEach } from 'vitest';
import { getGameStore, resetAllStores } from '../../src/store/gameStore';

describe('Navigation Persistence and State', () => {
  beforeEach(() => {
    resetAllStores();
  });

  it('each genre maintains its own game state across switches', () => {
    const filmsStore = getGameStore('films');
    const booksStore = getGameStore('books');

    // 1. Initialize films
    filmsStore.getState().initializeGame([{ id: 1, title: 'F1' }], [], '2026-04-07', 'films');
    expect(filmsStore.getState().items[0].id).toBe(1);

    // 2. Initialize books — films state is unaffected
    booksStore.getState().initializeGame([{ id: 2, title: 'B1' }], [], '2026-04-07', 'books');
    expect(booksStore.getState().items[0].id).toBe(2);
    expect(filmsStore.getState().items[0].id).toBe(1);

    // 3. Complete films — books state is unaffected
    filmsStore.getState().restoreCompletedGame([], true, 0);
    expect(filmsStore.getState().gameStatus).toBe('won');
    expect(booksStore.getState().gameStatus).toBe('playing');
  });

  it('switching back to a completed genre preserves won state', () => {
    const filmsStore = getGameStore('films');

    filmsStore.getState().restoreCompletedGame([], true, 2);

    // Simulate switching away and back — store instance is still the same
    const filmsStoreAgain = getGameStore('films');
    expect(filmsStoreAgain.getState().gameStatus).toBe('won');
    expect(filmsStoreAgain.getState().mistakes).toBe(2);
  });
});
