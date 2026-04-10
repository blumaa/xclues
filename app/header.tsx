"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Logo } from "../src/components/organisms/Logo";
import { GenreSwitch } from "../src/components/organisms/GenreSwitch";
import { ThemeToggle } from "../src/components/molecules/ThemeToggle";
import type { Genre } from "../src/config/seoConfig";

export function Header() {
  const params = useParams();
  const genre = (params?.genre as Genre) || "films";

  return (
    <header className="app-header">
      <Link href="/" className="app-header-brand" aria-label="xClues home">
        <span className="app-header-logo">
          <Logo genre={genre} />
        </span>
      </Link>
      <GenreSwitch />
      <div className="app-header-actions">
        <Link href="/how-to-play" className="xbtn xbtn--ghost xbtn--md xbtn--icon-only" aria-label="How to play">
          <span aria-hidden="true">?</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
