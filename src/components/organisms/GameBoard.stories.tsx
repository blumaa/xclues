import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { GameBoard } from "./GameBoard";
import { getGameStore } from "../../store/gameStore";
import { withProviders } from "../../__mocks__/storyDecorators";
import { mockItems, mockGroups } from "../../__mocks__/puzzleData";
import type { Item, Group } from "../../types";

// Helper to initialize store state
const STORY_GENRE = 'films';

function StoreInitializer({
  items,
  groups,
  foundGroups = [],
  selectedItemIds = [],
  mistakes = 0,
  gameStatus = "playing",
}: {
  items: Item[];
  groups: Group[];
  foundGroups?: Group[];
  selectedItemIds?: number[];
  mistakes?: number;
  gameStatus?: "playing" | "won" | "lost";
}) {
  useEffect(() => {
    getGameStore(STORY_GENRE).setState({
      items,
      groups,
      foundGroups,
      selectedItemIds,
      mistakes,
      gameStatus,
      isShaking: false,
      notification: null,
      previousGuesses: [],
    });
  }, [items, groups, foundGroups, selectedItemIds, mistakes, gameStatus]);

  return null;
}

const meta: Meta<typeof GameBoard> = {
  title: "Game/GameBoard",
  component: GameBoard,
  parameters: {
    layout: "center",
  },
  tags: ["autodocs"],
  decorators: [withProviders],
};

export default meta;
type Story = StoryObj<typeof GameBoard>;

export const Playing: Story = {
  args: { genre: STORY_GENRE },
  decorators: [
    (Story) => (
      <>
        <StoreInitializer items={mockItems} groups={mockGroups} />
        <Story />
      </>
    ),
  ],
};

export const WithSelections: Story = {
  args: { genre: STORY_GENRE },
  decorators: [
    (Story) => (
      <>
        <StoreInitializer
          items={mockItems}
          groups={mockGroups}
          selectedItemIds={[1, 2, 3]}
        />
        <Story />
      </>
    ),
  ],
};

export const WithFoundGroup: Story = {
  args: { genre: STORY_GENRE },
  decorators: [
    (Story) => (
      <>
        <StoreInitializer
          items={mockItems.slice(4)}
          groups={mockGroups}
          foundGroups={[mockGroups[0]]}
        />
        <Story />
      </>
    ),
  ],
};

export const TwoGroupsFound: Story = {
  args: { genre: STORY_GENRE },
  decorators: [
    (Story) => (
      <>
        <StoreInitializer
          items={mockItems.slice(8)}
          groups={mockGroups}
          foundGroups={[mockGroups[0], mockGroups[1]]}
          mistakes={1}
        />
        <Story />
      </>
    ),
  ],
};

export const WithMistakes: Story = {
  args: { genre: STORY_GENRE },
  decorators: [
    (Story) => (
      <>
        <StoreInitializer items={mockItems} groups={mockGroups} mistakes={3} />
        <Story />
      </>
    ),
  ],
};

export const Completed: Story = {
  args: {
    genre: STORY_GENRE,
  },
  decorators: [
    (Story) => (
      <>
        <StoreInitializer
          items={[]}
          groups={mockGroups}
          foundGroups={mockGroups}
          gameStatus="won"
          mistakes={2}
        />
        <Story />
      </>
    ),
  ],
};

// Story with mixed text lengths to test tile sizing at all viewports
const mixedLengthItems: Item[] = [
  { id: 1, title: "Up" },
  { id: 2, title: "The Shawshank Redemption" },
  { id: 3, title: "Eternal Sunshine of the Spotless Mind" },
  { id: 4, title: "Jaws" },
  { id: 5, title: "Supercalifragilisticexpialidocious" },
  { id: 6, title: "Her" },
  { id: 7, title: "No Country for Old Men" },
  { id: 8, title: "X" },
  { id: 9, title: "Everything Everywhere All at Once" },
  { id: 10, title: "Dune" },
  { id: 11, title: "The Curious Incident of the Dog in the Night-Time" },
  { id: 12, title: "Fargo" },
  { id: 13, title: "Schwarzenegger" },
  { id: 14, title: "2001: A Space Odyssey" },
  { id: 15, title: "It" },
  { id: 16, title: "Dr. Strangelove or: How I Learned to Stop Worrying" },
];

const mixedLengthGroups: Group[] = [
  { id: "1", items: mixedLengthItems.slice(0, 4), connection: "Short + long mix", difficulty: "easy", color: "yellow" },
  { id: "2", items: mixedLengthItems.slice(4, 8), connection: "Extreme lengths", difficulty: "medium", color: "green" },
  { id: "3", items: mixedLengthItems.slice(8, 12), connection: "Very long titles", difficulty: "hard", color: "blue" },
  { id: "4", items: mixedLengthItems.slice(12, 16), connection: "More mixed lengths", difficulty: "hardest", color: "purple" },
];

export const MixedTextLengths: Story = {
  args: { genre: STORY_GENRE },
  decorators: [
    (Story) => (
      <>
        <StoreInitializer items={mixedLengthItems} groups={mixedLengthGroups} />
        <Story />
      </>
    ),
  ],
};

export const MixedWithFoundGroup: Story = {
  args: { genre: STORY_GENRE },
  decorators: [
    (Story) => (
      <>
        <StoreInitializer
          items={mixedLengthItems.slice(4)}
          groups={mixedLengthGroups}
          foundGroups={[mixedLengthGroups[0]]}
        />
        <Story />
      </>
    ),
  ],
};

// Story showing the animation in action
function AnimatingStoreInitializer() {
  useEffect(() => {
    getGameStore(STORY_GENRE).setState({
      items: mockItems,
      groups: mockGroups,
      foundGroups: [],
      selectedItemIds: [],
      mistakes: 0,
      gameStatus: "playing",
      isShaking: false,
      notification: null,
      previousGuesses: [],
    });
  }, []);
  return null;
}

export const AnimatingGroup: Story = {
  args: { genre: STORY_GENRE },
  decorators: [
    (Story) => (
      <>
        <AnimatingStoreInitializer />
        <Story />
      </>
    ),
  ],
};

// Viewport-locked stories for mixed text lengths
const mixedDecorator = (Story: () => React.ReactNode) => (
  <>
    <StoreInitializer items={mixedLengthItems} groups={mixedLengthGroups} />
    <Story />
  </>
);

export const MixedMobile: Story = {
  args: { genre: STORY_GENRE },
  decorators: [mixedDecorator],
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const MixedTablet: Story = {
  args: { genre: STORY_GENRE },
  decorators: [mixedDecorator],
  parameters: { viewport: { defaultViewport: 'tablet' } },
};

export const MixedDesktop: Story = {
  args: { genre: STORY_GENRE },
  decorators: [mixedDecorator],
  parameters: { viewport: { defaultViewport: 'desktop' } },
};
