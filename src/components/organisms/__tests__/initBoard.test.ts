import { describe, it, expect, beforeEach } from "vitest";
import { initBoard } from "../GenrePanel";
import { boardKey, getGameStore, resetAllStores } from "../../../store/gameStore";
import { getStatsStore, resetStatsStore } from "../../../store/statsStore";
import type { SavedPuzzle } from "../../../types";

const DATE = "2026-11-26";
const EDITED_AT = Date.parse("2026-11-26T15:00:00Z");

const puzzle: SavedPuzzle = {
  id: "p1",
  groups: [
    {
      id: "g1",
      connection: "c",
      difficulty: "easy",
      color: "yellow",
      items: [1, 2, 3, 4].map((id) => ({ id, title: `t${id}` })),
    },
  ],
  items: [1, 2, 3, 4].map((id) => ({ id, title: `t${id}` })),
  createdAt: Date.parse("2026-11-20T00:00:00Z"),
  editedAt: EDITED_AT,
};

function recordFinished(completedAt: number) {
  const stats = getStatsStore();
  stats.getState().hydrate("test-stats");
  stats.getState().recordCompletion({
    date: DATE,
    genre: "films",
    won: true,
    mistakes: 0,
    completedAt,
  });
}

describe("initBoard", () => {
  beforeEach(() => {
    localStorage.clear();
    resetStatsStore();
    resetAllStores();
  });

  it("restores a game finished after the puzzle's last edit", () => {
    recordFinished(EDITED_AT + 1000);

    initBoard("films", puzzle, DATE);

    expect(getGameStore(boardKey("films", DATE)).getState().gameStatus).toBe("won");
  });

  it("gives a fresh board when the puzzle was edited after the player finished", () => {
    recordFinished(EDITED_AT - 1000);

    initBoard("films", puzzle, DATE);

    expect(getGameStore(boardKey("films", DATE)).getState().gameStatus).toBe("playing");
    expect(getStatsStore().getState().getCompletedGame("films", DATE)).toBeUndefined();
  });
});
