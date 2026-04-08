import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Play",
  description:
    "Learn how to play xClues connection puzzles. Group 16 items into 4 hidden categories based on shared connections.",
  alternates: { canonical: "https://filmclues.space/how-to-play" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
