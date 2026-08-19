import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeedbackModal } from "./FeedbackModal";

const meta: Meta<typeof FeedbackModal> = {
  title: "Organisms/FeedbackModal",
  component: FeedbackModal,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FeedbackModal>;

/**
 * The survey as a player meets it: no close control, Escape and outside
 * clicks ignored, Submit disabled until all four questions are answered.
 */
export const Open: Story = {
  args: {
    isOpen: true,
    onSubmitted: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onSubmitted: () => {},
  },
};
