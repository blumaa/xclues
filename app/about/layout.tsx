import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about xClues, the free daily connection puzzle game for films, music, and books. Group 16 items into 4 hidden categories.",
  alternates: { canonical: "https://filmclues.space/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
