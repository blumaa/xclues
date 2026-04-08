/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export only for Capacitor/iOS builds; web builds use SSR
  ...(process.env.CAPACITOR ? {
    output: 'export',
    // Exclude SEO routes that require server runtime
    excludeDefaultMomentLocales: true,
  } : {}),
};

export default nextConfig;
