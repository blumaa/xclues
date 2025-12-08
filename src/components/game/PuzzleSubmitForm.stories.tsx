import type { Meta, StoryObj } from "@storybook/react-vite";
import { PuzzleSubmitForm } from "./PuzzleSubmitForm";

const meta: Meta<typeof PuzzleSubmitForm> = {
  title: "Game/PuzzleSubmitForm",
  component: PuzzleSubmitForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "500px", maxHeight: "80vh", overflow: "auto" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onSubmit: { action: "submit" },
    genre: {
      control: { type: "select" },
      options: ["films", "music", "sports", "books"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PuzzleSubmitForm>;

export const Default: Story = {
  args: {
    genre: "films",
    isSubmitting: false,
  },
};

export const MusicGenre: Story = {
  args: {
    genre: "music",
    isSubmitting: false,
  },
};

export const Submitting: Story = {
  args: {
    genre: "films",
    isSubmitting: true,
  },
};
