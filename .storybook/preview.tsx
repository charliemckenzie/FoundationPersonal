import type { Preview } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useMemo, useEffect } from 'react';
import { createBrandTheme } from '../src/app/themes/factory';
import { foundation } from '../src/app/themes/brands/foundation';
import { themeB } from '../src/app/themes/brands/theme-b';
import '../src/app/globals.css';
import '../src/lib/fontawesome'; // Initialize Font Awesome icon library

const brands = {
  foundation,
  'theme-b': themeB,
};

// Load Google Fonts
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Merriweather:wght@700;900&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const mode = context.globals.colorScheme || 'light';
      const brandKey = context.globals.brand || 'foundation';
      const bgType = context.globals.backgroundColor || 'default';
      const isDesignTokenStory = context.title?.startsWith('Design Tokens/');
      
      // Create a theme instance with the selected brand and mode
      const theme = useMemo(() => {
        const brandConfig = brands[brandKey as keyof typeof brands];
        const brandTheme = createBrandTheme(brandConfig);
        const { colorSchemes, ...themeConfig } = brandTheme as any;
        return createTheme({
          ...themeConfig,
          palette: colorSchemes[mode].palette,
        });
      }, [mode, brandKey]);
      
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isDesignTokenStory ? (
            <Box sx={{ bgcolor: `background.${bgType}`, minHeight: '100vh' }}>
              <Story />
            </Box>
          ) : (
            <Story />
          )}
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Foundation', 'Design Tokens', 'Components', '*'],
      },
    },
  },
  globalTypes: {
    brand: {
      description: 'Brand theme',
      defaultValue: 'foundation',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'foundation', title: 'ART' },
          { value: 'theme-b', title: 'QSuper' },
        ],
        dynamicTitle: true,
      },
    },
    colorScheme: {
      description: 'Color scheme for MUI components',
      defaultValue: 'light',
      toolbar: {
        title: 'Color Scheme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light mode' },
          { value: 'dark', icon: 'moon', title: 'Dark mode' },
        ],
        dynamicTitle: true,
      },
    },
    backgroundColor: {
      description: 'Semantic background color',
      defaultValue: 'default',
      toolbar: {
        title: 'Background',
        icon: 'photo',
        items: [
          { value: 'default', title: 'Default' },
          { value: 'paper', title: 'Paper' },
          { value: 'elevated', title: 'Elevated' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
