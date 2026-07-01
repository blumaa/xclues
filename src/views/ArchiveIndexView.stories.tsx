import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArchiveIndexView } from "./ArchiveIndexView";

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

export const FirstPage: Story = {
  args: {
    genre: "films",
    siteName: "Filmclues",
    dates: datesEndingAt("2026-06-30", 30),
    page: 1,
    totalPages: 8,
  },
};

export const MiddlePage: Story = {
  args: {
    genre: "films",
    siteName: "Filmclues",
    dates: datesEndingAt("2026-05-31", 30),
    page: 4,
    totalPages: 8,
  },
};

export const SinglePage: Story = {
  args: {
    genre: "books",
    siteName: "Litclues",
    dates: datesEndingAt("2026-06-30", 5),
    page: 1,
    totalPages: 1,
  },
};

export const Empty: Story = {
  args: {
    genre: "music",
    siteName: "Musiclues",
    dates: [],
    page: 1,
    totalPages: 0,
  },
};
