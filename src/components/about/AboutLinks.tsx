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
import { Capacitor } from "@capacitor/core";
import type { Genre } from "../../config/seoConfig";

interface AboutLinksProps {
  showHeading?: boolean;
}

interface GameLink {
  genre: Genre;
  domain: string;
  label: string;
  icon: React.ReactNode;
}

const GAME_LINKS: GameLink[] = [
  {
    genre: "films",
    domain: "filmclues.space",
    label: "filmclues.space",
    icon: <PopcornIcon />,
  },
  {
    genre: "books",
    domain: "litclues.space",
    label: "litclues.space",
    icon: <BookIcon />,
  },
  {
    genre: "music",
    domain: "musiclues.space",
    label: "musiclues.space",
    icon: <MusicIcon />,
  },
];


export function AboutLinks({ showHeading = true }: AboutLinksProps) {
  const { siteName, genre: activeGenre, setGenre } = useSite();

  const isNative = Capacitor.isNativePlatform();

  const handleClick = (genre: Genre) => {
    if (genre === activeGenre) return;
    localStorage.setItem("xclues-dev-genre", genre);
    setGenre(genre);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="xs" paddingBottom="4" className="about-links">
      {showHeading && (
        <Heading size="xs" weight="semibold" responsive>
          {siteName} is part of the Puzzle Clues Suite of games:
        </Heading>
      )}
      <Box
        display="flex"
        gap="xxs"
        flexWrap="wrap"
        justifyContent="center"
      >
        {GAME_LINKS.map((link) => {
          if (isNative) {
            return (
              <Button
                key={link.genre}
                size="sm"
                variant={link.genre === activeGenre ? "primary" : "outline"}
                onClick={() => handleClick(link.genre)}
              >
                <Icon color="currentColor" size="md">
                  {link.icon}
                </Icon>
                {link.label}
              </Button>
            );
          }

          return (
            <Button
              key={link.genre}
              size="sm"
              variant={link.genre === activeGenre ? "primary" : "outline"}
              as="a"
              href={`https://${link.domain}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon color="currentColor" size="md">
                {link.icon}
              </Icon>
              {link.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
