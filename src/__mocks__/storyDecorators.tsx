/**
 * Storybook Decorators for Next.js App
 *
 * Provides mock providers for stories that need routing or app context.
 */

import { createElement, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SiteProvider } from '../providers/SiteProvider';
import { ThemeContextProvider } from '../providers/ThemeContext';
import { ToastProvider } from '../providers/ToastProvider';
import { StatsProvider } from '../providers/StatsProvider';
import { StorageProvider } from '../providers/StorageProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

/**
 * Basic providers for components that need site context and theme
 */
export function withNavProviders(Story: () => ReactNode) {
  return createElement(
    QueryClientProvider,
    { client: queryClient },
    createElement(
      SiteProvider,
      null,
      createElement(
        ThemeContextProvider,
        null,
        createElement(ToastProvider, null, createElement(Story))
      )
    )
  );
}

/**
 * Full provider stack for game components
 */
export function withProviders(Story: () => ReactNode) {
  return createElement(
    QueryClientProvider,
    { client: queryClient },
    createElement(
      SiteProvider,
      null,
      createElement(
        StorageProvider,
        null,
        createElement(
          StatsProvider,
          null,
          createElement(
            ThemeContextProvider,
            null,
            createElement(ToastProvider, null, createElement(Story))
          )
        )
      )
    )
  );
}
