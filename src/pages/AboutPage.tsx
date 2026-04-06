import { Link as RouterLink } from "react-router-dom";
import { useSite } from "../providers/useSite";
import { AboutBody, AboutLinks } from "../components/about";
import { XButton, XHeading } from "../components/ui";
import "./AboutPage.css";

export function AboutPage() {
  const { siteName } = useSite();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--xclues-spacing-md, 1rem)', paddingRight: 'var(--xclues-spacing-4, 1rem)', paddingLeft: 'var(--xclues-spacing-4, 1rem)' }}>
      <XHeading level={1} size="xl" responsive>
        About {siteName}
      </XHeading>

      <AboutBody />
      <AboutLinks />

      <div style={{ paddingTop: 'var(--xclues-spacing-2, 0.5rem)' }}>
        <RouterLink to="/" className="about-back-link">
          <XButton>Back to Game</XButton>
        </RouterLink>
      </div>
    </div>
  );
}
