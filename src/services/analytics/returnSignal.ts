// Returning-player signal for analytics.
//
// Derived from the game history the browser already keeps for stats. Sends
// counts only (prior games, days since last play), never an identifier, so a
// returning player stays anonymous. Only completed games count: a player who
// started but never finished looks new. Days are UTC calendar days, matching
// the puzzle day boundary.

import type { GameResult } from '../../types/stats';
import { getTodayDate } from '../../utils/index';

export interface ReturnSignal {
  priorGames: number;
  daysSinceLast: number | null;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function utcDay(date: Date): number {
  return Date.parse(`${getTodayDate(date)}T00:00:00Z`);
}

export function returnSignal(
  history: GameResult[],
  genre: string,
  now: Date = new Date(),
): ReturnSignal {
  const games = history.filter((g) => g.genre === genre);
  if (games.length === 0) return { priorGames: 0, daysSinceLast: null };

  const last = Math.max(...games.map((g) => g.completedAt));
  const daysSinceLast = Math.round((utcDay(now) - utcDay(new Date(last))) / DAY_MS);
  return { priorGames: games.length, daysSinceLast };
}
