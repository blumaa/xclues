import type { Meta, StoryObj } from "@storybook/react-vite";
import { WinCelebration } from "./WinCelebration";

const meta: Meta<typeof WinCelebration> = {
  title: "Game/WinCelebration",
  component: WinCelebration,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WinCelebration>;

export const Default: Story = {};
