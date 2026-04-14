import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { VALID_GENRES } from "../src/config/seoConfig";
import { fetchAllPublishedDates } from "../src/lib/supabase/puzzleQueries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseUrl = host ? `${protocol}://${host}` : "https://filmclues.space";

  const genrePages = VALID_GENRES.map((genre) => ({
    url: `${baseUrl}/${genre}`,
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));

  const publishedDates = await fetchAllPublishedDates();
  const archivePages = publishedDates.map(({ genre, puzzle_date }) => ({
    url: `${baseUrl}/${genre}/archive/${puzzle_date}`,
    changeFrequency: "never" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...genrePages,
    {
      url: `${baseUrl}/how-to-play`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...archivePages,
  ];
}
