import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchPuzzleByDate,
  fetchPublishedDatesForGenre,
} from "../../../../src/lib/supabase/puzzleQueries";
import {
  isValidDateFormat,
  isPastDate,
  formatDateForDisplay,
} from "../../../../src/utils/dateValidation";
import { getAdjacentDates } from "../../../../src/utils/archiveDates";
import { type Genre, getSeoConfig, isValidGenre } from "../../../../src/config/seoConfig";
import { buildBreadcrumbJsonLd } from "../../../../src/lib/seo/breadcrumbJsonLd";
import { PuzzleReveal } from "../../../../src/components/organisms/PuzzleReveal";
import { Breadcrumbs } from "../../../../src/components/molecules/Breadcrumbs";
import { ArchiveDateNav } from "../../../../src/components/molecules/ArchiveDateNav";
import "./archive-date.css";

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
  // Only past puzzles are archived; today's live puzzle and future dates 404 so
  // players can't read the answers early.
  if (!isPastDate(date)) notFound();

  const puzzle = await fetchPuzzleByDate(genre, date);
  if (!puzzle) notFound();

  const config = getSeoConfig(genre);
  const displayDate = formatDateForDisplay(date);

  const publishedDates = await fetchPublishedDatesForGenre(genre);
  const { older, newer } = getAdjacentDates(publishedDates, date);

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${config.siteName} Puzzle - ${displayDate}`,
    datePublished: date,
    url: `https://${config.domain}/${genre}/archive/${date}`,
    isPartOf: {
      "@type": "WebApplication",
      name: config.siteName,
      url: `https://${config.domain}`,
    },
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: config.siteName, url: `https://${config.domain}` },
    { name: "Archive", url: `https://${config.domain}/${genre}/archive` },
    { name: displayDate },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="archive-date">
        <Breadcrumbs
          items={[
            { label: config.siteName, href: "/" },
            { label: "Archive", href: `/${genre}/archive` },
            { label: displayDate },
          ]}
        />
        <PuzzleReveal puzzle={puzzle} genre={genre as Genre} date={date} />
        <ArchiveDateNav genre={genre} older={older} newer={newer} />
      </div>
    </>
  );
}
