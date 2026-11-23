"use client";

import { useEffect, useState } from "react";
import { Logo } from "./organisms/Logo";
import "./AppSplash.css";

/** Splash only when launched as an installed PWA, never in a browser tab. */
function shouldShowSplash(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches;
}

export function AppSplash() {
  const [show] = useState(shouldShowSplash);
  const [fadeOut, setFadeOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!show) return;
    // Logo animation is 1.8s — wait for it to settle, then fade out
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    return () => clearTimeout(fadeTimer);
  }, [show]);

  useEffect(() => {
    if (!fadeOut) return;
    const removeTimer = setTimeout(() => setRemoved(true), 500);
    return () => clearTimeout(removeTimer);
  }, [fadeOut]);

  if (!show || removed) return null;

  return (
    <div
      className={`app-splash${fadeOut ? " app-splash--fade-out" : ""}`}
      aria-hidden="true"
    >
      <Logo />
    </div>
  );
}
