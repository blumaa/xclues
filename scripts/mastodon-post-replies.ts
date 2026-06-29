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

const REPLIES: Reply[] = [
  {
    label: "@VedaDalsette@mstdn.social",
    text: `clean board on #1112 — opening blue is a power move 🟦 if you ever want one more grouping puzzle in the daily rotation: filmclues.space, sort 16 films into 4 hidden groups. same "how are these connected" feel, fresh daily, no signup.`,
    inReplyToId: "116823068135042518",
  },
  {
    label: "@dhsholly@dragonscave.space",
    text: `that one fought back on #1112 😅 the scramble right before it clicks is the best part. if you want another grouping puzzle for the rotation, litclues.space — 16 books into 4 hidden groups, fresh daily.`,
    inReplyToId: "116822203610764268",
  },
  {
    label: "@WiccaCoolMom@sfba.social",
    text: `spotless #1112, nicely done 👏 if you ever want a second grouping puzzle once the NYT one's done: musiclues.space — sort 16 songs into 4 hidden groups, same satisfying snap. daily, free.`,
    inReplyToId: "116821782511731154",
  },
  {
    label: "@degroof@mastodon.social",
    text: `one slip on #1112 but you brought it home 👏 if the grouping itch wants another hit, filmclues.space — 16 films into 4 hidden groups, Connections-style, fresh daily. no signup.`,
    inReplyToId: "116821707200716663",
  },
  {
    label: "@grizzlyfrog@mastodon.social",
    text: `clean run on #1111 🟨 if you ever want one more grouping puzzle in the rotation: litclues.space — sort 16 books into 4 hidden groups, same "wait, how are these connected" feel. fresh daily.`,
    inReplyToId: "116821201404900468",
  },
  {
    label: "@drsbello@mstdn.social",
    text: `opening purple-first on #1112 is genuinely elite 🟪 if you want another grouping puzzle that rewards spotting the tricky set early, musiclues.space — 16 songs into 4 hidden groups, fresh daily.`,
    inReplyToId: "116823498650798232",
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
