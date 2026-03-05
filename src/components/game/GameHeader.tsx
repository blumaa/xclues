import { Box, Heading } from "@mond-design-system/theme";
import { useSite } from "../../providers/useSite";
import { formatPuzzleHeader } from "../../utils/index";
import "./GameHeader.css";

interface GameHeaderProps {
  puzzleDate?: string; // YYYY-MM-DD format
}

export function GameHeader({ puzzleDate }: GameHeaderProps) {
  const { siteName } = useSite();

  return (
    <Box display="flex" flexDirection="column" className="game-header">
      <Heading level={1} size="md" align="center">
        <span className="game-header-title">
          {puzzleDate ? formatPuzzleHeader(puzzleDate, siteName) : siteName}
        </span>
      </Heading>
    </Box>
  );
}
