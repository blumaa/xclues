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

/**
 * Given a request host, return the primary host it should 301 to, or null if
 * the host is already canonical (or unknown, e.g. localhost / preview URLs).
 */
export function resolveRedirectHost(host: string): string | null {
  const normalized = host.toLowerCase().split(":")[0];
  return DOMAIN_REDIRECTS[normalized] ?? null;
}
