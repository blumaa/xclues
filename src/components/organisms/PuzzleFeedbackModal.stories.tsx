import type { Meta, StoryObj } from "@storybook/react-vite";
import { PuzzleFeedbackModal } from "./PuzzleFeedbackModal";

const meta: Meta<typeof PuzzleFeedbackModal> = {
  title: "Organisms/PuzzleFeedbackModal",
  component: PuzzleFeedbackModal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    genre: "films",
    puzzleDate: "2026-10-15",
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof PuzzleFeedbackModal>;

/** Opened from "Send Feedback" on the results panel. Send stays disabled until a star is picked. */
export const Open: Story = {
  args: { isOpen: true },
};

export const Closed: Story = {
  args: { isOpen: false },
};
