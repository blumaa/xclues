import { useEffect, useState } from "react";
import { Modal } from "@mond-design-system/theme/client";
import { Box, Text, Button, Icon } from "@mond-design-system/theme";
import { useStats } from "../../providers/useStats";
import { useSite } from "../../providers/useSite";
import { Stats } from "./Stats";
import { GameResultDisplay } from "./GameResultDisplay";
import { CountdownTimer } from "./CountdownTimer";
import { trackEvent, EVENTS } from "../../services/analytics";
import { generateShareText, copyToClipboard } from "../../utils/shareResults";
import { ShareIcon } from "./ShareIcon";
import { getTodayDate } from "../../utils/index";
import type { UserStats } from "../../types";
import type { GuessColor } from "../../types/stats";
import { AboutLinks } from "../about";
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
        .catch((error) => {
          console.error("Failed to load stats:", error);
        });

      const timer = setTimeout(() => {
        stats
          .getStats()
          .then(setUserStats)
          .catch((error) => {
            console.error("Failed to reload stats:", error);
          });
      }, 100);

      return () => clearTimeout(timer);
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

    const success = await copyToClipboard(shareText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="results-modal-content">
        {/* Result heading */}
        <div className="results-heading">
          <span className="results-heading-title">
            {gameStatus === "won" ? "You Won!" : "Game Over"}
          </span>
          <div className="results-heading-subtitle">
            <Text align="center">
              {gameStatus === "won"
                ? `You found all connections with ${mistakes} mistake${mistakes !== 1 ? "s" : ""}.`
                : "Better luck next time!"}
            </Text>
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
            <Button
              variant="outline"
              onClick={handleShare}
              size="md"
              aria-label={copied ? "Results copied to clipboard" : "Share your results"}
            >
              <Box display="flex" alignItems="center" gap="xxs">
                {!copied && (
                  <Icon color="currentColor" size="sm">
                    <ShareIcon />
                  </Icon>
                )}
                {copied ? "Copied!" : "Share Your Results"}
              </Box>
            </Button>
          </div>
        )}

        {/* Back to game */}
        <div className="results-back">
          <Button variant="primary" onClick={onClose} size="lg" fullWidth>
            Back to Game
          </Button>
        </div>

        <AboutLinks />
      </div>
    </Modal>
  );
}
