import type { Metadata } from "next";
import { GamePage } from "../game-page";
import { type Genre, getSeoConfig, isValidGenre, VALID_GENRES } from "../../src/config/seoConfig";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { puzzleKeys } from "../../src/lib/supabase/storage/usePuzzleStorage";
import { SupabaseStorage } from "../../src/lib/supabase/storage/SupabaseStorage";
import { createServerSupabaseClient } from "../../src/lib/supabase/server";

function getTodayDate(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
    title: config.metaTitle,
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
  const supabase = createServerSupabaseClient();

  if (supabase) {
    const storage = new SupabaseStorage(supabase);
    await queryClient.prefetchQuery({
      queryKey: puzzleKeys.daily(today, genre),
      queryFn: () => storage.getDailyPuzzle(today, genre),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GamePage genre={genre as Genre} puzzleDate={today} />
    </HydrationBoundary>
  );
}
