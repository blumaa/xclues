import { XButton, XIcon } from "../atoms";
import { useSite } from "../../providers/useSite";
import { BookIcon } from "./icons/BookIcon";
import { PopcornIcon } from "./icons/PopcornIcon";
import { MusicIcon } from "./icons/MusicIcon";
import { Capacitor } from "@capacitor/core";
import type { Genre } from "../../config/seoConfig";
import "./AboutLinks.css";


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


export function AboutLinks() {
  const context = useSite();
  const activeGenre = context?.genre || "films";

  const isNative = Capacitor.isNativePlatform();

  return (
    <div className="about-links">
      <div className="about-links-list">
        {GAME_LINKS.map((link) => (
          <a
            key={link.genre}
            href={isNative ? `/${link.genre}` : `https://${link.domain}`}
            target={isNative ? undefined : "_blank"}
            rel={isNative ? undefined : "noopener noreferrer"}
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
        ))}
      </div>
    </div>
  );
}
