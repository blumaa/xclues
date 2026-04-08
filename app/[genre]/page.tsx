import type { Metadata } from "next";
import { GamePage } from "../game-page";
import { type Genre, getSeoConfig, isValidGenre, VALID_GENRES } from "../../src/config/seoConfig";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { puzzleKeys } from "../../src/lib/supabase/storage/usePuzzleStorage";
import { createServerSupabaseClient } from "../../src/lib/supabase/server";

function getTodayDate(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function fetchDailyPuzzle(genre: string, date: string) {
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

  const row = data as Record<string, unknown>;
  const groups = (row.groups as Array<{ id: string; items: Array<Record<string, unknown>>; connection: string; difficulty: string; color: string }>).map((g) => ({
    id: g.id,
    items: g.items,
    connection: g.connection,
    difficulty: g.difficulty,
    color: g.color,
  }));

  const items = groups.flatMap((g) => g.items);

  return {
    id: row.id as string,
    groups,
    items,
    createdAt: new Date(row.created_at as string).getTime(),
    metadata: row.metadata as Record<string, unknown> | undefined,
    puzzleDate: row.puzzle_date as string,
  };
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
      url: `https://filmclues.com/${genre}`,
    },
    twitter: {
      title: config.metaTitle,
      description: config.metaDescription,
    },
    alternates: {
      canonical: `https://filmclues.com/${genre}`,
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

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: puzzleKeys.daily(today, genre),
    queryFn: () => fetchDailyPuzzle(genre, today),
  });

  const config = getSeoConfig(genre as Genre);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: config.siteName,
    description: config.metaDescription,
    url: `https://filmclues.com/${genre}`,
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GamePage genre={genre as Genre} puzzleDate={today} />
      </HydrationBoundary>
    </>
  );
}
