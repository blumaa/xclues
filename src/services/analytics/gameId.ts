// Per-game analytics id.
//
// One random uuid per genre + puzzle date, minted when a game starts and sent
// with its `started` and finishing `won`/`lost` events, so drop-off can be
// counted exactly (started ids with no finish). Persisted so a reload resumes
// the same game instead of logging a second start. One key per genre: a new
// puzzle date overwrites the previous id, so storage never grows. Not tied to
// a person and cleared once the game ends. Archive plays use their own slot,
// so replaying a past date never clobbers an unfinished daily game.

import type { PlayMode } from '../../types/stats';

const KEY_PREFIX = 'xclues-game-id-';

function storageKey(genre: string, mode: PlayMode): string {
  return mode === 'archive' ? `${KEY_PREFIX}archive-${genre}` : KEY_PREFIX + genre;
}

interface StoredGameId {
  puzzleDate: string;
  id: string;
}

function read(genre: string, mode: PlayMode): StoredGameId | null {
  const raw = localStorage.getItem(storageKey(genre, mode));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredGameId>;
    return typeof parsed.id === 'string' && typeof parsed.puzzleDate === 'string'
      ? { id: parsed.id, puzzleDate: parsed.puzzleDate }
      : null;
  } catch {
    // Corrupt value: treat as absent; startGameId overwrites it.
    return null;
  }
}

export function getGameId(
  genre: string,
  puzzleDate: string,
  mode: PlayMode = 'daily',
): string | null {
  const stored = read(genre, mode);
  return stored?.puzzleDate === puzzleDate ? stored.id : null;
}

export function startGameId(
  genre: string,
  puzzleDate: string,
  mode: PlayMode = 'daily',
): { id: string; isNew: boolean } {
  const existing = getGameId(genre, puzzleDate, mode);
  if (existing) return { id: existing, isNew: false };

  const id = crypto.randomUUID();
  localStorage.setItem(storageKey(genre, mode), JSON.stringify({ puzzleDate, id }));
  return { id, isNew: true };
}

export function clearGameId(genre: string, mode: PlayMode = 'daily'): void {
  localStorage.removeItem(storageKey(genre, mode));
}
