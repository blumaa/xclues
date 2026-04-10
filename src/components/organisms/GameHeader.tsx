import { useSite } from "../../providers/useSite";
import { formatPuzzleHeader } from "../../utils/index";
import { XHeading } from "../atoms";
import "./GameHeader.css";

interface GameHeaderProps {
  puzzleDate?: string; // YYYY-MM-DD format
}

export function GameHeader({ puzzleDate }: GameHeaderProps) {
  const context = useSite();
  const siteName = context?.siteName || "xClues";

  return (
    <div className="game-header">
      <XHeading level={1} size="md" align="center">
        <span className="game-header-title">
          {puzzleDate ? formatPuzzleHeader(puzzleDate, siteName) : siteName}
        </span>
      </XHeading>
    </div>
  );
}
