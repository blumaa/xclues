import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { headers } = await import("next/headers");
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const siteUrl = host ? `${protocol}://${host}` : "https://filmclues.space";

  return {
    title: "Privacy Policy",
    description:
      "Privacy policy for xClues, the free daily connection puzzle game.",
    alternates: { canonical: `${siteUrl}/privacy` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
