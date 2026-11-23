import { useEffect } from "react";
import { getStatsStore } from "../store/statsStore";
import { startGameId } from "../services/analytics/gameId";
import { trackGameEvent } from "../services/analytics/gameEvents";
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
    if (getStatsStore().getState().getCompletedGame(genre, puzzleDate)) return;
    const { id, isNew } = startGameId(genre, puzzleDate, mode);
    if (!isNew) return;
    void trackGameEvent("started", { genre, puzzleDate, gameId: id, mode });
  }, [enabled, genre, puzzleDate, mode]);
}
