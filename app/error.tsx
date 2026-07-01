"use client";

import { useEffect } from "react";
import { XButton, XHeading, XText } from "../src/components/atoms";
import "./simple-page.css";

/**
 * Route-segment error boundary. Catches render/runtime errors thrown by any
 * page in the app and shows a recoverable fallback instead of a blank screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error boundary caught:", error);
  }, [error]);

  return (
    <div className="simple-page simple-page--narrow">
      <XHeading level={1}>Something went wrong</XHeading>
      <XText>
        An unexpected error occurred. You can try again, or come back in a
        moment.
      </XText>
      <XButton variant="primary" onClick={reset}>
        Try again
      </XButton>
    </div>
  );
}
