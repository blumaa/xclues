import { Box, Heading, Spinner, Text } from "@mond-design-system/theme";
import { Drawer, DrawerHeader, DrawerBody } from "@mond-design-system/theme/client";
import { PuzzleSubmitForm, type PuzzleSubmission } from "./PuzzleSubmitForm";
import { useSite } from "../../providers/useSite";

interface PuzzleSubmitDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submission: PuzzleSubmission) => Promise<void>;
  isSubmitting?: boolean;
}

export function PuzzleSubmitDrawer({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: PuzzleSubmitDrawerProps) {
  const { genre } = useSite();

  const handleSubmit = async (submission: PuzzleSubmission) => {
    await onSubmit(submission);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} width="lg">
      <DrawerHeader onClose={onClose}>
        <Heading level={3}>Submit a Puzzle</Heading>
      </DrawerHeader>
      <DrawerBody>
        <Box padding="4">
          {isSubmitting ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="md"
              padding="4"
            >
              <Spinner size="lg" label="Submitting your puzzle..." />
              <Text semantic="secondary">Submitting your puzzle...</Text>
            </Box>
          ) : (
            <PuzzleSubmitForm
              genre={genre}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </Box>
      </DrawerBody>
    </Drawer>
  );
}
