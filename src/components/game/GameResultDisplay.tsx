import { Box } from "@mond-design-system/theme";
import type { GuessColor } from "../../types/stats";
import "./GameResultDisplay.css";

interface GameResultDisplayProps {
  guessHistory: GuessColor[][];
}

const COLOR_MAP: Record<GuessColor, string> = {
  yellow: "#fbbf24",
  green: "#34d399",
  blue: "#60a5fa",
  purple: "#c084fc",
};

const COLOR_LABELS: Record<GuessColor, string> = {
  yellow: "yellow",
  green: "green",
  blue: "blue",
  purple: "purple",
};

export function GameResultDisplay({ guessHistory }: GameResultDisplayProps) {
  if (!guessHistory.length) {
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="xxs"
      role="img"
      aria-label={`Guess history: ${guessHistory.length} guesses made`}
    >
      {guessHistory.map((row, rowIndex) => (
        <div key={rowIndex} className="guess-row">
          {row.map((color, colIndex) => (
            <div
              key={colIndex}
              className="guess-square"
              style={{ backgroundColor: COLOR_MAP[color] }}
              aria-hidden="true"
              title={COLOR_LABELS[color]}
            />
          ))}
        </div>
      ))}
    </Box>
  );
}
