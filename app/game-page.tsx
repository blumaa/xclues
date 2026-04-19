"use client";

import { useEffect, useMemo, useState } from "react";
import { GameBoard } from "../src/components/organisms/GameBoard";
import { GameControls } from "../src/components/organisms/GameControls";
import { MistakesIndicator } from "../src/components/molecules/MistakesIndicator";
import { XButton } from "../src/components/atoms";
import { useGameStore, getGameStore } from "../src/store/gameStore";
import { useAppStore, getAppStore } from "../src/store/appStore";
import { getStatsStore, useStatsStore } from "../src/store/statsStore";
import { useToast } from "../src/providers/useToast";
import { guessesToColorHistory } from "../src/utils/guessHistory";
import { VALID_GENRES, type Genre } from "../src/config/seoConfig";
import type { SavedPuzzle } from "../src/types";
import { trackGameEvent } from "../src/services/analytics/gameEvents";
import { FeedbackModal, FEEDBACK_STORAGE_KEY } from "../src/components/organisms/FeedbackModal";
import { useLocalStorage } from "../src/hooks/useLocalStorage";

const STATS_STORAGE_KEY = "xclues-stats";
const MAX_MISTAKES = 4;
const MAX_SELECTIONS = 4;

interface GamePageProps {
  initialGenre: Genre;
  puzzleDate: string;
  puzzles: Record<Genre, SavedPuzzle | null>;
}

function initGenre(genre: Genre, puzzle: SavedPuzzle, puzzleDate: string) {
  const appStore = getAppStore();
  if (appStore.getState().puzzlesReady[genre]) return;

  const statsStore = getStatsStore();
  const completed = statsStore.getState().getCompletedGame(genre, puzzleDate);
  const gameStore = getGameStore(genre);

  if (completed) {
    gameStore.getState().restoreCompletedGame(puzzle.groups, completed.won, completed.mistakes);
  } else {
    gameStore.getState().initializeGame(puzzle.items, puzzle.groups, puzzleDate, genre);
    void trackGameEvent('started', { genre, puzzleDate });
  }

  appStore.getState().markPuzzleReady(genre);
}

/**
 * One genre's board + results logic. Self-contained so each carousel
 * panel manages its own showResults/viewingPuzzle state independently.
 */
function GenrePanel({ genre, puzzle, puzzleDate }: {
  genre: Genre;
  puzzle: SavedPuzzle | null;
  puzzleDate: string;
}) {
  const gameStatus = useGameStore(genre, (s) => s.gameStatus);
  const groups = useGameStore(genre, (s) => s.groups);
  const previousGuesses = useGameStore(genre, (s) => s.previousGuesses);
  const mistakes = useGameStore(genre, (s) => s.mistakes);

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
    });

    void trackGameEvent(gameStatus === "won" ? "won" : "lost", { genre, puzzleDate });
  }, [gameStatus, genre, puzzleDate, mistakes, previousGuesses, groups, isGameOver]);

  return (
    <>
      <GameBoard
        genre={genre}
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

const FEEDBACK_THRESHOLD = 3;

export function GamePage({ initialGenre, puzzleDate, puzzles }: GamePageProps) {
  const activeGenre = useAppStore((s) => s.activeGenre);
  const { showInfo } = useToast();
  const gameCount = useStatsStore((s) => s.gameHistory.length);
  const [feedbackDismissed, setFeedbackDismissed] = useLocalStorage<string>(
    FEEDBACK_STORAGE_KEY,
    "",
  );

  // Initialize stores once
  useEffect(() => {
    getStatsStore().getState().hydrate(STATS_STORAGE_KEY);
    getAppStore().getState().initialize(initialGenre, puzzleDate);

    for (const g of VALID_GENRES) {
      const puzzle = puzzles[g];
      if (puzzle) {
        initGenre(g, puzzle, puzzleDate);
      }
    }
  }, [initialGenre, puzzleDate, puzzles]);

  const feedbackOpen = gameCount >= FEEDBACK_THRESHOLD && feedbackDismissed !== "1";

  // Active genre state for footer controls
  const gameStatus = useGameStore(activeGenre, (s) => s.gameStatus);
  const mistakes = useGameStore(activeGenre, (s) => s.mistakes);
  const selectedItemIds = useGameStore(activeGenre, (s) => s.selectedItemIds);
  const notification = useGameStore(activeGenre, (s) => s.notification);
  const submitGuess = useGameStore(activeGenre, (s) => s.submitGuess);
  const shuffleItems = useGameStore(activeGenre, (s) => s.shuffleItems);
  const deselectAll = useGameStore(activeGenre, (s) => s.deselectAll);

  useEffect(() => {
    if (notification) showInfo(notification);
  }, [notification, showInfo]);

  // Carousel: slide to the active genre's panel
  const activeIndex = VALID_GENRES.indexOf(activeGenre);

  return (
    <div className="homepage-game">
      {/* Carousel viewport — clips off-screen boards */}
      <div className="carousel-viewport">
        {/* Track — holds all 3 boards side by side, shifts via translateX */}
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {VALID_GENRES.map((genre) => (
            <div key={genre} className="carousel-panel">
              <GenrePanel genre={genre} puzzle={puzzles[genre]} puzzleDate={puzzleDate} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer — outside carousel, shows controls for active genre */}
      <div className="game-footer">
        {gameStatus === "playing" && (
          <>
            <MistakesIndicator mistakes={mistakes} maxMistakes={MAX_MISTAKES} />
            <GameControls
              onSubmit={submitGuess}
              onShuffle={shuffleItems}
              onDeselect={deselectAll}
              hasSelection={selectedItemIds.length > 0}
              canSubmit={selectedItemIds.length === MAX_SELECTIONS}
            />
          </>
        )}
      </div>

      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackDismissed("1")} />
    </div>
  );
}
