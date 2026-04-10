import { describe, it, expect, beforeEach } from 'vitest';
import { getAppStore, resetAppStore } from '../appStore';

describe('appStore', () => {
  beforeEach(() => {
    resetAppStore();
  });

  it('defaults to films genre', () => {
    const store = getAppStore();
    expect(store.getState().activeGenre).toBe('films');
  });

  it('defaults puzzlesReady to all false', () => {
    const store = getAppStore();
    const ready = store.getState().puzzlesReady;
    expect(ready.films).toBe(false);
    expect(ready.books).toBe(false);
    expect(ready.music).toBe(false);
  });

  it('setActiveGenre updates the active genre', () => {
    const store = getAppStore();
    store.getState().setActiveGenre('books');
    expect(store.getState().activeGenre).toBe('books');
  });

  it('markPuzzleReady marks a single genre as ready', () => {
    const store = getAppStore();
    store.getState().markPuzzleReady('films');

    expect(store.getState().puzzlesReady.films).toBe(true);
    expect(store.getState().puzzlesReady.books).toBe(false);
    expect(store.getState().puzzlesReady.music).toBe(false);
  });

  it('markPuzzleReady can mark multiple genres independently', () => {
    const store = getAppStore();
    store.getState().markPuzzleReady('films');
    store.getState().markPuzzleReady('music');

    expect(store.getState().puzzlesReady.films).toBe(true);
    expect(store.getState().puzzlesReady.books).toBe(false);
    expect(store.getState().puzzlesReady.music).toBe(true);
  });

  it('initialize sets genre and puzzleDate', () => {
    const store = getAppStore();
    store.getState().initialize('books', '2026-04-10');

    expect(store.getState().activeGenre).toBe('books');
    expect(store.getState().puzzleDate).toBe('2026-04-10');
  });
});
