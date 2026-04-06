import type { GuessColor } from "../../types/stats";
import "./GameResultDisplay.css";

interface GameResultDisplayProps {
  guessHistory: GuessColor[][];
}

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
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
      role="img"
      aria-label={`Guess history: ${guessHistory.length} guesses made`}
    >
      {guessHistory.map((row, rowIndex) => (
        <div key={rowIndex} className="guess-row">
          {row.map((color, colIndex) => (
            <div
              key={colIndex}
              className={`guess-square guess-square--${color}`}
              role="img"
              aria-label={COLOR_LABELS[color]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
