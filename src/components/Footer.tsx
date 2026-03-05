import { Text, Link } from "@mond-design-system/theme";
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
        <Link href="/about" target="_blank" rel="noopener noreferrer">
          <Text size="xs" semantic="secondary">
            About
          </Text>
        </Link>
        <span className="footer-separator" aria-hidden="true">|</span>
        <Link href="/privacy" target="_blank" rel="noopener noreferrer">
          <Text size="xs" semantic="secondary">
            Privacy
          </Text>
        </Link>
      </nav>
    </footer>
  );
}
