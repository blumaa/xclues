import Link from "next/link";
import "./Breadcrumbs.css";

export interface Crumb {
  label: string;
  /** Omit on the final (current-page) crumb. */
  href?: string;
}

/**
 * Presentational breadcrumb trail. The last item is rendered as the current
 * page (no link, `aria-current="page"`). Pair with a `BreadcrumbList` JSON-LD
 * script at the page level for SERP breadcrumbs.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol className="breadcrumbs__list">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={crumb.href ?? crumb.label} className="breadcrumbs__item">
              {crumb.href && !isLast ? (
                <Link href={crumb.href} className="breadcrumbs__link">
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className="breadcrumbs__current"
                  aria-current={isLast ? "page" : undefined}
                >
                  {crumb.label}
                </span>
              )}
              {!isLast && (
                <span className="breadcrumbs__sep" aria-hidden="true">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
