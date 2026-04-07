import type { Meta, StoryObj } from "@storybook/react-vite";
import { XSpinner } from "./XSpinner";

const meta: Meta<typeof XSpinner> = {
  title: "UI/XSpinner",
  component: XSpinner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof XSpinner>;

export const Default: Story = {};
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg", label: "Loading puzzle..." } };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <XSpinner size="sm" />
      <XSpinner size="md" />
      <XSpinner size="lg" />
    </div>
  ),
};
