import { ImageResponse } from "next/og";
import { isValidGenre, getSeoConfig } from "../../../../src/config/seoConfig";
import { fetchPuzzleByDate } from "../../../../src/lib/supabase/puzzleQueries";
import { getDisplayTitle } from "../../../../src/utils/displayTitle";

export const runtime = "nodejs";

const GENRE_THEMES: Record<string, { bg: string; accent: string; emoji: string }> = {
  films: { bg: "#1a1028", accent: "#e84393", emoji: "🎬" },
  music: { bg: "#0d1520", accent: "#a78bfa", emoji: "🎵" },
  books: { bg: "#1a0a0a", accent: "#c96442", emoji: "📚" },
};

function getTodayDate(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000);
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ genre: string }> }
) {
  const { genre } = await params;
  if (!isValidGenre(genre)) {
    return new Response("Invalid genre", { status: 400 });
  }

  const config = getSeoConfig(genre);
  const theme = GENRE_THEMES[genre];

  // Parse titles from ?titles= (comma-separated, URL-encoded).
  // Fallback: fetch today's puzzle and show first group's items.
  const url = new URL(req.url);
  const titlesParam = url.searchParams.get("titles");
  let titles: string[];
  let headline: string;

  if (titlesParam) {
    titles = titlesParam
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .slice(0, 8);
    headline = url.searchParams.get("headline") || "Today's puzzle";
  } else {
    const puzzle = await fetchPuzzleByDate(genre, getTodayDate());
    if (!puzzle || puzzle.groups.length === 0) {
      return new Response("No puzzle available", { status: 404 });
    }
    const group = puzzle.groups[getDayOfYear() % puzzle.groups.length];
    titles = group.items.slice(0, 4).map((i) => getDisplayTitle(i));
    headline = `Today's ${config.siteName}`;
  }

  if (titles.length === 0) {
    return new Response("No titles to render", { status: 400 });
  }

  // Pick font size based on count and longest title
  const longest = Math.max(...titles.map((t) => t.length));
  const fontSize = longest > 30 ? 22 : longest > 20 ? 26 : 30;
  // Tile basis: more items = narrower tiles
  const basisPct = titles.length <= 2 ? 45 : titles.length <= 4 ? 45 : 30;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: theme.bg,
          fontFamily: "system-ui, sans-serif",
          padding: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "40px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: "36px",
          }}
        >
          {`${theme.emoji} ${headline}`}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
            maxWidth: "1000px",
          }}
        >
          {titles.map((title, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.1)",
                border: "2px solid rgba(255,255,255,0.2)",
                borderRadius: "14px",
                padding: "24px 18px",
                fontSize: `${fontSize}px`,
                fontWeight: 600,
                color: "#ffffff",
                textAlign: "center",
                minHeight: "100px",
                flexBasis: `calc(${basisPct}% - 14px)`,
                flexGrow: 0,
                flexShrink: 0,
              }}
            >
              {title}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "22px",
            color: theme.accent,
            marginTop: "36px",
            fontWeight: 600,
          }}
        >
          {config.domain}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
