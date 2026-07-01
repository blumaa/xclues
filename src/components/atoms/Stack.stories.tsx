import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "./Stack";

const meta: Meta<typeof Stack> = {
  title: "Atoms/Stack",
  component: Stack,
};
export default meta;

type Story = StoryObj<typeof Stack>;

function Box({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--xclues-primary-10)",
        padding: "0.5rem 1rem",
        borderRadius: 6,
      }}
    >
      {children}
    </div>
  );
}

const items = (
  <>
    <Box>One</Box>
    <Box>Two</Box>
    <Box>Three</Box>
  </>
);

export const Column: Story = {
  args: { direction: "column", gap: 4 },
  render: (args) => <Stack {...args}>{items}</Stack>,
};

export const Row: Story = {
  args: { direction: "row", gap: 2 },
  render: (args) => <Stack {...args}>{items}</Stack>,
};
