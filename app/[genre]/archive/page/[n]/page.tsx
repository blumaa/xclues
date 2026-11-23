import { notFound, permanentRedirect } from "next/navigation";
import { isValidGenre } from "../../../../../src/config/seoConfig";
import { fetchPublishedDatesForGenre } from "../../../../../src/lib/supabase/puzzleQueries";
import { archiveMonthPath, legacyPageMonth } from "../../../../../src/utils/archiveDates";

export const revalidate = 3600;

// Retired 30-per-page hub. Old links render on first visit, then serve the
// cached redirect (ISR).
export async function generateStaticParams() {
  return [];
}

function parsePage(n: string): number | null {
  const page = Number(n);
  return Number.isInteger(page) && page >= 1 ? page : null;
}

/** Sends a retired /archive/page/N link to the month that page started on. */
export default async function LegacyArchivePage({
  params,
}: {
  params: Promise<{ genre: string; n: string }>;
}) {
  const { genre, n } = await params;
  const page = parsePage(n);
  if (!isValidGenre(genre) || page === null) notFound();

  const dates = await fetchPublishedDatesForGenre(genre);
  const month = legacyPageMonth(dates, page);
  if (month === null) notFound();
  const newest = dates[0].slice(0, 7);
  permanentRedirect(archiveMonthPath(genre, month === newest ? null : month));
}
