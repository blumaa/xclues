/**
 * Build Script: Generate SEO Files
 *
 * Generates sitemap.xml, robots.txt, and copies the correct favicon
 * based on GENRE env variable.
 *
 * Usage: GENRE=films bun run scripts/generate-seo.ts
 */

import { writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { join } from 'path';
import { SEO_CONFIGS, DEFAULT_GENRE, isValidGenre, type Genre } from '../src/config/seoConfig';

// Get genre from environment variable
const genre = process.env.GENRE;

if (!genre) {
  console.log(`ℹ️  GENRE not set, using default: ${DEFAULT_GENRE}`);
}

const activeGenre: Genre = isValidGenre(genre) ? genre : DEFAULT_GENRE;
const config = SEO_CONFIGS[activeGenre];
const siteUrl = `https://${config.domain}`;

console.log(`🔧 Generating SEO files for: ${config.siteName} (${config.domain})`);

// Ensure public directory exists
const publicDir = join(process.cwd(), 'public');
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Generate sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${siteUrl}/privacy</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
`;

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
console.log('✅ Generated sitemap.xml');

// Generate robots.txt
const robots = `# Robots.txt for ${config.siteName}
# ${siteUrl}

User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(join(publicDir, 'robots.txt'), robots);
console.log('✅ Generated robots.txt');

// Copy the correct favicon
const faviconsDir = join(process.cwd(), 'src', 'assets', 'favicons');
const sourceFavicon = join(faviconsDir, `${activeGenre}.ico`);
const assetsDir = join(publicDir, 'assets');
const destFavicon = join(assetsDir, 'favicon.ico');

// Ensure public/assets directory exists
if (!existsSync(assetsDir)) {
  mkdirSync(assetsDir, { recursive: true });
}

if (existsSync(sourceFavicon)) {
  copyFileSync(sourceFavicon, destFavicon);
  console.log(`✅ Copied favicon for ${activeGenre}`);
} else {
  console.warn(`⚠️  Favicon not found: ${sourceFavicon}`);
}

console.log(`🎉 SEO files generated for ${config.siteName}`);
