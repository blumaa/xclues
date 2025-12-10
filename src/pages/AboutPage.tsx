import { Box, Button, Heading } from "@mond-design-system/theme";
import { Link as RouterLink } from "react-router-dom";
import { useSite } from "../providers/useSite";
import { AboutBody, AboutLinks } from "../components/about";
import "./AboutPage.css";

export function AboutPage() {
  const { siteName } = useSite();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="md"
      paddingRight="4"
      paddingLeft="4"
    >
      <Heading size="xl" responsive>
        About {siteName}
      </Heading>

      <AboutBody />
      <AboutLinks />

      <Box paddingTop="2">
        <RouterLink to="/" className="about-back-link">
          <Button>Back to Game</Button>
        </RouterLink>
      </Box>
    </Box>
  );
}
