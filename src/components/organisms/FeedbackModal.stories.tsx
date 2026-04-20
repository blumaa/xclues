import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FeedbackModal } from "./FeedbackModal";
import { XButton } from "../atoms";

const meta: Meta<typeof FeedbackModal> = {
  title: "Organisms/FeedbackModal",
  component: FeedbackModal,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FeedbackModal>;

export const Open: Story = {
  args: {
    isOpen: true,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};

export const Interactive: Story = {
  render: () => {
    function Wrapper() {
      const [open, setOpen] = useState(true);
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <XButton variant="primary" size="sm" onClick={() => setOpen(true)}>
            Open feedback modal
          </XButton>
          <FeedbackModal isOpen={open} onClose={() => setOpen(false)} />
        </div>
      );
    }
    return <Wrapper />;
  },
};
