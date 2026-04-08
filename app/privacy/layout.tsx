import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for xClues, the free daily connection puzzle game.",
  alternates: { canonical: "https://filmclues.space/privacy" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
