import { useGameStore } from "../../store/gameStore";
import { useToast } from "../../providers/useToast";
import { GroupCard } from "../molecules/GroupCard";
import { ItemTile } from "../molecules/ItemTile";
import { GameControls } from "./GameControls";
import { MistakesIndicator } from "../molecules/MistakesIndicator";
import { PostGameActions } from "../molecules/PostGameActions";
import { WinCelebration } from "../molecules/WinCelebration";
import { GameSkeleton } from "../molecules/GameSkeleton";
import { XText } from "../atoms";
import { useEffect } from "react";
import "./GameBoard.css";

interface GameBoardProps {
  genre: string;
  isLoading?: boolean;
  hasNoPuzzle?: boolean;
  onViewStats?: () => void;
}

export function GameBoard({ genre, isLoading, hasNoPuzzle, onViewStats }: GameBoardProps) {
  const items = useGameStore(genre, (s) => s.items);
  const foundGroups = useGameStore(genre, (s) => s.foundGroups);
  const selectedItemIds = useGameStore(genre, (s) => s.selectedItemIds);
  const mistakes = useGameStore(genre, (s) => s.mistakes);
  const notification = useGameStore(genre, (s) => s.notification);
  const gameStatus = useGameStore(genre, (s) => s.gameStatus);
  const isShaking = useGameStore(genre, (s) => s.isShaking);
  const jumpingItemIds = useGameStore(genre, (s) => s.jumpingItemIds);
  const rejectedItemId = useGameStore(genre, (s) => s.rejectedItemId);
  const selectItem = useGameStore(genre, (s) => s.selectItem);
  const deselectAll = useGameStore(genre, (s) => s.deselectAll);
  const submitGuess = useGameStore(genre, (s) => s.submitGuess);
  const shuffleItems = useGameStore(genre, (s) => s.shuffleItems);

  const { showInfo } = useToast();

  const MAX_MISTAKES = 4;
  const MAX_SELECTIONS = 4;

  // Show toast when notification changes
  useEffect(() => {
    if (notification) {
      showInfo(notification);
    }
  }, [notification, showInfo]);

  const renderContent = () => {
    if (isLoading) {
      return <GameSkeleton />;
    }

    if (hasNoPuzzle) {
      return (
        <div className="game-board__empty">
          <XText size="lg" weight="semibold">No puzzle available for today</XText>
          <XText semantic="secondary">Check back soon!</XText>
        </div>
      );
    }

    return (
      <>
        <div className="game-grid">
          {foundGroups.length > 0 &&
            foundGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))
          }

          {items.length > 0 && gameStatus === "playing" &&
            items.map((item) => (
              <ItemTile
                key={item.id}
                item={item}
                isSelected={selectedItemIds.includes(item.id)}
                isShaking={isShaking}
                isJumping={jumpingItemIds.includes(item.id)}
                isRejected={item.id === rejectedItemId}
                onClick={() => selectItem(item.id)}
              />
            ))
          }
        </div>

        <div className="game-board__footer">
          {gameStatus === "playing" ? (
            <MistakesIndicator
              mistakes={mistakes}
              maxMistakes={MAX_MISTAKES}
              gameStatus={gameStatus}
            />
          ) : (
            <PostGameActions onViewStats={onViewStats!} />
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
        </div>

        {gameStatus === "won" && <WinCelebration />}
      </>
    );
  };

  return (
    <div className="game-board">
      {renderContent()}
    </div>
  );
}
