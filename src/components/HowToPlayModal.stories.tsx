import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { HowToPlayModal } from "./HowToPlayModal";
import { XButton } from "./ui";
import { withNavProviders } from "../__mocks__/storyDecorators";

const meta: Meta<typeof HowToPlayModal> = {
  title: "App/Header/HowToPlayModal",
  component: HowToPlayModal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [withNavProviders],
};

export default meta;
type Story = StoryObj<typeof HowToPlayModal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <XButton onClick={() => setOpen(true)}>Show How to Play</XButton>
        <HowToPlayModal isOpen={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};
