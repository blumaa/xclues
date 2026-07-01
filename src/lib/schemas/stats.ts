import { z } from "zod";

/**
 * Runtime schema for persisted user stats (localStorage).
 *
 * Stored stats are external, untyped input: they may come from an older app
 * version, be partially written, or be hand-edited. Validating at read time
 * lets LocalStatsStorage self-heal to defaults instead of returning a malformed
 * object that crashes downstream (e.g. `stats.gameHistory.some(...)`).
 */
const GuessColorSchema = z.enum(["yellow", "green", "blue", "purple"]);

export const GameResultSchema = z.object({
  date: z.string(),
  genre: z.string().optional(),
  won: z.boolean(),
  mistakes: z.number(),
  completedAt: z.number(),
  guessHistory: z.array(z.array(GuessColorSchema)).optional(),
});

export const UserStatsSchema = z.object({
  gamesPlayed: z.number(),
  gamesWon: z.number(),
  winRate: z.number(),
  currentStreak: z.number(),
  maxStreak: z.number(),
  lastPlayedDate: z.string().nullable(),
  gameHistory: z.array(GameResultSchema),
});
