import type { Meta, StoryObj } from "@storybook/react-vite";
import { AnalidiotsView, type FeedbackRow } from "./AnalidiotsView";
import { aggregateEvents, type GameEventRow } from "../services/analytics/aggregateEvents";

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

function seedRows(): GameEventRow[] {
  const rows: GameEventRow[] = [];
  for (let daysAgo = 0; daysAgo < 30; daysAgo++) {
    const d = new Date(NOW);
    d.setUTCDate(d.getUTCDate() - daysAgo);
    const iso = d.toISOString();

    const started = Math.floor(8 + Math.random() * 20);
    const won = Math.floor(started * (0.55 + Math.random() * 0.25));
    const lost = started - won - Math.floor(Math.random() * 3);

    for (let i = 0; i < started; i++) rows.push({ event_type: "started", created_at: iso });
    for (let i = 0; i < won; i++) rows.push({ event_type: "won", created_at: iso });
    for (let i = 0; i < Math.max(lost, 0); i++) rows.push({ event_type: "lost", created_at: iso });
  }
  return rows;
}

const FEEDBACK_SAMPLE: FeedbackRow[] = [
  {
    id: 12,
    rating: 5,
    comment: "Love this game! Play it every morning with coffee.",
    created_at: "2026-04-19T08:14:00Z",
  },
  {
    id: 11,
    rating: 4,
    comment: "Books genre could use more classic literature clues.",
    created_at: "2026-04-18T21:02:00Z",
  },
  { id: 10, rating: 5, comment: null, created_at: "2026-04-18T11:30:00Z" },
  {
    id: 9,
    rating: 3,
    comment: "Fun but the music genre is too hard for me.",
    created_at: "2026-04-17T19:45:00Z",
  },
  { id: 8, rating: 4, comment: "Nice little break each day.", created_at: "2026-04-16T07:20:00Z" },
  { id: 7, rating: 2, comment: "Some connections feel arbitrary.", created_at: "2026-04-15T16:08:00Z" },
];

export const Realistic: Story = {
  args: {
    data: aggregateEvents(seedRows(), NOW),
    feedback: FEEDBACK_SAMPLE,
  },
};

export const Empty: Story = {
  args: {
    data: aggregateEvents([], NOW),
    feedback: [],
  },
};

export const SparseEarlyDays: Story = {
  args: {
    data: aggregateEvents(
      [
        { event_type: "started", created_at: "2026-04-19T10:00:00Z" },
        { event_type: "won", created_at: "2026-04-19T10:05:00Z" },
        { event_type: "started", created_at: "2026-04-18T14:00:00Z" },
        { event_type: "lost", created_at: "2026-04-18T14:10:00Z" },
        { event_type: "started", created_at: "2026-04-17T09:00:00Z" },
      ],
      NOW,
    ),
    feedback: [
      {
        id: 1,
        rating: 5,
        comment: "Just found this — so good!",
        created_at: "2026-04-19T10:30:00Z",
      },
    ],
  },
};
