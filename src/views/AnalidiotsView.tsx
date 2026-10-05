"use client";

import { useState, type CSSProperties } from "react";
import {
  dropOff,
  type AggregatedEvents,
  type DailyBucket,
  type GenreAggregations,
  type SourceBucket,
  type WeeklyBucket,
} from "../services/analytics/aggregateEvents";
import { paginate } from "../utils/paginate";
import {
  aggregateSurvey,
  type SurveyResponseRow,
} from "../services/feedback/aggregateSurvey";
import "./AnalidiotsView.css";

interface AnalidiotsViewProps {
  data: GenreAggregations;
  bySource: SourceBucket[];
  feedback: SurveyResponseRow[];
}

const PAGE_SIZE = 10;

const GENRE_TABS = [
  { key: 'all', label: 'All' },
  { key: 'films', label: 'Films' },
  { key: 'books', label: 'Books' },
  { key: 'music', label: 'Music' },
] as const;

type GenreTabKey = (typeof GENRE_TABS)[number]['key'];

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
      <td className="analidiots__cell analidiots__cell--num">{dropOff(bucket)}</td>
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
          <div className="analidiots__total">
            <div className="analidiots__total-num">{dropOff(dailyTotals)}</div>
            <div className="analidiots__total-label">Dropped</div>
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
              <th className="analidiots__cell analidiots__cell--num">Dropped</th>
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
              <th className="analidiots__cell analidiots__cell--num">Dropped</th>
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

  const survey = aggregateSurvey(feedback);
  const improvementsPaginated = paginate(survey.improvements, feedbackPage, PAGE_SIZE);

  return (
    <div className="analidiots">
      <header className="analidiots__header">
        <h1 className="analidiots__title">analidiots</h1>
        <p className="analidiots__subtitle">
          Games started / won / lost. Dropped = started minus finished. Times in UTC.
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
                <th className="analidiots__cell analidiots__cell--num">Dropped</th>
                <th className="analidiots__cell analidiots__cell--num">Win rate</th>
              </tr>
            </thead>
            <tbody>
              {bySource.map((s) => (
                <tr key={s.source} className="analidiots__row">
                  <td className="analidiots__cell analidiots__cell--label">{s.source}</td>
                  <td className="analidiots__cell analidiots__cell--num">{s.started}</td>
                  <td className="analidiots__cell analidiots__cell--num">{s.won}</td>
                  <td className="analidiots__cell analidiots__cell--num">{dropOff(s)}</td>
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
          Survey
          <span className="analidiots__section-meta">
            {survey.total} response{survey.total === 1 ? "" : "s"}
            {survey.pmfScore !== null && (
              <> &middot; PMF {survey.pmfScore.toFixed(0)}%</>
            )}
          </span>
        </h2>
        {survey.total === 0 ? (
          <p className="analidiots__empty">No responses yet.</p>
        ) : (
          <div className="analidiots__distributions">
            {survey.questions.map((question) => (
              <div key={question.id} className="analidiots__distribution">
                <h3 className="analidiots__distribution-title">
                  {question.prompt}
                  <span className="analidiots__section-meta">n={question.total}</span>
                </h3>
                {question.buckets.map((bucket) => (
                  <div key={bucket.value} className="analidiots__bar-row">
                    <span className="analidiots__bar-label">{bucket.label}</span>
                    <span className="analidiots__bar-track">
                      {/* Width is data-driven, so it comes in as a custom
                          property; every visual rule stays in the CSS file. */}
                      <span
                        className="analidiots__bar-fill"
                        style={{ "--pct": `${bucket.pct}%` } as CSSProperties}
                      />
                    </span>
                    <span className="analidiots__bar-value">
                      {bucket.pct.toFixed(0)}% ({bucket.count})
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="analidiots__section">
        <h2 className="analidiots__section-title">
          What would make it better
          <span className="analidiots__section-meta">
            {survey.improvements.length} written answer
            {survey.improvements.length === 1 ? "" : "s"}
          </span>
        </h2>
        {survey.improvements.length === 0 ? (
          <p className="analidiots__empty">No written answers yet.</p>
        ) : (
          <>
            <table className="analidiots__table">
              <thead>
                <tr>
                  <th className="analidiots__cell analidiots__cell--label">When</th>
                  <th className="analidiots__cell">Answer</th>
                </tr>
              </thead>
              <tbody>
                {improvementsPaginated.items.map((row) => (
                  <tr key={row.id} className="analidiots__row">
                    <td className="analidiots__cell analidiots__cell--label">
                      {formatTimestamp(row.created_at)}
                    </td>
                    <td className="analidiots__cell analidiots__comment">
                      {row.improvement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              page={improvementsPaginated.page}
              totalPages={improvementsPaginated.totalPages}
              onChange={setFeedbackPage}
            />
          </>
        )}
      </section>

    </div>
  );
}
