import type { GameResult } from "../types/stats";

/** One finished game on this device. */
export interface ArchiveResult {
  won: boolean;
  mistakes: number;
}

/** This genre's finished games by date. Daily and archive plays both count. */
export function archiveResultsByDate(
  history: GameResult[],
  genre: string,
): Record<string, ArchiveResult> {
  const results: Record<string, ArchiveResult> = {};
  for (const game of history) {
    if (game.genre !== genre) continue;
    results[game.date] = { won: game.won, mistakes: game.mistakes };
  }
  return results;
}
