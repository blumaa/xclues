import type { Meta, StoryObj } from "@storybook/react-vite";
import { XButton } from "./XButton";

const meta: Meta<typeof XButton> = {
  title: "UI/XButton",
  component: XButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "outline", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    iconOnly: { control: "boolean" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof XButton>;

export const Primary: Story = { args: { children: "Primary Button", variant: "primary" } };
export const Outline: Story = { args: { children: "Outline Button", variant: "outline" } };
export const Ghost: Story = { args: { children: "Ghost Button", variant: "ghost" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <XButton variant="primary">Primary</XButton>
      <XButton variant="outline">Outline</XButton>
      <XButton variant="ghost">Ghost</XButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <XButton size="sm">Small</XButton>
      <XButton size="md">Medium</XButton>
      <XButton size="lg">Large</XButton>
    </div>
  ),
};

export const Disabled: Story = { args: { children: "Disabled", disabled: true } };
export const FullWidth: Story = { args: { children: "Full Width", fullWidth: true }, parameters: { layout: "padded" } };

export const IconOnly: Story = {
  args: { iconOnly: true, variant: "ghost", "aria-label": "Settings", children: "⚙️" },
};
