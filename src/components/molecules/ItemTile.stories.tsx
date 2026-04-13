import type { Meta, StoryObj } from "@storybook/react-vite";
import { ItemTile } from "./ItemTile";

const meta: Meta<typeof ItemTile> = {
  title: "Game/ItemTile",
  component: ItemTile,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    isSelected: { control: "boolean" },
    isShaking: { control: "boolean" },
    isJumping: { control: "boolean" },
    isRejected: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ItemTile>;

export const Default: Story = {
  args: {
    item: { id: 1, title: "Pulp Fiction" },
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    item: { id: 1, title: "Pulp Fiction" },
    isSelected: true,
  },
};

export const LongTitle: Story = {
  args: {
    item: { id: 1, title: "The Shawshank Redemption" },
    isSelected: false,
  },
};

export const VeryLongTitle: Story = {
  args: {
    item: { id: 1, title: "Eternal Sunshine of the Spotless Mind" },
    isSelected: false,
  },
};

export const VeryLongTitleSelected: Story = {
  args: {
    item: { id: 1, title: "Eternal Sunshine of the Spotless Mind" },
    isSelected: true,
  },
};

export const LongSingleWord: Story = {
  args: {
    item: { id: 1, title: "Supercalifragilisticexpialidocious" },
    isSelected: false,
  },
};

export const ShortTitle: Story = {
  args: {
    item: { id: 1, title: "Up" },
    isSelected: false,
  },
};

export const Shaking: Story = {
  args: {
    item: { id: 1, title: "Wrong Guess" },
    isSelected: true,
    isShaking: true,
  },
};

