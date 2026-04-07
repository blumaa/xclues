/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Use src directory for app router
  experimental: {
    // Allow importing CSS in server components
  },
};

export default nextConfig;
