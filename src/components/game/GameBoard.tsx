import { Box, Button, Icon, Text } from "@mond-design-system/theme";
import { useGameStore } from "../../store/gameStore";
import { useToast } from "../../providers/useToast";
import { GroupCard } from "./GroupCard";
import { ItemGrid } from "./ItemGrid";
import { GameControls } from "./GameControls";
import { GameHeader } from "./GameHeader";
import { MistakesIndicator } from "./MistakesIndicator";
import StatsIcon from "./StatsIcon";
import { useEffect } from "react";
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
    selectItem,
    deselectAll,
    submitGuess,
    shuffleItems,
  } = useGameStore();

  const { showInfo } = useToast();

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
        <GameHeader
          gameStatus={gameStatus}
          puzzleDate={puzzleDate || undefined}
        />

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
            onSelectItem={selectItem}
          />
        )}

        {gameStatus === "playing" ? (
          <MistakesIndicator mistakes={mistakes} maxMistakes={MAX_MISTAKES} />
        ) : (
          onViewStats && (
            <Box display="flex" justifyContent="center">
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
            </Box>
          )
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
    </Box>
  );
}
