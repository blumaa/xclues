import { NextResponse, type NextRequest } from "next/server";
import { resolveRedirectHost } from "./src/lib/domainRedirects";

/**
 * Edge-cache hint for public, user-independent pages.
 *
 * Now that the root layout no longer reads cookies, the SSR HTML for content
 * routes is identical for every visitor on a given host, so the CDN can share a
 * cached copy (keyed by host) instead of rendering per request. Auth, API, and
 * the analytics dashboard are excluded via the matcher so they are never cached.
 *
 * s-maxage controls the shared CDN cache; stale-while-revalidate serves a stale
 * copy while a fresh one is rendered in the background.
 */
export function middleware(req: NextRequest): NextResponse {
  // SEO: 301 alt brand domains onto their canonical primary (path + query kept).
  const redirectHost = resolveRedirectHost(req.headers.get("host") ?? "");
  if (redirectHost) {
    const url = req.nextUrl.clone();
    url.host = redirectHost;
    url.protocol = "https";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  const res = NextResponse.next();
  if (req.method === "GET") {
    res.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=3600",
    );
  }
  return res;
}

export const config = {
  // Exclude API routes, Next internals, auth, the analytics dashboard, and any
  // request for a file with an extension (static assets).
  matcher: [
    "/((?!api|_next|reset-password|analidiots|.*\\.).*)",
  ],
};
