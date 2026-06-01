import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createBrandTheme } from '../src/app/themes/factory';
import { foundation } from '../src/app/themes/brands/foundation';
import { themeB } from '../src/app/themes/brands/theme-b';
import '../src/app/globals.css';

const brands = {
  foundation,
  'theme-b': themeB,
};

// Load Google Fonts and define the font CSS variables that brand configs reference.
// In production, next/font sets these variables via a className on <html>; here in
// Storybook we wire them to the Google-Fonts-loaded family names so brand configs
// resolve correctly in both contexts without per-environment forks.
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&family=Merriweather:wght@700;900&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  const style = document.createElement('style');
  style.textContent = `:root {
    --font-noto-sans: 'Noto Sans';
    --font-open-sans: 'Open Sans';
    --font-merriweather: 'Merriweather';
  }`;
  document.head.appendChild(style);
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
          {/*
           * Wrapper with display:contents so it doesn't affect layout, but it
           * does anchor CSS font-family inheritance for this story's subtree.
           * On the docs page all stories share the same document, so the last
           * CssBaseline to mount (QSuper) sets body{font-family:Effra} globally.
           * An inline fontFamily here intercepts that inherited value for every
           * child element regardless of what body says.
           */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: 'contents', fontFamily: theme.typography.fontFamily }}>
              <Story />
            </div>
          </LocalizationProvider>
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
        order: ['Foundation', 'Design Tokens', 'Atomic Components', 'Components', ['Accordion', 'AddressField', 'Alert', 'Action Bar', '*'], '*'],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
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
