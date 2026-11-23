import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArchiveIndexView } from "./ArchiveIndexView";
import type { ArchiveResult } from "../utils/archiveResults";
import { findArchiveMonth, groupDatesByMonth } from "../utils/archiveDates";

const meta: Meta<typeof ArchiveIndexView> = {
  title: "Views/ArchiveIndexView",
  component: ArchiveIndexView,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof ArchiveIndexView>;

/** Newest-first run of `count` consecutive dates ending at `end` (YYYY-MM-DD). */
function datesEndingAt(end: string, count: number): string[] {
  const out: string[] = [];
  const d = new Date(`${end}T00:00:00Z`);
  for (let i = 0; i < count; i++) {
    out.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() - 1);
  }
  return out;
}

/** Results map: every `step`-th date played, mixing solved and lost. */
function someResults(dates: string[], step: number): Record<string, ArchiveResult> {
  const out: Record<string, ArchiveResult> = {};
  dates.forEach((date, i) => {
    if (i % step !== 0) return;
    out[date] = { won: i % (step * 3) !== 0, mistakes: i % 4 };
  });
  return out;
}

// Archive launched mid-April; today is Nov 23, so November is still filling in.
const DATES = datesEndingAt("2026-11-22", 221);
const MONTHS = groupDatesByMonth(DATES);

/** Newest month: partly filled, only an earlier-month arrow. */
export const LatestMonth: Story = {
  args: { genre: "films", siteName: "Filmclues", archive: findArchiveMonth(MONTHS, null) },
};

/** A full month with both arrows. */
export const MiddleMonth: Story = {
  args: { ...LatestMonth.args, archive: findArchiveMonth(MONTHS, "2026-06") },
};

/** Launch month: starts mid-month, only a later-month arrow. */
export const FirstMonth: Story = {
  args: { ...LatestMonth.args, archive: findArchiveMonth(MONTHS, "2026-04") },
};

/** Returning player: mix of solved, lost and unplayed days. */
export const SomePlayed: Story = {
  args: { ...MiddleMonth.args, results: someResults(DATES, 2) },
};

/** Every puzzle this month finished. */
export const AllPlayed: Story = {
  args: { ...MiddleMonth.args, results: someResults(DATES, 1) },
};

export const Empty: Story = {
  args: { genre: "music", siteName: "Musiclues", archive: null },
};
