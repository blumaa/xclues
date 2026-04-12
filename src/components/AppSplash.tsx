"use client";

import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { Logo } from "./organisms/Logo";
import "./AppSplash.css";

function shouldShowSplash(): boolean {
  if (typeof window === "undefined") return false;
  if (Capacitor.isNativePlatform()) return true;
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  return false;
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
