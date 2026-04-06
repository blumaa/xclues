import { useEffect, useState, useMemo } from "react";
import { useGameStore } from "../store/gameStore";
import { GameBoard } from "../components/game/GameBoard";
import { GameSkeleton } from "../components/game/GameSkeleton";
import { ResultsModal } from "../components/game/ResultsModal";
import { useStorage } from "../providers/useStorage";
import { useStats } from "../providers/useStats";
import { useSite } from "../providers/useSite";
import { useDailyPuzzle } from "../lib/supabase/storage";
import { getTodayDate } from "../utils/index";
import { guessesToColorHistory } from "../utils/guessHistory";
import { trackEvent, EVENTS } from "../services/analytics";
import { XText } from "../components/ui";
import type { GameResult } from "../types";
import "./HomePage.css";

export function HomePage() {
  const { gameStatus, groups, mistakes, previousGuesses, initializeGame, restoreCompletedGame, restoreInProgressGame } =
    useGameStore();
  const [resultsDismissed, setResultsDismissed] = useState(false);
  const [showResultsDelayed, setShowResultsDelayed] = useState(false);
  const [recordedDate, setRecordedDate] = useState<string | null>(null);
  const [alreadyPlayedToday, setAlreadyPlayedToday] =
    useState<GameResult | null>(null);
  const [statsLoaded, setStatsLoaded] = useState(false);

  // Get site config for genre
  const { genre } = useSite();

  // Derive guess history from current game or restored game
  const currentGuessHistory = useMemo(() => {
    // If we have guesses from current session, compute colors
    if (previousGuesses.length > 0 && groups.length > 0) {
      return guessesToColorHistory(previousGuesses, groups);
    }
    // If restored from saved game, use persisted history
    if (alreadyPlayedToday?.guessHistory) {
      return alreadyPlayedToday.guessHistory;
    }
    return null;
  }, [previousGuesses, groups, alreadyPlayedToday]);

  // Get storage and load today's puzzle
  const storage = useStorage();
  const stats = useStats();
  const today = getTodayDate();
  const {
    data: puzzle,
    isLoading,
    error,
  } = useDailyPuzzle(today, genre, storage);

  // Check if user has already played today
  useEffect(() => {
    stats
      .getStats()
      .then((userStats) => {
        const todaysGame = userStats.gameHistory.find(
          (game) => game.date === today,
        );
        if (todaysGame) {
          setAlreadyPlayedToday(todaysGame);
        }
        setStatsLoaded(true);
      })
      .catch(() => {
        setStatsLoaded(true);
      });
  }, [stats, today]);

  // Initialize game when puzzle loads (only if not already played)
  useEffect(() => {
    if (puzzle && statsLoaded && !alreadyPlayedToday) {
      // Try to restore in-progress game first
      const restored = restoreInProgressGame(today, puzzle.groups, genre);
      if (restored) {
        trackEvent(EVENTS.GAME_RESUMED, {
          puzzleId: puzzle.id,
          puzzleDate: today,
          genre,
        });
        return;
      }
      initializeGame(puzzle.items, puzzle.groups, today, genre);
      trackEvent(EVENTS.GAME_STARTED, {
        puzzleId: puzzle.id,
        puzzleDate: today,
        genre,
      });
    } else if (puzzle && statsLoaded && alreadyPlayedToday) {
      // Restore completed game state for display
      restoreCompletedGame(
        puzzle.groups,
        alreadyPlayedToday.won,
        alreadyPlayedToday.mistakes,
      );
      trackEvent(EVENTS.GAME_RESUMED, {
        puzzleId: puzzle.id,
        puzzleDate: today,
        mistakesSoFar: alreadyPlayedToday.mistakes,
        genre,
      });
    }
  }, [
    puzzle,
    statsLoaded,
    alreadyPlayedToday,
    initializeGame,
    restoreCompletedGame,
    restoreInProgressGame,
    today,
    genre,
  ]);

  // Record game completion when game ends
  useEffect(() => {
    const isGameOver = gameStatus === "won" || gameStatus === "lost";
    const notYetRecorded = recordedDate !== today;

    if (isGameOver && notYetRecorded) {
      // Convert guesses to color history for persistence
      const guessHistory = guessesToColorHistory(previousGuesses, groups);

      const result: GameResult = {
        date: today,
        won: gameStatus === "won",
        mistakes,
        completedAt: Date.now(),
        guessHistory,
      };

      stats
        .recordCompletion(result)
        .then(() => {
          setRecordedDate(today);
        })
        .catch((error) => {
          console.error("Failed to record game completion:", error);
        });
    }
  }, [gameStatus, recordedDate, today, mistakes, stats, previousGuesses, groups]);

  // Add delay before showing results modal (only for freshly completed games)
  useEffect(() => {
    // If returning to a completed game, show immediately (0ms)
    // Otherwise, delay for 2 seconds
    const isGameOver = gameStatus === "won" || gameStatus === "lost";
    const delay = isGameOver ? (alreadyPlayedToday ? 0 : 2000) : 0;
    const timer = setTimeout(() => {
      setShowResultsDelayed(isGameOver);
    }, delay);
    return () => clearTimeout(timer);
  }, [gameStatus, alreadyPlayedToday]);

  // Derive modal visibility from game status, delay, and dismissal state
  const showResults = showResultsDelayed && !resultsDismissed;

  const handleCloseResults = () => {
    setResultsDismissed(true);
  };

  if (isLoading || !statsLoaded) {
    return (
      <div className="homepage-state" role="status" aria-label="Loading puzzle">
        <GameSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage-state" role="alert">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--xclues-spacing-lg, 1.5rem)' }}>
          <XText size="lg" weight="semibold">Failed to load puzzle</XText>
          <XText semantic="secondary">{error.message}</XText>
        </div>
      </div>
    );
  }

  if (!puzzle || !groups.length) {
    return (
      <div className="homepage-state" role="status">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--xclues-spacing-lg, 1.5rem)' }}>
          <XText size="lg" weight="semibold">No puzzle available for today</XText>
          <XText semantic="secondary">Check back soon!</XText>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage-game">
      <GameBoard onViewStats={() => setResultsDismissed(false)} />
      <ResultsModal
        isOpen={showResults}
        onClose={handleCloseResults}
        gameStatus={gameStatus === "playing" ? "won" : gameStatus}
        mistakes={mistakes}
        guessHistory={currentGuessHistory}
      />
    </div>
  );
}
