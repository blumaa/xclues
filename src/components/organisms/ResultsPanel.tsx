import { useState } from "react";
import { XText, XButton, XIcon } from "../atoms";
import { useSite } from "../../providers/useSite";
import { Stats } from "../molecules/Stats";
import { GameResultDisplay } from "../molecules/GameResultDisplay";
import { CountdownTimer } from "../molecules/CountdownTimer";
import { buildShareUrl, generateShareText, shareResults } from "../../utils/shareResults";
import { ShareIcon } from "../atoms/ShareIcon";
import { isValidGenre } from "../../config/seoConfig";
import { getStatsStore } from "../../store/statsStore";
import type { GuessColor, PlayMode } from "../../types/stats";
import { PuzzleFeedbackModal } from "./PuzzleFeedbackModal";

import "./ResultsPanel.css";

interface ResultsPanelProps {
  gameStatus: "won" | "lost";
  mistakes: number;
  genre: string;
  guessHistory: GuessColor[][] | null;
  puzzleDate: string;
  mode?: PlayMode;
  onViewPuzzle?: () => void;
}

export function ResultsPanel({
  gameStatus,
  mistakes,
  genre,
  guessHistory,
  puzzleDate,
  mode = "daily",
  onViewPuzzle,
}: ResultsPanelProps) {
  const context = useSite();
  const siteName = context?.siteName || "xClues";
  const domain = context?.domain || "xclues.space";
  const [copied, setCopied] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Read stats synchronously from the stats store (SSOT)
  const genreStats = getStatsStore().getState().getGenreStats(genre);

  const handleShare = async () => {
    if (!guessHistory) return;

    const shareText = generateShareText({
      siteName,
      puzzleDate,
      guessHistory,
      domain,
      genre: isValidGenre(genre) ? genre : undefined,
    });

    const success = await shareResults(shareText, buildShareUrl(domain));
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

      <Stats stats={genreStats} />

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
        {mode === "archive" ? (
          <a href={`/${genre}`} className="xbtn xbtn--outline xbtn--sm">
            Play today&apos;s puzzle
          </a>
        ) : (
          <CountdownTimer />
        )}
      </div>

      <div className="results-panel__links">
        {onViewPuzzle && (
          <XButton variant="ghost" size="sm" onClick={onViewPuzzle}>
            View Puzzle
          </XButton>
        )}
        {isValidGenre(genre) && (
          <>
            <XButton variant="ghost" size="sm" onClick={() => setFeedbackOpen(true)}>
              Send Feedback
            </XButton>
            <PuzzleFeedbackModal
              isOpen={feedbackOpen}
              onClose={() => setFeedbackOpen(false)}
              genre={genre}
              puzzleDate={puzzleDate}
            />
          </>
        )}
      </div>
    </div>
  );
}
