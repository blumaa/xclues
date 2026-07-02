import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { createElement } from 'react';
import '../src/index.css';
import { BRAND_THEMES } from '../src/themes';
import '../src/styles/brands.css';

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

      // Sync to localStorage so the in-app useTheme hook reads the right brand
      localStorage.setItem('xclues-brand-theme', brand);

      // Same pattern as the app: data-brand attribute + generated brands.css
      document.documentElement.setAttribute('data-brand', brand);

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
