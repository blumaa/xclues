import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArchiveDateNav } from "./ArchiveDateNav";

const meta: Meta<typeof ArchiveDateNav> = {
  title: "Molecules/ArchiveDateNav",
  component: ArchiveDateNav,
};

export default meta;
type Story = StoryObj<typeof ArchiveDateNav>;

export const Middle: Story = {
  args: { genre: "films", older: "2026-06-28", newer: "2026-06-30" },
};

export const LatestPuzzle: Story = {
  args: { genre: "films", older: "2026-06-29", newer: null },
};

export const EarliestPuzzle: Story = {
  args: { genre: "films", older: null, newer: "2026-06-29" },
};
