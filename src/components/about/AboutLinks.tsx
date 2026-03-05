import {
  Box,
  Button,
  Heading,
  Icon,
} from "@mond-design-system/theme";
import { useSite } from "../../providers/useSite";
import { BookIcon } from "./icons/BookIcon";
import { PopcornIcon } from "./icons/PopcornIcon";
import { MusicIcon } from "./icons/MusicIcon";
import type { Genre } from "../../config/seoConfig";

interface AboutLinksProps {
  showHeading?: boolean;
}

interface GameLink {
  genre: Genre;
  url: string;
  label: string;
  icon: React.ReactNode;
}

const GAME_LINKS: GameLink[] = [
  {
    genre: "books",
    url: "https://litclues.space",
    label: "litclues.space",
    icon: <BookIcon />,
  },
  {
    genre: "films",
    url: "https://filmclues.space",
    label: "filmclues.space",
    icon: <PopcornIcon />,
  },
  {
    genre: "music",
    url: "https://musiclues.space",
    label: "musiclues.space",
    icon: <MusicIcon />,
  },
];

export function AboutLinks({ showHeading = true }: AboutLinksProps) {
  const { siteName, genre } = useSite();

  // Filter out the current site
  const otherGames = GAME_LINKS.filter((link) => link.genre !== genre);

  const content = (
    <Box display="flex" flexDirection="column" alignItems="center" gap="xs" paddingBottom="4" className="about-links">
      {showHeading && (
        <Heading size="xs" weight="semibold" responsive>
          {siteName} is part of the Puzzle Clues Suite of games which include:
        </Heading>
      )}
      <Box
        display="flex"
        gap="xxs"
        flexWrap="wrap"
        justifyContent="center"
      >
        {otherGames.map((link) => (
          <Button
            key={link.genre}
            size="sm"
            href={link.url}
            as="a"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon color="currentColor" size="md">
              {link.icon}
            </Icon>
            {link.label}
          </Button>
        ))}
      </Box>
    </Box>
  );

  if (showHeading) {
    return content;
  }

  return content;
}
