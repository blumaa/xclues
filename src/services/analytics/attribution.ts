// First-party traffic attribution.
//
// Two capture paths, in priority order:
//   1. An explicit `?ref=<platform>` param on the link (utm_source as fallback).
//      Reliable, but adds a visible suffix to the URL.
//   2. The HTTP referrer, mapped from a known host to a platform. Lets us post
//      a *bare* URL (filmclues.space) and still attribute clicks from platforms
//      that pass a referrer. Lossy: native apps, in-app browsers and copy-paste
//      ("dark social") send no referrer, so those land as unattributed.
//
// Captured first-touch and kept for the session, so a play started minutes
// after landing still records the channel the visitor arrived from.

const STORAGE_KEY = 'xclues-ref';
const MAX_LENGTH = 32;

// host (or suffix) -> canonical source. Ordered; first match wins.
const REFERRER_HOSTS: Array<[RegExp, string]> = [
  [/(^|\.)reddit\.com$/, 'reddit'],
  [/(^|\.)bsky\.app$/, 'bluesky'],
  [/(^|\.)l\.facebook\.com$/, 'facebook'],
  [/(^|\.)facebook\.com$/, 'facebook'],
  [/(^|\.)t\.co$/, 'x'],
  [/(^|\.)x\.com$/, 'x'],
  [/(^|\.)twitter\.com$/, 'x'],
  [/(^|\.)linkedin\.com$/, 'linkedin'],
  [/(^|\.)lnkd\.in$/, 'linkedin'],
  // Mastodon is federated across many instances; match the common ones.
  [/mastodon|mstdn|fosstodon|mas\.to/, 'mastodon'],
];

function sanitize(raw: string): string | null {
  const cleaned = raw
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '')
    .slice(0, MAX_LENGTH);
  return cleaned.length > 0 ? cleaned : null;
}

function sourceFromReferrer(referrer: string): string | null {
  let host: string;
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return null;
  }
  for (const [pattern, source] of REFERRER_HOSTS) {
    if (pattern.test(host)) return source;
  }
  return null;
}

export function captureAttribution(search: string, referrer = ''): void {
  if (typeof window === 'undefined') return;
  // First-touch: the earliest channel in a session wins; don't overwrite.
  if (window.sessionStorage.getItem(STORAGE_KEY)) return;

  const params = new URLSearchParams(search);
  const explicit = params.get('ref') ?? params.get('utm_source');
  const source = explicit ? sanitize(explicit) : sourceFromReferrer(referrer);

  if (source) window.sessionStorage.setItem(STORAGE_KEY, source);
}

export function getAttributionSource(): string | null {
  if (typeof window === 'undefined') return null;
  return window.sessionStorage.getItem(STORAGE_KEY);
}
