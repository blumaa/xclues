import { Box, Heading, Text } from "@mond-design-system/theme";
import { useSite } from "../../providers/useSite";
import { formatPuzzleHeader } from "../../utils/index";
import { CountdownTimer } from "./CountdownTimer";
import "./GameHeader.css";

interface GameHeaderProps {
  gameStatus: "playing" | "won" | "lost";
  puzzleDate?: string; // YYYY-MM-DD format
}

export function GameHeader({
  gameStatus,
  puzzleDate,
}: GameHeaderProps) {
  const { siteName } = useSite();

  return (
    <Box display="flex" flexDirection="column">
      <Heading level={1} size="md" align="center">
        {puzzleDate ? formatPuzzleHeader(puzzleDate, siteName) : siteName}
      </Heading>

      {gameStatus === "playing" ? (
        <Text align="center" size="xs">
          Create four groups of four!
        </Text>
      ) : (
        <CountdownTimer />
      )}
    </Box>
  );
}
