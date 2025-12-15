import { Box, Button, Icon, Text } from "@mond-design-system/theme";
import { useGameStore } from "../../store/gameStore";
import { useToast } from "../../providers/useToast";
import { GroupCard } from "./GroupCard";
import { ItemGrid } from "./ItemGrid";
import { GameControls } from "./GameControls";
import { GameHeader } from "./GameHeader";
import { MistakesIndicator } from "./MistakesIndicator";
import StatsIcon from "./StatsIcon";
import PuzzleSubmitIcon from "./PuzzleSubmitIcon";
import { PuzzleSubmitDrawer } from "./PuzzleSubmitDrawer";
import { usePuzzleSubmit } from "../../hooks/usePuzzleSubmit";
import { trackEvent, EVENTS } from "../../services/analytics";
import { useEffect, useState } from "react";
import "./GameBoard.css";

interface GameBoardProps {
  onViewStats?: () => void;
}

export function GameBoard({ onViewStats }: GameBoardProps) {
  const {
    items,
    foundGroups,
    selectedItemIds,
    mistakes,
    notification,
    gameStatus,
    isShaking,
    puzzleDate,
    jumpingItemIds,
    rejectedItemId,
    selectItem,
    deselectAll,
    submitGuess,
    shuffleItems,
  } = useGameStore();

  const { showInfo, showSuccess, showError } = useToast();
  const [isSubmitDrawerOpen, setIsSubmitDrawerOpen] = useState(false);
  const { mutateAsync: submitPuzzle, isPending: isSubmitting } =
    usePuzzleSubmit();

  const MAX_MISTAKES = 4;
  const MAX_SELECTIONS = 4;

  // Show toast when notification changes
  useEffect(() => {
    if (notification) {
      showInfo(notification);
    }
  }, [notification, showInfo]);

  return (
    <Box>
      <Box display="flex" flexDirection="column" gap="sm">
        <GameHeader puzzleDate={puzzleDate || undefined} />

        {/* Found groups as colored rows */}
        {foundGroups.length > 0 && (
          <div className="found-groups-container">
            {foundGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}

        {/* Remaining item tiles in dynamic grid */}
        {items.length > 0 && gameStatus === "playing" && (
          <ItemGrid
            items={items}
            selectedItemIds={selectedItemIds}
            isShaking={isShaking}
            jumpingItemIds={jumpingItemIds}
            rejectedItemId={rejectedItemId}
            onSelectItem={selectItem}
          />
        )}

        {gameStatus === "playing" ? (
          <MistakesIndicator
            mistakes={mistakes}
            maxMistakes={MAX_MISTAKES}
            gameStatus={gameStatus}
          />
        ) : (
          <Box display="flex" justifyContent="center" gap="md">
            {onViewStats && (
              <Button variant="ghost" size="sm" onClick={onViewStats}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Icon size="lg">
                    <StatsIcon />
                  </Icon>
                  <Text responsive size="xs">
                    Stats
                  </Text>
                </Box>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                trackEvent(EVENTS.CREATE_PUZZLE_CLICKED);
                setIsSubmitDrawerOpen(true);
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Icon size="lg">
                  <PuzzleSubmitIcon />
                </Icon>
                <Text responsive size="xs">
                  Create Puzzle
                </Text>
              </Box>
            </Button>
          </Box>
        )}

        {gameStatus === "playing" && (
          <GameControls
            onSubmit={submitGuess}
            onShuffle={shuffleItems}
            onDeselect={deselectAll}
            hasSelection={selectedItemIds.length > 0}
            canSubmit={selectedItemIds.length === MAX_SELECTIONS}
          />
        )}
      </Box>

      <PuzzleSubmitDrawer
        isOpen={isSubmitDrawerOpen}
        onClose={() => setIsSubmitDrawerOpen(false)}
        onSubmit={async (submission) => {
          try {
            await submitPuzzle(submission);
            trackEvent(EVENTS.PUZZLE_SUBMITTED);
            setIsSubmitDrawerOpen(false);
            showSuccess(
              "Your puzzle has been submitted! Look for it in the next month of puzzles.",
            );
          } catch (error) {
            showError(
              error instanceof Error
                ? error.message
                : "Failed to submit puzzle",
            );
          }
        }}
        isSubmitting={isSubmitting}
      />
    </Box>
  );
}
