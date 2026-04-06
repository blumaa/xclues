import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeToggle } from "./ThemeToggle";
import { withTheme } from "../__mocks__/storyDecorators";

const meta: Meta<typeof ThemeToggle> = {
  title: "App/Header/ThemeToggle",
  component: ThemeToggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [withTheme],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};
