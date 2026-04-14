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

function pickCategoryIndex(date: string): number {
  // Deterministic per-day category pick (same all day for caching)
  const hash = [...date].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return hash % 4;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ genre: string }> }
) {
  const { genre } = await params;
  if (!isValidGenre(genre)) {
    return new Response("Invalid genre", { status: 400 });
  }

  const date = getTodayDate();
  const puzzle = await fetchPuzzleByDate(genre, date);
  if (!puzzle || puzzle.groups.length === 0) {
    return new Response("No puzzle available", { status: 404 });
  }

  const config = getSeoConfig(genre);
  const theme = GENRE_THEMES[genre];
  const group = puzzle.groups[pickCategoryIndex(date) % puzzle.groups.length];
  const items = group.items.slice(0, 4).map((i) => getDisplayTitle(i));

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
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "42px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: "8px",
          }}
        >
          {`${theme.emoji} Today's ${config.siteName}`}
        </div>

        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "40px",
          }}
        >
          What connects these four?
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "900px",
          }}
        >
          {[0, 2].map((rowStart) => (
            <div
              key={rowStart}
              style={{ display: "flex", gap: "16px", width: "100%" }}
            >
              {items.slice(rowStart, rowStart + 2).map((title, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.1)",
                    border: "2px solid rgba(255,255,255,0.2)",
                    borderRadius: "16px",
                    padding: "28px 20px",
                    fontSize: "30px",
                    fontWeight: 600,
                    color: "#ffffff",
                    textAlign: "center",
                    minHeight: "120px",
                    flex: 1,
                  }}
                >
                  {title}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "22px",
            color: theme.accent,
            marginTop: "40px",
            fontWeight: 600,
          }}
        >
          {`Plus 12 more. ${config.domain}`}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
