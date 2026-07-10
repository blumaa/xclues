/**
 * Puzzle domain model — the single source of truth for reading puzzles.
 *
 * Types, per-genre config, date helpers, and the Supabase fetch used by the
 * puzzle review + edit tooling (`puzzle:review` / `puzzle:edit` / `puzzle:set-group`).
 * No posting/marketing concerns live here — that moved to growth-ops.
 */

import { createClient } from "@supabase/supabase-js";

export type Genre = "films" | "music" | "books";

export interface GenreConfig {
  genre: Genre;
  siteName: string;
  emoji: string;
  domain: string;
  itemLabel: string;
}

interface Item { id: number; title: string; year?: number; artist?: string }
export interface PuzzleGroup {
  id: string;
  items: Item[];
  connection: string;
  difficulty: string;
  color: string;
}
export interface Puzzle { id: string; groups: PuzzleGroup[] }

export const GENRE_CONFIGS: Record<Genre, GenreConfig> = {
  films: {
    genre: "films",
    siteName: "Filmclues",
    emoji: "🎬",
    domain: "filmclues.space",
    itemLabel: "films",
  },
  music: {
    genre: "music",
    siteName: "Musiclues",
    emoji: "🎵",
    domain: "musiclues.space",
    itemLabel: "songs",
  },
  books: {
    genre: "books",
    siteName: "Litclues",
    emoji: "📚",
    domain: "litclues.space",
    itemLabel: "books",
  },
};

export const GENRE_ORDER: Genre[] = ["films", "music", "books"];

export function getTodayDate(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTomorrowDate(): string {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const year = tomorrow.getUTCFullYear();
  const month = String(tomorrow.getUTCMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function fetchPuzzle(genre: Genre, date: string): Promise<Puzzle | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars");

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("puzzles")
    .select("id, groups, puzzle_date")
    .eq("puzzle_date", date)
    .eq("genre", genre)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  return { id: data.id, groups: data.groups as PuzzleGroup[] };
}
