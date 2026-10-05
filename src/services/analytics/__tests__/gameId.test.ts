import { describe, it, expect, beforeEach } from 'vitest';
import { clearGameId, getGameId, startGameId } from '../gameId';

beforeEach(() => {
  localStorage.clear();
});

describe('startGameId', () => {
  it('mints a new uuid the first time a game starts', () => {
    const { id, isNew } = startGameId('films', '2026-10-05');
    expect(isNew).toBe(true);
    expect(id).toMatch(/^[0-9a-f-]{36}$/);
  });

  it('reuses the stored id on reload instead of starting a new game', () => {
    const first = startGameId('films', '2026-10-05');
    const second = startGameId('films', '2026-10-05');
    expect(second).toEqual({ id: first.id, isNew: false });
  });

  it('keeps separate ids per genre', () => {
    const films = startGameId('films', '2026-10-05');
    const books = startGameId('books', '2026-10-05');
    expect(books.isNew).toBe(true);
    expect(books.id).not.toBe(films.id);
  });

  it('replaces a stale id left over from an earlier puzzle date', () => {
    const yesterday = startGameId('films', '2026-10-04');
    const today = startGameId('films', '2026-10-05');
    expect(today.isNew).toBe(true);
    expect(today.id).not.toBe(yesterday.id);
    expect(getGameId('films', '2026-10-04')).toBeNull();
  });

  it('mints a new id when the stored value is corrupt', () => {
    localStorage.setItem('xclues-game-id-films', 'not json');
    expect(startGameId('films', '2026-10-05').isNew).toBe(true);
  });
});

describe('getGameId', () => {
  it('returns the id for the matching genre and date', () => {
    const { id } = startGameId('music', '2026-10-05');
    expect(getGameId('music', '2026-10-05')).toBe(id);
  });

  it('returns null when no game was started', () => {
    expect(getGameId('music', '2026-10-05')).toBeNull();
  });
});

describe('clearGameId', () => {
  it('removes the id once the game ends', () => {
    startGameId('films', '2026-10-05');
    clearGameId('films');
    expect(getGameId('films', '2026-10-05')).toBeNull();
  });
});
