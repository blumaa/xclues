import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GamePage } from "../game-page";
import { type Genre, getSeoConfig, isValidGenre, VALID_GENRES } from "../../src/config/seoConfig";
import { fetchPuzzleByDate } from "../../src/lib/supabase/puzzleQueries";

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
  if (!isValidGenre(genre)) notFound();

  const today = getTodayDate();

  // Fetch all 3 puzzles in parallel — passed as props, no React Query needed
  const [films, books, music] = await Promise.all(
    VALID_GENRES.map((g) => fetchPuzzleByDate(g, today))
  );

  const config = getSeoConfig(genre);
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
