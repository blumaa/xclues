import type { Meta, StoryObj } from "@storybook/react-vite";
import { ItemGrid } from "./ItemGrid";
import { mockItems } from "../../__mocks__/puzzleData";

const meta: Meta<typeof ItemGrid> = {
  title: "Game/ItemGrid",
  component: ItemGrid,
  tags: ["autodocs"],
  args: {
    items: mockItems,
    selectedItemIds: [],
    isShaking: false,
    jumpingItemIds: [],
    rejectedItemId: null,
    onSelectItem: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ItemGrid>;

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    layout: "fullscreen",
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
    layout: "fullscreen",
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: { defaultViewport: "desktop" },
    layout: "fullscreen",
  },
};

export const WithSelections: Story = {
  args: {
    selectedItemIds: [1, 5, 9, 13],
  },
};
