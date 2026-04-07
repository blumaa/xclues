import type { Meta, StoryObj } from "@storybook/react-vite";
import { XHeading } from "./XHeading";

const meta: Meta<typeof XHeading> = {
  title: "UI/XHeading",
  component: XHeading,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    level: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    weight: { control: "select", options: ["light", "normal", "semibold", "bold", "extrabold"] },
    align: { control: "select", options: ["left", "center", "right"] },
    responsive: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof XHeading>;

export const H1: Story = { args: { level: 1, children: "Heading Level 1" } };
export const H2: Story = { args: { level: 2, children: "Heading Level 2" } };
export const H3: Story = { args: { level: 3, children: "Heading Level 3" } };

export const AllLevels: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <XHeading key={level} level={level}>Heading Level {level}</XHeading>
      ))}
    </div>
  ),
};

export const Responsive: Story = {
  args: { level: 1, children: "Responsive Heading", responsive: true },
};

export const Centered: Story = {
  args: { level: 2, children: "Centered Heading", align: "center" },
};
