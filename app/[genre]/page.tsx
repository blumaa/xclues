import type { Metadata } from "next";
import { GamePage } from "../game-page";
import { type Genre, getSeoConfig, isValidGenre, VALID_GENRES } from "../../src/config/seoConfig";
import { createServerSupabaseClient } from "../../src/lib/supabase/server";
import type { SavedPuzzle, Group, Item } from "../../src/types";

function getTodayDate(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const CACHE_TTL = 60 * 60 * 1000;
const puzzleCache = new Map<string, { data: SavedPuzzle; timestamp: number }>();

function parsePuzzleRow(data: Record<string, unknown>): SavedPuzzle {
  const groups = (data.groups as Array<{ id: string; items: Item[]; connection: string; difficulty: string; color: string }>).map((g) => ({
    id: g.id,
    items: g.items as Item[],
    connection: g.connection,
    difficulty: g.difficulty,
    color: g.color,
  })) as Group[];

  const items = groups.flatMap((g) => g.items);

  return {
    id: data.id as string,
    groups,
    items,
    createdAt: new Date(data.created_at as string).getTime(),
    metadata: data.metadata as Record<string, unknown> | undefined,
  };
}

async function fetchDailyPuzzle(genre: string, date: string): Promise<SavedPuzzle | null> {
  const cacheKey = `${genre}-${date}`;
  const cached = puzzleCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("puzzles")
    .select("id, groups, puzzle_date, created_at, metadata")
    .eq("puzzle_date", date)
    .eq("genre", genre)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;

  const parsed = parsePuzzleRow(data as Record<string, unknown>);
  puzzleCache.set(cacheKey, { data: parsed, timestamp: Date.now() });
  return parsed;
}

export async function generateStaticParams() {
  return VALID_GENRES.map((genre) => ({ genre }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre: string }>;
}): Promise<Metadata> {
  const { genre } = await params;
  if (!isValidGenre(genre)) return {};

  const config = getSeoConfig(genre);
  return {
    title: { absolute: config.metaTitle },
    description: config.metaDescription,
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `https://${config.domain}`,
    },
    twitter: {
      title: config.metaTitle,
      description: config.metaDescription,
    },
    alternates: {
      canonical: `https://${config.domain}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;
  const today = getTodayDate();

  // Fetch all 3 puzzles in parallel — passed as props, no React Query needed
  const [films, books, music] = await Promise.all(
    VALID_GENRES.map((g) => fetchDailyPuzzle(g, today))
  );

  const config = getSeoConfig(genre as Genre);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: config.siteName,
    description: config.metaDescription,
    url: `https://${config.domain}`,
    applicationCategory: "Game",
    genre: "Puzzle",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GamePage
        initialGenre={genre as Genre}
        puzzleDate={today}
        puzzles={{ films, books, music }}
      />
    </>
  );
}
