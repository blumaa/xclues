import { boardKey, useGameStore } from "../../store/gameStore";
import { GroupCard } from "../molecules/GroupCard";
import { ItemTile } from "../molecules/ItemTile";
import { ResultsPanel } from "./ResultsPanel";
import { GameSkeleton } from "../molecules/GameSkeleton";
import { WinCelebration } from "../molecules/WinCelebration";
import { XText } from "../atoms";
import type { GuessColor, PlayMode } from "../../types/stats";
import "./GameBoard.css";

interface GameBoardProps {
  genre: string;
  puzzleDate: string;
  mode?: PlayMode;
  isLoading?: boolean;
  hasNoPuzzle?: boolean;
  guessHistory?: GuessColor[][] | null;
  showResults?: boolean;
  onViewPuzzle?: () => void;
}

export function GameBoard({
  genre,
  puzzleDate,
  mode = "daily",
  isLoading,
  hasNoPuzzle,
  guessHistory,
  showResults,
  onViewPuzzle,
}: GameBoardProps) {
  const key = boardKey(genre, puzzleDate);
  const items = useGameStore(key, (s) => s.items);
  const foundGroups = useGameStore(key, (s) => s.foundGroups);
  const selectedItemIds = useGameStore(key, (s) => s.selectedItemIds);
  const gameStatus = useGameStore(key, (s) => s.gameStatus);
  const isShaking = useGameStore(key, (s) => s.isShaking);
  const jumpingItemIds = useGameStore(key, (s) => s.jumpingItemIds);
  const rejectedItemId = useGameStore(key, (s) => s.rejectedItemId);
  const selectItem = useGameStore(key, (s) => s.selectItem);
  const mistakes = useGameStore(key, (s) => s.mistakes);

  if (isLoading) {
    return <div className="game-board"><GameSkeleton /></div>;
  }

  if (hasNoPuzzle) {
    return (
      <div className="game-board">
        <div className="game-board__empty">
          <XText size="lg" weight="semibold">No puzzle available for today</XText>
          <XText semantic="secondary">Check back soon!</XText>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="game-board">
        <ResultsPanel
          gameStatus={gameStatus as "won" | "lost"}
          mistakes={mistakes}
          genre={genre}
          guessHistory={guessHistory || null}
          puzzleDate={puzzleDate}
          mode={mode}
          onViewPuzzle={onViewPuzzle}
        />
      </div>
    );
  }

  return (
    <div className="game-board">
      <div className="game-grid">
        {foundGroups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}

        {items.length > 0 &&
          gameStatus === "playing" &&
          items.map((item) => (
            <ItemTile
              key={item.id}
              item={item}
              isSelected={selectedItemIds.includes(item.id)}
              isShaking={isShaking}
              isJumping={jumpingItemIds.includes(item.id)}
              isRejected={item.id === rejectedItemId}
              onSelect={selectItem}
            />
          ))}
      </div>

      {gameStatus === "won" && <WinCelebration />}
    </div>
  );
}
