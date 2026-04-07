import type { Meta, StoryObj } from "@storybook/react-vite";
import { GameSkeleton } from "./GameSkeleton";

const meta: Meta<typeof GameSkeleton> = {
  title: "Game/GameSkeleton",
  component: GameSkeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GameSkeleton>;

export const Default: Story = {};
