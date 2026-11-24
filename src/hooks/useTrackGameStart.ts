import { useEffect } from "react";
import { getStatsStore } from "../store/statsStore";
import { startGameId } from "../services/analytics/gameId";
import { trackGameEvent } from "../services/analytics/gameEvents";
import { returnSignal } from "../services/analytics/returnSignal";
import type { PlayMode } from "../types/stats";

/**
 * Logs `started` once per game. The stored game id dedupes tab switches and
 * reloads; a finished game never logs a start. `enabled` gates the effect
 * until the page has set up its stores.
 */
export function useTrackGameStart(
  genre: string,
  puzzleDate: string,
  mode: PlayMode,
  enabled: boolean,
): void {
  useEffect(() => {
    if (!enabled) return;
    const stats = getStatsStore().getState();
    if (stats.getCompletedGame(genre, puzzleDate)) return;
    const { id, isNew } = startGameId(genre, puzzleDate, mode);
    if (!isNew) return;
    const returning = returnSignal(stats.gameHistory, genre);
    void trackGameEvent("started", { genre, puzzleDate, gameId: id, mode, returning });
  }, [enabled, genre, puzzleDate, mode]);
}
