import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "../providers/ThemeContext";
import { StorageProvider } from "../providers/StorageProvider";
import { StatsProvider } from "../providers/StatsProvider";
import { SiteProvider } from "../providers/SiteProvider";
import { ToastProvider } from "../providers/ToastProvider";
import { puzzleKeys } from "../lib/supabase/storage";
import { mockPuzzle } from "./puzzleData";
import type { Decorator } from "@storybook/react-vite";

function createMockQueryClient() {
  const today = new Date().toISOString().split("T")[0];
  const client = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity, retry: false } },
  });
  client.setQueryData(puzzleKeys.daily(today, "films"), mockPuzzle);
  return client;
}

/** Full app provider stack — use for stories that render complete app sections */
export const withProviders: Decorator = (Story) => {
  const queryClient = createMockQueryClient();
  return (
    <SiteProvider>
      <QueryClientProvider client={queryClient}>
        <StorageProvider>
          <StatsProvider>
            <ThemeContextProvider>
              <ToastProvider>
                <BrowserRouter>
                  <Story />
                </BrowserRouter>
              </ToastProvider>
            </ThemeContextProvider>
          </StatsProvider>
        </StorageProvider>
      </QueryClientProvider>
    </SiteProvider>
  );
};

/** Minimal providers for components that only need routing + site config */
export const withSiteAndRouter: Decorator = (Story) => (
  <SiteProvider>
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  </SiteProvider>
);

/** Theme context only — for components that call useThemeContext */
export const withTheme: Decorator = (Story) => (
  <ThemeContextProvider>
    <Story />
  </ThemeContextProvider>
);

/** Theme + site + router — for header/nav components */
export const withNavProviders: Decorator = (Story) => (
  <SiteProvider>
    <ThemeContextProvider>
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    </ThemeContextProvider>
  </SiteProvider>
);
