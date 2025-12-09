import { Box, Text } from "@mond-design-system/theme";
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
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      {gameStatus === "playing" ? (
        <Text align="center" size="xs">
          Create four groups of four!
        </Text>
      ) : (
        <CountdownTimer />
      )}
      <Box display="flex" gap="xs">
        <Text size="2xs" weight="extralight">
          Mistakes remaining:
        </Text>
        <div className="mistakes-dots">
          {Array.from({ length: maxMistakes }).map((_, index) => (
            <div
              key={index}
              className={`mistake-dot ${index < remainingMistakes ? "filled" : "empty"}`}
            />
          ))}
        </div>
      </Box>
    </Box>
  );
}
