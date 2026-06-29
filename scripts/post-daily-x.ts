/**
 * Prepares today's X/Twitter daily teaser (text + image) for the rotating game.
 *
 * X has no posting API in our plan (search/read is paywalled, free tier is
 * write-only), so this script does NOT post — it only PREPARES the teaser.
 * A human posts it via the browser (same posture as Facebook/Reddit). It
 * reuses the Bluesky teaser builders (SSOT) so copy + image match the other
 * platforms; only the trailing hashtags are swapped for X-native ones.
 *
 * Run: bun run scripts/post-daily-x.ts
 * Output: prints the post text + char count, and saves the teaser PNG to disk.
 */
import { writeFileSync } from "fs";
import {
  GENRE_CONFIGS,
  GENRE_ORDER,
  getTodayDate,
  getDayOfYear,
  fetchPuzzle,
  buildTemplate,
  fetchTeaserImage,
} from "./post-daily-bluesky";

// Bluesky-culture tags (#FilmSky) mean nothing on X — use the puzzle-audience tags.
const X_HASHTAGS = "#NYTConnections #Connections #dailypuzzle";
const OUT_DIR = process.env.X_TEASER_OUT || "/tmp";

async function main() {
  const today = getTodayDate();
  const genre = GENRE_ORDER[getDayOfYear() % GENRE_ORDER.length];
  const config = GENRE_CONFIGS[genre];

  const puzzle = await fetchPuzzle(genre, today);
  if (!puzzle) {
    console.error(`No published ${genre} puzzle for ${today}. Nothing to teaser.`);
    process.exit(1);
  }

  const result = buildTemplate(config, puzzle);
  const text = result.text.replace(config.hashtags, X_HASHTAGS);

  const img = await fetchTeaserImage(genre, result.titles, result.headline);
  let imgPath = "";
  if (img) {
    imgPath = `${OUT_DIR}/x-teaser-${genre}-${today}.png`;
    writeFileSync(imgPath, img);
  }

  console.log(`GAME:  ${config.siteName} ${config.emoji}  (${genre})   DATE: ${today}`);
  console.log(`CHARS: ${[...text].length} / 280`);
  console.log(`IMAGE: ${imgPath || "(image fetch failed — post text only)"}`);
  console.log("----- POST TEXT -----");
  console.log(text);
  console.log("---------------------");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
