import type { Meta, StoryObj } from "@storybook/react-vite";
import { GenreSwitch } from "./GenreSwitch";
import { withNavProviders } from "../../__mocks__/storyDecorators";

const meta: Meta<typeof GenreSwitch> = {
  title: "App/Header/GenreSwitch",
  component: GenreSwitch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [withNavProviders],
};

export default meta;
type Story = StoryObj<typeof GenreSwitch>;

export const FilmsActive: Story = {};
