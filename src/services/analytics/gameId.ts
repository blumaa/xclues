// Per-game analytics id.
//
// One random uuid per genre + puzzle date, minted when a game starts and sent
// with its `started` and finishing `won`/`lost` events, so drop-off can be
// counted exactly (started ids with no finish). Persisted so a reload resumes
// the same game instead of logging a second start. One key per genre: a new
// puzzle date overwrites the previous id, so storage never grows. Not tied to
// a person and cleared once the game ends.

const KEY_PREFIX = 'xclues-game-id-';

interface StoredGameId {
  puzzleDate: string;
  id: string;
}

function read(genre: string): StoredGameId | null {
  const raw = localStorage.getItem(KEY_PREFIX + genre);
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

export function getGameId(genre: string, puzzleDate: string): string | null {
  const stored = read(genre);
  return stored?.puzzleDate === puzzleDate ? stored.id : null;
}

export function startGameId(genre: string, puzzleDate: string): { id: string; isNew: boolean } {
  const existing = getGameId(genre, puzzleDate);
  if (existing) return { id: existing, isNew: false };

  const id = crypto.randomUUID();
  localStorage.setItem(KEY_PREFIX + genre, JSON.stringify({ puzzleDate, id }));
  return { id, isNew: true };
}

export function clearGameId(genre: string): void {
  localStorage.removeItem(KEY_PREFIX + genre);
}
