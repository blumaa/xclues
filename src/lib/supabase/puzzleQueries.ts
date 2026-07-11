import { unstable_cache } from "next/cache";
import { createServerSupabaseClient } from "./server";
import { ensureUniqueItemIds } from "../puzzle/uniqueItemIds";
import { RawPuzzleRowSchema } from "../schemas/puzzle";
import { withRetry, isTransientDbError } from "../retry";
import type { Genre } from "../../config/seoConfig";
import { isPastDate } from "../../utils/dateValidation";
import type {
  SavedPuzzle,
  Group,
  Item,
  DifficultyLevel,
  DifficultyColor,
} from "../../types";

// One hour: puzzles are published per-day and never change once live.
const PUZZLE_REVALIDATE_SECONDS = 60 * 60;

export function parsePuzzleRow(data: Record<string, unknown>): SavedPuzzle {
  const row = RawPuzzleRowSchema.parse(data);

  const groups = ensureUniqueItemIds(
    row.groups.map((g) => ({
      id: g.id,
      items: g.items as Item[],
      connection: g.connection,
      difficulty: g.difficulty as DifficultyLevel,
      color: g.color as DifficultyColor,
    })) as Group[],
  );

  const items = groups.flatMap((g) => g.items);

  return {
    id: row.id,
    groups,
    items,
    createdAt: new Date(row.created_at).getTime(),
    metadata: row.metadata ?? undefined,
  };
}

async function fetchPuzzleUncached(
  genre: string,
  date: string,
): Promise<SavedPuzzle | null> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;

  try {
    return await withRetry(
      async () => {
        const { data, error } = await supabase
          .from("puzzles")
          .select("id, groups, puzzle_date, created_at, metadata")
          .eq("puzzle_date", date)
          .eq("genre", genre)
          .eq("status", "published")
          .maybeSingle();

        // A DB-level error may be transient (network/timeout) — let withRetry
        // decide. A missing row is a real "no puzzle", not an error.
        if (error) throw error;
        if (!data) return null;
        return parsePuzzleRow(data as Record<string, unknown>);
      },
      { retries: 2, shouldRetry: isTransientDbError },
    );
  } catch {
    // Retries exhausted, a permanent DB error, or malformed data: surface as
    // "no puzzle available" so the route renders its not-found path.
    return null;
  }
}

export async function fetchPuzzleByDate(
  genre: string,
  date: string,
): Promise<SavedPuzzle | null> {
  // Tests exercise the uncached path directly for isolation. In production the
  // result is stored in the Next Data Cache, which (unlike the old module-level
  // Map) persists across serverless invocations and is tag-revalidatable.
  if (process.env.NODE_ENV === "test") {
    return fetchPuzzleUncached(genre, date);
  }

  return unstable_cache(
    () => fetchPuzzleUncached(genre, date),
    ["puzzle-by-date", genre, date],
    {
      revalidate: PUZZLE_REVALIDATE_SECONDS,
      tags: ["puzzles", `puzzle:${genre}:${date}`],
    },
  )();
}

export async function fetchAllPublishedDates(): Promise<Array<{ genre: string; puzzle_date: string }>> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("puzzles")
    .select("genre, puzzle_date")
    .eq("status", "published")
    .not("puzzle_date", "is", null)
    .order("puzzle_date", { ascending: false });

  if (error || !data) return [];

  // Only expose past puzzles. Future-scheduled puzzles haven't arrived yet, and
  // today's puzzle is the live game — surfacing either would let players read the
  // answers early. The date page guards with isPastDate, so filtering here keeps
  // the public surfaces (sitemap + archive hub) in sync with what's viewable.
  return (data as Array<{ genre: string; puzzle_date: string }>).filter((row) =>
    isPastDate(row.puzzle_date),
  );
}

/**
 * Published puzzle dates for a single genre, newest-first. Derived from
 * fetchAllPublishedDates() so the published set has a single source of truth
 * (shared with the sitemap). Powers the archive hub and prev/next navigation.
 */
export async function fetchPublishedDatesForGenre(genre: Genre): Promise<string[]> {
  const all = await fetchAllPublishedDates();
  return all.filter((row) => row.genre === genre).map((row) => row.puzzle_date);
}
