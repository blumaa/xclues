import { XButton } from "../atoms";
import "./GameControls.css";

interface GameControlsProps {
  onSubmit: () => void;
  onShuffle: () => void;
  onDeselect: () => void;
  hasSelection: boolean;
  canSubmit: boolean;
}

export function GameControls({
  onSubmit,
  onShuffle,
  onDeselect,
  hasSelection,
  canSubmit,
}: GameControlsProps) {
  return (
    <div className="game-controls">
      <XButton
        variant="outline"
        onClick={onShuffle}
        size="sm"
        aria-label="Shuffle tiles"
      >
        Shuffle
      </XButton>
      <XButton
        variant="outline"
        onClick={onDeselect}
        size="sm"
        disabled={!hasSelection}
        aria-label="Deselect all tiles"
      >
        Deselect All
      </XButton>
      <XButton
        variant="primary"
        onClick={onSubmit}
        size="sm"
        disabled={!canSubmit}
        aria-label="Submit guess"
      >
        Submit
      </XButton>
    </div>
  );
}
