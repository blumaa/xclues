import Link from "next/link";
import { XText } from "../atoms";
import "./Footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <nav className="footer-content" aria-label="Footer navigation">
        <XText size="xs" semantic="secondary">
          &copy; {currentYear} xClues
        </XText>
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
