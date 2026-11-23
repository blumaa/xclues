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
import "./ArchiveIndexView.css";

export interface ArchiveIndexViewProps {
  genre: Genre;
  siteName: string;
  /** The month shown and its neighbours; null when nothing is published. */
  archive: ArchiveMonth | null;
  /** This device's finished games by date. Absent on the server render. */
  results?: Record<string, ArchiveResult>;
}

type Status = "solved" | "lost" | "unplayed";

function statusOf(result: ArchiveResult | undefined): Status {
  if (!result) return "unplayed";
  return result.won ? "solved" : "lost";
}

// Text + symbol carry the status; color only reinforces it.
const STATUS_TEXT: Record<
  Status,
  { symbol: string; label: string; statLabel: string }
> = {
  solved: { symbol: "✓", label: "Solved", statLabel: "Solved" },
  lost: { symbol: "✗", label: "Lost", statLabel: "Lost" },
  unplayed: { symbol: "→", label: "Play", statLabel: "Unplayed" },
};

const STATUS_ORDER: Status[] = ["solved", "lost", "unplayed"];

function spokenStatus(
  status: Status,
  result: ArchiveResult | undefined,
): string {
  if (status === "unplayed") return "not played";
  if (status === "lost") return "lost";
  const n = result!.mistakes;
  return `solved, ${n} ${n === 1 ? "mistake" : "mistakes"}`;
}

function DateTile({
  genre,
  siteName,
  date,
  result,
}: {
  genre: Genre;
  siteName: string;
  date: string;
  result: ArchiveResult | undefined;
}) {
  const { weekday, day } = dateParts(date);
  const status = statusOf(result);
  const { symbol, label } = STATUS_TEXT[status];

  return (
    <Link
      href={archiveDatePath(genre, date)}
      className={`archive-tile archive-tile--${status}`}
      aria-label={`${siteName} puzzle, ${weekday}, ${formatDateForDisplay(date)}: ${spokenStatus(status, result)}`}
    >
      <span className="archive-tile__day">{day}</span>
      <span className="archive-tile__status">
        <span aria-hidden="true">{symbol}</span>
        <span className="archive-tile__label"> {label}</span>
      </span>
    </Link>
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
  results,
}: {
  genre: Genre;
  siteName: string;
  monthKey: string;
  headingId: string;
  playable: Set<string>;
  results: Record<string, ArchiveResult>;
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
                  <DateTile
                    genre={genre}
                    siteName={siteName}
                    date={date}
                    result={results[date]}
                  />
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

/** Solved / Lost / Unplayed counts; doubles as the calendar's color key. */
function ProgressSummary({
  dates,
  results,
}: {
  dates: string[];
  results: Record<string, ArchiveResult>;
}) {
  const counts: Record<Status, number> = { solved: 0, lost: 0, unplayed: 0 };
  for (const date of dates) counts[statusOf(results[date])]++;
  if (counts.solved + counts.lost === 0) return null;

  return (
    <ul className="archive-stats" aria-label="Your progress this month">
      {STATUS_ORDER.map((status) => (
        <li key={status} className={`archive-stat archive-stat--${status}`}>
          <span className="archive-stat__value">{counts[status]}</span>{" "}
          <span className="archive-stat__label">
            {STATUS_TEXT[status].statLabel}
          </span>
        </li>
      ))}
    </ul>
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
 * neighbouring months, and each puzzle day's result on this device. Pure/presentational — the route
 * supplies the dates (and a client wrapper the results).
 */
export function ArchiveIndexView({
  genre,
  siteName,
  archive,
  results = {},
}: ArchiveIndexViewProps) {
  const headingId = "archive-month-heading";
  return (
    <div className="archive-index">
      <XHeading level={1} size="sm" align="center">
        {siteName} Puzzle Archive
      </XHeading>

      {archive ? (
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
            results={results}
          />
          <ProgressSummary dates={archive.month.dates} results={results} />
        </section>
      ) : (
        <p className="archive-index__empty">
          <XText semantic="secondary">No puzzles published yet.</XText>
        </p>
      )}

      <XText as="p" size="sm" semantic="secondary" className="archive-index__note">
        Play any past {siteName} puzzle. Archive games count toward your stats
        but never change your streak.
      </XText>
    </div>
  );
}
