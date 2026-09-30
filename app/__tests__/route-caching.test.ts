import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { VALID_GENRES, getSeoConfig } from "../../src/config/seoConfig";
import * as rootLayout from "../layout";
import * as genreLayout from "../[genre]/layout";
import * as genrePage from "../[genre]/page";
import * as archiveDatePage from "../[genre]/archive/[date]/page";
import * as archivePagedPage from "../[genre]/archive/page/[n]/page";
import * as genreOgImage from "../[genre]/opengraph-image";
import * as archiveOgImage from "../[genre]/archive/[date]/opengraph-image";
import * as genreTwitterImage from "../[genre]/twitter-image";
import * as archiveTwitterImage from "../[genre]/archive/[date]/twitter-image";

// Vercel bills Active CPU per server render. Public content routes must be
// statically cached (ISR) so the CDN serves them instead of rendering per request.
// A request API (headers/cookies) anywhere up the tree forces every route dynamic.

const appDir = resolve(__dirname, "..");
const source = (rel: string) => readFileSync(resolve(appDir, rel), "utf8");

describe("root layout stays request-independent", () => {
  it("does not read request headers or cookies", () => {
    expect(source("layout.tsx")).not.toMatch(/next\/headers/);
  });

  it("uses a fixed metadataBase", async () => {
    const meta = await rootLayout.generateMetadata();
    expect(meta.metadataBase?.toString()).toBe("https://filmclues.space/");
  });
});

describe("home page redirect runs in next.config, not a function", () => {
  it("does not read request headers", () => {
    expect(source("page.tsx")).not.toMatch(/next\/headers/);
  });

  it("next.config registers the host redirects", () => {
    const config = readFileSync(resolve(appDir, "../next.config.ts"), "utf8");
    expect(config).toMatch(/redirects:\s*async\s*\(\)\s*=>\s*buildRedirects\(\)/);
  });
});

describe("[genre] layout", () => {
  it("prerenders every genre", async () => {
    const params = await genreLayout.generateStaticParams();
    expect(params).toEqual(VALID_GENRES.map((genre) => ({ genre })));
  });

  it.each(VALID_GENRES)("sets metadataBase to the %s domain", async (genre) => {
    const meta = await genreLayout.generateMetadata({
      params: Promise.resolve({ genre }),
    });
    expect(meta.metadataBase?.toString()).toBe(
      `https://${getSeoConfig(genre).domain}/`,
    );
  });

  it("does not read request headers or cookies", () => {
    expect(source("[genre]/layout.tsx")).not.toMatch(/next\/headers/);
  });
});

describe("ISR config on public content routes", () => {
  it("today's puzzle refreshes within a minute of the UTC day change", () => {
    expect(genrePage.revalidate).toBeGreaterThan(0);
    expect(genrePage.revalidate).toBeLessThanOrEqual(60);
  });

  it.each([
    ["archive date page", archiveDatePage],
    ["archive paginated page", archivePagedPage],
    ["archive OG image", archiveOgImage],
    ["archive Twitter image", archiveTwitterImage],
  ])("%s renders on first visit, then serves from cache", async (_, mod) => {
    expect(await mod.generateStaticParams()).toEqual([]);
    expect(mod.revalidate).toBeGreaterThan(0);
  });

  // Metadata image routes do not inherit generateStaticParams from the layout.
  it.each([
    ["genre OG image", genreOgImage],
    ["genre Twitter image", genreTwitterImage],
  ])("%s is prerendered for every genre", async (_, mod) => {
    expect(await mod.generateStaticParams()).toEqual(
      VALID_GENRES.map((genre) => ({ genre })),
    );
    expect(mod.revalidate).toBeGreaterThan(0);
  });

  // Twitter images re-export the OG image but must declare revalidate literally.
  it.each([
    ["genre", genreTwitterImage, genreOgImage],
    ["archive", archiveTwitterImage, archiveOgImage],
  ])("%s Twitter image revalidates with its OG image", (_, twitter, og) => {
    expect(twitter.revalidate).toBe(og.revalidate);
  });
});
