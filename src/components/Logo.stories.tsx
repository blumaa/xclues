import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "./Logo";
import { withNavProviders } from "../__mocks__/storyDecorators";

const meta: Meta<typeof Logo> = {
  title: "App/Header/Logo",
  component: Logo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    genre: { control: "select", options: ["films", "music", "books"] },
    static: { control: "boolean" },
  },
  decorators: [
    withNavProviders,
    (Story) => (
      <span className="app-header-logo" style={{ fontSize: "var(--xclues-font-size-xl)" }}>
        <Story />
      </span>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = { args: { static: true } };
export const Films: Story = { args: { genre: "films", static: true } };
export const Music: Story = { args: { genre: "music", static: true } };
export const Books: Story = { args: { genre: "books", static: true } };
export const AnimatedFilms: Story = { args: { genre: "films" } };
export const AnimatedMusic: Story = { args: { genre: "music" } };
export const AnimatedBooks: Story = { args: { genre: "books" } };
