import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Header } from "./header";
import { Footer } from "../src/components/organisms/Footer";
import { getServerTheme } from "../src/utils/getServerTheme";
import "../src/index.css";
import "../src/App.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "xClues - Daily Connection Puzzles",
    description: "Daily connection puzzle games for films, books, music, and sports.",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = getServerTheme(cookieStore.get('xclues-theme')?.value);

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
