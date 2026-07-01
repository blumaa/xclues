import type { Metadata } from "next";
import { isValidGenre } from "../../../src/config/seoConfig";
import { ArchiveHub, buildArchiveMetadata } from "./ArchiveHub";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre: string }>;
}): Promise<Metadata> {
  const { genre } = await params;
  if (!isValidGenre(genre)) return {};
  return buildArchiveMetadata(genre, 1);
}

export default async function ArchiveIndexPage({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;
  return <ArchiveHub genre={genre} page={1} />;
}
