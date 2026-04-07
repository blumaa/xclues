import type { Meta, StoryObj } from "@storybook/react-vite";
import { XCard, XCardBody } from "./XCard";
import { XText } from "./XText";

const meta: Meta<typeof XCard> = {
  title: "UI/XCard",
  component: XCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "elevated"] },
    aspectRatio: { control: "select", options: ["auto", "square", "4/1"] },
    isSelected: { control: "boolean" },
    shake: { control: "boolean" },
    jump: { control: "boolean" },
    hoverable: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof XCard>;

export const Default: Story = {
  args: {
    variant: "elevated",
    style: { width: 200 },
    children: <XCardBody><XText>Card content</XText></XCardBody>,
  },
};

export const Square: Story = {
  args: {
    variant: "elevated",
    aspectRatio: "square",
    hoverable: true,
    style: { width: 120 },
    children: <XCardBody><XText align="center">Tile</XText></XCardBody>,
  },
};

export const Selected: Story = {
  args: {
    variant: "elevated",
    aspectRatio: "square",
    isSelected: true,
    style: { width: 120 },
    children: <XCardBody><XText align="center">Selected</XText></XCardBody>,
  },
};

export const TileGrid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 100px)", gap: 12 }}>
      {Array.from({ length: 16 }, (_, i) => (
        <XCard key={i} variant="elevated" aspectRatio="square" hoverable>
          <XCardBody>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <XText align="center" size="sm">Item {i + 1}</XText>
            </div>
          </XCardBody>
        </XCard>
      ))}
    </div>
  ),
};

