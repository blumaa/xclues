import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumbs } from "./Breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Molecules/Breadcrumbs",
  component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const ArchiveIndex: Story = {
  args: {
    items: [{ label: "Filmclues", href: "/" }, { label: "Archive" }],
  },
};

export const ArchiveDate: Story = {
  args: {
    items: [
      { label: "Filmclues", href: "/" },
      { label: "Archive", href: "/films/archive" },
      { label: "June 30, 2026" },
    ],
  },
};
