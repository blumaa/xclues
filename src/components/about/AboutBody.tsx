import { XCard, XCardBody, XText, XHeading, XButton } from "../ui";
import { useSite } from "../../providers/useSite";

export function AboutBody() {
  const { siteName, siteDescription, itemNamePlural } = useSite();

  return (
    <XCard variant="elevated">
      <XCardBody>
        <div style={{ display: "flex", gap: "var(--xclues-spacing-md)", flexDirection: "column" }}>
          <XText size="sm">
            {siteName} is a {siteDescription}. Find the hidden connections
            between {itemNamePlural}!
          </XText>

          <div style={{ gap: "0.25rem", display: "flex", alignItems: "center" }}>
            <XText size="sm">Built with the</XText>
            <a
              href="https://github.com/blumaa/mond-design-system"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mond Design System
            </a>
          </div>

          <div>
            <XHeading level={4} size="md" weight="semibold" responsive>
              Questions, feedback, or just want to say hi?
            </XHeading>
          </div>
          <div>
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
