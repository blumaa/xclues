import { useEffect, useState } from "react";
import { XModal, XText, XButton, XIcon } from "../ui";
import { useStats } from "../../providers/useStats";
import { useSite } from "../../providers/useSite";
import { Stats } from "./Stats";
import { GameResultDisplay } from "./GameResultDisplay";
import { CountdownTimer } from "./CountdownTimer";
import { trackEvent, EVENTS } from "../../services/analytics";
import { generateShareText, shareResults } from "../../utils/shareResults";
import { ShareIcon } from "./ShareIcon";
import { getTodayDate } from "../../utils/index";
import type { UserStats } from "../../types";
import type { GuessColor } from "../../types/stats";

import "./ResultsModal.css";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameStatus: "won" | "lost";
  mistakes: number;
  guessHistory: GuessColor[][] | null;
}

export function ResultsModal({
  isOpen,
  onClose,
  gameStatus,
  mistakes,
  guessHistory,
}: ResultsModalProps) {
  const stats = useStats();
  const { siteName, domain } = useSite();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [copied, setCopied] = useState(false);

  // Load stats when modal opens
  useEffect(() => {
    if (isOpen) {
      stats
        .getStats()
        .then((loadedStats) => {
          setUserStats(loadedStats);
          trackEvent(EVENTS.STATS_VIEWED, {
            gamesPlayed: loadedStats.gamesPlayed,
            currentStreak: loadedStats.currentStreak,
            maxStreak: loadedStats.maxStreak,
          });
        })
        .catch(() => {
          // Stats may not be available yet
        });
    }
  }, [isOpen, stats]);

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
    <XModal isOpen={isOpen} onClose={onClose}>
      <div className="results-modal-content">
        <button className="results-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        {/* Result heading */}
        <div className="results-heading">
          <span className="results-heading-title">
            {gameStatus === "won" ? "You Won!" : "Game Over"}
          </span>
          <div className="results-heading-subtitle">
            <XText align="center">
              {gameStatus === "won"
                ? `You found all connections with ${mistakes} mistake${mistakes !== 1 ? "s" : ""}.`
                : "Better luck next time!"}
            </XText>
          </div>
        </div>

        {/* Stats section */}
        {userStats && <Stats stats={userStats} />}

        {/* Countdown */}
        <CountdownTimer />

        {/* Guess history visualization */}
        {guessHistory && guessHistory.length > 0 && (
          <div className="results-guess-history">
            <GameResultDisplay guessHistory={guessHistory} />
          </div>
        )}

        {/* Share button */}
        {guessHistory && guessHistory.length > 0 && (
          <div className="results-share">
            <XButton
              variant="outline"
              onClick={handleShare}
              size="md"
              aria-label={copied ? "Results copied to clipboard" : "Share your results"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                {!copied && (
                  <XIcon color="currentColor" size="sm">
                    <ShareIcon />
                  </XIcon>
                )}
                {copied ? "Copied!" : "Share Your Results"}
              </div>
            </XButton>
          </div>
        )}
      </div>
    </XModal>
  );
}
