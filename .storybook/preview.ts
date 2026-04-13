import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { createElement } from 'react';
import '../src/index.css';
import { BRAND_THEMES, applyThemeTokens } from '../src/themes';

// Clear persisted globals to prevent stale theme values
try {
  localStorage.removeItem('@storybook/manager/globals');
} catch {
  // ignore
}

// Build toolbar items from theme registry
const brandItems = Object.keys(BRAND_THEMES).map((key) => ({
  value: key,
  title: BRAND_THEMES[key].name.charAt(0).toUpperCase() + BRAND_THEMES[key].name.slice(1),
}));

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' } },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    brand: {
      description: 'Brand theme',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: brandItems,
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    brand: 'xclues',
  },
  decorators: [
    // Brand + theme decorator:
    // 1. Syncs brand to localStorage so useTheme hook stays in sync
    // 2. Applies tokens as inline CSS custom properties
    // 3. Wraps story in a keyed div to force remount on brand change
    (Story: any, context: any) => {
      const brand = context.globals.brand || 'xclues';
      const colorScheme = document.documentElement.getAttribute('data-theme') || 'light';

      // Sync to localStorage so the in-app useTheme hook reads the right brand
      localStorage.setItem('xclues-brand-theme', brand);

      // Apply tokens
      const brandDef = BRAND_THEMES[brand];
      if (brandDef) {
        const tokens = colorScheme === 'dark' ? brandDef.dark : brandDef.light;
        applyThemeTokens(tokens);
      }

      // Key forces full remount when brand changes, so useTheme re-inits
      return createElement('div', { key: brand }, Story());
    },
    // Light/dark theme decorator — sets data-theme attribute
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
