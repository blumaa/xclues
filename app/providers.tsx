"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContextProvider } from "../src/providers/ThemeContext";
import { AuthProvider } from "../src/providers/AuthProvider";
import { StorageProvider } from "../src/providers/StorageProvider";
import { StatsProvider } from "../src/providers/StatsProvider";
import { SiteProvider } from "../src/providers/SiteProvider";
import { ToastProvider } from "../src/providers/ToastProvider";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
