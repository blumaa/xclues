import { useSite } from "../../providers/useSite";
import { formatPuzzleHeader } from "../../utils/index";
import { XHeading } from "../ui";
import "./GameHeader.css";

interface GameHeaderProps {
  puzzleDate?: string; // YYYY-MM-DD format
}

export function GameHeader({ puzzleDate }: GameHeaderProps) {
  const { siteName } = useSite();

  return (
    <div className="game-header" style={{ display: 'flex', flexDirection: 'column' }}>
      <XHeading level={1} size="md" align="center">
        <span className="game-header-title">
          {puzzleDate ? formatPuzzleHeader(puzzleDate, siteName) : siteName}
        </span>
      </XHeading>
    </div>
  );
}
