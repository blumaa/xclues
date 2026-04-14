/**
 * Posts today's puzzle to Bluesky as a real teaser.
 *
 * - Rotates through films/music/books based on day-of-year.
 * - Rotates through 4 teaser templates. Each creates a real puzzle the
 *   reader can attempt, with a genuine information gap that drives clicks.
 * - Teaser image renders the exact items the post text references.
 * - Skips posting if today's puzzle hasn't been published yet.
 *
 * Required env vars:
 *   BLUESKY_IDENTIFIER
 *   BLUESKY_APP_PASSWORD
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

interface Item { id: number; title: string; artist?: string }
interface PuzzleGroup {
  id: string;
  items: Item[];
  connection: string;
  difficulty: string;
  color: string;
}
interface Puzzle { id: string; groups: PuzzleGroup[] }

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

// Deterministic shuffle so same day = same output (for caching + idempotency)
function shuffleDeterministic<T>(array: T[], seed: number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = (seed * (i + 1) * 2654435761) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
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

/* ─────────────── Teaser templates ─────────────── */

interface TemplateResult {
  text: string;
  titles: string[]; // items to render in the teaser image
  headline: string; // headline shown in the image
}

/**
 * Template 1: Mini-game. 6 items — 4 from one group, 2 decoys from another.
 * Reader has to identify which 4 share a connection.
 */
function tmplMiniGame(config: GenrePostConfig, puzzle: Puzzle): TemplateResult {
  const seed = getDayOfYear();
  // Prefer a non-purple main group for a more approachable category
  const mainCandidates = puzzle.groups.filter((g) => g.color !== "purple");
  const mainGroup = mainCandidates[seed % mainCandidates.length] ?? puzzle.groups[0];
  const otherGroups = puzzle.groups.filter((g) => g.id !== mainGroup.id);
  const decoyGroup = otherGroups[seed % otherGroups.length];

  const realItems = mainGroup.items.slice(0, 4).map(getDisplayTitle);
  const decoys = decoyGroup.items.slice(0, 2).map(getDisplayTitle);
  const titles = shuffleDeterministic([...realItems, ...decoys], seed);

  const text = `4 of these 6 ${config.itemLabel} share a hidden connection. Which 4?

${titles.join(" · ")}

Full puzzle (16 ${config.itemLabel}, 4 categories) 👇

${config.emoji} https://${config.domain}`;

  return {
    text,
    titles,
    headline: `Mini ${config.siteName}`,
  };
}

/**
 * Template 2: Missing 4th. Show 3 of the 4 purple (trickiest) items and
 * ask the reader to name the 4th. Requires clicking to verify — even
 * if the theme is obvious, the specific 4th item isn't guessable.
 */
function tmplPurpleChallenge(config: GenrePostConfig, puzzle: Puzzle): TemplateResult {
  const seed = getDayOfYear();
  const purple = puzzle.groups.find((g) => g.color === "purple") ?? puzzle.groups[puzzle.groups.length - 1];
  // Deterministically pick 3 of 4 to show (hold one back)
  const shuffled = shuffleDeterministic(purple.items.slice(0, 4), seed);
  const shownItems = shuffled.slice(0, 3).map(getDisplayTitle);
  const titles = [...shownItems, "?"];

  const text = `Three of the four ${config.itemLabel} in today's 🟪 trickiest category:

${shownItems.join(" · ")}

Can you name the 4th?

${config.emoji} https://${config.domain}`;

  return {
    text,
    titles,
    headline: `Name the 4th`,
  };
}

/**
 * Template 3: Odd one out. 5 items — 4 from one group + 1 decoy.
 * Reader finds the outlier AND the connecting theme.
 */
function tmplOddOneOut(config: GenrePostConfig, puzzle: Puzzle): TemplateResult {
  const seed = getDayOfYear();
  const mainGroup = puzzle.groups[seed % puzzle.groups.length];
  const otherGroups = puzzle.groups.filter((g) => g.id !== mainGroup.id);
  const decoyGroup = otherGroups[seed % otherGroups.length];

  const realItems = mainGroup.items.slice(0, 4).map(getDisplayTitle);
  const decoy = getDisplayTitle(decoyGroup.items[0]);
  const titles = shuffleDeterministic([...realItems, decoy], seed);

  const text = `One of these ${config.itemLabel} doesn't belong. The other 4 share a hidden connection.

${titles.join(" · ")}

Which is the outlier? (Solve the full puzzle to find out.)

${config.emoji} https://${config.domain}`;

  return {
    text,
    titles,
    headline: `Spot the outlier`,
  };
}

/**
 * Template 4: Trivia pair. 2 items from the same group.
 * Short, punchy, low-info hook — "what connects X and Y?"
 */
function tmplTriviaPair(config: GenrePostConfig, puzzle: Puzzle): TemplateResult {
  const seed = getDayOfYear();
  const group = puzzle.groups[seed % puzzle.groups.length];
  const titles = group.items.slice(0, 2).map(getDisplayTitle);

  const text = `What do ${titles[0]} and ${titles[1]} have in common?

(They're both in today's ${config.siteName}. Find 14 more ${config.itemLabel} + 3 other hidden categories.)

${config.emoji} https://${config.domain}`;

  return {
    text,
    titles,
    headline: `What's the link?`,
  };
}

function buildTemplate(config: GenrePostConfig, puzzle: Puzzle): TemplateResult {
  switch (pickTemplate()) {
    case 0:
      return tmplMiniGame(config, puzzle);
    case 1:
      return tmplPurpleChallenge(config, puzzle);
    case 2:
      return tmplOddOneOut(config, puzzle);
    default:
      return tmplTriviaPair(config, puzzle);
  }
}

/* ─────────────── Image fetch ─────────────── */

async function fetchTeaserImage(
  genre: Genre,
  titles: string[],
  headline: string
): Promise<Uint8Array | null> {
  const titlesParam = encodeURIComponent(titles.join(","));
  const headlineParam = encodeURIComponent(headline);
  const url = `https://${GENRE_CONFIGS[genre].domain}/api/teaser/${genre}?titles=${titlesParam}&headline=${headlineParam}`;
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

async function post(
  config: GenrePostConfig,
  result: TemplateResult
): Promise<void> {
  const identifier = process.env.BLUESKY_IDENTIFIER;
  const password = process.env.BLUESKY_APP_PASSWORD;
  if (!identifier || !password) throw new Error("Missing Bluesky env vars");

  const agent = new AtpAgent({ service: "https://bsky.social" });
  await agent.login({ identifier, password });

  const rt = new RichText({ text: result.text });
  await rt.detectFacets(agent);

  const imageBytes = await fetchTeaserImage(config.genre, result.titles, result.headline);

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
          alt: `${result.headline}: ${result.titles.join(", ")}`,
          image: uploaded.data.blob,
        },
      ],
    };
  }

  const posted = await agent.post(record);
  console.log(`Posted for ${config.siteName}:`);
  console.log(result.text);
  console.log(`URI: ${posted.uri}`);
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

  const result = buildTemplate(config, puzzle);
  await post(config, result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
