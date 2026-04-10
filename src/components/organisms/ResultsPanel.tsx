import { useEffect, useState } from "react";
import { XText, XButton, XIcon } from "../atoms";
import { useStats } from "../../providers/useStats";
import { useSite } from "../../providers/useSite";
import { Stats } from "../molecules/Stats";
import { GameResultDisplay } from "../molecules/GameResultDisplay";
import { CountdownTimer } from "../molecules/CountdownTimer";
import { trackEvent, EVENTS } from "../../services/analytics";
import { generateShareText, shareResults } from "../../utils/shareResults";
import { ShareIcon } from "../atoms/ShareIcon";
import { getTodayDate } from "../../utils/index";
import { getGenreStats } from "../../services/LocalStatsStorage";
import type { GenreStats } from "../../services/LocalStatsStorage";
import type { GuessColor } from "../../types/stats";

import "./ResultsPanel.css";

interface ResultsPanelProps {
  gameStatus: "won" | "lost";
  mistakes: number;
  genre: string;
  guessHistory: GuessColor[][] | null;
  onViewPuzzle?: () => void;
}

export function ResultsPanel({
  gameStatus,
  mistakes,
  genre,
  guessHistory,
  onViewPuzzle,
}: ResultsPanelProps) {
  const stats = useStats();
  const context = useSite();
  const siteName = context?.siteName || "xClues";
  const domain = context?.domain || "xclues.space";
  const [genreStats, setGenreStats] = useState<GenreStats | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    stats
      .getStats()
      .then((loadedStats) => {
        const derived = getGenreStats(loadedStats.gameHistory, genre);
        setGenreStats(derived);
        trackEvent(EVENTS.STATS_VIEWED, {
          gamesPlayed: derived.gamesPlayed,
          currentStreak: derived.currentStreak,
          maxStreak: derived.maxStreak,
        });
      })
      .catch(() => {});
  }, [stats, genre]);

  const handleShare = async () => {
    if (!guessHistory) return;

    const shareText = generateShareText({
      siteName,
      puzzleDate: getTodayDate(),
      guessHistory,
      domain,
    });

    const success = await shareResults(shareText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="results-panel">
      <span className="results-panel__heading">
        {gameStatus === "won" ? "You Won!" : "Game Over"}
      </span>
      <XText align="center" size="sm">
        {gameStatus === "won"
          ? `Found all connections with ${mistakes} mistake${mistakes !== 1 ? "s" : ""}.`
          : "Better luck next time!"}
      </XText>

      {genreStats && <Stats stats={genreStats} />}

      {guessHistory && guessHistory.length > 0 && (
        <GameResultDisplay guessHistory={guessHistory} />
      )}

      <div className="results-panel__actions">
        {guessHistory && guessHistory.length > 0 && (
          <XButton
            variant="outline"
            onClick={handleShare}
            size="sm"
            aria-label={copied ? "Results copied to clipboard" : "Share your results"}
          >
            <div className="results-panel__share-btn-content">
              {!copied && (
                <XIcon color="currentColor" size="sm">
                  <ShareIcon />
                </XIcon>
              )}
              {copied ? "Copied!" : "Share"}
            </div>
          </XButton>
        )}
        <CountdownTimer />
      </div>

      {onViewPuzzle && (
        <XButton variant="ghost" size="sm" onClick={onViewPuzzle}>
          View Puzzle
        </XButton>
      )}
    </div>
  );
}
