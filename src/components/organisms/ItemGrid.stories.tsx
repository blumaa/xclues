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

const allLongItems: Item[] = [
  { id: 1, title: "The Shawshank Redemption" },
  { id: 2, title: "The Godfather Part II" },
  { id: 3, title: "One Flew Over the Cuckoo's Nest" },
  { id: 4, title: "No Country for Old Men" },
  { id: 5, title: "The Silence of the Lambs" },
  { id: 6, title: "Schindler's List" },
  { id: 7, title: "The Lord of the Rings" },
  { id: 8, title: "Raiders of the Lost Ark" },
  { id: 9, title: "Blade Runner 2049" },
  { id: 10, title: "The Dark Knight Rises" },
  { id: 11, title: "Back to the Future" },
  { id: 12, title: "Good Will Hunting" },
  { id: 13, title: "Crouching Tiger, Hidden Dragon" },
  { id: 14, title: "A Streetcar Named Desire" },
  { id: 15, title: "The Wizard of Oz" },
  { id: 16, title: "Apocalypse Now Redux" },
];

export const AllLongTitles: Story = {
  args: { items: allLongItems },
};

const allVeryLongItems: Item[] = [
  { id: 1, title: "Eternal Sunshine of the Spotless Mind" },
  { id: 2, title: "The Curious Incident of the Dog in the Night-Time" },
  { id: 3, title: "Dr. Strangelove or: How I Learned to Stop Worrying" },
  { id: 4, title: "Everything Everywhere All at Once" },
  { id: 5, title: "The Assassination of Jesse James" },
  { id: 6, title: "Birdman or (The Unexpected Virtue of Ignorance)" },
  { id: 7, title: "Borat: Cultural Learnings of America" },
  { id: 8, title: "The Perks of Being a Wallflower" },
  { id: 9, title: "Cloudy with a Chance of Meatballs" },
  { id: 10, title: "Fantastic Mr. Fox and the Farmers" },
  { id: 11, title: "Indiana Jones and the Temple of Doom" },
  { id: 12, title: "Pirates of the Caribbean: Dead Man's Chest" },
  { id: 13, title: "Harry Potter and the Prisoner of Azkaban" },
  { id: 14, title: "The Hobbit: The Battle of the Five Armies" },
  { id: 15, title: "Star Wars: Episode V - The Empire Strikes Back" },
  { id: 16, title: "Supercalifragilisticexpialidocious" },
];

export const AllVeryLongTitles: Story = {
  args: { items: allVeryLongItems },
};

const shortItems: Item[] = [
  { id: 1, title: "Up" },
  { id: 2, title: "Her" },
  { id: 3, title: "Jaws" },
  { id: 4, title: "Elf" },
  { id: 5, title: "X" },
  { id: 6, title: "It" },
  { id: 7, title: "Ran" },
  { id: 8, title: "Dune" },
  { id: 9, title: "Tenet" },
  { id: 10, title: "Alien" },
  { id: 11, title: "Cars" },
  { id: 12, title: "Heat" },
  { id: 13, title: "Drive" },
  { id: 14, title: "Fargo" },
  { id: 15, title: "Rocky" },
  { id: 16, title: "Shrek" },
];

export const AllShortTitles: Story = {
  args: { items: shortItems },
};

export const WithSelections: Story = {
  args: {
    items: edgeCaseItems,
    selectedItemIds: [1, 3, 5, 13],
  },
};

// Viewport-locked stories — click through sidebar to compare breakpoints
export const EdgeCasesMobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const EdgeCasesTablet: Story = {
  parameters: { viewport: { defaultViewport: 'tablet' } },
};

export const EdgeCasesDesktop: Story = {
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const AllVeryLongMobile: Story = {
  args: { items: allVeryLongItems },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const AllVeryLongTablet: Story = {
  args: { items: allVeryLongItems },
  parameters: { viewport: { defaultViewport: 'tablet' } },
};

export const AllVeryLongDesktop: Story = {
  args: { items: allVeryLongItems },
  parameters: { viewport: { defaultViewport: 'desktop' } },
};
