'use client';

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useThemeMode } from '../themes/ThemeModeContext';
import { foundation } from '../themes/brands/foundation';
import type { BrandConfig } from '../themes/brands';
import { createBrandTheme } from '../themes/factory';
import { deepBlue } from '../themes/primitives/colors';

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

    return nextTheme;
  }, [mode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
