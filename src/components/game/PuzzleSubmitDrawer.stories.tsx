import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { XButton } from "../ui";
import { PuzzleSubmitDrawer } from "./PuzzleSubmitDrawer";
import { SiteProvider } from "../../providers/SiteProvider";

const meta: Meta<typeof PuzzleSubmitDrawer> = {
  title: "Game/PuzzleSubmitDrawer",
  component: PuzzleSubmitDrawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <SiteProvider>
        <Story />
      </SiteProvider>
    ),
  ],
  argTypes: {
    onClose: { action: "close" },
    onSubmit: { action: "submit" },
  },
};

export default meta;
type Story = StoryObj<typeof PuzzleSubmitDrawer>;

// Interactive story with toggle button
function DrawerDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <XButton onClick={() => setIsOpen(true)}>Open Submit Drawer</XButton>
      <PuzzleSubmitDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={async (submission) => {
          console.log("Submitted:", submission);
          setIsSubmitting(true);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setIsSubmitting(false);
          setIsOpen(false);
        }}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export const Interactive: Story = {
  render: () => <DrawerDemo />,
};

export const Open: Story = {
  args: {
    isOpen: true,
    isSubmitting: false,
  },
};

export const Submitting: Story = {
  args: {
    isOpen: true,
    isSubmitting: true,
  },
};
