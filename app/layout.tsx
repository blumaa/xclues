import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Header } from "./header";
import { Footer } from "../src/components/organisms/Footer";
import { NativeSetup } from "../src/components/NativeSetup";
import { AppSplash } from "../src/components/AppSplash";
import { getServerTheme } from "../src/utils/getServerTheme";
import { getThemeInitScript } from "../src/utils/themeScript";
import { getBrandStyleTag } from "../src/utils/getBrandStyleTag";
import "../src/index.css";
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

async function getThemeAndBrand() {
  if (process.env.CAPACITOR) return { theme: 'light' as const, brand: undefined };
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const theme = getServerTheme(cookieStore.get("xclues-theme")?.value);
  const brand = cookieStore.get("xclues-brand-theme")?.value;
  return { theme, brand };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, brand } = await getThemeAndBrand();
  const brandCSS = getBrandStyleTag(brand, theme as 'light' | 'dark');

  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
        {brandCSS && <style dangerouslySetInnerHTML={{ __html: brandCSS }} />}
      </head>
      <body>
        <NativeSetup />
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
