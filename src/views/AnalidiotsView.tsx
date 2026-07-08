"use client";

import { useState } from "react";
import type { AggregatedEvents, DailyBucket, GenreAggregations, SourceBucket, WeeklyBucket } from "../services/analytics/aggregateEvents";
import { paginate } from "../utils/paginate";
import "./AnalidiotsView.css";

export interface FeedbackRow {
  id: number;
  rating: number;
  comment: string | null;
  created_at: string;
}

interface AnalidiotsViewProps {
  data: GenreAggregations;
  bySource: SourceBucket[];
  feedback: FeedbackRow[];
}

const PAGE_SIZE = 10;

const GENRE_TABS = [
  { key: 'all', label: 'All' },
  { key: 'films', label: 'Films' },
  { key: 'books', label: 'Books' },
  { key: 'music', label: 'Music' },
] as const;

type GenreTabKey = (typeof GENRE_TABS)[number]['key'];

function ratingStars(n: number): string {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} ${hh}:${mm}`;
}

type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

function sum<T>(rows: T[], key: NumericKeys<T>): number {
  return rows.reduce((acc, r) => acc + (r[key] as number), 0);
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (next: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav className="analidiots__pagination" aria-label="Pagination">
      <button
        type="button"
        className="analidiots__page-btn"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        &larr; Prev
      </button>
      <span className="analidiots__page-indicator">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        className="analidiots__page-btn"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next &rarr;
      </button>
    </nav>
  );
}

function BucketRow({ label, bucket }: { label: string; bucket: DailyBucket | WeeklyBucket }) {
  const total = bucket.started + bucket.won + bucket.lost;
  const winRate =
    bucket.won + bucket.lost > 0
      ? Math.round((bucket.won / (bucket.won + bucket.lost)) * 100)
      : 0;
  return (
    <tr className={total === 0 ? "analidiots__row analidiots__row--empty" : "analidiots__row"}>
      <td className="analidiots__cell analidiots__cell--label">{label}</td>
      <td className="analidiots__cell analidiots__cell--num">{bucket.started}</td>
      <td className="analidiots__cell analidiots__cell--num">{bucket.won}</td>
      <td className="analidiots__cell analidiots__cell--num">{bucket.lost}</td>
      <td className="analidiots__cell analidiots__cell--num">{winRate}%</td>
    </tr>
  );
}

function GenreSection({ data }: { data: AggregatedEvents }) {
  const [dailyPage, setDailyPage] = useState(1);
  const [weeklyPage, setWeeklyPage] = useState(1);

  const dailyTotals = {
    started: sum(data.daily, "started"),
    won: sum(data.daily, "won"),
    lost: sum(data.daily, "lost"),
  };

  const dailyPaginated = paginate(data.daily, dailyPage, PAGE_SIZE);
  const weeklyPaginated = paginate(data.weekly, weeklyPage, PAGE_SIZE);

  return (
    <>
      <section className="analidiots__section">
        <h2 className="analidiots__section-title">30-day totals</h2>
        <div className="analidiots__totals">
          <div className="analidiots__total">
            <div className="analidiots__total-num">{dailyTotals.started}</div>
            <div className="analidiots__total-label">Started</div>
          </div>
          <div className="analidiots__total">
            <div className="analidiots__total-num">{dailyTotals.won}</div>
            <div className="analidiots__total-label">Won</div>
          </div>
          <div className="analidiots__total">
            <div className="analidiots__total-num">{dailyTotals.lost}</div>
            <div className="analidiots__total-label">Lost</div>
          </div>
        </div>
      </section>

      <section className="analidiots__section">
        <h2 className="analidiots__section-title">Per day</h2>
        <table className="analidiots__table">
          <thead>
            <tr>
              <th className="analidiots__cell analidiots__cell--label">Date</th>
              <th className="analidiots__cell analidiots__cell--num">Started</th>
              <th className="analidiots__cell analidiots__cell--num">Won</th>
              <th className="analidiots__cell analidiots__cell--num">Lost</th>
              <th className="analidiots__cell analidiots__cell--num">Win %</th>
            </tr>
          </thead>
          <tbody>
            {dailyPaginated.items.map((d) => (
              <BucketRow key={d.date} label={d.date} bucket={d} />
            ))}
          </tbody>
        </table>
        <Pagination
          page={dailyPaginated.page}
          totalPages={dailyPaginated.totalPages}
          onChange={setDailyPage}
        />
      </section>

      <section className="analidiots__section">
        <h2 className="analidiots__section-title">Per week</h2>
        <table className="analidiots__table">
          <thead>
            <tr>
              <th className="analidiots__cell analidiots__cell--label">Week</th>
              <th className="analidiots__cell analidiots__cell--num">Started</th>
              <th className="analidiots__cell analidiots__cell--num">Won</th>
              <th className="analidiots__cell analidiots__cell--num">Lost</th>
              <th className="analidiots__cell analidiots__cell--num">Win %</th>
            </tr>
          </thead>
          <tbody>
            {weeklyPaginated.items.map((w) => (
              <BucketRow key={w.isoWeek} label={w.isoWeek} bucket={w} />
            ))}
          </tbody>
        </table>
        <Pagination
          page={weeklyPaginated.page}
          totalPages={weeklyPaginated.totalPages}
          onChange={setWeeklyPage}
        />
      </section>
    </>
  );
}

export function AnalidiotsView({ data, bySource, feedback }: AnalidiotsViewProps) {
  const [activeTab, setActiveTab] = useState<GenreTabKey>('all');
  const [feedbackPage, setFeedbackPage] = useState(1);

  const avgRating =
    feedback.length > 0
      ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(2)
      : "—";

  const feedbackPaginated = paginate(feedback, feedbackPage, PAGE_SIZE);

  return (
    <div className="analidiots">
      <header className="analidiots__header">
        <h1 className="analidiots__title">analidiots</h1>
        <p className="analidiots__subtitle">
          Games started / won / lost. Times in UTC.
        </p>
      </header>

      <nav className="analidiots__tabs" aria-label="Genre filter">
        {GENRE_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`analidiots__tab${activeTab === tab.key ? ' analidiots__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
            aria-pressed={activeTab === tab.key}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <GenreSection data={data[activeTab]} />

      <section className="analidiots__section">
        <h2 className="analidiots__section-title">
          Traffic sources
          <span className="analidiots__section-meta">
            plays by channel &middot; last 30 days
          </span>
        </h2>
        {bySource.length === 0 ? (
          <p className="analidiots__empty">No attributed traffic yet.</p>
        ) : (
          <table className="analidiots__table">
            <thead>
              <tr>
                <th className="analidiots__cell analidiots__cell--label">Source</th>
                <th className="analidiots__cell analidiots__cell--num">Started</th>
                <th className="analidiots__cell analidiots__cell--num">Won</th>
                <th className="analidiots__cell analidiots__cell--num">Win rate</th>
              </tr>
            </thead>
            <tbody>
              {bySource.map((s) => (
                <tr key={s.source} className="analidiots__row">
                  <td className="analidiots__cell analidiots__cell--label">{s.source}</td>
                  <td className="analidiots__cell analidiots__cell--num">{s.started}</td>
                  <td className="analidiots__cell analidiots__cell--num">{s.won}</td>
                  <td className="analidiots__cell analidiots__cell--num">
                    {s.started > 0 ? `${Math.round((s.won / s.started) * 100)}%` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="analidiots__section">
        <h2 className="analidiots__section-title">
          Feedback
          <span className="analidiots__section-meta">
            {feedback.length} submission{feedback.length === 1 ? "" : "s"} &middot; avg {avgRating}
          </span>
        </h2>
        {feedback.length === 0 ? (
          <p className="analidiots__empty">No feedback yet.</p>
        ) : (
          <>
            <table className="analidiots__table">
              <thead>
                <tr>
                  <th className="analidiots__cell analidiots__cell--label">When</th>
                  <th className="analidiots__cell analidiots__cell--num">Rating</th>
                  <th className="analidiots__cell">Comment</th>
                </tr>
              </thead>
              <tbody>
                {feedbackPaginated.items.map((f) => (
                  <tr key={f.id} className="analidiots__row">
                    <td className="analidiots__cell analidiots__cell--label">
                      {formatTimestamp(f.created_at)}
                    </td>
                    <td className="analidiots__cell analidiots__cell--num analidiots__rating">
                      <span aria-label={`${f.rating} out of 5`}>{ratingStars(f.rating)}</span>
                    </td>
                    <td className="analidiots__cell analidiots__comment">
                      {f.comment ?? <span className="analidiots__muted">&mdash;</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              page={feedbackPaginated.page}
              totalPages={feedbackPaginated.totalPages}
              onChange={setFeedbackPage}
            />
          </>
        )}
      </section>
    </div>
  );
}
