import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Report-only for now: this surfaces violations (e.g. the inline theme script,
// JSON-LD, Vercel Analytics) in the browser console without blocking anything,
// so the policy can be tightened to enforcing — with nonce/hash for the inline
// scripts — after a real-browser review. Enforcing it requires that work plus a
// caching trade-off (nonces are per-request), so it stays report-only here.
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'Content-Security-Policy-Report-Only', value: cspReportOnly },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export only for Capacitor/iOS builds; web builds use SSR.
  // `headers()` is a server feature and is ignored under `output: 'export'`,
  // so it is only attached for web builds.
  ...(process.env.CAPACITOR
    ? {
        output: 'export',
        // Exclude SEO routes that require server runtime
        excludeDefaultMomentLocales: true,
      }
    : {
        async headers() {
          return [{ source: '/(.*)', headers: securityHeaders }];
        },
      }),
};

export default withBundleAnalyzer(nextConfig);
