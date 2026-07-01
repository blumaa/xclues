"use client";

import { useEffect } from "react";
import { XButton, XHeading, XText } from "../../src/components/atoms";
import "../simple-page.css";

/**
 * Genre-scoped error boundary. Keeps the app shell (header, footer, genre
 * switch) intact and only replaces the puzzle area when a genre page throws,
 * so the user can retry or switch genres without a full-page error.
 */
export default function GenreError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Genre route error boundary caught:", error);
  }, [error]);

  return (
    <div className="simple-page simple-page--narrow">
      <XHeading level={1}>Couldn&apos;t load this puzzle</XHeading>
      <XText>
        Something went wrong loading today&apos;s puzzle. Try again, or switch to
        another genre.
      </XText>
      <XButton variant="primary" onClick={reset}>
        Try again
      </XButton>
    </div>
  );
}
