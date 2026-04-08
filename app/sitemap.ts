import type { MetadataRoute } from "next";
import { VALID_GENRES } from "../src/config/seoConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://filmclues.space";

  const genrePages = VALID_GENRES.map((genre) => ({
    url: `${baseUrl}/${genre}`,
    changeFrequency: "daily" as const,
    priority: 1.0,
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
  ];
}
