"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { GameBoard } from "../src/components/organisms/GameBoard";
import { ResultsModal } from "../src/components/organisms/ResultsModal";
import { useGameStore } from "../src/store/gameStore";
import { useStats } from "../src/providers/useStats";
import { guessesToColorHistory } from "../src/utils/guessHistory";
import { XText } from "../src/components/atoms";
import type { Genre } from "../src/config/seoConfig";
import type { Item, Group } from "../src/types";
import type { GuessColor } from "../src/types/stats";

interface Puzzle {
  items: Item[];
  groups: Group[];
}

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

  const { data: puzzle } = useQuery<Puzzle | null>({
    queryKey: ['puzzle', genre, puzzleDate],
    queryFn: () => Promise.resolve(null), // Data is hydrated
  });

  const [resultsDismissed, setResultsDismissed] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showResultsDelayed, setShowResultsDelayed] = useState(false);
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

  // Show results modal after delay
  useEffect(() => {
    if (gameStatus === "won" || gameStatus === "lost") {
      const timer = setTimeout(() => setShowResultsDelayed(true), 2000);
      return () => clearTimeout(timer);
    }
    
    requestAnimationFrame(() => {
      setShowResultsDelayed(false);
      setResultsDismissed(false);
    });
  }, [gameStatus]);

  const showResults = (showResultsDelayed && !resultsDismissed) || showStats;

  if (!puzzle) {
    return (
      <div className="homepage-state" role="status">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "var(--xclues-spacing-lg)" }}>
          <XText size="lg" weight="semibold">No puzzle available for today</XText>
          <XText semantic="secondary">Check back soon!</XText>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="homepage-game">
        <GameBoard genre={genre} onViewStats={() => setShowStats(true)} />
      </div>
      {(gameStatus === "won" || gameStatus === "lost" || showStats) && (
        <ResultsModal
          isOpen={showResults}
          onClose={() => {
            setResultsDismissed(true);
            setShowStats(false);
          }}
          gameStatus={gameStatus as "won" | "lost"}
          mistakes={mistakes}
          guessHistory={currentGuessHistory}
        />
      )}
    </>
  );
}
