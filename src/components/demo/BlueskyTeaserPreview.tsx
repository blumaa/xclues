/**
 * Preview of the Bluesky daily bot templates.
 *
 * Mirrors the logic from scripts/post-daily-bluesky.ts so you can
 * see exactly what the bot will post — post text + teaser image —
 * for each of the 4 rotating templates.
 */

import type { CSSProperties } from "react";
import type { Genre, SeoConfig } from "../../config/seoConfig";
import { getSeoConfig } from "../../config/seoConfig";
import type { Group, Item, SavedPuzzle } from "../../types";
import { getDisplayTitle } from "../../utils/displayTitle";

/* Mirror bot's theme palette */
const GENRE_THEMES: Record<Genre, { bg: string; accent: string; emoji: string; itemLabel: string; hashtags: string }> = {
  films: { bg: "#1a1028", accent: "#e84393", emoji: "🎬", itemLabel: "films", hashtags: "#FilmSky #dailygame" },
  music: { bg: "#0d1520", accent: "#a78bfa", emoji: "🎵", itemLabel: "songs", hashtags: "#MusicSky #dailygame" },
  books: { bg: "#1a0a0a", accent: "#c96442", emoji: "📚", itemLabel: "books", hashtags: "#BookSky #dailygame" },
};

function shuffleDeterministic<T>(array: T[], seed: number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = (seed * (i + 1) * 2654435761) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

interface TemplateResult {
  name: string;
  text: string;
  titles: string[];
  headline: string;
}

function tmplMiniGame(cfg: SeoConfig, puzzle: SavedPuzzle, seed: number): TemplateResult {
  const mainCandidates = puzzle.groups.filter((g) => g.color !== "purple");
  const mainGroup = mainCandidates[seed % mainCandidates.length] ?? puzzle.groups[0];
  const otherGroups = puzzle.groups.filter((g) => g.id !== mainGroup.id);
  const decoyGroup = otherGroups[seed % otherGroups.length];

  const realItems = mainGroup.items.slice(0, 4).map(getDisplayTitle);
  const decoys = decoyGroup.items.slice(0, 2).map(getDisplayTitle);
  const titles = shuffleDeterministic([...realItems, ...decoys], seed);

  const text = `4 of these 6 ${cfg.itemNamePlural} share a hidden connection. Which 4?

${titles.join(" · ")}

Full puzzle (16 ${cfg.itemNamePlural}, 4 categories) 👇

${GENRE_THEMES[cfg.genre].emoji} https://${cfg.domain}

${GENRE_THEMES[cfg.genre].hashtags}`;

  return { name: "Template 1 — Mini-game", text, titles, headline: `Mini ${cfg.siteName}` };
}

function tmplPurpleChallenge(cfg: SeoConfig, puzzle: SavedPuzzle, seed: number): TemplateResult {
  const purple = puzzle.groups.find((g) => g.color === "purple") ?? puzzle.groups[puzzle.groups.length - 1];
  const shuffled = shuffleDeterministic(purple.items.slice(0, 4), seed);
  const shownItems = shuffled.slice(0, 3).map(getDisplayTitle);
  const titles = [...shownItems, "?"];
  const text = `Three of the four ${cfg.itemNamePlural} in today's 🟪 trickiest category:

${shownItems.join(" · ")}

Can you name the 4th?

${GENRE_THEMES[cfg.genre].emoji} https://${cfg.domain}

${GENRE_THEMES[cfg.genre].hashtags}`;
  return { name: "Template 2 — Name the 4th (purple)", text, titles, headline: `Name the 4th` };
}

function tmplOddOneOut(cfg: SeoConfig, puzzle: SavedPuzzle, seed: number): TemplateResult {
  const mainGroup = puzzle.groups[seed % puzzle.groups.length];
  const otherGroups = puzzle.groups.filter((g) => g.id !== mainGroup.id);
  const decoyGroup = otherGroups[seed % otherGroups.length];

  const realItems = mainGroup.items.slice(0, 4).map(getDisplayTitle);
  const decoy = getDisplayTitle(decoyGroup.items[0]);
  const titles = shuffleDeterministic([...realItems, decoy], seed);

  const text = `One of these ${cfg.itemNamePlural} doesn't belong. The other 4 share a hidden connection.

${titles.join(" · ")}

Which is the outlier? (Solve the full puzzle to find out.)

${GENRE_THEMES[cfg.genre].emoji} https://${cfg.domain}

${GENRE_THEMES[cfg.genre].hashtags}`;
  return { name: "Template 3 — Odd one out", text, titles, headline: `Spot the outlier` };
}

function tmplTriviaPair(cfg: SeoConfig, puzzle: SavedPuzzle, seed: number): TemplateResult {
  const group = puzzle.groups[seed % puzzle.groups.length];
  const titles = group.items.slice(0, 2).map(getDisplayTitle);

  const text = `What do ${titles[0]} and ${titles[1]} have in common?

(They're both in today's ${cfg.siteName}. Find 14 more ${cfg.itemNamePlural} + 3 other hidden categories.)

${GENRE_THEMES[cfg.genre].emoji} https://${cfg.domain}

${GENRE_THEMES[cfg.genre].hashtags}`;
  return { name: "Template 4 — Trivia pair", text, titles, headline: `What's the link?` };
}

/* ─────────────── Image preview (HTML/CSS mirror of the Satori output) ─────────────── */

function TeaserImage({
  genre,
  headline,
  titles,
}: {
  genre: Genre;
  headline: string;
  titles: string[];
}) {
  const theme = GENRE_THEMES[genre];
  const config = getSeoConfig(genre);

  const longest = Math.max(...titles.map((t) => t.length));
  const fontSize = longest > 30 ? 16 : longest > 20 ? 19 : 22;
  const basisPct = titles.length <= 2 ? 45 : titles.length <= 4 ? 45 : 30;

  const containerStyle: CSSProperties = {
    width: 600,
    height: 315,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: theme.bg,
    fontFamily: "system-ui, sans-serif",
    padding: 25,
    borderRadius: 8,
    boxSizing: "border-box",
    overflow: "hidden",
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-0.02em",
          marginBottom: 18,
        }}
      >
        {theme.emoji} {headline}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 8,
          maxWidth: 500,
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
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              padding: "14px 10px",
              fontSize,
              fontWeight: 600,
              color: "#ffffff",
              textAlign: "center",
              minHeight: 50,
              flexBasis: `calc(${basisPct}% - 8px)`,
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
          fontSize: 12,
          color: theme.accent,
          marginTop: 18,
          fontWeight: 600,
        }}
      >
        {config.domain}
      </div>
    </div>
  );
}

/* ─────────────── Story component ─────────────── */

interface BlueskyTeaserPreviewProps {
  genre: Genre;
  puzzle: SavedPuzzle;
  seed?: number;
}

export function BlueskyTeaserPreview({
  genre,
  puzzle,
  seed = 105,
}: BlueskyTeaserPreviewProps) {
  const cfg = getSeoConfig(genre);
  const templates: TemplateResult[] = [
    tmplMiniGame(cfg, puzzle, seed),
    tmplPurpleChallenge(cfg, puzzle, seed),
    tmplOddOneOut(cfg, puzzle, seed),
    tmplTriviaPair(cfg, puzzle, seed),
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        padding: 24,
        maxWidth: 720,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2 style={{ fontSize: 24, margin: 0 }}>
        Bluesky Daily Bot — {cfg.siteName} preview
      </h2>
      <p style={{ color: "#666", fontSize: 14, margin: 0 }}>
        One of these 4 templates is chosen each day based on day-of-year.
        Each shows the post text on the left, teaser image on the right.
      </p>

      {templates.map((t) => (
        <div
          key={t.name}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <h3 style={{ fontSize: 16, margin: 0 }}>{t.name}</h3>
          <pre
            style={{
              background: "#f5f5f5",
              padding: 12,
              borderRadius: 6,
              fontSize: 13,
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
              fontFamily: "system-ui, sans-serif",
              margin: 0,
            }}
          >
            {t.text}
          </pre>
          <TeaserImage genre={genre} headline={t.headline} titles={t.titles} />
        </div>
      ))}
    </div>
  );
}

/* ─────────────── Mock puzzle data for the stories ─────────────── */

const mockFilmItems: Item[] = [
  { id: 1, title: "Pulp Fiction" },
  { id: 2, title: "Kill Bill" },
  { id: 3, title: "Reservoir Dogs" },
  { id: 4, title: "Django Unchained" },
  { id: 5, title: "The Godfather" },
  { id: 6, title: "Goodfellas" },
  { id: 7, title: "Casino" },
  { id: 8, title: "Scarface" },
  { id: 9, title: "Inception" },
  { id: 10, title: "The Matrix" },
  { id: 11, title: "Memento" },
  { id: 12, title: "Tenet" },
  { id: 13, title: "Interstellar" },
  { id: 14, title: "Arrival" },
  { id: 15, title: "2001: A Space Odyssey" },
  { id: 16, title: "Contact" },
];

const mockFilmGroups: Group[] = [
  { id: "1", items: mockFilmItems.slice(0, 4), connection: "Directed by Tarantino", difficulty: "easy", color: "yellow" },
  { id: "2", items: mockFilmItems.slice(4, 8), connection: "Classic mob films", difficulty: "medium", color: "green" },
  { id: "3", items: mockFilmItems.slice(8, 12), connection: "Mind-bending narratives", difficulty: "hard", color: "blue" },
  { id: "4", items: mockFilmItems.slice(12, 16), connection: "About space and time", difficulty: "hardest", color: "purple" },
];

export const MOCK_FILMS_PUZZLE: SavedPuzzle = {
  id: "mock-films",
  items: mockFilmItems,
  groups: mockFilmGroups,
  createdAt: Date.now(),
};

const mockBookItems: Item[] = [
  { id: 1, title: "Matilda" },
  { id: 2, title: "Charlie and the Chocolate Factory" },
  { id: 3, title: "James and the Giant Peach" },
  { id: 4, title: "The BFG" },
  { id: 5, title: "The Plague" },
  { id: 6, title: "Station Eleven" },
  { id: 7, title: "The Stand" },
  { id: 8, title: "The Decameron" },
  { id: 9, title: "1984" },
  { id: 10, title: "Brave New World" },
  { id: 11, title: "Fahrenheit 451" },
  { id: 12, title: "We" },
  { id: 13, title: "Ulysses" },
  { id: 14, title: "Mrs Dalloway" },
  { id: 15, title: "To the Lighthouse" },
  { id: 16, title: "The Waves" },
];

const mockBookGroups: Group[] = [
  { id: "1", items: mockBookItems.slice(0, 4), connection: "Roald Dahl", difficulty: "easy", color: "yellow" },
  { id: "2", items: mockBookItems.slice(4, 8), connection: "Plague fiction", difficulty: "medium", color: "green" },
  { id: "3", items: mockBookItems.slice(8, 12), connection: "Classic dystopias", difficulty: "hard", color: "blue" },
  { id: "4", items: mockBookItems.slice(12, 16), connection: "Virginia Woolf novels", difficulty: "hardest", color: "purple" },
];

export const MOCK_BOOKS_PUZZLE: SavedPuzzle = {
  id: "mock-books",
  items: mockBookItems,
  groups: mockBookGroups,
  createdAt: Date.now(),
};

const mockMusicItems: Item[] = [
  { id: 1, title: "Hey Jude", artist: "The Beatles" },
  { id: 2, title: "Let It Be", artist: "The Beatles" },
  { id: 3, title: "Come Together", artist: "The Beatles" },
  { id: 4, title: "Yesterday", artist: "The Beatles" },
  { id: 5, title: "Paint It Black", artist: "The Rolling Stones" },
  { id: 6, title: "Satisfaction", artist: "The Rolling Stones" },
  { id: 7, title: "Gimme Shelter", artist: "The Rolling Stones" },
  { id: 8, title: "Angie", artist: "The Rolling Stones" },
  { id: 9, title: "Bohemian Rhapsody", artist: "Queen" },
  { id: 10, title: "We Will Rock You", artist: "Queen" },
  { id: 11, title: "Somebody to Love", artist: "Queen" },
  { id: 12, title: "Under Pressure", artist: "Queen" },
  { id: 13, title: "Take Five", artist: "Dave Brubeck" },
  { id: 14, title: "So What", artist: "Miles Davis" },
  { id: 15, title: "My Favorite Things", artist: "John Coltrane" },
  { id: 16, title: "Round Midnight", artist: "Thelonious Monk" },
];

const mockMusicGroups: Group[] = [
  { id: "1", items: mockMusicItems.slice(0, 4), connection: "The Beatles", difficulty: "easy", color: "yellow" },
  { id: "2", items: mockMusicItems.slice(4, 8), connection: "The Rolling Stones", difficulty: "medium", color: "green" },
  { id: "3", items: mockMusicItems.slice(8, 12), connection: "Queen", difficulty: "hard", color: "blue" },
  { id: "4", items: mockMusicItems.slice(12, 16), connection: "Jazz standards", difficulty: "hardest", color: "purple" },
];

export const MOCK_MUSIC_PUZZLE: SavedPuzzle = {
  id: "mock-music",
  items: mockMusicItems,
  groups: mockMusicGroups,
  createdAt: Date.now(),
};
