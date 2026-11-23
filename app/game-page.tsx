"use client";

import { useEffect } from "react";
import { GenrePanel, initBoard } from "../src/components/organisms/GenrePanel";
import { GameFooter } from "../src/components/organisms/GameFooter";
import { useAppStore, getAppStore } from "../src/store/appStore";
import { getStatsStore, useStatsStore, STATS_STORAGE_KEY } from "../src/store/statsStore";
import { VALID_GENRES, type Genre } from "../src/config/seoConfig";
import type { SavedPuzzle } from "../src/types";
import { FeedbackModal } from "../src/components/organisms/FeedbackModal";
import {
  FEEDBACK_STORAGE_KEY,
  shouldShowSurvey,
} from "../src/services/feedback/survey";
import { useLocalStorage } from "../src/hooks/useLocalStorage";
import { useTrackGameStart } from "../src/hooks/useTrackGameStart";

interface GamePageProps {
  initialGenre: Genre;
  puzzleDate: string;
  puzzles: Record<Genre, SavedPuzzle | null>;
}

export function GamePage({ initialGenre, puzzleDate, puzzles }: GamePageProps) {
  const activeGenre = useAppStore((s) => s.activeGenre);
  const gameCount = useStatsStore((s) => s.gameHistory.length);
  const [feedbackSubmitted, setFeedbackSubmitted, feedbackHydrated] =
    useLocalStorage<string>(FEEDBACK_STORAGE_KEY, "");

  const initialized = useAppStore((s) => s.initialized);

  // Initialize stores once
  useEffect(() => {
    getStatsStore().getState().hydrate(STATS_STORAGE_KEY);
    getAppStore().getState().initialize(initialGenre, puzzleDate);

    for (const g of VALID_GENRES) {
      const puzzle = puzzles[g];
      if (puzzle) {
        initBoard(g, puzzle, puzzleDate);
      }
    }
  }, [initialGenre, puzzleDate, puzzles]);

  // Gated on initialized so the store's default 'films' can't leak a
  // spurious start before the real genre is set.
  useTrackGameStart(activeGenre, puzzleDate, "daily", initialized);

  // Paused during the difficulty-skew trial; survey.ts owns the switch.
  const feedbackOpen = shouldShowSurvey({
    hydrated: feedbackHydrated,
    gamesPlayed: gameCount,
    alreadyAnswered: feedbackSubmitted === "1",
  });

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
              <GenrePanel genre={genre} puzzle={puzzles[genre]} puzzleDate={puzzleDate} mode="daily" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer — outside carousel, shows controls for active genre */}
      <GameFooter genre={activeGenre} puzzleDate={puzzleDate} />

      <FeedbackModal
        isOpen={feedbackOpen}
        onSubmitted={() => setFeedbackSubmitted("1")}
      />
    </div>
  );
}
