"use client";

import { useEffect } from "react";
import { GenrePanel, initBoard } from "../components/organisms/GenrePanel";
import { boardKey, useGameStore } from "../store/gameStore";
import { GameFooter } from "../components/organisms/GameFooter";
import { getAppStore } from "../store/appStore";
import { getStatsStore, STATS_STORAGE_KEY } from "../store/statsStore";
import { useTrackGameStart } from "../hooks/useTrackGameStart";
import type { Genre } from "../config/seoConfig";
import type { SavedPuzzle } from "../types";

interface ArchiveGameViewProps {
  genre: Genre;
  puzzleDate: string;
  puzzle: SavedPuzzle;
}

/**
 * One past puzzle, playable. Same board and controls as today's game; plays
 * are recorded as archive (no streaks, separate analytics mode).
 */
export function ArchiveGameView({ genre, puzzleDate, puzzle }: ArchiveGameViewProps) {
  // Board populated = stats hydrated and puzzle loaded (see effect below).
  const ready = useGameStore(boardKey(genre, puzzleDate), (s) => s.groups.length > 0);

  useEffect(() => {
    getStatsStore().getState().hydrate(STATS_STORAGE_KEY);
    // Header logo/branding follow the active genre. Today's game resets it
    // from its route on mount.
    getAppStore().getState().setActiveGenre(genre);
    initBoard(genre, puzzle, puzzleDate);
  }, [genre, puzzle, puzzleDate]);

  useTrackGameStart(genre, puzzleDate, "archive", ready);

  return (
    <div className="homepage-game">
      <GenrePanel genre={genre} puzzle={puzzle} puzzleDate={puzzleDate} mode="archive" />
      <GameFooter genre={genre} puzzleDate={puzzleDate} />
    </div>
  );
}
