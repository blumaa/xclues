import { XButton, XIcon, XText, StatsIcon } from "../atoms";
import "./PostGameActions.css";

interface PostGameActionsProps {
  onViewStats: () => void;
}

export function PostGameActions({
  onViewStats,
}: PostGameActionsProps) {
  return (
    <div className="game-actions">
      <XButton
        variant="ghost"
        size="sm"
        onClick={onViewStats}
        aria-label="View statistics"
      >
        <div className="game-action-content">
          <XIcon size="lg">
            <StatsIcon />
          </XIcon>
          <XText responsive size="xs">
            Stats
          </XText>
        </div>
      </XButton>
    </div>
  );
}
