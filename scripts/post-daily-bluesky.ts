/**
 * Posts today's puzzle to Bluesky.
 *
 * Rotates through films/music/books based on day of week.
 * Skips posting if today's puzzle hasn't been published yet.
 *
 * Required env vars:
 *   BLUESKY_IDENTIFIER       — your handle (e.g. "xclues.bsky.social")
 *   BLUESKY_APP_PASSWORD     — app password from bsky.app/settings/app-passwords
 *   NEXT_PUBLIC_SUPABASE_URL — Supabase URL
 *   SUPABASE_SERVICE_ROLE_KEY — Supabase service role key (or anon key for read-only)
 */

import { AtpAgent, RichText } from "@atproto/api";
import { createClient } from "@supabase/supabase-js";

type Genre = "films" | "music" | "books";

interface GenrePostConfig {
  genre: Genre;
  siteName: string;
  emoji: string;
  domain: string;
  itemLabel: string;
}

const GENRE_CONFIGS: Record<Genre, GenrePostConfig> = {
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

const GENRE_ORDER: Genre[] = ["films", "music", "books"];

function getTodayDate(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function pickTodaysGenre(): Genre {
  // Rotate: different genre each day based on day-of-year
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  return GENRE_ORDER[dayOfYear % GENRE_ORDER.length];
}

async function verifyPuzzleExists(genre: Genre, date: string): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase env vars");
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("puzzles")
    .select("id")
    .eq("puzzle_date", date)
    .eq("genre", genre)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("Supabase error:", error);
    return false;
  }
  return !!data;
}

function buildPostText(config: GenrePostConfig): string {
  return `${config.emoji} Today's ${config.siteName} is live.

16 ${config.itemLabel} → 4 hidden categories
🟨 easy  🟩 medium  🟦 hard  🟪 trickiest

https://${config.domain}`;
}

async function post(config: GenrePostConfig): Promise<void> {
  const identifier = process.env.BLUESKY_IDENTIFIER;
  const password = process.env.BLUESKY_APP_PASSWORD;
  if (!identifier || !password) {
    throw new Error("Missing Bluesky env vars");
  }

  const agent = new AtpAgent({ service: "https://bsky.social" });
  await agent.login({ identifier, password });

  const text = buildPostText(config);
  const rt = new RichText({ text });
  await rt.detectFacets(agent);

  await agent.post({
    text: rt.text,
    facets: rt.facets,
    createdAt: new Date().toISOString(),
  });

  console.log(`Posted for ${config.siteName}:\n${text}`);
}

async function main(): Promise<void> {
  const today = getTodayDate();
  const genre = pickTodaysGenre();
  const config = GENRE_CONFIGS[genre];

  console.log(`Checking if ${config.siteName} puzzle exists for ${today}...`);
  const exists = await verifyPuzzleExists(genre, today);
  if (!exists) {
    console.log(`No published puzzle for ${genre} on ${today}. Skipping.`);
    return;
  }

  await post(config);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
