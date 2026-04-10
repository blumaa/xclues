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
          We use Amplitude, a third-party analytics service, to understand how people use {siteName}.
          This helps us improve the game. Amplitude automatically collects:
        </XText>
        <ul className="privacy-list">
          <li><XText size="sm">Device type and browser information</XText></li>
          <li><XText size="sm">General location (country/region, not precise location)</XText></li>
          <li><XText size="sm">Game interactions (games played, wins, streaks)</XText></li>
          <li><XText size="sm">Anonymous usage patterns</XText></li>
        </ul>

        <div className="privacy-section-heading">
          <XText size="md" weight="semibold">
            What We Don't Collect
          </XText>
        </div>
        <ul className="privacy-list">
          <li><XText size="sm">Your name or email (unless you contact us)</XText></li>
          <li><XText size="sm">Precise location data</XText></li>
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
            Third-Party Services
          </XText>
        </div>
        <XText size="sm">
          We use <a href="https://amplitude.com/privacy" target="_blank" rel="noopener noreferrer">Amplitude</a> for
          analytics. Their privacy policy explains how they handle data.
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
