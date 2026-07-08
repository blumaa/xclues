import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Header } from "./header";
import { Footer } from "../src/components/organisms/Footer";
import { NativeSetup } from "../src/components/NativeSetup";
import { AttributionCapture } from "../src/components/AttributionCapture";
import { AppSplash } from "../src/components/AppSplash";
import { getThemeInitScript } from "../src/utils/themeScript";
import "../src/index.css";
import "../src/styles/brands.css";
import "../src/App.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

async function getSiteUrl(): Promise<string> {
  const { headers } = await import("next/headers");
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  if (host) {
    const protocol = host.includes("localhost") ? "http" : "https";
    return `${protocol}://${host}`;
  }
  return "https://filmclues.space";
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await getSiteUrl();
  return {
    metadataBase: new URL(siteUrl),
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
      url: siteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: "xClues - Daily Connection Puzzles",
      description:
        "Daily connection puzzle games for films, books, and music.",
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Theme and brand are applied entirely client-side by the inline init script
  // (data-theme, before paint) and useTheme (brand tokens, on mount). The server
  // renders a neutral default so the HTML is user-independent and edge-cacheable
  // — no per-request cookies() read here.
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
      </head>
      <body>
        <a href="#main-content" className="sr-only">
          Skip to content
        </a>
        <NativeSetup />
        <AttributionCapture />
        <AppSplash />
        <Providers>
          <div className="app-layout">
            <Header />
            <main id="main-content" className="app-main">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
