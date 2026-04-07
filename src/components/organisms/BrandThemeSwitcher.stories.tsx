import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrandThemeSwitcher } from "./BrandThemeSwitcher";
import { withNavProviders } from "../../__mocks__/storyDecorators";

const meta: Meta<typeof BrandThemeSwitcher> = {
  title: "App/Header/BrandThemeSwitcher",
  component: BrandThemeSwitcher,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [withNavProviders],
};

export default meta;
type Story = StoryObj<typeof BrandThemeSwitcher>;

export const Default: Story = {};
