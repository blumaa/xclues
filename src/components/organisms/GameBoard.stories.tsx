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
