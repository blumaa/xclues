import { createServerSupabaseClient } from "./server";
import type { SavedPuzzle, Group, Item } from "../../types";

const CACHE_TTL = 60 * 60 * 1000;
const puzzleCache = new Map<string, { data: SavedPuzzle; timestamp: number }>();

export function clearPuzzleCache(): void {
  puzzleCache.clear();
}

export function parsePuzzleRow(data: Record<string, unknown>): SavedPuzzle {
  const groups = (data.groups as Array<{ id: string; items: Item[]; connection: string; difficulty: string; color: string }>).map((g) => ({
    id: g.id,
    items: g.items as Item[],
    connection: g.connection,
    difficulty: g.difficulty,
    color: g.color,
  })) as Group[];

  const items = groups.flatMap((g) => g.items);

  return {
    id: data.id as string,
    groups,
    items,
    createdAt: new Date(data.created_at as string).getTime(),
    metadata: data.metadata as Record<string, unknown> | undefined,
  };
}

export async function fetchPuzzleByDate(genre: string, date: string): Promise<SavedPuzzle | null> {
  const cacheKey = `${genre}-${date}`;
  const cached = puzzleCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("puzzles")
    .select("id, groups, puzzle_date, created_at, metadata")
    .eq("puzzle_date", date)
    .eq("genre", genre)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;

  const parsed = parsePuzzleRow(data as Record<string, unknown>);
  puzzleCache.set(cacheKey, { data: parsed, timestamp: Date.now() });
  return parsed;
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

  return data as Array<{ genre: string; puzzle_date: string }>;
}
