import { XButton, XIcon, XText } from "../ui";
import StatsIcon from "./StatsIcon";
import PuzzleSubmitIcon from "./PuzzleSubmitIcon";

interface PostGameActionsProps {
  onViewStats?: () => void;
  onCreatePuzzle: () => void;
}

export function PostGameActions({
  onViewStats,
  onCreatePuzzle,
}: PostGameActionsProps) {
  return (
    <div className="game-actions">
      {onViewStats && (
        <XButton
          variant="ghost"
          size="sm"
          onClick={onViewStats}
          aria-label="View statistics"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <XIcon size="lg">
              <StatsIcon />
            </XIcon>
            <XText responsive size="xs">
              Stats
            </XText>
          </div>
        </XButton>
      )}
      <XButton
        variant="ghost"
        size="sm"
        onClick={onCreatePuzzle}
        aria-label="Create a new puzzle"
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <XIcon size="lg">
            <PuzzleSubmitIcon />
          </XIcon>
          <XText responsive size="xs">
            Create Puzzle
          </XText>
        </div>
      </XButton>
    </div>
  );
}
