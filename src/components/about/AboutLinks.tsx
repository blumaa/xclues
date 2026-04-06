import { XButton, XHeading, XIcon } from "../ui";
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--xclues-spacing-xs)", paddingBottom: "var(--xclues-spacing-4)" }} className="about-links">
      {showHeading && (
        <XHeading level={4} size="xs" weight="semibold" responsive>
          {siteName} is part of the Puzzle Clues Suite of games:
        </XHeading>
      )}
      <div
        style={{
          display: "flex",
          gap: "0.25rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {GAME_LINKS.map((link) => {
          if (isNative) {
            return (
              <XButton
                key={link.genre}
                size="sm"
                variant={link.genre === activeGenre ? "primary" : "outline"}
                onClick={() => handleClick(link.genre)}
              >
                <XIcon color="currentColor" size="md">
                  {link.icon}
                </XIcon>
                {link.label}
              </XButton>
            );
          }

          return (
            <a
              key={link.genre}
              href={`https://${link.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <XButton
                size="sm"
                variant={link.genre === activeGenre ? "primary" : "outline"}
              >
                <XIcon color="currentColor" size="md">
                  {link.icon}
                </XIcon>
                {link.label}
              </XButton>
            </a>
          );
        })}
      </div>
    </div>
  );
}
