import { useGameStore } from "../../store/gameStore";
import { useToast } from "../../providers/useToast";
import { GroupCard } from "./GroupCard";
import { ItemGrid } from "./ItemGrid";
import { GameControls } from "./GameControls";
import { GameHeader } from "./GameHeader";
import { MistakesIndicator } from "./MistakesIndicator";
import { PostGameActions } from "./PostGameActions";
import { WinCelebration } from "./WinCelebration";
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
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--xclues-spacing-md)" }}>
        <GameHeader puzzleDate={puzzleDate || undefined} />

        {/* Found groups as colored rows */}
        {foundGroups.length > 0 && (
          <section
            className="found-groups-container"
            aria-label="Found groups"
          >
            {foundGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </section>
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
          <PostGameActions
            onViewStats={onViewStats}
            onCreatePuzzle={() => {
              trackEvent(EVENTS.CREATE_PUZZLE_CLICKED);
              setIsSubmitDrawerOpen(true);
            }}
          />
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

        {gameStatus === "won" && <WinCelebration />}
      </div>

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
    </div>
  );
}
