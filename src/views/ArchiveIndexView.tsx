import Link from "next/link";
import { XHeading, XText } from "../components/atoms";
import type { Genre } from "../config/seoConfig";
import { formatDateForDisplay } from "../utils/dateValidation";
import {
  archiveDatePath,
  archiveMonthPath,
  dateParts,
  monthCalendar,
  type ArchiveMonth,
} from "../utils/archiveDates";
import type { ArchiveResult } from "../utils/archiveResults";
import {
  ArchiveDayTile,
  ArchiveProgress,
  ArchiveResultsProvider,
} from "./ArchiveResults";
import "./ArchiveIndexView.css";

export interface ArchiveIndexViewProps {
  genre: Genre;
  siteName: string;
  /** The month shown and its neighbours; null when nothing is published. */
  archive: ArchiveMonth | null;
  /** Fixed results (stories, tests). Omitted on the live page: this device's saved history is used. */
  results?: Record<string, ArchiveResult>;
}

/** Server half of a day tile: link target and name; status fills in client-side. */
function DateTile({
  genre,
  siteName,
  date,
}: {
  genre: Genre;
  siteName: string;
  date: string;
}) {
  const { weekday, day } = dateParts(date);
  return (
    <ArchiveDayTile
      href={archiveDatePath(genre, date)}
      date={date}
      day={day}
      name={`${siteName} puzzle, ${weekday}, ${formatDateForDisplay(date)}`}
    />
  );
}

const WEEKDAYS = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"],
] as const;

/** One month as a Sunday-first calendar table; only puzzle days link. */
function MonthCalendarTable({
  genre,
  siteName,
  monthKey,
  headingId,
  playable,
}: {
  genre: Genre;
  siteName: string;
  monthKey: string;
  headingId: string;
  playable: Set<string>;
}) {
  const { leadingBlanks, days } = monthCalendar(monthKey);
  const cells: (string | null)[] = [
    ...Array(leadingBlanks).fill(null),
    ...days,
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) =>
    cells.slice(i * 7, i * 7 + 7),
  );

  return (
    <table className="archive-cal" aria-labelledby={headingId}>
      <thead>
        <tr>
          {WEEKDAYS.map(([short, long]) => (
            <th
              key={short}
              scope="col"
              abbr={long}
              className="archive-cal__weekday"
            >
              {short}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, w) => (
          <tr key={w}>
            {week.map((date, d) => (
              <td key={date ?? `blank-${w}-${d}`} className="archive-cal__cell">
                {date && playable.has(date) ? (
                  <DateTile genre={genre} siteName={siteName} date={date} />
                ) : date ? (
                  <span className="archive-cal__off">
                    {dateParts(date).day}
                  </span>
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** ‹ earlier · Month YYYY · later › — the month heading sits between the arrows. */
function MonthSwitcher({
  genre,
  archive,
  headingId,
}: {
  genre: Genre;
  archive: ArchiveMonth;
  headingId: string;
}) {
  const { month, newer, older, newerIsLatest } = archive;
  return (
    <nav className="archive-index__switcher" aria-label="Archive months">
      {older ? (
        <Link
          href={archiveMonthPath(genre, older.key)}
          rel="next"
          className="archive-index__switch-link"
          aria-label={`Earlier month: ${older.label}`}
        >
          <span aria-hidden="true">‹</span>
        </Link>
      ) : (
        <span
          className="archive-index__switch-link archive-index__switch-link--none"
          aria-hidden="true"
        />
      )}
      <h2 id={headingId} className="archive-index__month-title">
        {month.label}
      </h2>
      {newer ? (
        <Link
          href={archiveMonthPath(genre, newerIsLatest ? null : newer.key)}
          rel="prev"
          className="archive-index__switch-link"
          aria-label={`Later month: ${newer.label}`}
        >
          <span aria-hidden="true">›</span>
        </Link>
      ) : (
        <span
          className="archive-index__switch-link archive-index__switch-link--none"
          aria-hidden="true"
        />
      )}
    </nav>
  );
}

/**
 * Archive hub presenter: one calendar month of past puzzles, a switcher to the
 * neighbouring months, and each puzzle day's result on this device. Server
 * component; only the result pieces (ArchiveResults) run in the browser.
 */
export function ArchiveIndexView({
  genre,
  siteName,
  archive,
  results,
}: ArchiveIndexViewProps) {
  const headingId = "archive-month-heading";
  return (
    <div className="archive-index">
      <XHeading level={1} size="sm" align="center">
        {siteName} Puzzle Archive
      </XHeading>

      {archive ? (
        <ArchiveResultsProvider genre={genre} results={results}>
          <section className="archive-index__month" aria-labelledby={headingId}>
            <MonthSwitcher
              genre={genre}
              archive={archive}
              headingId={headingId}
            />
            <MonthCalendarTable
              genre={genre}
              siteName={siteName}
              monthKey={archive.month.key}
              headingId={headingId}
              playable={new Set(archive.month.dates)}
            />
            <ArchiveProgress dates={archive.month.dates} />
          </section>
        </ArchiveResultsProvider>
      ) : (
        <p className="archive-index__empty">
          <XText semantic="secondary">No puzzles published yet.</XText>
        </p>
      )}

      <XText
        as="p"
        size="sm"
        semantic="secondary"
        className="archive-index__note"
      >
        Play any past {siteName} puzzle. Archive games count toward your stats
        but never change your streak.
      </XText>
    </div>
  );
}
