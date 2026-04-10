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
    <div className="about-page">
      <XHeading level={1} size="xl" responsive>
        About {siteName}
      </XHeading>
      <AboutBody />
      <AboutLinks />

      <div className="about-back-link-wrapper">
        <Link href="/" className="about-back-link">
          <XButton>Back to Game</XButton>
        </Link>
      </div>
    </div>
  );
}
