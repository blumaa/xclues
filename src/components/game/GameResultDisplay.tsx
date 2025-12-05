import { Box } from "@mond-design-system/theme";
import type { GuessColor } from "../../types/stats";
import "./GameResultDisplay.css";

interface GameResultDisplayProps {
  guessHistory: GuessColor[][];
}

const COLOR_MAP: Record<GuessColor, string> = {
  yellow: "#f9df6d",
  green: "#a0c35a",
  blue: "#b0c4ef",
  purple: "#ba81c5",
};

export function GameResultDisplay({ guessHistory }: GameResultDisplayProps) {
  if (!guessHistory.length) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="xxs">
      {guessHistory.map((row, rowIndex) => (
        <div key={rowIndex} className="guess-row">
          {row.map((color, colIndex) => (
            <div
              key={colIndex}
              className="guess-square"
              style={{ backgroundColor: COLOR_MAP[color] }}
            />
          ))}
        </div>
      ))}
    </Box>
  );
}
