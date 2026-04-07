"use client";

import Link from "next/link";
import { useSite } from "../providers/useSite";
import { AboutBody, AboutLinks } from "../components/about";
import { XButton, XHeading } from "../components/atoms";
import "./AboutPage.css";

export function AboutPage() {
  const context = useSite();
  const siteName = context?.siteName || "xClues";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--xclues-spacing-md, 1rem)', paddingRight: 'var(--xclues-spacing-4, 1rem)', paddingLeft: 'var(--xclues-spacing-4, 1rem)' }}>
      <XHeading level={1} size="xl" responsive>
        About {siteName}
      </XHeading>
...
      <AboutBody />
      <AboutLinks />

      <div style={{ paddingTop: 'var(--xclues-spacing-2, 0.5rem)' }}>
        <Link href="/" className="about-back-link">
          <XButton>Back to Game</XButton>
        </Link>
      </div>
    </div>
  );
}
