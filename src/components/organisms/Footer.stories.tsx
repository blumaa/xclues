import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "./Footer";
import { withNavProviders } from "../../__mocks__/storyDecorators";

const meta: Meta<typeof Footer> = {
  title: "App/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    withNavProviders,
    (Story) => (
      <div style={{ minHeight: "200px", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }} />
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
