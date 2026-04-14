/**
 * Posts a reply revealing yesterday's puzzle answers to the bot's most
 * recent qualifying post.
 *
 * Strategy: fetch the bot account's recent posts, find the one from
 * yesterday that links to one of our domains, then reply to it with
 * all 4 category reveals.
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

interface Item { id: number; title: string; artist?: string }
interface PuzzleGroup {
  id: string;
  items: Item[];
  connection: string;
  difficulty: string;
  color: string;
}

const DOMAINS: Record<Genre, string> = {
  films: "filmclues.space",
  music: "musiclues.space",
  books: "litclues.space",
};

const SITE_NAMES: Record<Genre, string> = {
  films: "Filmclues",
  music: "Musiclues",
  books: "Litclues",
};

const HASHTAGS: Record<Genre, string> = {
  films: "#FilmSky #dailygame",
  music: "#MusicSky #dailygame",
  books: "#BookSky #dailygame",
};

const COLOR_EMOJI: Record<string, string> = {
  yellow: "🟨",
  green: "🟩",
  blue: "🟦",
  purple: "🟪",
};

const COLOR_ORDER = ["yellow", "green", "blue", "purple"];

function getYesterdayDate(): string {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() - 1);
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function fetchPuzzle(genre: Genre, date: string) {
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

function buildRevealText(
  genre: Genre,
  groups: PuzzleGroup[],
  date: string
): string {
  // Sort groups by difficulty (yellow → purple)
  const sorted = [...groups].sort(
    (a, b) => COLOR_ORDER.indexOf(a.color) - COLOR_ORDER.indexOf(b.color)
  );

  const reveals = sorted.map((g) => {
    const emoji = COLOR_EMOJI[g.color] || "⬜";
    return `${emoji} ${g.connection}`;
  });

  return `Yesterday's ${SITE_NAMES[genre]} (${date}) 🔓

${reveals.join("\n")}

Today's puzzle → https://${DOMAINS[genre]}

${HASHTAGS[genre]}`;
}

function findGenreFromPost(postText: string): Genre | null {
  for (const [genre, domain] of Object.entries(DOMAINS) as [Genre, string][]) {
    if (postText.includes(domain)) return genre;
  }
  return null;
}

async function main(): Promise<void> {
  const identifier = process.env.BLUESKY_IDENTIFIER;
  const password = process.env.BLUESKY_APP_PASSWORD;
  if (!identifier || !password) throw new Error("Missing Bluesky env vars");

  const agent = new AtpAgent({ service: "https://bsky.social" });
  await agent.login({ identifier, password });

  // Find the bot's most recent post that links to one of our domains
  const feed = await agent.getAuthorFeed({ actor: identifier, limit: 10 });

  const yesterday = getYesterdayDate();
  let targetPost: { uri: string; cid: string; genre: Genre } | null = null;

  for (const item of feed.data.feed) {
    const post = item.post;
    // Skip reposts / replies
    if (item.reason || post.record == null) continue;
    const record = post.record as { text?: string; createdAt?: string };
    const text = record.text || "";
    const created = record.createdAt || post.indexedAt;
    const createdDate = new Date(created).toISOString().slice(0, 10);

    if (createdDate !== yesterday) continue;
    const genre = findGenreFromPost(text);
    if (!genre) continue;

    targetPost = { uri: post.uri, cid: post.cid, genre };
    break;
  }

  if (!targetPost) {
    console.log(`No bot post from ${yesterday} linking to our domains. Skipping reveal.`);
    return;
  }

  console.log(`Found yesterday's post: ${targetPost.uri} (genre=${targetPost.genre})`);

  const puzzle = await fetchPuzzle(targetPost.genre, yesterday);
  if (!puzzle) {
    console.log(`Could not fetch puzzle for ${targetPost.genre} on ${yesterday}. Skipping.`);
    return;
  }

  const text = buildRevealText(targetPost.genre, puzzle.groups, yesterday);
  const rt = new RichText({ text });
  await rt.detectFacets(agent);

  const result = await agent.post({
    text: rt.text,
    facets: rt.facets,
    createdAt: new Date().toISOString(),
    reply: {
      root: { uri: targetPost.uri, cid: targetPost.cid },
      parent: { uri: targetPost.uri, cid: targetPost.cid },
    },
  });

  console.log(`Reveal posted:`);
  console.log(text);
  console.log(`URI: ${result.uri}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
