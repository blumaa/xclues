import type { Meta, StoryObj } from "@storybook/react-vite";
import { ItemGrid } from "./ItemGrid";
import type { Item } from "../../types";

const edgeCaseItems: Item[] = [
  { id: 1, title: "Up" },
  { id: 2, title: "Dreamcatcher" },
  { id: 3, title: "The Shawshank Redemption" },
  { id: 4, title: "Eternal Sunshine of the Spotless Mind" },
  { id: 5, title: "X" },
  { id: 6, title: "Schwarzenegger" },
  { id: 7, title: "12 Years a Slave" },
  { id: 8, title: "The Blair Witch Project" },
  { id: 9, title: "Goodfellas" },
  { id: 10, title: "2001: A Space Odyssey" },
  { id: 11, title: "Her" },
  { id: 12, title: "Ratatouille" },
  { id: 13, title: "The Curious Incident of the Dog in the Night-Time" },
  { id: 14, title: "Jaws" },
  { id: 15, title: "Matchstick Men" },
  { id: 16, title: "Supercalifragilisticexpialidocious" },
];

const meta: Meta<typeof ItemGrid> = {
  title: "Game/ItemGrid",
  component: ItemGrid,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    items: edgeCaseItems,
    selectedItemIds: [],
    isShaking: false,
    jumpingItemIds: [],
    rejectedItemId: null,
    onSelectItem: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ItemGrid>;

export const EdgeCases: Story = {};
