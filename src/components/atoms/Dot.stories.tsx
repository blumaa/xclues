import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dot } from "./Dot";

const meta: Meta<typeof Dot> = {
  title: "UI/Dot",
  component: Dot,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "lg"] },
    variant: { control: "select", options: ["filled", "empty", "color"] },
    color: { control: "select", options: ["yellow", "green", "blue", "purple"] },
  },
};

export default meta;
type Story = StoryObj<typeof Dot>;

export const Filled: Story = { args: { variant: "filled", size: "lg" } };
export const Empty: Story = { args: { variant: "empty", size: "lg" } };

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Dot variant="color" color="yellow" />
      <Dot variant="color" color="green" />
      <Dot variant="color" color="blue" />
      <Dot variant="color" color="purple" />
    </div>
  ),
};

export const MistakeIndicator: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <Dot variant="filled" size="lg" />
      <Dot variant="filled" size="lg" />
      <Dot variant="empty" size="lg" />
      <Dot variant="empty" size="lg" />
    </div>
  ),
};

export const DifficultyLegend: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: "0.85rem" }}>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Dot variant="color" color="yellow" /> Easy</span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Dot variant="color" color="green" /> Medium</span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Dot variant="color" color="blue" /> Hard</span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Dot variant="color" color="purple" /> Expert</span>
    </div>
  ),
};
