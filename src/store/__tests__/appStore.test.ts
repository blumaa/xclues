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

  it('setActiveGenre updates the active genre', () => {
    const store = getAppStore();
    store.getState().setActiveGenre('books');
    expect(store.getState().activeGenre).toBe('books');
  });

  it('initialize sets genre and puzzleDate', () => {
    const store = getAppStore();
    store.getState().initialize('books', '2026-04-10');

    expect(store.getState().activeGenre).toBe('books');
    expect(store.getState().puzzleDate).toBe('2026-04-10');
  });

  it('a later initialize opens the genre of the route it came from', () => {
    const store = getAppStore();
    store.getState().initialize('films', '2026-04-10');
    store.getState().setActiveGenre('books'); // e.g. archive page header
    store.getState().initialize('music', '2026-04-10');
    expect(store.getState().activeGenre).toBe('music');
  });
});
