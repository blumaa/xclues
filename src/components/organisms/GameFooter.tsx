"use client";

import { useEffect } from "react";
import { GameControls } from "./GameControls";
import { HowToPlayBanner } from "../molecules/HowToPlayBanner";
import { MistakesIndicator } from "../molecules/MistakesIndicator";
import { boardKey, useGameStore } from "../../store/gameStore";
import { useToast } from "../../providers/useToast";

const MAX_MISTAKES = 4;
const MAX_SELECTIONS = 4;

/**
 * Controls for one board. Stays mounted and fades when the game ends so
 * genre switches don't jerk the layout.
 */
export function GameFooter({ genre, puzzleDate }: { genre: string; puzzleDate: string }) {
  const key = boardKey(genre, puzzleDate);
  const gameStatus = useGameStore(key, (s) => s.gameStatus);
  const mistakes = useGameStore(key, (s) => s.mistakes);
  const selectedItemIds = useGameStore(key, (s) => s.selectedItemIds);
  const notification = useGameStore(key, (s) => s.notification);
  const submitGuess = useGameStore(key, (s) => s.submitGuess);
  const shuffleItems = useGameStore(key, (s) => s.shuffleItems);
  const deselectAll = useGameStore(key, (s) => s.deselectAll);
  const { showInfo } = useToast();

  useEffect(() => {
    if (notification) showInfo(notification);
  }, [notification, showInfo]);

  return (
    <div className={`game-footer${gameStatus === "playing" ? "" : " game-footer--hidden"}`}>
      <MistakesIndicator mistakes={mistakes} maxMistakes={MAX_MISTAKES} />
      <GameControls
        onSubmit={submitGuess}
        onShuffle={shuffleItems}
        onDeselect={deselectAll}
        hasSelection={selectedItemIds.length > 0}
        canSubmit={selectedItemIds.length === MAX_SELECTIONS}
      />
      <HowToPlayBanner />
    </div>
  );
}
