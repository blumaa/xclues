# xClues Daily Traffic Program

Trigger: the user says **"run the daily program."** Follow these steps exactly.

Goal: steady, genuine social engagement that compounds — WITHOUT tripping spam systems
(which would get the accounts/domain banned). Quality over quota.

## Hard caps (do not exceed — these protect the accounts)
- **≤ 8 replies per platform per day** (Bluesky + Mastodon + X). Fewer is fine.
- Never templated. Every reply tailored to that specific post. One soft mention of the game.
- Never contact the same account twice (see contacted-log).
- If there aren't 8 good targets, post fewer. A quiet day is better than a spammy one.

The automated daily teasers (cron, 3×/day) and the share loop carry the high-frequency
volume. Replies are the human-touch layer — deliberately low-volume.

After all the social work is done, the program ends with the **puzzle review** (last
section below) — surface tomorrow's puzzle for each genre so the owner can adjust it.

## Steps

### 1. Find targets
```
bun run scripts/bsky-find-targets.ts        # Bluesky (authed via .env.local)
bun run scripts/mastodon-find-targets.ts    # Mastodon (public reads, no auth)
```
Pipe through `base64` when reading output (the RTK hook mangles raw tool output).

### 2. Filter to genuine intent — CONNECTIONS FIRST
xClues IS a Connections-style game (group 16 into 4 categories), NOT Wordle (guess a
word). So prioritize in this order:
1. **NYT Connections** players (the exact mechanic match — highest convert).
2. Film / book / music fans who'd like a themed grouping puzzle (Filmclues/Litclues/Musiclues).
KEEP: genuine posts with commentary, scores + a reaction, "what do I play after X."
SKIP: score/aggregator bots (DailyGameBot, Termo, Quordle hint bots), video "puzzle
games," bare score posts with no words, non-English, anyone in the contacted-log.
DO NOT target **Wordle** players/groups: xClues is a grouping game, not guess-a-word.
Wrong mechanic, low relevance (owner's call 2026-06-27). The old "post-Wordle broad net"
idea is dropped.

Same lens for Facebook groups: NYT Connections groups are the bullseye; Wordle groups
are NOT a target (wrong mechanic). See scripts/fb-groups-joined.txt.

### 3. Cross-check the contacted-log
Read `scripts/engagement-contacted.txt`. Drop any handle already listed.

### 4. Draft tailored replies (≤ 8 per platform)
- Match the game to the person: movies → Filmclues, books → Litclues, music → Musiclues,
  general word-puzzle → Filmclues (the default).
- URLs: the ONLY valid play links are **filmclues.space / litclues.space / musiclues.space**.
  "xClues" is the brand name, NOT a domain — there is no xclues.space or hub URL. Never invent a link.
- Genuine reaction FIRST, then one soft mention. Vary phrasing every time.
- Length: ≤ 300 chars (Bluesky), ≤ 500 (Mastodon).

### 5. Present drafts to the user for approval.

### 6. Post via browser (user logged in; user has authorized publishing approved replies)
- Bluesky: open each post URL → "Compose reply" → fill → "Publish reply".
- Mastodon: user logs into their instance → open post URL → reply → publish.
- (API auto-posting is blocked by the safety classifier and by token scope; browser is the path.)

### 7. Log who was contacted
Append each contacted handle to `scripts/engagement-contacted.txt` so future runs skip them.

## Facebook (browser only — user logs in, then we post)
No API. Open the browser, user logs into Facebook, then post. Three destinations, different rules:

1. **xClues Page** — post the daily teaser (hook + link + image) every day. Safe, own audience.
2. **Personal profile** — same teaser, daily. Zero risk, low reach.
3. **Groups (NYT Connections groups only)** — HIGH risk, NOT a daily blast. (No Wordle groups — wrong mechanic.)
   - Before posting in a group, READ that group's rules/pinned post. Many only allow self-promo
     in a specific weekly thread (e.g. "Self-Promo Sunday"). Post only where/when allowed.
   - One genuine post per group, spaced out. Never the same link into many groups same day —
     Facebook flags cross-group link-spam and restricts the account.
   - Treat groups as opportunistic (a few per week, rule-checked), not part of the daily blast.

Teaser copy for Page/profile: a hook from today's puzzle + the play link, rotating game by day
(Filmclues / Litclues / Musiclues), same spirit as the Bluesky/Mastodon teasers.

## Reddit (account u/xClues — dedicated brand account)
Part of the daily program. Posture: opportunistic + rule-checked, NEVER a same-link blast.
Full target list + each sub's self-promo rules + posting log: **docs/reddit-targets.md** (read it).
Browser posting MUST use **old.reddit.com** (new Reddit's composer is shadow-DOM and won't hydrate).

Phased by date (u/xClues created 2026-06-29, ~0 karma → strict new-account spam filters):
- **Warm-up phase, through 2026-07-01:** 4–6 GENUINE comments/day, NO links, NO game mention,
  in r/NYTConnections, r/movies, r/books, r/puzzles. Truthful opinions only (never fabricate a
  puzzle solve). Present drafts for approval, then post via old.reddit.com. Builds karma so later
  link posts aren't auto-removed.
- **Posting phase, from 2026-07-02 onward:** 1 link post/day, rotating a DIFFERENT game (domain)
  to a DIFFERENT POST-OK sub each day (r/WebGames [3-mo repost/game], r/puzzlevideogames,
  r/TriviaChat, r/quiz; r/NYTConnections only framed as a custom themed board). Keep dropping a
  couple genuine comments too. Verify each post still shows while logged out (shadow-removal check).
- Same lens as everywhere: NYT Connections + film/book/music fans. No Wordle.

## X / Twitter (account @xcluesconnect — browser only, no API)
Part of the daily program. No API: X search/read is paywalled ($200/mo Basic), and the free
tier is write-only — so X runs like Facebook/Reddit, fully in the browser. User logs in, then we post.

**X = REPLIES ONLY + one pinned teaser (decided 2026-07-05).** The account has 0 followers, so a
daily timeline teaser reaches ~nobody — that item was dropped as busywork. Replies in other players'
threads are the ONLY lever that grows a cold account (reply → profile visit → click to the game).
Keep exactly ONE teaser pinned to the profile as the "shop-window" that reply-driven visitors land on;
do NOT post a fresh timeline teaser every day. Re-pin a new teaser only occasionally when the pinned
one goes stale.

Same caps and lens as everywhere: **≤ 8 replies/day**, tailored (never templated), one soft game
mention each. **NYT Connections + film/book/music fans FIRST. No Wordle** (wrong mechanic).

1. **Find targets in the browser** (no script — API is paywalled):
   - Open X search for the same intent terms the finders use: `NYT Connections`, `Connections puzzle`,
     `daily connections`, `movie trivia`, `book club daily`, `daily puzzle game`. Use the **Latest** tab.
   - KEEP genuine posts with commentary / a reaction / "what do I play after X." SKIP score-aggregator
     bots (Parade/TechRadar/hint accounts), non-English, and anyone in `scripts/engagement-contacted.txt`.
2. **Draft tailored replies** (≤ 8): match game to person (movies → Filmclues, books → Litclues,
   music → Musiclues, general → Filmclues, the default). Genuine reaction first, then one soft mention.
   URLs: ONLY filmclues.space / litclues.space / musiclues.space — never invent a link. **≤ 280 chars,
   but X counts any URL as 23 chars (t.co), so keep the VISIBLE text ≤ ~272 or the Post button locks.**
3. **Post via browser.** X's compose/reply editor is Draft.js behind a `#layers` overlay that blocks
   Playwright clicks: focus `[data-testid="tweetTextarea_0"]`, `page.keyboard.insertText(...)` the text,
   attach media by `setInputFiles` on the hidden `[data-testid="fileInput"]`, then submit with
   `Meta+Enter` (the Post-button click is overlay-blocked). `.fill()` does NOT stick in Draft.js.
4. **Log contacts:** append each contacted @handle to `scripts/engagement-contacted.txt` (under a
   dated `# YYYY-MM-DD (X):` header) so future runs skip them.

## Final step — puzzle review (present tomorrow's puzzle for each genre)

Do this LAST, after all the social work (Bluesky, Mastodon, X, Facebook, Reddit) is done.
End every daily run by surfacing tomorrow's puzzle so the owner can adjust it.

```
bun run puzzle:review        # prints tomorrow's Filmclues / Musiclues / Litclues puzzle
```

The admin pipeline (puzzlecules) already auto-published these ~30 days ahead, but a
future-dated puzzle is invisible to players until its UTC date — so tomorrow's is safe to
edit in place now.

**Present all three to the owner** as a markdown table per genre — one row per grouped
connection, columns `# (color/difficulty) | Connection | Item 1 | Item 2 | Item 3 | Item 4`:

| # | Connection | Item 1 | Item 2 | Item 3 | Item 4 |
|---|---|---|---|---|---|
| 1 `yellow/easy` | … | … | … | … | … |

After the tables, surface any correctness flags. Then let the owner call adjustments. Two
tools, both 1-based indices matching the review printout, `--date` defaults to tomorrow (UTC):

**Replace a whole group** (the routine "swap group N for a new connection"). One `--item`
per slot; item count must match the group (4). Reuses the group's item ids + color, sets a
new connection and the four items with correct metadata. Item spec is pipe-delimited:
`films/books = "Title|Year"`, `music = "Title|Artist[|Year]"`.

```
bun run puzzle:set-group --genre films --date <tomorrow> --group 1 \
  --connection "Pixar films" \
  --item "Up|2009" --item "Coco|2017" --item "Brave|2012" --item "Ratatouille|2007"

bun run puzzle:set-group --genre music --date <tomorrow> --group 4 \
  --connection "One-hit-wonder singles" \
  --item "Roxanne|The Police|1978" --item "Tainted Love|Soft Cell|1981" \
  --item "Take On Me|a-ha|1985" --item "99 Luftballons|Nena|1983"
```

**Small in-place fix** (one field — a single wrong item, connection wording, difficulty):

```
bun run puzzle:edit --genre films --date <tomorrow> --group 2 --item 3 --title "Alien"
bun run puzzle:edit --genre books --date <tomorrow> --group 4 --connection "Titles containing 'Dark'"
bun run puzzle:edit --genre films --date <tomorrow> --group 3 --difficulty hardest
```

Both write the `groups` snapshot the game reads (they don't touch the normalized
`connection_groups` pool — fine, the game renders from the snapshot). `NO PUZZLE` printed =
that date is a gap; fill it via puzzlecules `bun run pipeline:fill`.

## Notes
- Mastodon token is write-only (used by teaser posters); reads use mastodon.social public
  timelines. To enable full API automation later, regenerate the token with `read` scope.
- Bluesky app password lives in `.env.local` (gitignored). Owner should rotate it periodically.
- Facebook is browser-only; no credentials are stored. User logs in each session.
