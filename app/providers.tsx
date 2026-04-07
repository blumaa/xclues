"use client";

import { QueryClient, QueryClientProvider, HydrationBoundary, type DehydratedState } from "@tanstack/react-query";
import { ThemeContextProvider } from "../src/providers/ThemeContext";
import { AuthProvider } from "../src/providers/AuthProvider";
import { StorageProvider } from "../src/providers/StorageProvider";
import { StatsProvider } from "../src/providers/StatsProvider";
import { SiteProvider } from "../src/providers/SiteProvider";
import { ToastProvider } from "../src/providers/ToastProvider";
import { BRAND_THEMES, applyThemeTokens } from "../src/themes";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}) {
  // Apply theme tokens on mount
  useEffect(() => {
    if (typeof window === "undefined" || !window.localStorage || !document.documentElement) return;
    const savedBrand = window.localStorage.getItem("xclues-brand-theme") || "claude";
    const savedTheme = document.documentElement.getAttribute("data-theme") || "light";
    const brandDef = BRAND_THEMES[savedBrand] || BRAND_THEMES["claude"];
    applyThemeTokens(savedTheme === "dark" ? brandDef.dark : brandDef.light);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <SiteProvider>
          <AuthProvider>
            <StorageProvider>
              <StatsProvider>
                <ThemeContextProvider>
                  <ToastProvider>
                    {children}
                  </ToastProvider>
                </ThemeContextProvider>
              </StatsProvider>
            </StorageProvider>
          </AuthProvider>
        </SiteProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
