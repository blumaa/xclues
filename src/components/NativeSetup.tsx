"use client";

import { useEffect } from "react";
import { isNativePlatform } from "../lib/native";

export function NativeSetup() {
  useEffect(() => {
    if (!isNativePlatform()) return;
    let cancelled = false;

    async function setup() {
      // Loaded dynamically so the Capacitor plugin packages stay in lazy chunks
      // that the web build never fetches (only the native shell hits this path).
      const [{ SplashScreen }, { StatusBar, Style }, { ScreenOrientation }] =
        await Promise.all([
          import("@capacitor/splash-screen"),
          import("@capacitor/status-bar"),
          import("@capacitor/screen-orientation"),
        ]);
      if (cancelled) return;

      try {
        await ScreenOrientation.lock({ orientation: "portrait" });
      } catch {
        // Not supported on all devices (e.g. iPad)
      }
      try {
        await StatusBar.setStyle({ style: Style.Dark });
      } catch {
        // StatusBar may not be available
      }
      try {
        await SplashScreen.hide();
      } catch {
        // May already be dismissed
      }
    }
    setup();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
