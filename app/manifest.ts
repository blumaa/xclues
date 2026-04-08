import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "xClues - Daily Connection Puzzles",
    short_name: "xClues",
    description:
      "Daily connection puzzle games for films, books, and music.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      { src: "/assets/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
