import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { SEO_CONFIGS, DEFAULT_GENRE, isValidGenre, type Genre } from './src/config/seoConfig';

/**
 * Vite plugin to transform index.html with SEO values at build time.
 * Reads VITE_GENRE env variable and replaces placeholders.
 */
function seoPlugin(): Plugin {
  const genre: Genre = isValidGenre(process.env.VITE_GENRE)
    ? process.env.VITE_GENRE
    : DEFAULT_GENRE;
  const config = SEO_CONFIGS[genre];
  const siteUrl = `https://www.${config.domain}`;

  return {
    name: 'seo-transform',
    transformIndexHtml(html) {
      return html
        // Primary meta tags
        .replace(/{{SITE_NAME}}/g, config.siteName)
        .replace(/{{META_TITLE}}/g, config.metaTitle)
        .replace(/{{META_DESCRIPTION}}/g, config.metaDescription)
        .replace(/{{META_KEYWORDS}}/g, config.metaKeywords)
        .replace(/{{SITE_URL}}/g, siteUrl)
        .replace(/{{DOMAIN}}/g, config.domain)
        // JSON-LD structured data
        .replace(/{{JSON_LD_NAME}}/g, config.siteName)
        .replace(/{{JSON_LD_DESCRIPTION}}/g, config.metaDescription)
        .replace(/{{JSON_LD_URL}}/g, siteUrl);
    },
  };
}

export default defineConfig({
  plugins: [react(), seoPlugin()],
  optimizeDeps: {
    include: ['@mond-design-system/theme'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    server: {
      deps: {
        inline: ['@mond-design-system/theme'],
      },
    },
  },
});
