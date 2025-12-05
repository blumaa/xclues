import { useEffect, useState } from "react";
import { Modal } from "@mond-design-system/theme/client";
import { Box, Heading, Text, Button, Icon } from "@mond-design-system/theme";
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
      <Box display="flex" flexDirection="column" gap="xxs" paddingTop="2">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading level={2} size="xl">
            {gameStatus === "won" ? "You Won!" : "Game Over"}
          </Heading>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Text>
            {gameStatus === "won"
              ? `You found all connections with ${mistakes} mistake${mistakes !== 1 ? "s" : ""}.`
              : "Better luck next time!"}
          </Text>
        </Box>

        {userStats && <Stats stats={userStats} />}

        <CountdownTimer />

        {guessHistory && guessHistory.length > 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            paddingTop="2"
            paddingBottom="2"
          >
            <GameResultDisplay guessHistory={guessHistory} />
          </Box>
        )}

        {guessHistory && guessHistory.length > 0 && (
          <Box display="flex" justifyContent="center" paddingBottom="2">
            <Button variant="outline" onClick={handleShare} size="sm">
              <Box display="flex" alignItems="center" gap="xxs">
                {!copied && (
                  <Icon color="currentColor" size="sm">
                    <ShareIcon />
                  </Icon>
                )}
                {copied ? "Copied!" : "Share Your Results"}
              </Box>
            </Button>
          </Box>
        )}

        <Box display="flex" justifyContent="center" padding="2" border="subtle">
          <Button variant="primary" onClick={onClose} size="lg">
            Back to Game
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
