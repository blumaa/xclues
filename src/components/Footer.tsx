import { Text } from "@mond-design-system/theme";
import { Link } from "react-router-dom";
import { useSite } from "../providers/useSite";
import "./Footer.css";

export function Footer() {
  const { siteName } = useSite();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <nav className="footer-content" aria-label="Footer navigation">
        <Text size="xs" semantic="secondary">
          &copy; {currentYear} {siteName}
        </Text>
        <span className="footer-separator" aria-hidden="true">|</span>
        <Link to="/about" className="footer-link">
          <Text size="xs" semantic="secondary">
            About
          </Text>
        </Link>
        <span className="footer-separator" aria-hidden="true">|</span>
        <Link to="/privacy" className="footer-link">
          <Text size="xs" semantic="secondary">
            Privacy
          </Text>
        </Link>
      </nav>
    </footer>
  );
}
