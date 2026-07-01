import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isValidGenre } from "../../../../../src/config/seoConfig";
import { ArchiveHub, buildArchiveMetadata } from "../../ArchiveHub";

export const revalidate = 3600;

function parsePage(n: string): number | null {
  const page = Number(n);
  return Number.isInteger(page) && page >= 1 ? page : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre: string; n: string }>;
}): Promise<Metadata> {
  const { genre, n } = await params;
  const page = parsePage(n);
  if (!isValidGenre(genre) || page === null) return {};
  return buildArchiveMetadata(genre, page);
}

export default async function ArchivePaginatedPage({
  params,
}: {
  params: Promise<{ genre: string; n: string }>;
}) {
  const { genre, n } = await params;
  const page = parsePage(n);
  if (page === null) notFound();
  // Page 1 lives at the bare /archive canonical — send /page/1 there.
  if (page === 1) redirect(`/${genre}/archive`);
  return <ArchiveHub genre={genre} page={page} />;
}
