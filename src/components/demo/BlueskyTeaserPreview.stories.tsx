import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BlueskyTeaserPreview,
  MOCK_FILMS_PUZZLE,
  MOCK_BOOKS_PUZZLE,
  MOCK_MUSIC_PUZZLE,
} from "./BlueskyTeaserPreview";

const meta: Meta<typeof BlueskyTeaserPreview> = {
  title: "Marketing/Bluesky Teaser Preview",
  component: BlueskyTeaserPreview,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BlueskyTeaserPreview>;

export const Filmclues: Story = {
  args: { genre: "films", puzzle: MOCK_FILMS_PUZZLE, seed: 105 },
};

export const Litclues: Story = {
  args: { genre: "books", puzzle: MOCK_BOOKS_PUZZLE, seed: 105 },
};

export const Musiclues: Story = {
  args: { genre: "music", puzzle: MOCK_MUSIC_PUZZLE, seed: 105 },
};
