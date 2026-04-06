import { Link } from "react-router-dom";
import { useSite } from "../providers/useSite";
import { XText } from "./ui";
import "./Footer.css";

export function Footer() {
  const { siteName } = useSite();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <nav className="footer-content" aria-label="Footer navigation">
        <XText size="xs" semantic="secondary">
          &copy; {currentYear} {siteName}
        </XText>
        <span className="footer-separator" aria-hidden="true">|</span>
        <Link to="/about" className="footer-link">
          <XText size="xs" semantic="secondary">
            About
          </XText>
        </Link>
        <span className="footer-separator" aria-hidden="true">|</span>
        <Link to="/privacy" className="footer-link">
          <XText size="xs" semantic="secondary">
            Privacy
          </XText>
        </Link>
      </nav>
    </footer>
  );
}
