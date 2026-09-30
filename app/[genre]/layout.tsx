import type { Metadata } from "next";
import { getSeoConfig, isValidGenre, VALID_GENRES } from "../../src/config/seoConfig";

// Genre params are known at build time, so every route under [genre] can be
// prerendered. Child segments inherit these params.
export async function generateStaticParams() {
  return VALID_GENRES.map((genre) => ({ genre }));
}

// Each genre has one canonical domain, so metadataBase comes from the route,
// not the request host — keeps the whole subtree static and CDN-cacheable.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre: string }>;
}): Promise<Metadata> {
  const { genre } = await params;
  if (!isValidGenre(genre)) return {};
  return { metadataBase: new URL(`https://${getSeoConfig(genre).domain}`) };
}

export default function GenreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
