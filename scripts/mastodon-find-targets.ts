/**
 * Finds warm Mastodon engagement targets for xClues.
 *
 * Pulls recent posts from puzzle-related hashtag timelines (public, no auth),
 * ranks by genuine intent, and prints each with its URL for browser-based reply.
 * Finding only — replies are drafted per-post by a human, never templated.
 *
 * Reads mastodon.social's public federated tag timelines (no token needed; the
 * MASTODON_ACCESS_TOKEN is write-only, used by the automated teaser posters).
 * Replies are posted via the browser (open the post URL, you're logged into your
 * instance), consistent with how Bluesky replies are done.
 *
 * Run: bun run scripts/mastodon-find-targets.ts
 */

const READ_INSTANCE = "https://mastodon.social";
// PRIMARY = Connections tags (xClues's mechanic). Wordle tags are the secondary
// broad-overlap net, ordered last on purpose.
const TAGS = ["NYTConnections", "Connections", "dailygames", "puzzles", "Wordle", "WordGames", "WordleSky"];
const SELF = ["xclues", "filmclues", "litclues", "musiclues"];

interface Target {
  acct: string;
  text: string;
  favs: number;
  replies: number;
  id: string;
  url: string;
  tag: string;
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

async function main() {
  const seen = new Set<string>();
  const targets: Target[] = [];

  for (const tag of TAGS) {
    const res = await fetch(`${READ_INSTANCE}/api/v1/timelines/tag/${tag}?limit=20`);
    if (!res.ok) { console.warn(`tag ${tag}: ${res.status}`); continue; }
    const statuses = (await res.json()) as Array<Record<string, unknown>>;
    for (const s of statuses) {
      const id = s.id as string;
      if (seen.has(id)) continue;
      seen.add(id);
      const account = s.account as { acct: string };
      const acct = account.acct;
      if (SELF.some((h) => acct.includes(h))) continue;
      if (s.in_reply_to_id) continue; // prefer top-level posts
      const text = stripHtml((s.content as string) || "");
      if (!text) continue;
      targets.push({
        acct,
        text: text.slice(0, 200),
        favs: (s.favourites_count as number) ?? 0,
        replies: (s.replies_count as number) ?? 0,
        id,
        url: s.url as string,
        tag,
      });
    }
  }

  targets.sort((a, b) => b.favs + b.replies - (a.favs + a.replies));

  console.log(`Found ${targets.length} candidate targets:\n`);
  for (const t of targets.slice(0, 80)) {
    console.log(`@${t.acct}  ♥${t.favs} 💬${t.replies}  [#${t.tag}]`);
    console.log(`  ${t.text}`);
    console.log(`  ${t.url}`);
    console.log(`  REPLY in_reply_to_id=${t.id}\n`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });

export {};
