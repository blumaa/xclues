import { XDrawer, XDrawerHeader, XDrawerBody, XHeading, XSpinner, XText } from "../ui";
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
    <XDrawer isOpen={isOpen} onClose={onClose} width="lg">
      <XDrawerHeader onClose={onClose}>
        <XHeading level={3}>Submit a Puzzle</XHeading>
      </XDrawerHeader>
      <XDrawerBody>
        <div style={{ padding: "var(--xclues-spacing-4)" }}>
          {isSubmitting ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--xclues-spacing-md)",
                padding: "var(--xclues-spacing-4)",
              }}
            >
              <XSpinner size="lg" label="Submitting your puzzle..." />
              <XText semantic="secondary">Submitting your puzzle...</XText>
            </div>
          ) : (
            <PuzzleSubmitForm
              genre={genre}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </XDrawerBody>
    </XDrawer>
  );
}
