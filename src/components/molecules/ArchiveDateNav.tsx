import Link from "next/link";
import type { Genre } from "../../config/seoConfig";
import { formatDateForDisplay } from "../../utils/dateValidation";
import "./ArchiveDateNav.css";

interface ArchiveDateNavProps {
  genre: Genre;
  /** The chronologically older published date (the "previous" puzzle), or null. */
  older: string | null;
  /** The chronologically newer published date (the "next" puzzle), or null. */
  newer: string | null;
}

/**
 * Prev/next links between adjacent published archive dates. Both ends degrade to
 * an inert, non-linked label so the layout stays stable at the first/last puzzle.
 */
export function ArchiveDateNav({ genre, older, newer }: ArchiveDateNavProps) {
  return (
    <nav className="archive-date-nav" aria-label="Adjacent puzzles">
      {older ? (
        <Link
          href={`/${genre}/archive/${older}`}
          rel="prev"
          className="archive-date-nav__link"
        >
          ← {formatDateForDisplay(older)}
        </Link>
      ) : (
        <span
          className="archive-date-nav__link archive-date-nav__link--disabled"
          aria-disabled="true"
        >
          ← Previous puzzle
        </span>
      )}

      {newer ? (
        <Link
          href={`/${genre}/archive/${newer}`}
          rel="next"
          className="archive-date-nav__link archive-date-nav__link--next"
        >
          {formatDateForDisplay(newer)} →
        </Link>
      ) : (
        <span
          className="archive-date-nav__link archive-date-nav__link--next archive-date-nav__link--disabled"
          aria-disabled="true"
        >
          Next puzzle →
        </span>
      )}
    </nav>
  );
}
