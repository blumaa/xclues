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
import { archiveDateUrl, getAdjacentDates } from "../../../../src/utils/archiveDates";
import { type Genre, getSeoConfig, isValidGenre } from "../../../../src/config/seoConfig";
import { buildBreadcrumbJsonLd } from "../../../../src/lib/seo/breadcrumbJsonLd";
import { ArchiveGameView } from "../../../../src/views/ArchiveGameView";
import { XHeading } from "../../../../src/components/atoms";
import { Breadcrumbs } from "../../../../src/components/molecules/Breadcrumbs";
import { ArchiveDateNav } from "../../../../src/components/molecules/ArchiveDateNav";
import "./archive-date.css";

// Past puzzles never change. No dates prerendered at build; each renders on its
// first visit and is served from cache after that.
export const revalidate = 86400;

export async function generateStaticParams() {
  return [];
}

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
  const description = `Play the ${config.siteName} puzzle from ${displayDate}. Find the 4 hidden connections.`;

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: archiveDateUrl(genre, date),
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: archiveDateUrl(genre, date),
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
  // Only past puzzles are archived; today's live puzzle and future dates 404.
  // Today's game lives on the home page, where it counts toward streaks.
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
    url: archiveDateUrl(genre, date),
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
        {/* h1 kept for SEO; sized down so the board stays the hero */}
        <XHeading level={1} size="md" align="center" className="archive-date__title">
          {config.siteName} &mdash; {displayDate}
        </XHeading>
        <ArchiveGameView genre={genre as Genre} puzzleDate={date} puzzle={puzzle} />
        <ArchiveDateNav genre={genre} older={older} newer={newer} />
      </div>
    </>
  );
}
