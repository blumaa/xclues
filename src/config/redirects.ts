import type { Redirect } from "next/dist/lib/load-custom-routes";
import { DEFAULT_GENRE, DOMAIN_TO_GENRE } from "./domainDetector";

/**
 * Alt/secondary brand domains that 301-redirect to their canonical primary.
 *
 * The game serves identical content on several domains per genre; for SEO we
 * consolidate onto one canonical host (the primary in seoConfig) so ranking
 * signals and link equity don't split across duplicates. The www variant maps
 * to the same non-www primary.
 */
const DOMAIN_REDIRECTS: Record<string, string> = {
  "filmecules.space": "filmclues.space",
  "www.filmecules.space": "filmclues.space",
  "musicules.space": "musiclues.space",
  "www.musicules.space": "musiclues.space",
};

// `has.value` is an anchored regex; escape dots so only the exact host matches.
const hostPattern = (host: string) => host.replace(/\./g, "\\.");

/**
 * Host-based redirects for next.config. Resolved by Vercel's router before any
 * function runs, so they cost no function CPU. First match wins:
 * 1. alt brand domains → canonical primary (any path)
 * 2. `/` → the host's genre
 * 3. `/` → default genre (localhost, preview URLs)
 */
export function buildRedirects(): Redirect[] {
  const altDomains: Redirect[] = Object.entries(DOMAIN_REDIRECTS).map(
    ([from, to]) => ({
      source: "/:path*",
      has: [{ type: "host", value: hostPattern(from) }],
      destination: `https://${to}/:path*`,
      statusCode: 301,
    }),
  );

  // Alt domains are already caught by the 301s above; skip their `/` rules.
  const homeByHost: Redirect[] = Object.entries(DOMAIN_TO_GENRE)
    .filter(([host]) => !(host in DOMAIN_REDIRECTS))
    .map(([host, genre]) => ({
      source: "/",
      has: [{ type: "host", value: hostPattern(host) }],
      destination: `/${genre}`,
      permanent: false,
    }));

  return [
    ...altDomains,
    ...homeByHost,
    { source: "/", destination: `/${DEFAULT_GENRE}`, permanent: false },
  ];
}
