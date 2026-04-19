"use client";

import Link from "next/link";
import { useSite } from "../providers/useSite";
import { XText, XHeading } from "../components/atoms";
import "./PrivacyPage.css";

export function PrivacyPage() {
  const context = useSite();
  const siteName = context?.siteName || "xClues";

  return (
    <div className="privacy-page">
      <XHeading level={1} responsive>
        Privacy Policy
      </XHeading>

      <div className="privacy-content">
        <XText size="md" weight="semibold">
          What We Collect
        </XText>
        <XText size="sm">
          To understand how people use {siteName} and improve the game, we record a minimal anonymous event each time a game is started, won, or lost:
        </XText>
        <ul className="privacy-list">
          <li><XText size="sm">Event type (started, won, or lost)</XText></li>
          <li><XText size="sm">Genre of the puzzle (films, music, books)</XText></li>
          <li><XText size="sm">Date of the puzzle</XText></li>
          <li><XText size="sm">Timestamp</XText></li>
        </ul>

        <div className="privacy-section-heading">
          <XText size="md" weight="semibold">
            What We Don't Collect
          </XText>
        </div>
        <ul className="privacy-list">
          <li><XText size="sm">Your name or email (unless you contact us or sign up)</XText></li>
          <li><XText size="sm">Your location</XText></li>
          <li><XText size="sm">Device fingerprints or tracking identifiers</XText></li>
          <li><XText size="sm">Any information you don't voluntarily provide</XText></li>
        </ul>

        <div className="privacy-section-heading">
          <XText size="md" weight="semibold">
            Local Storage
          </XText>
        </div>
        <XText size="sm">
          Your game progress and statistics are stored locally in your browser.
          This data never leaves your device unless you choose to share it.
        </XText>

        <div className="privacy-section-heading">
          <XText size="md" weight="semibold">
            Where Events Are Stored
          </XText>
        </div>
        <XText size="sm">
          Events are stored in our own Supabase database. We do not share this data with third-party analytics services.
        </XText>

        <div className="privacy-section-heading">
          <XText size="md" weight="semibold">
            Your Rights
          </XText>
        </div>
        <XText size="sm">
          Analytics data is anonymized and cannot be traced back to you personally.
          If you have questions or concerns, contact us at{" "}
          <a href="mailto:blumaa@gmail.com">blumaa@gmail.com</a>.
        </XText>

        <div className="privacy-section-heading">
          <XText size="md" weight="semibold">
            Changes
          </XText>
        </div>
        <XText size="sm">
          We may update this policy occasionally. Check back for the latest version.
        </XText>
      </div>

      <div className="privacy-back-link-wrapper">
        <Link href="/" className="privacy-back-link">
          <XText size="sm" semantic="primary">
            Back to Game
          </XText>
        </Link>
      </div>
    </div>
  );
}
