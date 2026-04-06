import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { XDrawer, XDrawerHeader, XDrawerBody } from "./XDrawer";
import { XButton } from "./XButton";
import { XHeading } from "./XHeading";
import { XText } from "./XText";

const meta: Meta<typeof XDrawer> = {
  title: "UI/XDrawer",
  component: XDrawer,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof XDrawer>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <XButton onClick={() => setOpen(true)}>Open Drawer</XButton>
        <XDrawer isOpen={open} onClose={() => setOpen(false)}>
          <XDrawerHeader onClose={() => setOpen(false)}>
            <XHeading level={3}>Drawer Title</XHeading>
          </XDrawerHeader>
          <XDrawerBody>
            <XText>Drawer content goes here. It slides in from the right with an overlay backdrop.</XText>
          </XDrawerBody>
        </XDrawer>
      </>
    );
  },
};

export const LargeWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <XButton onClick={() => setOpen(true)}>Open Large Drawer</XButton>
        <XDrawer isOpen={open} onClose={() => setOpen(false)} width="lg">
          <XDrawerHeader onClose={() => setOpen(false)}>
            <XHeading level={3}>Large Drawer</XHeading>
          </XDrawerHeader>
          <XDrawerBody>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Array.from({ length: 10 }, (_, i) => (
                <XText key={i}>Content block {i + 1}</XText>
              ))}
            </div>
          </XDrawerBody>
        </XDrawer>
      </>
    );
  },
};
