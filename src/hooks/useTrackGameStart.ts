import { useEffect } from "react";
import { getStatsStore } from "../store/statsStore";
import { boardKey, useGameStore } from "../store/gameStore";
import { startGameId } from "../services/analytics/gameId";
import { trackGameEvent } from "../services/analytics/gameEvents";
import { returnSignal } from "../services/analytics/returnSignal";
import type { PlayMode } from "../types/stats";

/**
 * Logs `started` once per game, on the player's first move (a tile selection
 * or a restored guess). Not on page load: crawlers render pages and run
 * effects but never tap a tile, so a load-time start counted every bot visit
 * as a dropped game. The stored game id dedupes tab switches and reloads; a
 * finished game never logs a start. `enabled` gates the effect until the page
 * has set up its stores.
 */
export function useTrackGameStart(
  genre: string,
  puzzleDate: string,
  mode: PlayMode,
  enabled: boolean,
): void {
  const moved = useGameStore(
    boardKey(genre, puzzleDate),
    (s) => s.selectedItemIds.length > 0 || s.previousGuesses.length > 0,
  );

  useEffect(() => {
    if (!enabled || !moved) return;
    const stats = getStatsStore().getState();
    if (stats.getCompletedGame(genre, puzzleDate)) return;
    const { id, isNew } = startGameId(genre, puzzleDate, mode);
    if (!isNew) return;
    const returning = returnSignal(stats.gameHistory, genre);
    void trackGameEvent("started", { genre, puzzleDate, gameId: id, mode, returning });
  }, [enabled, moved, genre, puzzleDate, mode]);
}
