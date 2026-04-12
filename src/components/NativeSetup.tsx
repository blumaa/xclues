"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";
import { ScreenOrientation } from "@capacitor/screen-orientation";

export function NativeSetup() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    async function setup() {
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
  }, []);

  return null;
}
