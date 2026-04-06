import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { GameBoard } from "./GameBoard";
import { useGameStore } from "../../store/gameStore";
import { withProviders } from "../../__mocks__/storyDecorators";
import { mockItems, mockGroups } from "../../__mocks__/puzzleData";
import type { Item, Group } from "../../types";

// Helper to initialize store state
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
    useGameStore.setState({
      items,
      groups,
      foundGroups,
      selectedItemIds,
      mistakes,
      gameStatus,
      isShaking: false,
      notification: null,
      puzzleDate: "2024-01-15",
      previousGuesses: [],
      isLoading: false,
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
    onViewStats: () => {},
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
    useGameStore.setState({
      items: mockItems,
      groups: mockGroups,
      foundGroups: [],
      selectedItemIds: [],
      mistakes: 0,
      gameStatus: "playing",
      isShaking: false,
      notification: null,
      puzzleDate: "2024-01-15",
      previousGuesses: [],
      isLoading: false,
    });
  }, []);

  return null;
}

export const AnimatingGroup: Story = {
  decorators: [
    (Story) => (
      <>
        <AnimatingStoreInitializer />
        <Story />
      </>
    ),
  ],
};
