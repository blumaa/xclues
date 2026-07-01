import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPublishedDatesForGenre } from "../../../src/lib/supabase/puzzleQueries";
import { getSeoConfig, isValidGenre, type Genre } from "../../../src/config/seoConfig";
import { paginate } from "../../../src/utils/paginate";
import { ARCHIVE_PAGE_SIZE, archivePagePath } from "../../../src/utils/archiveDates";
import { buildBreadcrumbJsonLd } from "../../../src/lib/seo/breadcrumbJsonLd";
import { ArchiveIndexView } from "../../../src/views/ArchiveIndexView";

/** Shared metadata for both the page-1 hub and the /page/[n] routes. */
export function buildArchiveMetadata(genre: Genre, page: number): Metadata {
  const config = getSeoConfig(genre);
  const canonical = `https://${config.domain}${archivePagePath(genre, page)}`;
  const title = `${config.siteName} Puzzle Archive${page > 1 ? ` (Page ${page})` : ""}`;
  const description = `Browse every past ${config.siteName} puzzle. Pick a date to see all four categories and their connections revealed.`;

  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, url: canonical },
    twitter: { title, description },
    alternates: { canonical },
  };
}

/**
 * Server-rendered archive hub body, shared by the page-1 and paginated routes.
 * Guards an invalid genre or an out-of-range page with a 404.
 */
export async function ArchiveHub({ genre, page }: { genre: string; page: number }) {
  if (!isValidGenre(genre)) notFound();

  const config = getSeoConfig(genre);
  const dates = await fetchPublishedDatesForGenre(genre);
  const { items, page: current, totalPages } = paginate(dates, page, ARCHIVE_PAGE_SIZE);

  // A page past the last (or any /page/[n] when nothing is published) is a 404;
  // page 1 with no puzzles renders the empty state instead.
  if (page > 1 && page > totalPages) notFound();

  const jsonLd = buildBreadcrumbJsonLd([
    { name: config.siteName, url: `https://${config.domain}` },
    { name: "Archive", url: `https://${config.domain}/${genre}/archive` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArchiveIndexView
        genre={genre}
        siteName={config.siteName}
        dates={items}
        page={current}
        totalPages={totalPages}
      />
    </>
  );
}
