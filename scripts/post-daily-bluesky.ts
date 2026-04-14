/**
 * Posts today's puzzle to Bluesky with rotating copy templates.
 *
 * - Rotates through films/music/books based on day-of-year.
 * - Rotates through 4 copy templates based on day-of-year.
 * - Attaches a teaser image showing 4 real items from today's puzzle.
 * - Skips posting if today's puzzle hasn't been published yet.
 *
 * Required env vars:
 *   BLUESKY_IDENTIFIER        — handle (e.g. "xclues.bsky.social")
 *   BLUESKY_APP_PASSWORD      — app password from bsky.app/settings/app-passwords
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)
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

interface Item {
  id: number;
  title: string;
  year?: number;
  artist?: string;
}

interface PuzzleGroup {
  id: string;
  items: Item[];
  connection: string;
  difficulty: string;
  color: string;
}

interface Puzzle {
  id: string;
  groups: PuzzleGroup[];
}

const GENRE_CONFIGS: Record<Genre, GenrePostConfig> = {
  films: { genre: "films", siteName: "Filmclues", emoji: "🎬", domain: "filmclues.space", itemLabel: "films" },
  music: { genre: "music", siteName: "Musiclues", emoji: "🎵", domain: "musiclues.space", itemLabel: "songs" },
  books: { genre: "books", siteName: "Litclues", emoji: "📚", domain: "litclues.space", itemLabel: "books" },
};

const GENRE_ORDER: Genre[] = ["films", "music", "books"];

function getTodayDate(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000);
}

function pickGenre(): Genre {
  return GENRE_ORDER[getDayOfYear() % GENRE_ORDER.length];
}

function pickTemplate(): number {
  // 4 templates, rotated daily
  return getDayOfYear() % 4;
}

function getDisplayTitle(item: Item): string {
  const title = item.title;
  if (!title) return "";
  const sep = title.lastIndexOf(" - ");
  if (sep === -1) return title;
  const before = title.substring(0, sep);
  const after = title.substring(sep + 3);
  if (item.artist && after.toLowerCase() === item.artist.toLowerCase()) {
    return before;
  }
  return before;
}

async function fetchPuzzle(genre: Genre, date: string): Promise<Puzzle | null> {
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

/* ─────────────── Copy templates ─────────────── */

function tmplTeaser(config: GenrePostConfig, puzzle: Puzzle): string {
  // 4 items from a random category — no theme reveal
  const idx = getDayOfYear() % puzzle.groups.length;
  const group = puzzle.groups[idx];
  const items = group.items.slice(0, 4).map(getDisplayTitle);
  return `Which of these belong together?

${items.join(" · ")}

One of today's 4 categories in ${config.siteName}. 12 more ${config.itemLabel} waiting.

${config.emoji} https://${config.domain}`;
}

function tmplRedHerring(config: GenrePostConfig, puzzle: Puzzle): string {
  // 3 items from one category + 1 from another — "which is the odd one out?"
  const groups = [...puzzle.groups];
  const idx = getDayOfYear() % groups.length;
  const mainGroup = groups[idx];
  const otherIdx = (idx + 1) % groups.length;
  const otherGroup = groups[otherIdx];

  const three = mainGroup.items.slice(0, 3).map(getDisplayTitle);
  const decoy = getDisplayTitle(otherGroup.items[0]);

  // Shuffle deterministically based on day
  const all = [...three, decoy];
  const shuffleSeed = getDayOfYear();
  all.sort((a, b) => {
    const ha = (a.charCodeAt(0) + shuffleSeed) % 7;
    const hb = (b.charCodeAt(0) + shuffleSeed) % 7;
    return ha - hb;
  });

  return `Three of these ${config.itemLabel} share a hidden connection. One doesn't.

${all.join(" · ")}

Spot the odd one out — then find all 4 categories in today's ${config.siteName}.

${config.emoji} https://${config.domain}`;
}

function tmplDifficultyBrag(config: GenrePostConfig, puzzle: Puzzle): string {
  // Tease the purple (hardest) category
  const purple = puzzle.groups.find((g) => g.color === "purple") ?? puzzle.groups[puzzle.groups.length - 1];
  const items = purple.items.slice(0, 4).map(getDisplayTitle);
  return `Today's 🟪 trickiest category in ${config.siteName}:

${items.join(" · ")}

What's the connection? (Plus 12 more ${config.itemLabel} across 3 easier categories.)

${config.emoji} https://${config.domain}`;
}

function tmplPlainCTA(config: GenrePostConfig): string {
  return `${config.emoji} Today's ${config.siteName} is live.

16 ${config.itemLabel} → 4 hidden categories
🟨 easy  🟩 medium  🟦 hard  🟪 trickiest

https://${config.domain}`;
}

function buildPostText(config: GenrePostConfig, puzzle: Puzzle): string {
  const template = pickTemplate();
  switch (template) {
    case 0:
      return tmplTeaser(config, puzzle);
    case 1:
      return tmplRedHerring(config, puzzle);
    case 2:
      return tmplDifficultyBrag(config, puzzle);
    default:
      return tmplPlainCTA(config);
  }
}

/* ─────────────── Image fetch ─────────────── */

async function fetchTeaserImage(genre: Genre): Promise<Uint8Array | null> {
  const url = `https://${GENRE_CONFIGS[genre].domain}/api/teaser/${genre}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Teaser image fetch failed: ${res.status}`);
      return null;
    }
    const buf = await res.arrayBuffer();
    return new Uint8Array(buf);
  } catch (err) {
    console.warn("Teaser image fetch error:", err);
    return null;
  }
}

/* ─────────────── Post ─────────────── */

async function post(config: GenrePostConfig, puzzle: Puzzle): Promise<void> {
  const identifier = process.env.BLUESKY_IDENTIFIER;
  const password = process.env.BLUESKY_APP_PASSWORD;
  if (!identifier || !password) throw new Error("Missing Bluesky env vars");

  const agent = new AtpAgent({ service: "https://bsky.social" });
  await agent.login({ identifier, password });

  const text = buildPostText(config, puzzle);
  const rt = new RichText({ text });
  await rt.detectFacets(agent);

  const imageBytes = await fetchTeaserImage(config.genre);

  const record: Record<string, unknown> = {
    text: rt.text,
    facets: rt.facets,
    createdAt: new Date().toISOString(),
  };

  if (imageBytes) {
    const uploaded = await agent.uploadBlob(imageBytes, { encoding: "image/png" });
    record.embed = {
      $type: "app.bsky.embed.images",
      images: [
        {
          alt: `Teaser: four ${config.itemLabel} from today's ${config.siteName} puzzle`,
          image: uploaded.data.blob,
        },
      ],
    };
  }

  const result = await agent.post(record);
  console.log(`Posted for ${config.siteName}:`);
  console.log(text);
  console.log(`URI: ${result.uri}`);
}

/* ─────────────── Main ─────────────── */

async function main(): Promise<void> {
  const today = getTodayDate();
  const genre = pickGenre();
  const config = GENRE_CONFIGS[genre];

  console.log(`Checking if ${config.siteName} puzzle exists for ${today}...`);
  const puzzle = await fetchPuzzle(genre, today);
  if (!puzzle) {
    console.log(`No published puzzle for ${genre} on ${today}. Skipping.`);
    return;
  }

  await post(config, puzzle);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
