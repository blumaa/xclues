import { Box, Text, Link, Button, Card, CardBody, Heading } from "@mond-design-system/theme";
import { useSite } from "../../providers/useSite";

export function AboutBody() {
  const { siteName, siteDescription, itemNamePlural } = useSite();

  return (
    <Card variant="elevated" maxWidth="lg">
      <CardBody>
        <Box display="flex" gap="md" flexDirection="column">
          <Text size="sm">
            {siteName} is a {siteDescription}. Find the hidden connections
            between {itemNamePlural}!
          </Text>

          <Box gap="xxs" display="flex" alignItems="center">
            <Text size="sm">Built with the</Text>
            <Link
              size="small"
              href="https://github.com/blumaa/mond-design-system"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mond Design System
            </Link>
          </Box>

          <Box>
            <Heading size="md" weight="semibold" responsive>
              Questions, feedback, or just want to say hi?
            </Heading>
          </Box>
          <Box>
            <Button
              variant="outline"
              size="sm"
              as="a"
              href="mailto:blumaa@gmail.com"
            >
              blumaa@gmail.com
            </Button>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
}
