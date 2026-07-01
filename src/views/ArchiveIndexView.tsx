import Link from "next/link";
import { XHeading, XText, XCard, XCardBody } from "../components/atoms";
import { Breadcrumbs } from "../components/molecules/Breadcrumbs";
import type { Genre } from "../config/seoConfig";
import { formatDateForDisplay } from "../utils/dateValidation";
import { archivePagePath } from "../utils/archiveDates";
import "./ArchiveIndexView.css";

export interface ArchiveIndexViewProps {
  genre: Genre;
  siteName: string;
  /** The current page's slice of published dates, newest-first. */
  dates: string[];
  page: number;
  totalPages: number;
}

/**
 * Archive hub presenter: a paginated, internally-linked index of every published
 * puzzle date for a genre. Pure/presentational — the route supplies the paginated
 * slice so this renders identically in Storybook and in production.
 */
export function ArchiveIndexView({
  genre,
  siteName,
  dates,
  page,
  totalPages,
}: ArchiveIndexViewProps) {
  return (
    <div className="archive-index">
      <Breadcrumbs items={[{ label: siteName, href: "/" }, { label: "Archive" }]} />

      <header className="archive-index__header">
        <XHeading level={1}>{siteName} Puzzle Archive</XHeading>
        <XText as="p" semantic="secondary">
          Every past {siteName} puzzle. Pick a date to see all four categories and their
          connections revealed.
        </XText>
      </header>

      {dates.length === 0 ? (
        <p className="archive-index__empty">
          <XText semantic="secondary">No puzzles published yet.</XText>
        </p>
      ) : (
        <ul className="archive-index__grid">
          {dates.map((date) => (
            <li key={date} className="archive-index__cell">
              <Link
                href={`/${genre}/archive/${date}`}
                className="archive-index__card-link"
                aria-label={`${siteName} puzzle — ${formatDateForDisplay(date)}`}
              >
                <XCard hoverable variant="elevated" className="archive-index__card">
                  <XCardBody className="archive-index__card-body">
                    <span className="archive-index__card-date">
                      {formatDateForDisplay(date)}
                    </span>
                    <span className="archive-index__card-meta">
                      <XText size="sm" semantic="secondary">
                        {siteName} puzzle
                      </XText>
                      <span className="archive-index__card-chevron" aria-hidden="true">
                        →
                      </span>
                    </span>
                  </XCardBody>
                </XCard>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <nav className="archive-index__pager" aria-label="Archive pages">
          {page > 1 ? (
            <Link
              href={archivePagePath(genre, page - 1)}
              rel="prev"
              className="archive-index__pager-link"
            >
              ← Newer
            </Link>
          ) : (
            <span
              className="archive-index__pager-link archive-index__pager-link--disabled"
              aria-disabled="true"
            >
              ← Newer
            </span>
          )}

          <span className="archive-index__pager-status">
            Page {page} of {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={archivePagePath(genre, page + 1)}
              rel="next"
              className="archive-index__pager-link"
            >
              Older →
            </Link>
          ) : (
            <span
              className="archive-index__pager-link archive-index__pager-link--disabled"
              aria-disabled="true"
            >
              Older →
            </span>
          )}
        </nav>
      )}
    </div>
  );
}
