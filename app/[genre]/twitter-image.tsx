// Re-export the OG image for Twitter card
export { default, alt, size, contentType, generateStaticParams } from "./opengraph-image";

// Route segment config must be a literal in each route file; Next can't read a
// re-exported value. Keep in sync with ./opengraph-image.
export const revalidate = 86400;
