import { useGameStore } from "../../store/gameStore";
import { useToast } from "../../providers/useToast";
import { GroupCard } from "../molecules/GroupCard";
import { ItemTile } from "../molecules/ItemTile";
import { GameControls } from "./GameControls";
import { MistakesIndicator } from "../molecules/MistakesIndicator";
import { ResultsPanel } from "./ResultsPanel";
import { WinCelebration } from "../molecules/WinCelebration";
import { GameSkeleton } from "../molecules/GameSkeleton";
import { HowToPlayBanner } from "../molecules/HowToPlayBanner";
import { XText, XButton } from "../atoms";
import { useEffect, useState } from "react";
import type { GuessColor } from "../../types/stats";
import "./GameBoard.css";

interface GameBoardProps {
  genre: string;
  isLoading?: boolean;
  hasNoPuzzle?: boolean;
  guessHistory?: GuessColor[][] | null;
}

export function GameBoard({
  genre,
  isLoading,
  hasNoPuzzle,
  guessHistory,
}: GameBoardProps) {
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

  const isGameOver = gameStatus === "won" || gameStatus === "lost";
  const [showResults, setShowResults] = useState(false);
  const [viewingPuzzle, setViewingPuzzle] = useState(false);

  // Show results after delay when game ends
  useEffect(() => {
    if (!isGameOver) {
      requestAnimationFrame(() => {
        setShowResults(false);
        setViewingPuzzle(false);
      });
      return;
    }
    const timer = setTimeout(() => setShowResults(true), 2000);
    return () => clearTimeout(timer);
  }, [isGameOver]);

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
          <XText size="lg" weight="semibold">
            No puzzle available for today
          </XText>
          <XText semantic="secondary">Check back soon!</XText>
        </div>
      );
    }

    // Post-game: show results in the grid area (unless viewing puzzle)
    if (showResults && !viewingPuzzle) {
      return (
        <ResultsPanel
          gameStatus={gameStatus as "won" | "lost"}
          mistakes={mistakes}
          genre={genre}
          guessHistory={guessHistory || null}
          onViewPuzzle={() => setViewingPuzzle(true)}
        />
      );
    }

    return (
      <>
        <HowToPlayBanner />
        <div className="game-grid">
          {foundGroups.length > 0 &&
            foundGroups.map((group) => (
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

        <div className="game-board__footer">
          {gameStatus === "playing" ? (
            <>
              <MistakesIndicator
                mistakes={mistakes}
                maxMistakes={MAX_MISTAKES}
              />
              <GameControls
                onSubmit={submitGuess}
                onShuffle={shuffleItems}
                onDeselect={deselectAll}
                hasSelection={selectedItemIds.length > 0}
                canSubmit={selectedItemIds.length === MAX_SELECTIONS}
              />
            </>
          ) : (
            // Viewing puzzle post-game — show "View Results" to go back
            <div className="game-board__footer">
              <div className="game-board__footer__view-results-btn">
                <XButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewingPuzzle(false)}
                >
                  View Results
                </XButton>
              </div>
            </div>
          )}
        </div>

        {gameStatus === "won" && <WinCelebration />}
      </>
    );
  };

  return <div className="game-board">{renderContent()}</div>;
}
