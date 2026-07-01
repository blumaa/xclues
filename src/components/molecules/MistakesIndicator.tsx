import { Dot, XText } from "../atoms";
import "./MistakesIndicator.css";

interface MistakesIndicatorProps {
  mistakes: number;
  maxMistakes: number;
}

export function MistakesIndicator({
  mistakes,
  maxMistakes,
}: MistakesIndicatorProps) {
  const remainingMistakes = maxMistakes - mistakes;

  return (
    <div className="mistakes-container">
      <div className="mistakes-row" role="status">
        <XText size="xs" weight="light">
          mistakes:
        </XText>
        {/* Visually-hidden live text: changing text (not an aria-label) is what
            screen readers reliably announce when the count updates. */}
        <span className="sr-only">
          {`${remainingMistakes} mistake${remainingMistakes !== 1 ? "s" : ""} remaining`}
        </span>
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
