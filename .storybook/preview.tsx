import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createBrandTheme } from '../src/app/themes/factory';
import { foundation } from '../src/app/themes/brands/foundation';
import { themeB } from '../src/app/themes/brands/theme-b';
import '../src/app/globals.css';

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

      // Create a theme instance with the selected brand and mode
      const brandConfig = brands[brandKey as keyof typeof brands];
      const theme = createBrandTheme(brandConfig, mode as 'light' | 'dark');

      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles
            styles={(t) => {
              const bg = (t.palette.background as Record<string, string>)[bgType] ?? t.palette.background.default;
              return {
                'html, body, #storybook-root, .docs-story': {
                  backgroundColor: `${bg} !important`,
                },
              };
            }}
          />
          <Story />
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
