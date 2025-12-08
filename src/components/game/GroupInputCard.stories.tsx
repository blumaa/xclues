import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { GroupInputCard, type GroupInputValue } from "./GroupInputCard";

const meta: Meta<typeof GroupInputCard> = {
  title: "Game/GroupInputCard",
  component: GroupInputCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GroupInputCard>;

// Wrapper to make the component controlled
function ControlledGroupInputCard(props: Omit<React.ComponentProps<typeof GroupInputCard>, "onChange">) {
  const [value, setValue] = useState<GroupInputValue>(props.value);
  return <GroupInputCard {...props} value={value} onChange={setValue} />;
}

export const Yellow: Story = {
  render: () => (
    <ControlledGroupInputCard
      color="yellow"
      value={{
        items: ["", "", "", ""],
        connection: "",
      }}
    />
  ),
};

export const Green: Story = {
  render: () => (
    <ControlledGroupInputCard
      color="green"
      value={{
        items: ["", "", "", ""],
        connection: "",
      }}
    />
  ),
};

export const Blue: Story = {
  render: () => (
    <ControlledGroupInputCard
      color="blue"
      value={{
        items: ["", "", "", ""],
        connection: "",
      }}
    />
  ),
};

export const Purple: Story = {
  render: () => (
    <ControlledGroupInputCard
      color="purple"
      value={{
        items: ["", "", "", ""],
        connection: "",
      }}
    />
  ),
};

export const FilledOut: Story = {
  render: () => (
    <ControlledGroupInputCard
      color="yellow"
      value={{
        items: ["Jaws", "E.T.", "Jurassic Park", "Schindler's List"],
        connection: "Directed by Steven Spielberg",
      }}
    />
  ),
};
