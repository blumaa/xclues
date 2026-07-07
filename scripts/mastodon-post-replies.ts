/**
 * Posts approved, human-drafted replies to specific Mastodon posts via the API.
 * Each reply is unique and genuine (no templating); the account owner reviewed
 * the text and the target list.
 *
 * Uses MASTODON_ACCESS_TOKEN (write scope) + MASTODON_INSTANCE_URL. The find
 * script reads the mastodon.social tag timeline, so in_reply_to_id is a
 * mastodon.social-local id and is valid on the posting instance even when the
 * target account lives on another instance.
 *
 * Run: bun run scripts/mastodon-post-replies.ts
 */

interface Reply {
  label: string;
  text: string;
  inReplyToId: string;
}

// Drafted 2026-07-07. Fresh accounts only (no repeats of prior days' targets).
const REPLIES: Reply[] = [
  {
    label: "@gam3@hostux.social",
    text: `opening with a scattered first row and still finishing #1122 clean is the fun kind of recovery 👏 if you ever want another grouping puzzle in the day, filmclues.space — 16 films sorted into 4 hidden groups, same Connections snap. daily, free, no signup.`,
    inReplyToId: "116877097308074569",
  },
  {
    label: "@mdmrn@mstdn.games",
    text: `one green-purple slip and otherwise a tidy #1121 — that overlap row is always the trap 👏 if the grouping itch wants a book spin, litclues.space: 16 books into 4 hidden groups, Connections-style. daily + free.`,
    inReplyToId: "116874759406898450",
  },
  {
    label: "@faxpaladin@mastodon.sdf.org",
    text: `a crossword-plus-Connections stream is a great puzzle combo 🎵 if you ever want to work a music one into the rotation, musiclues.space — 16 songs sorted into 4 hidden groups, same grouping mechanic. daily, free, no signup.`,
    inReplyToId: "116874756159557536",
  },
];

async function main() {
  const instance = process.env.MASTODON_INSTANCE_URL;
  const token = process.env.MASTODON_ACCESS_TOKEN;
  if (!instance || !token) throw new Error("Missing Mastodon env vars");

  for (const r of REPLIES) {
    const res = await fetch(`${instance}/api/v1/statuses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: r.text,
        in_reply_to_id: r.inReplyToId,
        visibility: "public",
      }),
    });
    if (!res.ok) {
      console.warn(`FAILED ${r.label}: ${res.status} ${await res.text()}`);
      continue;
    }
    const data = (await res.json()) as { url: string };
    console.log(`Replied to ${r.label}: ${data.url}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });

export {};
