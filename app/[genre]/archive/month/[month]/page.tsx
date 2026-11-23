import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidGenre } from "../../../../../src/config/seoConfig";
import { isValidMonthKey } from "../../../../../src/utils/archiveDates";
import { ArchiveHub, buildArchiveMetadata } from "../../ArchiveHub";

export const revalidate = 3600;

// Months render on first visit, then serve from cache (ISR).
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre: string; month: string }>;
}): Promise<Metadata> {
  const { genre, month } = await params;
  if (!isValidGenre(genre) || !isValidMonthKey(month)) return {};
  return buildArchiveMetadata(genre, month);
}

export default async function ArchiveMonthPage({
  params,
}: {
  params: Promise<{ genre: string; month: string }>;
}) {
  const { genre, month } = await params;
  if (!isValidMonthKey(month)) notFound();
  return <ArchiveHub genre={genre} month={month} />;
}
