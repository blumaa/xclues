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

// Top-level targets, so root === parent.
const REPLIES: Reply[] = [
  {
    label: "@idontreadwell",
    text: `skill 94 / luck 76 is a real solve, not a fluke 👏 if you ever want another grouping puzzle in the rotation I built filmclues.space — sort 16 films into 4 hidden groups, same "how are these connected" itch, fresh daily.`,
    parentUri: "at://did:plc:wwovywc5fzbsp2a4opftbnxc/app.bsky.feed.post/3mpbvzzfl7k23",
    parentCid: "bafyreidaohg7ug2nsj5wbw46l33tu46hcz2znkj5u6qvcuueimeowoohnq",
  },
  {
    label: "@therealmrsweary",
    text: `the billiard-ball category was a war crime, you're right 🎱 if you want a grouping puzzle that plays fair I made filmclues.space — 16 films into 4 hidden groups, no "technically a stripe" nonsense. free, daily.`,
    parentUri: "at://did:plc:dogizyzrqaxdydrsnk74gmoy/app.bsky.feed.post/3mpbwfccmkc2k",
    parentCid: "bafyreievtombkrtt4pxk5xec6bcuy6yv7olzu3t6bmvb5jhobzfjznnrsi",
  },
  {
    label: "@ravinder70",
    text: `Sunday Connections as solace is the correct use of it 😄 if you want a second hit once it's done, musiclues.space — sort 16 songs into 4 hidden groups, same satisfying snap. fresh daily.`,
    parentUri: "at://did:plc:6rtb3zoosw7aeksbqnrx6v7d/app.bsky.feed.post/3mpdjqsg5tk2b",
    parentCid: "bafyreibwkysrcy7kv2hlxje2fnl6mfjzwnx57h7wh76v6gvwebnnym5l3q",
  },
  {
    label: "@temoku",
    text: `that one-category-instantly, rest-is-fog feeling is the whole game 😄 if you like the grouping mechanic I made musiclues.space — 16 songs into 4 hidden groups, daily. same click when a set finally lands.`,
    parentUri: "at://did:plc:lxqp4wsmw2zbknuu3cv7znol/app.bsky.feed.post/3mpchowdras2l",
    parentCid: "bafyreic6ltr26hd4m4nmxqmv5ul6cx6zctmpvzcuawcuasj2wpnvhwqllm",
  },
  {
    label: "@bookmeister",
    text: `the Monopoly category was genuinely unfair, valid complaint 📚 if you want grouping puzzles that keep it tight, litclues.space — sort 16 books into 4 hidden groups, fresh daily. same itch, fewer cheap shots.`,
    parentUri: "at://did:plc:br3qbx25njo5zytafcuii2pm/app.bsky.feed.post/3mpb5zqt7p22m",
    parentCid: "bafyreibp337doox2qa7qo2bw4r75pxw6apbuhkjc2dn6kpf32nd6uzxl5a",
  },
  {
    label: "@sydspages",
    text: `five stars for House of Open Wounds, noted 📚 if you ever want a bookish puzzle break I made litclues.space — sort 16 books into 4 hidden groups, Connections-style, daily.`,
    parentUri: "at://did:plc:4s6yddaeom2i5a2tytwvlkq5/app.bsky.feed.post/3mp4mixoxqs2z",
    parentCid: "bafyreignonqfgyjrogwhjtqqokqjguuihdxcblun4r3m2xkercibsnnhvq",
  },
  {
    label: "@jjellybeano",
    text: `an 80s movie-music trivia night is exactly my crowd 🎬🎵 made musiclues.space if you want a daily version — sort 16 songs into 4 hidden groups, Connections-style. free, no signup.`,
    parentUri: "at://did:plc:3odrein2jgtclkg2cmpp54vb/app.bsky.feed.post/3mpcrlgtx3s2j",
    parentCid: "bafyreif4pqqbrxt2xikzkzjhpiyyz32kht2zrg663xk2225tcmtqokxz5y",
  },
  {
    label: "@cici6923",
    text: `No Such Thing As A Fish is such a good trivia rabbit hole 🐟 if you like that pull, filmclues.space might land — 16 films into 4 hidden groups, a daily Connections-style puzzle. free.`,
    parentUri: "at://did:plc:uktv7elssirwzbpxuvqapvrq/app.bsky.feed.post/3mp6f7efzic2q",
    parentCid: "bafyreifmqcw7a2mb7ib3wwkbtehhszx2ltcntwg44ste3wo45b6cnjxq7u",
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
