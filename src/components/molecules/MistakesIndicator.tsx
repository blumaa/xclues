import { Dot, XText } from "../atoms";
import "./MistakesIndicator.css";

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
      <div
        className="mistakes-row"
        role="status"
        aria-label={`${remainingMistakes} mistake${remainingMistakes !== 1 ? "s" : ""} remaining`}
      >
        <XText size="xs" weight="light">
          mistakes:
        </XText>
        <div className="mistakes-dots" aria-hidden="true">
          {Array.from({ length: maxMistakes }).map((_, index) => (
            <Dot
              key={index}
              size="sm"
              variant={index < remainingMistakes ? "filled" : "empty"}
              className={`mistake-dot ${index < remainingMistakes ? "mistake-dot--filled" : "mistake-dot--empty"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
