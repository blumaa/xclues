import { Box, Button } from "@mond-design-system/theme";
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
    <Box display="flex" gap="sm" justifyContent="center" className="game-controls">
      <Button
        variant="outline"
        onClick={onShuffle}
        size="md"
        corners="rounded-xl"
        aria-label="Shuffle tiles"
      >
        Shuffle
      </Button>
      <Button
        variant="outline"
        onClick={onDeselect}
        size="md"
        disabled={!hasSelection}
        corners="rounded-xl"
        aria-label="Deselect all tiles"
      >
        Deselect All
      </Button>
      <Button
        variant="primary"
        onClick={onSubmit}
        size="md"
        disabled={!canSubmit}
        corners="rounded-xl"
        aria-label="Submit guess"
      >
        Submit
      </Button>
    </Box>
  );
}
