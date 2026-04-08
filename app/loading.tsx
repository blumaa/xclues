import { GameSkeleton } from "../src/components/molecules/GameSkeleton";
import "../src/components/organisms/GameBoard.css";

export default function Loading() {
  return (
    <div className="game-board">
      <GameSkeleton />
    </div>
  );
}
