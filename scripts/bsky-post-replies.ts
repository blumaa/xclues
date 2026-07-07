/**
 * Posts approved, human-drafted replies to specific Bluesky posts.
 * Each reply is unique and genuine (no templating). Parent refs were
 * gathered by bsky-find-targets.ts and the text reviewed by the account owner.
 *
 * Requires: BLUESKY_IDENTIFIER, BLUESKY_APP_PASSWORD
 * Run: bun run scripts/bsky-post-replies.ts
 */
import { AtpAgent, RichText } from "@atproto/api";

interface Reply {
  label: string;
  text: string;
  parentUri: string;
  parentCid: string;
}

// Top-level targets, so root === parent. Drafted 2026-07-07.
const REPLIES: Reply[] = [
  {
    label: "@danthurot",
    text: `'rewards creative thinking and semantic interpretation as much as raw factoid retrieval' — that's exactly the line I design to 🎬 filmclues.space: 16 films into 4 hidden groups, the fun's in the overlap traps. daily, free, no signup if you ever want to try one.`,
    parentUri: "at://did:plc:cbsfyaqlkubkui3zayodl3aw/app.bsky.feed.post/3mpyorkq6hs2c",
    parentCid: "bafyreickvveu6onhubdrwxv4ikwotu4ob2i5gxteciwbwrhjlcyzrq5gqa",
  },
  {
    label: "@d-coo",
    text: `a 'Tom Hanks pretending to be someone else' teaser is a perfect little spot-the-connection hook 🎬 that's the whole game at filmclues.space — 16 films into 4 hidden groups, figure out the shared thread. daily, free, no signup.`,
    parentUri: "at://did:plc:hsxaifl5bo43dv3o5sfreorb/app.bsky.feed.post/3mpyelljnqc24",
    parentCid: "bafyreib7llu5tnfat6hqhxwma7pcitjlb5vhyz5emphcqigrdv43442dzq",
  },
  {
    label: "@helloyorick",
    text: `the Swayze-skydiving-compromise bit is elite Point Break trivia 🪂 you'd like filmclues.space then — 16 films sorted into 4 hidden groups, half the fun is the deep-cut connections. daily, free, no signup.`,
    parentUri: "at://did:plc:o5mp4orkhjrmcgv2c7bj4azz/app.bsky.feed.post/3mpwrxztkvk26",
    parentCid: "bafyreigyq5nmnw4simfmjbjck3dn5bb7lhydrybtr5xqrwpctzggd3rmxe",
  },
  {
    label: "@renegadekangaroo",
    text: `FFX as Uematsu's peak is a hill worth dying on — 'To Zanarkand' alone makes the case 🎵 if you ever want a music-grouping break, musiclues.space: 16 songs into 4 hidden groups, Connections-style. daily, no signup.`,
    parentUri: "at://did:plc:2f6vb3pusi3gvhaewoxr463o/app.bsky.feed.post/3mpyoatod2k2l",
    parentCid: "bafyreiapegasatg2r6sx6kbh3dbi4t7m7alffyntahpfmaiff5xbajl3ju",
  },
  {
    label: "@jamestringham",
    text: `getting blue first and chalking it up to a childhood well spent is the most wholesome Connections flex 📚 if you want another grouping puzzle in the rotation, litclues.space — 16 books into 4 hidden groups. daily, free, no signup.`,
    parentUri: "at://did:plc:aytwes4vyimod4eubypxrnpy/app.bsky.feed.post/3mpxwjtzv2s2w",
    parentCid: "bafyreielpp7zoeufq5bhyvevgwaggtu2vm7dmjf3qq2i5x2wjljv5sykpi",
  },
  {
    label: "@dennisyslas",
    text: `a clean Strands + Connections sweep in one sitting is a real flex 🎵 if you want one more for the daily circuit, musiclues.space — 16 songs sorted into 4 hidden groups, Connections-style. free, no signup.`,
    parentUri: "at://did:plc:kimze5xm4hjczgtbftfs3q4e/app.bsky.feed.post/3mpvk3vld5mbo",
    parentCid: "bafyreic33badiinhpcjlsz2yotx6uuz64eqgxiitfxgcl4y2am5a7ebnim",
  },
];

async function main() {
  const identifier = process.env.BLUESKY_IDENTIFIER;
  const password = process.env.BLUESKY_APP_PASSWORD;
  if (!identifier || !password) throw new Error("Missing Bluesky env vars");

  const agent = new AtpAgent({ service: "https://bsky.social" });
  await agent.login({ identifier, password });

  for (const r of REPLIES) {
    const rt = new RichText({ text: r.text });
    await rt.detectFacets(agent);
    const ref = { uri: r.parentUri, cid: r.parentCid };
    const posted = await agent.post({
      text: rt.text,
      facets: rt.facets,
      reply: { root: ref, parent: ref },
      createdAt: new Date().toISOString(),
    });
    const rk = posted.uri.split("/").pop();
    console.log(`Replied to ${r.label}: https://bsky.app/profile/${identifier}/post/${rk}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
