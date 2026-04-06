import { XButton } from "../ui";
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
    <div className="game-controls" style={{ display: 'flex', gap: 'var(--xclues-spacing-sm, 0.5rem)', justifyContent: 'center' }}>
      <XButton
        variant="outline"
        onClick={onShuffle}
        size="md"
        aria-label="Shuffle tiles"
      >
        Shuffle
      </XButton>
      <XButton
        variant="outline"
        onClick={onDeselect}
        size="md"
        disabled={!hasSelection}
        aria-label="Deselect all tiles"
      >
        Deselect All
      </XButton>
      <XButton
        variant="primary"
        onClick={onSubmit}
        size="md"
        disabled={!canSubmit}
        aria-label="Submit guess"
      >
        Submit
      </XButton>
    </div>
  );
}
