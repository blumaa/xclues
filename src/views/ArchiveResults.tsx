"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import Link from "next/link";
import { STATS_STORAGE_KEY, getStatsStore, useStatsStore } from "../store/statsStore";
import { archiveResultsByDate, type ArchiveResult } from "../utils/archiveResults";
import { STATUS_ORDER, STATUS_TEXT, spokenStatus, statusOf, type Status } from "./archiveStatus";

// The only browser-side part of the archive hub: this device's results.
// The calendar itself stays server-rendered.

const ResultsContext = createContext<Record<string, ArchiveResult>>({});

/**
 * Supplies results to the tiles and stat strip. Given `results` (stories,
 * tests) it uses them; otherwise it loads this device's saved game history.
 */
export function ArchiveResultsProvider({
  genre,
  results,
  children,
}: {
  genre: string;
  results?: Record<string, ArchiveResult>;
  children: ReactNode;
}) {
  const history = useStatsStore((s) => s.gameHistory);
  const stored = useMemo(() => archiveResultsByDate(history, genre), [history, genre]);

  useEffect(() => {
    if (!results) getStatsStore().getState().hydrate(STATS_STORAGE_KEY);
  }, [results]);

  return (
    <ResultsContext.Provider value={results ?? stored}>{children}</ResultsContext.Provider>
  );
}

/** One playable calendar day. `name` = "Filmclues puzzle, Tuesday, June 30, 2026". */
export function ArchiveDayTile({
  href,
  date,
  day,
  name,
}: {
  href: string;
  date: string;
  day: number;
  name: string;
}) {
  const result = useContext(ResultsContext)[date];
  const status = statusOf(result);
  const { symbol, label } = STATUS_TEXT[status];

  return (
    <Link
      href={href}
      className={`archive-tile archive-tile--${status}`}
      aria-label={`${name}: ${spokenStatus(result)}`}
    >
      <span className="archive-tile__day">{day}</span>
      <span className="archive-tile__status">
        <span aria-hidden="true">{symbol}</span>
        <span className="archive-tile__label"> {label}</span>
      </span>
    </Link>
  );
}

/** Solved / Lost / Unplayed counts; doubles as the calendar's color key. */
export function ArchiveProgress({ dates }: { dates: string[] }) {
  const results = useContext(ResultsContext);
  const counts: Record<Status, number> = { solved: 0, lost: 0, unplayed: 0 };
  for (const date of dates) counts[statusOf(results[date])]++;
  if (counts.solved + counts.lost === 0) return null;

  return (
    <ul className="archive-stats" aria-label="Your progress this month">
      {STATUS_ORDER.map((status) => (
        <li key={status} className={`archive-stat archive-stat--${status}`}>
          <span className="archive-stat__value">{counts[status]}</span>{" "}
          <span className="archive-stat__label">{STATUS_TEXT[status].statLabel}</span>
        </li>
      ))}
    </ul>
  );
}
