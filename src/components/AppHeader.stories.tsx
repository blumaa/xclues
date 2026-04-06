import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { GenreSwitch } from "./GenreSwitch";
import { HowToPlayButton } from "./HowToPlayModal";
import { ThemeToggle } from "./ThemeToggle";
import { useSite } from "../providers/useSite";
import { withNavProviders } from "../__mocks__/storyDecorators";
import "../App.css";

function AppHeader() {
  const { genre } = useSite();
  return (
    <header className="app-header">
      <Link to="/" className="app-header-brand" aria-label="xclues home">
        <span className="app-header-logo"><Logo genre={genre} /></span>
      </Link>
      <GenreSwitch />
      <div className="app-header-actions">
        <HowToPlayButton />
        <ThemeToggle />
      </div>
    </header>
  );
}

const meta: Meta<typeof AppHeader> = {
  title: "App/Header/AppHeader",
  component: AppHeader,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [withNavProviders],
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

export const Default: Story = {};
