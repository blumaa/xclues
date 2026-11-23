/**
 * Storybook Decorators for Next.js App
 *
 * Provides mock providers for stories that need routing or app context.
 */

import { createElement, type ReactNode } from 'react';
import { SiteProvider } from '../providers/SiteProvider';
import { ThemeContextProvider } from '../providers/ThemeContext';
import { ToastProvider } from '../providers/ToastProvider';

/**
 * Basic providers for components that need site context and theme
 */
export function withNavProviders(Story: () => ReactNode) {
  return createElement(
    SiteProvider,
    null,
    createElement(
      ThemeContextProvider,
      null,
      createElement(ToastProvider, null, createElement(Story))
    )
  );
}

/** Game components need the same stack. */
export const withProviders = withNavProviders;
