import { useGameStore } from "../../store/gameStore";
import { GroupCard } from "../molecules/GroupCard";
import { ItemTile } from "../molecules/ItemTile";
import { ResultsPanel } from "./ResultsPanel";
import { GameSkeleton } from "../molecules/GameSkeleton";
import { WinCelebration } from "../molecules/WinCelebration";
import { HowToPlayBanner } from "../molecules/HowToPlayBanner";
import { XText } from "../atoms";
import type { GuessColor } from "../../types/stats";
import "./GameBoard.css";

interface GameBoardProps {
  genre: string;
  isLoading?: boolean;
  hasNoPuzzle?: boolean;
  guessHistory?: GuessColor[][] | null;
  showResults?: boolean;
  onViewPuzzle?: () => void;
}

export function GameBoard({
  genre,
  isLoading,
  hasNoPuzzle,
  guessHistory,
  showResults,
  onViewPuzzle,
}: GameBoardProps) {
  const items = useGameStore(genre, (s) => s.items);
  const foundGroups = useGameStore(genre, (s) => s.foundGroups);
  const selectedItemIds = useGameStore(genre, (s) => s.selectedItemIds);
  const gameStatus = useGameStore(genre, (s) => s.gameStatus);
  const isShaking = useGameStore(genre, (s) => s.isShaking);
  const jumpingItemIds = useGameStore(genre, (s) => s.jumpingItemIds);
  const rejectedItemId = useGameStore(genre, (s) => s.rejectedItemId);
  const selectItem = useGameStore(genre, (s) => s.selectItem);
  const mistakes = useGameStore(genre, (s) => s.mistakes);

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
              onClick={() => selectItem(item.id)}
            />
          ))}
      </div>
      <HowToPlayBanner />

      {gameStatus === "won" && <WinCelebration />}
    </div>
  );
}
