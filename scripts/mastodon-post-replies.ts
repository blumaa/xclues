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

// Drafted 2026-07-08. Fresh accounts only (no repeats of prior days' targets).
// Links carry ?ref=mastodon for first-party attribution in /analidiots.
const REPLIES: Reply[] = [
  {
    label: "@flyingsquirrel@mastodon.social",
    text: `The post-hint guilt is real 😄 a solve's a solve in my book. If you want a no-guilt grouping fix, Filmclues is a fun one: 16 films into 4 hidden categories. https://filmclues.space/?ref=mastodon`,
    inReplyToId: "116797621059268840",
  },
  {
    label: "@VedaDalsette@mstdn.social",
    text: `"No soup for you" is exactly how a missed Connections feels 😄 some days purple just refuses. If you like the format, Filmclues runs the same 4-group puzzle with movies — good redemption after a rough NYT day. https://filmclues.space/?ref=mastodon`,
    inReplyToId: "116880040339849148",
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
