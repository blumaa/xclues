import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "./Container";

const meta: Meta<typeof Container> = {
  title: "Atoms/Container",
  component: Container,
};
export default meta;

type Story = StoryObj<typeof Container>;

export const Medium: Story = {
  args: { size: "md" },
  render: (args) => (
    <Container {...args}>
      <div
        style={{
          background: "var(--xclues-primary-10)",
          padding: "1rem",
          borderRadius: 6,
        }}
      >
        Centered, max-width content.
      </div>
    </Container>
  ),
};

export const Small: Story = {
  args: { size: "sm" },
  render: Medium.render,
};
