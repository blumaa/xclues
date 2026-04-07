import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { XModal } from "./XModal";
import { XButton } from "./XButton";
import { XHeading } from "./XHeading";
import { XText } from "./XText";

const meta: Meta<typeof XModal> = {
  title: "UI/XModal",
  component: XModal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof XModal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <XButton onClick={() => setOpen(true)}>Open Modal</XButton>
        <XModal isOpen={open} onClose={() => setOpen(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <XHeading level={2} align="center">Modal Title</XHeading>
            <XText>This is a modal dialog with focus trapping, scroll lock, and escape key dismissal powered by Radix UI.</XText>
            <XButton onClick={() => setOpen(false)}>Close</XButton>
          </div>
        </XModal>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <XButton onClick={() => setOpen(true)}>Open Long Modal</XButton>
        <XModal isOpen={open} onClose={() => setOpen(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <XHeading level={2} align="center">Long Content</XHeading>
            {Array.from({ length: 20 }, (_, i) => (
              <XText key={i}>Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</XText>
            ))}
            <XButton onClick={() => setOpen(false)}>Close</XButton>
          </div>
        </XModal>
      </>
    );
  },
};
