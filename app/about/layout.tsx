import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { headers } = await import("next/headers");
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const siteUrl = host ? `${protocol}://${host}` : "https://filmclues.space";

  return {
    title: "About",
    description:
      "Learn about xClues, the free daily connection puzzle game for films, music, and books. Group 16 items into 4 hidden categories.",
    alternates: { canonical: `${siteUrl}/about` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
