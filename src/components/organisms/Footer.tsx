"use client";

import Link from "next/link";
import { XText } from "../atoms";
import { useAppStore } from "../../store/appStore";
import type { Genre } from "../../config/seoConfig";
import "./Footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear();
  // Archive is per-genre; use the active genre (same SSOT as the header) so the
  // link resolves for whichever domain/genre the user is on.
  const genre = useAppStore((s) => s.activeGenre) as Genre;

  return (
    <footer className="footer" role="contentinfo">
      <nav className="footer-content" aria-label="Footer navigation">
        <XText size="xs" semantic="secondary">
          &copy; {currentYear} xClues
        </XText>
        <span className="footer-separator" aria-hidden="true">|</span>
        <Link href={`/${genre}/archive`} className="footer-link">
          <XText size="xs" semantic="secondary">
            Archive
          </XText>
        </Link>
        <span className="footer-separator" aria-hidden="true">|</span>
        <Link href="/how-to-play" className="footer-link">
          <XText size="xs" semantic="secondary">
            How to Play
          </XText>
        </Link>
        <span className="footer-separator" aria-hidden="true">|</span>
        <Link href="/about" className="footer-link">
          <XText size="xs" semantic="secondary">
            About
          </XText>
        </Link>
        <span className="footer-separator" aria-hidden="true">|</span>
        <Link href="/privacy" className="footer-link">
          <XText size="xs" semantic="secondary">
            Privacy
          </XText>
        </Link>
      </nav>
    </footer>
  );
}
