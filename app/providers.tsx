"use client";

import { ThemeContextProvider } from "../src/providers/ThemeContext";
import { SiteProvider } from "../src/providers/SiteProvider";
import { ToastProvider } from "../src/providers/ToastProvider";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteProvider>
      <ThemeContextProvider>
        <ToastProvider>{children}</ToastProvider>
      </ThemeContextProvider>
    </SiteProvider>
  );
}
