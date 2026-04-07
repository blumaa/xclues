import { describe, it, expect, beforeEach } from 'vitest';
import { getGameStore, resetAllStores } from '../gameStore';
import type { Item, Group } from '../../types';

function makeGroup(id: string, itemIds: number[]): Group {
  return {
    id,
    items: itemIds.map((i) => ({ id: i, title: `Item ${i}` })),
    connection: `Connection ${id}`,
    difficulty: 'easy',
    color: 'yellow',
  };
}

describe('genre-keyed game stores', () => {
  beforeEach(() => {
    resetAllStores();
  });

  it('each genre gets its own isolated store', () => {
    const filmsStore = getGameStore('films');
    const booksStore = getGameStore('books');

    const items: Item[] = [{ id: 1, title: 'Film 1' }];
    filmsStore.getState().initializeGame(items, [], '2026-04-07', 'films');

    expect(filmsStore.getState().items.length).toBeGreaterThan(0);
    expect(booksStore.getState().items).toEqual([]);
    expect(booksStore.getState().gameStatus).toBe('playing');
  });

  it('completing one genre does not affect another', () => {
    const filmsStore = getGameStore('films');
    const booksStore = getGameStore('books');
    const groups = [
      makeGroup('g1', [1, 2, 3, 4]),
      makeGroup('g2', [5, 6, 7, 8]),
      makeGroup('g3', [9, 10, 11, 12]),
      makeGroup('g4', [13, 14, 15, 16]),
    ];

    filmsStore.getState().restoreCompletedGame(groups, true, 2);

    expect(filmsStore.getState().gameStatus).toBe('won');
    expect(booksStore.getState().gameStatus).toBe('playing');
    expect(booksStore.getState().foundGroups).toEqual([]);
  });

  it('returns the same store instance for the same genre', () => {
    const store1 = getGameStore('films');
    const store2 = getGameStore('films');
    expect(store1).toBe(store2);
  });

  it('returns different store instances for different genres', () => {
    const filmsStore = getGameStore('films');
    const booksStore = getGameStore('books');
    expect(filmsStore).not.toBe(booksStore);
  });
});
