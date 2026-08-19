import type { Meta, StoryObj } from "@storybook/react-vite";
import { AnalidiotsView } from "./AnalidiotsView";
import type { SurveyResponseRow } from "../services/feedback/aggregateSurvey";
import { aggregateBySource, aggregateEventsByGenre, type GameEventRow } from "../services/analytics/aggregateEvents";

const meta: Meta<typeof AnalidiotsView> = {
  title: "Views/AnalidiotsView",
  component: AnalidiotsView,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AnalidiotsView>;

const NOW = new Date("2026-04-19T12:00:00Z");
const GENRES = ['films', 'books', 'music'] as const;
// null = organic; the rest exercise the traffic-source panel.
const SOURCES = ['reddit', 'bluesky', 'mastodon', null] as const;

function seedRows(): GameEventRow[] {
  const rows: GameEventRow[] = [];
  for (let daysAgo = 0; daysAgo < 30; daysAgo++) {
    const d = new Date(NOW);
    d.setUTCDate(d.getUTCDate() - daysAgo);
    const iso = d.toISOString();

    for (const genre of GENRES) {
      const source = SOURCES[(daysAgo + GENRES.indexOf(genre)) % SOURCES.length];
      const started = Math.floor(8 + Math.random() * 20);
      const won = Math.floor(started * (0.55 + Math.random() * 0.25));
      const lost = started - won - Math.floor(Math.random() * 3);

      for (let i = 0; i < started; i++) rows.push({ event_type: "started", created_at: iso, genre, source });
      for (let i = 0; i < won; i++) rows.push({ event_type: "won", created_at: iso, genre, source });
      for (let i = 0; i < Math.max(lost, 0); i++) rows.push({ event_type: "lost", created_at: iso, genre, source });
    }
  }
  return rows;
}

const REALISTIC_ROWS = seedRows();
const SPARSE_ROWS: GameEventRow[] = [
  { event_type: "started", created_at: "2026-04-19T10:00:00Z", genre: "films", source: "reddit" },
  { event_type: "won", created_at: "2026-04-19T10:05:00Z", genre: "films", source: "reddit" },
  { event_type: "started", created_at: "2026-04-18T14:00:00Z", genre: "books", source: "bluesky" },
  { event_type: "lost", created_at: "2026-04-18T14:10:00Z", genre: "books", source: "bluesky" },
  { event_type: "started", created_at: "2026-04-17T09:00:00Z", genre: "music", source: null },
];

const FEEDBACK_SAMPLE: SurveyResponseRow[] = [
  {
    id: 12,
    created_at: "2026-04-19T08:14:00Z",
    frequency: "daily",
    difficulty: "just_right",
    favorite_genre: "films",
    pmf: "very_disappointed",
    improvement: "Love this game! Play it every morning with coffee.",
  },
  {
    id: 11,
    created_at: "2026-04-18T21:02:00Z",
    frequency: "weekly",
    difficulty: "a_bit_hard",
    favorite_genre: "books",
    pmf: "very_disappointed",
    improvement: "Books genre could use more classic literature clues.",
  },
  {
    id: 10,
    created_at: "2026-04-18T11:30:00Z",
    frequency: "daily",
    difficulty: "just_right",
    favorite_genre: "all",
    pmf: "somewhat_disappointed",
    improvement: null,
  },
  {
    id: 9,
    created_at: "2026-04-17T19:45:00Z",
    frequency: "sometimes",
    difficulty: "way_too_hard",
    favorite_genre: "music",
    pmf: "somewhat_disappointed",
    improvement: "Fun but the music genre is too hard for me.",
  },
  {
    id: 8,
    created_at: "2026-04-16T07:20:00Z",
    frequency: "weekly",
    difficulty: "a_bit_easy",
    favorite_genre: "films",
    pmf: "very_disappointed",
    improvement: "Nice little break each day.",
  },
  {
    id: 7,
    created_at: "2026-04-15T16:08:00Z",
    frequency: "first_time",
    difficulty: "a_bit_hard",
    favorite_genre: "films",
    pmf: "not_disappointed",
    improvement: "Some connections feel arbitrary.",
  },
];


export const Realistic: Story = {
  args: {
    data: aggregateEventsByGenre(REALISTIC_ROWS, NOW),
    bySource: aggregateBySource(REALISTIC_ROWS, NOW),
    feedback: FEEDBACK_SAMPLE,
  },
};

export const Empty: Story = {
  args: {
    data: aggregateEventsByGenre([], NOW),
    bySource: aggregateBySource([], NOW),
    feedback: [],
  },
};

export const SparseEarlyDays: Story = {
  args: {
    data: aggregateEventsByGenre(SPARSE_ROWS, NOW),
    bySource: aggregateBySource(SPARSE_ROWS, NOW),
    feedback: [
      {
        id: 1,
        created_at: "2026-04-19T10:30:00Z",
        frequency: "first_time",
        difficulty: "just_right",
        favorite_genre: "films",
        pmf: "somewhat_disappointed",
        improvement: "Just found this — so good!",
      },
    ],
  },
};
