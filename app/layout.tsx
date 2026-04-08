import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Header } from "./header";
import { Footer } from "../src/components/organisms/Footer";
import { getServerTheme } from "../src/utils/getServerTheme";
import "../src/index.css";
import "../src/App.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://filmclues.com"),
  title: {
    default: "xClues - Daily Connection Puzzles",
    template: "%s | xClues",
  },
  description:
    "Daily connection puzzle games for films, books, and music. Group 16 items into 4 hidden categories.",
  openGraph: {
    type: "website",
    siteName: "xClues",
    title: "xClues - Daily Connection Puzzles",
    description:
      "Daily connection puzzle games for films, books, and music. Group 16 items into 4 hidden categories.",
    url: "https://filmclues.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "xClues - Daily Connection Puzzles",
    description:
      "Daily connection puzzle games for films, books, and music.",
  },
  alternates: {
    canonical: "https://filmclues.com",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = getServerTheme(cookieStore.get("xclues-theme")?.value);

  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <body>
        <Providers>
          <div className="app-layout">
            <Header />
            <main id="main-content" className="app-main">
              {children}
            </main>
            <Footer />
          </div>
          <div id="portal-root" />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
