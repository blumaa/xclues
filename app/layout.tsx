import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Header } from "./header";
import { Footer } from "../src/components/organisms/Footer";
import "../src/index.css";
import "../src/App.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "xClues - Daily Connection Puzzles",
    description: "Daily connection puzzle games for films, books, music, and sports.",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
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
