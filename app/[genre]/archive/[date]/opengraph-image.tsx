import { ImageResponse } from "next/og";
import { getSeoConfig, isValidGenre } from "../../../../src/config/seoConfig";
import { isValidDateFormat, formatDateForDisplay } from "../../../../src/utils/dateValidation";

export const alt = "xClues Puzzle Archive";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GENRE_COLORS: Record<string, { bg: string; accent: string; emoji: string }> = {
  films: { bg: "#1a1028", accent: "#e84393", emoji: "🎬" },
  music: { bg: "#0d1520", accent: "#6c5ce7", emoji: "🎵" },
  books: { bg: "#1a0a0a", accent: "#c96442", emoji: "📚" },
};

const CATEGORY_COLORS = ["#fbbf24", "#34d399", "#60a5fa", "#a78bfa"];

export default async function OGImage({
  params,
}: {
  params: Promise<{ genre: string; date: string }>;
}) {
  const { genre, date } = await params;
  if (!isValidGenre(genre) || !isValidDateFormat(date)) {
    return new ImageResponse(<div>Not Found</div>, { ...size });
  }

  const config = getSeoConfig(genre);
  const colors = GENRE_COLORS[genre];
  const displayDate = formatDateForDisplay(date);

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
          background: colors.bg,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Four colored bars representing revealed categories */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "40px",
          }}
        >
          {CATEGORY_COLORS.map((color, i) => (
            <div
              key={i}
              style={{
                width: "280px",
                height: "36px",
                borderRadius: "10px",
                background: color,
                opacity: 0.85,
              }}
            />
          ))}
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: "12px",
          }}
        >
          {colors.emoji} {config.siteName}
        </div>

        {/* Date */}
        <div
          style={{
            fontSize: "30px",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "20px",
          }}
        >
          Puzzle Archive — {displayDate}
        </div>

        {/* CTA */}
        <div
          style={{
            fontSize: "22px",
            color: colors.accent,
            fontWeight: 600,
          }}
        >
          See all 4 categories revealed
        </div>
      </div>
    ),
    { ...size }
  );
}
