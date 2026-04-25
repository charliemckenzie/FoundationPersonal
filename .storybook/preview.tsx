import React from 'react';
import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createBrandTheme } from '../src/app/themes/factory';
import { foundation } from '../src/app/themes/brands/foundation';
import { themeB } from '../src/app/themes/brands/theme-b';

const themes = {
  'Theme A': createBrandTheme(foundation),
  'Theme B': createBrandTheme(themeB),
} as const;

type BrandKey = keyof typeof themes;
type ColorScheme = 'light' | 'dark';

const withThemeAndColorScheme: Decorator = (Story, context) => {
  const brand = (context.globals['brand'] as BrandKey | undefined) ?? 'Theme A';
  const colorScheme = (context.globals['colorScheme'] as ColorScheme | undefined) ?? 'light';
  const theme = themes[brand] ?? themes['Theme A'];

  React.useEffect(() => {
    document.body.setAttribute('data-mui-color-scheme', colorScheme);
  }, [colorScheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    brand: {
      name: 'Brand',
      description: 'Brand theme',
      defaultValue: 'Theme A',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'Theme A', title: 'Theme A' },
          { value: 'Theme B', title: 'Theme B' },
        ],
        dynamicTitle: true,
      },
    },
    colorScheme: {
      name: 'Color Scheme',
      description: 'Light or dark mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'sun',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark',  title: 'Dark',  icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withThemeAndColorScheme],
};

export default preview;
