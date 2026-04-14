import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPuzzleByDate } from "../../../../src/lib/supabase/puzzleQueries";
import { isValidDateFormat, isNotFutureDate, formatDateForDisplay } from "../../../../src/utils/dateValidation";
import { type Genre, getSeoConfig, isValidGenre } from "../../../../src/config/seoConfig";
import { PuzzleReveal } from "../../../../src/components/organisms/PuzzleReveal";

interface ArchiveParams {
  genre: string;
  date: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ArchiveParams>;
}): Promise<Metadata> {
  const { genre, date } = await params;

  if (!isValidGenre(genre) || !isValidDateFormat(date)) return {};

  const config = getSeoConfig(genre);
  const displayDate = formatDateForDisplay(date);
  const title = `${config.siteName} Puzzle - ${displayDate} | Archive`;
  const description = `See the ${config.siteName} puzzle from ${displayDate}. All 4 categories revealed with their connections.`;

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: `https://${config.domain}/${genre}/archive/${date}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `https://${config.domain}/${genre}/archive/${date}`,
    },
  };
}

export default async function ArchivePage({
  params,
}: {
  params: Promise<ArchiveParams>;
}) {
  const { genre, date } = await params;

  if (!isValidGenre(genre)) notFound();
  if (!isValidDateFormat(date)) notFound();
  if (!isNotFutureDate(date)) notFound();

  const puzzle = await fetchPuzzleByDate(genre, date);
  if (!puzzle) notFound();

  const config = getSeoConfig(genre);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${config.siteName} Puzzle - ${formatDateForDisplay(date)}`,
    datePublished: date,
    url: `https://${config.domain}/${genre}/archive/${date}`,
    isPartOf: {
      "@type": "WebApplication",
      name: config.siteName,
      url: `https://${config.domain}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PuzzleReveal puzzle={puzzle} genre={genre as Genre} date={date} />
    </>
  );
}
