"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { GameBoard } from "../src/components/organisms/GameBoard";
import { useGameStore } from "../src/store/gameStore";
import { useStats } from "../src/providers/useStats";
import { guessesToColorHistory } from "../src/utils/guessHistory";
import { useDailyPuzzle } from "../src/lib/supabase/storage/usePuzzleStorage";
import { useStorage } from "../src/providers/useStorage";
import type { Genre } from "../src/config/seoConfig";
import type { GuessColor } from "../src/types/stats";

interface GamePageProps {
  genre: Genre;
  puzzleDate: string;
}

export function GamePage({ genre, puzzleDate }: GamePageProps) {
  const gameStatus = useGameStore(genre, (s) => s.gameStatus);
  const groups = useGameStore(genre, (s) => s.groups);
  const mistakes = useGameStore(genre, (s) => s.mistakes);
  const previousGuesses = useGameStore(genre, (s) => s.previousGuesses);
  const initializeGame = useGameStore(genre, (s) => s.initializeGame);
  const restoreCompletedGame = useGameStore(genre, (s) => s.restoreCompletedGame);

  const storage = useStorage();
  const { data: puzzle, isPending } = useDailyPuzzle(puzzleDate, genre, storage);

  const [recordedDate, setRecordedDate] = useState<string | null>(null);
  const [restoredGuessHistory, setRestoredGuessHistory] = useState<GuessColor[][] | null>(null);
  const stats = useStats();
  const initializedRef = useRef<string | null>(null);

  // Initialize store when puzzle or genre changes — restore completed games from stats
  useEffect(() => {
    if (!puzzle) return;
    const key = `${genre}-${puzzleDate}`;
    if (initializedRef.current === key) return;
    initializedRef.current = key;

    stats.getStats().then((userStats) => {
      const completed = userStats.gameHistory.find((r) => r.date === puzzleDate && r.genre === genre);
      if (completed) {
        restoreCompletedGame(puzzle.groups, completed.won, completed.mistakes);
        setRestoredGuessHistory(completed.guessHistory || null);
        setRecordedDate(puzzleDate);
      } else {
        setRestoredGuessHistory(null);
        initializeGame(puzzle.items, puzzle.groups, puzzleDate, genre);
      }
    }).catch(() => {
      setRestoredGuessHistory(null);
      initializeGame(puzzle.items, puzzle.groups, puzzleDate, genre);
    });
  }, [puzzle, genre, puzzleDate, initializeGame, restoreCompletedGame, stats]);

  const liveGuessHistory = useMemo(() => {
    if (previousGuesses.length > 0 && groups.length > 0) {
      return guessesToColorHistory(previousGuesses, groups);
    }
    return null;
  }, [previousGuesses, groups]);

  // Use live history (from current game) or restored history (from stats)
  const currentGuessHistory = liveGuessHistory || restoredGuessHistory;

  // Record game completion
  useEffect(() => {
    const isGameOver = gameStatus === "won" || gameStatus === "lost";
    if (isGameOver && recordedDate !== puzzleDate) {
      stats
        .recordCompletion({
          date: puzzleDate,
          genre,
          won: gameStatus === "won",
          mistakes,
          guessHistory: currentGuessHistory || [],
          completedAt: Date.now(),
        })
        .then(() => setRecordedDate(puzzleDate))
        .catch(() => {});
    }
  }, [gameStatus, recordedDate, puzzleDate, genre, mistakes, currentGuessHistory, stats]);

  return (
    <div className="homepage-game">
      <GameBoard
        genre={genre}
        isLoading={isPending || (!!puzzle && gameStatus === 'playing' && groups.length === 0)}
        hasNoPuzzle={!isPending && !puzzle}
        guessHistory={currentGuessHistory}
      />
    </div>
  );
}
