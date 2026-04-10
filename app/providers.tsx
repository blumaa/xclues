"use client";

import { ThemeContextProvider } from "../src/providers/ThemeContext";
import { AuthProvider } from "../src/providers/AuthProvider";
import { StorageProvider } from "../src/providers/StorageProvider";
import { SiteProvider } from "../src/providers/SiteProvider";
import { ToastProvider } from "../src/providers/ToastProvider";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteProvider>
      <AuthProvider>
        <StorageProvider>
          <ThemeContextProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </ThemeContextProvider>
        </StorageProvider>
      </AuthProvider>
    </SiteProvider>
  );
}
