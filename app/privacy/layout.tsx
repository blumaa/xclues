import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for xClues, the free daily connection puzzle game.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://filmclues.space"}/privacy` },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
