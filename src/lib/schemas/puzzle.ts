import { z } from "zod";

/**
 * Runtime schemas for the Supabase `puzzles` row shape.
 *
 * TypeScript erases at runtime, so DB JSON crossing this boundary is untyped.
 * These schemas validate the actual data at the door (see parsePuzzleRow) so a
 * malformed row fails with a clear error instead of crashing deep in the UI.
 *
 * Items use loose objects to preserve domain-specific fields (year, director,
 * artist, album, …) that vary by genre. difficulty/color stay strings here —
 * the DB is the source of those values and parsePuzzleRow maps them onto the
 * Difficulty unions; we validate structure, not enum membership.
 */
export const RawItemSchema = z.looseObject({
  id: z.number(),
  title: z.string(),
});

/**
 * Strict item schema whose inferred type matches the domain `Item`. Used when
 * reading the `connection_groups.items` / `.groups` jsonb columns so DB Json is
 * validated into typed items without an `as unknown as` cast.
 */
export const ItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number().optional(),
  director: z.string().optional(),
  cast: z.array(z.string()).optional(),
  genres: z.array(z.string()).optional(),
  poster_path: z.string().optional(),
  artist: z.string().optional(),
  album: z.string().optional(),
});

/** A group as persisted in jsonb (difficulty/color may be absent → defaulted). */
export const StoredGroupSchema = z.object({
  id: z.string(),
  items: z.array(ItemSchema),
  connection: z.string(),
  difficulty: z.string().optional(),
  color: z.string().optional(),
});

export const RawGroupSchema = z.object({
  id: z.string(),
  items: z.array(RawItemSchema).min(1),
  connection: z.string(),
  difficulty: z.string(),
  color: z.string(),
});

export const RawPuzzleRowSchema = z.object({
  id: z.string(),
  groups: z.array(RawGroupSchema).min(1),
  created_at: z.string(),
  metadata: z.record(z.string(), z.unknown()).nullish(),
});

export type RawPuzzleRow = z.infer<typeof RawPuzzleRowSchema>;
