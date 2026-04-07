import type { Meta, StoryObj } from "@storybook/react-vite";
import { GroupCard } from "./GroupCard";
import type { Group } from "../../types";

const meta: Meta<typeof GroupCard> = {
  title: "Game/GroupCard",
  component: GroupCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GroupCard>;

const makeGroup = (color: string, connection: string, titles: string[]): Group => ({
  id: `group-${color}`,
  connection,
  difficulty: color === "yellow" ? "easy" : color === "green" ? "medium" : color === "blue" ? "hard" : "hardest",
  color: color as Group["color"],
  items: titles.map((title, i) => ({ id: i, title })),
});

export const Yellow: Story = {
  args: {
    group: makeGroup("yellow", "Directed by Spielberg", ["Jaws", "E.T.", "Schindler's List", "Jurassic Park"]),
  },
};

export const Green: Story = {
  args: {
    group: makeGroup("green", "Songs about dancing", ["Footloose", "Dancing Queen", "Let's Dance", "Thriller"]),
  },
};

export const Blue: Story = {
  args: {
    group: makeGroup("blue", "Books with a number in the title", ["1984", "Catch-22", "Fahrenheit 451", "Slaughterhouse-Five"]),
  },
};

export const Purple: Story = {
  args: {
    group: makeGroup("purple", "Hidden word: CAT", ["Caterpillar", "Scatter", "Education", "Vacation"]),
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 400 }}>
      <GroupCard group={makeGroup("yellow", "Directed by Spielberg", ["Jaws", "E.T.", "Schindler's List", "Jurassic Park"])} />
      <GroupCard group={makeGroup("green", "Songs about dancing", ["Footloose", "Dancing Queen", "Let's Dance", "Thriller"])} />
      <GroupCard group={makeGroup("blue", "90s one-hit wonders", ["Macarena", "Tubthumping", "Blue", "MMMBop"])} />
      <GroupCard group={makeGroup("purple", "Hidden word: CAT", ["Caterpillar", "Scatter", "Education", "Vacation"])} />
    </div>
  ),
};
