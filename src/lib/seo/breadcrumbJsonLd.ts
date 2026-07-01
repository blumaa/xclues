export interface BreadcrumbCrumb {
  name: string;
  /** Absolute URL for the crumb (omit only for the current page). */
  url?: string;
}

/**
 * Build a schema.org BreadcrumbList JSON-LD object for a breadcrumb trail.
 * Stringify the result into a <script type="application/ld+json"> tag so Google
 * can surface breadcrumbs in search results.
 */
export function buildBreadcrumbJsonLd(crumbs: BreadcrumbCrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      ...(crumb.url ? { item: crumb.url } : {}),
    })),
  };
}
