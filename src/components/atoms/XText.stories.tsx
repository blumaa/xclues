import type { Meta, StoryObj } from "@storybook/react-vite";
import { XText } from "./XText";

const meta: Meta<typeof XText> = {
  title: "UI/XText",
  component: XText,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    weight: { control: "select", options: ["light", "normal", "semibold", "bold", "extrabold"] },
    align: { control: "select", options: ["left", "center", "right"] },
    semantic: { control: "select", options: ["primary", "secondary"] },
    responsive: { control: "boolean" },
    as: { control: "select", options: ["span", "p", "label", "div"] },
  },
};

export default meta;
type Story = StoryObj<typeof XText>;

export const Default: Story = {
  args: { children: "The quick brown fox jumps over the lazy dog." },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <XText key={size} size={size}>{size}: The quick brown fox</XText>
      ))}
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["light", "normal", "semibold", "bold", "extrabold"] as const).map((weight) => (
        <XText key={weight} weight={weight}>{weight}: The quick brown fox</XText>
      ))}
    </div>
  ),
};

export const Secondary: Story = {
  args: { children: "Secondary text with reduced opacity", semantic: "secondary" },
};

export const LongText: Story = {
  args: { children: "This is a really long title that should trigger the long text scaling when responsive is enabled", responsive: true, isLongText: true },
};

export const VeryLongText: Story = {
  args: { children: "The Curious Incident of the Dog in the Night-Time by Mark Haddon", responsive: true, isLongText: true },
};
