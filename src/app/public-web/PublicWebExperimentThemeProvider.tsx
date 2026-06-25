'use client';

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useThemeMode } from '../themes/ThemeModeContext';
import { foundation } from '../themes/brands/foundation';
import type { BrandConfig } from '../themes/brands';
import { createBrandTheme } from '../themes/factory';
import { deepBlue, trueBlue, white } from '../themes/primitives/colors';

const publicWebExperimentBrand: BrandConfig = {
  ...foundation,
  semanticOverrides: {
    ...foundation.semanticOverrides,
    light: {
      ...foundation.semanticOverrides.light,
      text: {
        ...foundation.semanticOverrides.light.text,
        primary: deepBlue[800],
        muted: '#455A7B',
      },
    },
  },
};

interface PublicWebExperimentThemeProviderProps {
  children: ReactNode;
}

export function PublicWebExperimentThemeProvider({
  children,
}: PublicWebExperimentThemeProviderProps) {
  const { mode } = useThemeMode();

  const theme = useMemo(() => {
    const nextTheme = createBrandTheme(publicWebExperimentBrand, mode);

    nextTheme.typography.lead = {
      ...nextTheme.typography.lead,
      fontWeight: 400,
    };

    // Experiment: outlined buttons get 2px border + trueBlue fill with white text on hover.
    // Uses !important to override the inline sx styles from buildOutlinedStyles.
    nextTheme.components = {
      ...nextTheme.components,
      MuiButton: {
        ...nextTheme.components?.MuiButton,
        styleOverrides: {
          ...nextTheme.components?.MuiButton?.styleOverrides,
          outlined: {
            border: '2px solid !important',
            '&:hover': {
              backgroundColor: `${trueBlue[600]} !important`,
              borderColor: `${trueBlue[600]} !important`,
              color: `${white} !important`,
            },
          },
        },
      },
    };

    return nextTheme;
  }, [mode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
