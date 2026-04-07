import type { Meta, StoryObj } from "@storybook/react-vite";
import { XInput } from "./XInput";

const meta: Meta<typeof XInput> = {
  title: "UI/XInput",
  component: XInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    inputSize: { control: "select", options: ["sm", "md", "lg"] },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    type: { control: "select", options: ["text", "email", "password", "number"] },
  },
};

export default meta;
type Story = StoryObj<typeof XInput>;

export const Default: Story = { args: { placeholder: "Enter text..." } };
export const Small: Story = { args: { placeholder: "Small input", inputSize: "sm" } };
export const Large: Story = { args: { placeholder: "Large input", inputSize: "lg" } };
export const Disabled: Story = { args: { placeholder: "Disabled", disabled: true } };
export const Email: Story = { args: { placeholder: "you@example.com", type: "email" } };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 300 }}>
      <XInput inputSize="sm" placeholder="Small" />
      <XInput inputSize="md" placeholder="Medium" />
      <XInput inputSize="lg" placeholder="Large" />
    </div>
  ),
};
