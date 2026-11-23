"use client";

import { useEffect, useMemo, useState } from "react";
import { GameBoard } from "./GameBoard";
import { XButton } from "../atoms";
import { boardKey, getGameStore, useGameStore } from "../../store/gameStore";
import { getStatsStore, useStatsStore } from "../../store/statsStore";
import { guessesToColorHistory } from "../../utils/guessHistory";
import { trackGameEvent } from "../../services/analytics/gameEvents";
import { clearGameId, getGameId } from "../../services/analytics/gameId";
import type { SavedPuzzle } from "../../types";
import type { PlayMode } from "../../types/stats";

/**
 * Load a puzzle into its board once. A board already holding groups was set
 * up earlier in this session (e.g. user went to how-to-play and back).
 */
export function initBoard(genre: string, puzzle: SavedPuzzle, puzzleDate: string): void {
  const gameStore = getGameStore(boardKey(genre, puzzleDate));
  if (gameStore.getState().groups.length > 0) return;

  const completed = getStatsStore().getState().getCompletedGame(genre, puzzleDate);
  if (completed) {
    gameStore.getState().restoreCompletedGame(puzzle.groups, completed.won, completed.mistakes);
  } else {
    gameStore.getState().initializeGame(puzzle.items, puzzle.groups, puzzleDate, genre);
  }
}

interface GenrePanelProps {
  genre: string;
  puzzle: SavedPuzzle | null;
  puzzleDate: string;
  mode: PlayMode;
}

/**
 * One board + results logic. Self-contained so each panel manages its own
 * showResults/viewingPuzzle state independently.
 */
export function GenrePanel({ genre, puzzle, puzzleDate, mode }: GenrePanelProps) {
  const key = boardKey(genre, puzzleDate);
  const gameStatus = useGameStore(key, (s) => s.gameStatus);
  const groups = useGameStore(key, (s) => s.groups);
  const previousGuesses = useGameStore(key, (s) => s.previousGuesses);
  const mistakes = useGameStore(key, (s) => s.mistakes);

  const storePopulated = groups.length > 0;
  const isGameOver = gameStatus === "won" || gameStatus === "lost";

  const [resultsReady, setResultsReady] = useState(false);
  const [viewingPuzzle, setViewingPuzzle] = useState(false);

  useEffect(() => {
    if (!isGameOver) return;
    const timer = setTimeout(() => setResultsReady(true), 2000);
    return () => clearTimeout(timer);
  }, [isGameOver]);

  const showResults = isGameOver && resultsReady;

  const liveGuessHistory = useMemo(() => {
    if (previousGuesses.length > 0 && groups.length > 0) {
      return guessesToColorHistory(previousGuesses, groups);
    }
    return null;
  }, [previousGuesses, groups]);

  const storedGuessHistory = useStatsStore((s) => {
    const completed = s.getCompletedGame(genre, puzzleDate);
    return completed?.guessHistory || null;
  });

  const currentGuessHistory = liveGuessHistory || storedGuessHistory;
  const isShowingResults = showResults && !viewingPuzzle;

  // Record completion
  useEffect(() => {
    if (!isGameOver) return;
    const statsStore = getStatsStore();
    if (statsStore.getState().getCompletedGame(genre, puzzleDate)) return;

    const guessHistory = previousGuesses.length > 0 && groups.length > 0
      ? guessesToColorHistory(previousGuesses, groups)
      : [];

    statsStore.getState().recordCompletion({
      date: puzzleDate,
      genre,
      won: gameStatus === "won",
      mistakes,
      guessHistory,
      completedAt: Date.now(),
      ...(mode === "archive" && { archive: true }),
    });

    void trackGameEvent(gameStatus === "won" ? "won" : "lost", {
      genre,
      puzzleDate,
      gameId: getGameId(genre, puzzleDate, mode),
      mode,
    });
    clearGameId(genre, mode);
  }, [gameStatus, genre, puzzleDate, mode, mistakes, previousGuesses, groups, isGameOver]);

  return (
    <>
      <GameBoard
        genre={genre}
        puzzleDate={puzzleDate}
        mode={mode}
        isLoading={!storePopulated && !!puzzle}
        hasNoPuzzle={!puzzle}
        guessHistory={currentGuessHistory}
        showResults={isShowingResults}
        onViewPuzzle={() => setViewingPuzzle(true)}
      />
      {/* View Results button when viewing puzzle post-game */}
      {isGameOver && viewingPuzzle && (
        <div className="game-footer__view-results">
          <XButton variant="ghost" size="sm" onClick={() => setViewingPuzzle(false)}>
            View Results
          </XButton>
        </div>
      )}
    </>
  );
}
