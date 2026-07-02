import type { Meta, StoryObj } from "@storybook/react-vite";
import { PuzzleReveal } from "./PuzzleReveal";
import { Breadcrumbs } from "../molecules/Breadcrumbs";
import { ArchiveDateNav } from "../molecules/ArchiveDateNav";
import { Footer } from "./Footer";
import { Header } from "../../../app/header";
import { mockPuzzle } from "../../__mocks__/puzzleData";
import { withNavProviders } from "../../__mocks__/storyDecorators";
import "../../../app/[genre]/archive/[date]/archive-date.css";

const meta: Meta<typeof PuzzleReveal> = {
  title: "Archive/PuzzleReveal",
  component: PuzzleReveal,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PuzzleReveal>;

export const Default: Story = {
  args: {
    puzzle: mockPuzzle,
    genre: "films",
    date: "2026-07-01",
  },
};

export const Mobile: Story = {
  args: {
    puzzle: mockPuzzle,
    genre: "films",
    date: "2026-07-01",
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
};

/* Full archive-date page composition (breadcrumbs + board + date nav + sticky
   footer) — mirrors app/[genre]/archive/[date]/page.tsx so mobile fit is
   reviewable in Storybook. */
export const FullPageMobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile" },
    layout: "fullscreen",
  },
  decorators: [withNavProviders],
  render: () => (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <div className="archive-date">
          <Breadcrumbs
            items={[
              { label: "Filmclues", href: "/" },
              { label: "Archive", href: "/films/archive" },
              { label: "July 1, 2026" },
            ]}
          />
          <PuzzleReveal puzzle={mockPuzzle} genre="films" date="2026-07-01" />
          <ArchiveDateNav genre="films" older="2026-06-30" newer="2026-07-02" />
        </div>
      </main>
      <Footer />
    </div>
  ),
};
