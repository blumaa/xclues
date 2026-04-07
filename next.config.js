/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export only for Capacitor/iOS builds; web builds use SSR
  ...(process.env.CAPACITOR ? { output: 'export' } : {}),
};

export default nextConfig;
