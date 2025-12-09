import type { Meta, StoryObj } from "@storybook/react-vite";
import { GameHeader } from "./GameHeader";

const meta: Meta<typeof GameHeader> = {
  title: "Game/GameHeader",
  component: GameHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    puzzleDate: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof GameHeader>;

export const WithPuzzleDate: Story = {
  args: {
    puzzleDate: "2024-01-15",
  },
};

export const NoPuzzleDate: Story = {
  args: {},
};

