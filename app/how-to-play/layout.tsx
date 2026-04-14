import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { headers } = await import("next/headers");
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const siteUrl = host ? `${protocol}://${host}` : "https://filmclues.space";

  return {
    title: "How to Play",
    description:
      "Learn how to play xClues connection puzzles. Group 16 items into 4 hidden categories based on shared connections.",
    alternates: { canonical: `${siteUrl}/how-to-play` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
