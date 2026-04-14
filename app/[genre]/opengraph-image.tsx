import { ImageResponse } from "next/og";
import { getSeoConfig, isValidGenre } from "../../src/config/seoConfig";

export const alt = "xClues - Daily Connection Puzzles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GENRE_COLORS: Record<string, { bg: string; accent: string; emoji: string }> = {
  films: { bg: "#1a1028", accent: "#e84393", emoji: "🎬" },
  music: { bg: "#0d1520", accent: "#6c5ce7", emoji: "🎵" },
  books: { bg: "#1a0a0a", accent: "#c96442", emoji: "📚" },
};

const CATEGORY_COLORS = ["#fbbf24", "#34d399", "#60a5fa", "#a78bfa"];

export default async function OGImage({ params }: { params: Promise<{ genre: string }> }) {
  const { genre } = await params;
  if (!isValidGenre(genre)) {
    return new ImageResponse(<div>Not Found</div>, { ...size });
  }

  const config = getSeoConfig(genre);
  const colors = GENRE_COLORS[genre];

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
        {/* Four colored dots representing the 4 categories */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "40px" }}>
          {CATEGORY_COLORS.map((color, i) => (
            <div
              key={i}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: color,
              }}
            />
          ))}
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: "72px",
            display: "flex",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          {`${colors.emoji} ${config.siteName}`}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "32px",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "40px",
          }}
        >
          {config.siteDescription}
        </div>

        {/* Mini game grid preview - 4x4 tiles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {[0, 1, 2, 3].map((row) => (
            <div key={row} style={{ display: "flex", gap: "6px" }}>
              {[0, 1, 2, 3].map((col) => (
                <div
                  key={col}
                  style={{
                    width: "60px",
                    height: "40px",
                    borderRadius: "8px",
                    background: `${CATEGORY_COLORS[row]}33`,
                    border: `1px solid ${CATEGORY_COLORS[row]}66`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            fontSize: "22px",
            color: colors.accent,
            marginTop: "32px",
            fontWeight: 600,
          }}
        >
          Play free — new puzzle every day
        </div>
      </div>
    ),
    { ...size }
  );
}
