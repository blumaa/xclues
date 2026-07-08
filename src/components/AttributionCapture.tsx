"use client";

import { useEffect } from "react";
import { captureAttribution } from "../services/analytics/attribution";

// Records the visitor's traffic source (from a ?ref= link param or the HTTP
// referrer) once per session, on first load. Renders nothing.
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution(window.location.search, document.referrer);
  }, []);

  return null;
}
