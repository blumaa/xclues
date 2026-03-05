import { Text } from "@mond-design-system/theme";
import "./MistakesIndicator.css";
import { CountdownTimer } from "./CountdownTimer";

interface MistakesIndicatorProps {
  mistakes: number;
  maxMistakes: number;
  gameStatus: "playing" | "won" | "lost";
}

export function MistakesIndicator({
  mistakes,
  maxMistakes,
  gameStatus,
}: MistakesIndicatorProps) {
  const remainingMistakes = maxMistakes - mistakes;

  return (
    <div className="mistakes-container">
      {gameStatus === "playing" ? (
        <Text align="center" size="sm">
          Create four groups of four!
        </Text>
      ) : (
        <CountdownTimer />
      )}
      <div
        className="mistakes-row"
        role="status"
        aria-label={`${remainingMistakes} mistake${remainingMistakes !== 1 ? "s" : ""} remaining`}
      >
        <Text size="xs" weight="extralight">
          Mistakes remaining:
        </Text>
        <div className="mistakes-dots" aria-hidden="true">
          {Array.from({ length: maxMistakes }).map((_, index) => (
            <div
              key={index}
              className={`mistake-dot ${index < remainingMistakes ? "filled" : "empty"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
