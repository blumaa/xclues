import { XCard, XCardBody, XText, XHeading, XButton } from "../atoms";
import Link from "next/link";
import { useSite } from "../../providers/useSite";
import "./AboutBody.css";

export function AboutBody() {
  const context = useSite();
  const siteName = context?.siteName || "xClues";
  const siteDescription = context?.siteDescription || "connections puzzle";
  const itemNamePlural = context?.itemNamePlural || "items";

  return (
    <XCard variant="elevated">
      <XCardBody>
        <div className="about-body-content">
          <XText size="sm">
            {siteName} is a {siteDescription}. Find the hidden connections
            between {itemNamePlural}!
          </XText>

          <div className="about-body-design-link">
            <XText size="sm">Built with the</XText>
            <Link href="https://github.com/blumaa/mond-design-system" className="no-dec" target="_blank">
              Mond Design System
            </Link>
          </div>

          <div>
            <XHeading level={4} size="md" weight="semibold" responsive>
              Questions, feedback, or just want to say hi?
            </XHeading>
          </div>
          <div className="email-button">
            <a href="mailto:blumaa@gmail.com">
              <XButton variant="outline" size="sm">
                blumaa@gmail.com
              </XButton>
            </a>
          </div>
        </div>
      </XCardBody>
    </XCard>
  );
}
