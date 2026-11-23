import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { fetchPublishedDatesForGenre } from "../../../src/lib/supabase/puzzleQueries";
import { getSeoConfig, isValidGenre, type Genre } from "../../../src/config/seoConfig";
import {
  archiveMonthPath,
  findArchiveMonth,
  groupDatesByMonth,
  monthLabel,
} from "../../../src/utils/archiveDates";
import { ArchiveIndexLive } from "../../../src/views/ArchiveIndexLive";

/** Shared metadata for the hub (newest month, `month` null) and /month/[month]. */
export function buildArchiveMetadata(genre: Genre, month: string | null): Metadata {
  const config = getSeoConfig(genre);
  const canonical = `https://${config.domain}${archiveMonthPath(genre, month)}`;
  const title = `${config.siteName} Puzzle Archive${month ? ` – ${monthLabel(month)}` : ""}`;
  const description = `Play any past ${config.siteName} puzzle${month ? ` from ${monthLabel(month)}` : ""}. Pick a day on the calendar; archive games never affect your streak.`;

  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, url: canonical },
    twitter: { title, description },
    alternates: { canonical },
  };
}

/**
 * Server-rendered archive hub body: one calendar month. `month` null = newest.
 * Invalid genre or a month with no puzzles 404s; the newest month's own URL
 * redirects to the bare hub so it has one canonical.
 */
export async function ArchiveHub({ genre, month }: { genre: string; month: string | null }) {
  if (!isValidGenre(genre)) notFound();

  const config = getSeoConfig(genre);
  const months = groupDatesByMonth(await fetchPublishedDatesForGenre(genre));

  if (month !== null && month === months[0]?.key) permanentRedirect(archiveMonthPath(genre, null));
  const archive = findArchiveMonth(months, month);
  // The bare hub with nothing published renders the empty state instead.
  if (month !== null && !archive) notFound();

  // No breadcrumbs: one level deep, header logo links home.
  return <ArchiveIndexLive genre={genre} siteName={config.siteName} archive={archive} />;
}
