/**
 * Finds warm Bluesky engagement targets for xClues.
 *
 * Searches puzzle-related terms, ranks recent posts with genuine intent,
 * and prints each with the refs needed to reply (uri + cid).
 * It does NOT post anything — drafting replies is done per-post by a human,
 * never templated (templated promo replies are spam and get flagged).
 *
 * Requires (in .env.local):
 *   BLUESKY_IDENTIFIER, BLUESKY_APP_PASSWORD
 *
 * Run: bun run scripts/bsky-find-targets.ts
 */
import { AtpAgent } from "@atproto/api";

// PRIMARY = Connections-style (xClues's actual mechanic: group 16 into 4).
// Wordle terms are SECONDARY — broad overlap net, not the exact format.
const QUERIES = [
  "NYT Connections",
  "Connections puzzle",
  "Connections game",
  "daily connections",
  "movie trivia",
  "book club daily",
  "Wordle alternative",
  "daily puzzle game",
];

// Skip posts that are obviously not engageable leads.
const SELF_HANDLES = ["xclues", "filmclues", "litclues", "musiclues"];

interface Target {
  handle: string;
  text: string;
  likes: number;
  replies: number;
  uri: string;
  cid: string;
  url: string;
  query: string;
}

async function main() {
  const identifier = process.env.BLUESKY_IDENTIFIER;
  const password = process.env.BLUESKY_APP_PASSWORD;
  if (!identifier || !password) throw new Error("Missing Bluesky env vars (BLUESKY_IDENTIFIER / BLUESKY_APP_PASSWORD)");

  const agent = new AtpAgent({ service: "https://bsky.social" });
  await agent.login({ identifier, password });

  const seen = new Set<string>();
  const targets: Target[] = [];

  for (const q of QUERIES) {
    const res = await agent.app.bsky.feed.searchPosts({ q, limit: 25, sort: "latest" });
    for (const p of res.data.posts) {
      if (seen.has(p.uri)) continue;
      seen.add(p.uri);
      const handle = p.author.handle;
      if (SELF_HANDLES.some((h) => handle.includes(h))) continue;
      const record = p.record as { text?: string; langs?: string[] };
      const text = (record.text || "").replace(/\s+/g, " ").trim();
      if (!text) continue;
      // Prefer English where language is tagged.
      if (record.langs && record.langs.length && !record.langs.some((l) => l.startsWith("en"))) continue;
      const rk = p.uri.split("/").pop();
      targets.push({
        handle,
        text: text.slice(0, 200),
        likes: p.likeCount ?? 0,
        replies: p.replyCount ?? 0,
        uri: p.uri,
        cid: p.cid,
        url: `https://bsky.app/profile/${handle}/post/${rk}`,
        query: q,
      });
    }
  }

  // Rank: a little engagement = real account, but not so viral the reply drowns.
  targets.sort((a, b) => b.likes + b.replies - (a.likes + a.replies));

  console.log(`Found ${targets.length} candidate targets:\n`);
  for (const t of targets.slice(0, 80)) {
    console.log(`@${t.handle}  ♥${t.likes} 💬${t.replies}  [${t.query}]`);
    console.log(`  ${t.text}`);
    console.log(`  ${t.url}`);
    console.log(`  REF uri=${t.uri}`);
    console.log(`  REF cid=${t.cid}\n`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
