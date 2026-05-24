'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createBrandTheme } from './factory';
import { foundation } from './brands/foundation';
import type { BrandConfig } from './brands';

export type ThemeMode = 'light' | 'dark';

interface ThemeModeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

const STORAGE_KEY = 'foundation:theme-mode';

function readInitialMode(defaultMode: ThemeMode): ThemeMode {
  if (typeof window === 'undefined') return defaultMode;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return defaultMode;
}

export interface ThemeModeProviderProps {
  children: React.ReactNode;
  /** Brand config used to build both light and dark themes. Defaults to `foundation`. */
  brand?: BrandConfig;
  /** Initial mode if no stored preference is found. Defaults to `'light'`. */
  defaultMode?: ThemeMode;
}

export function ThemeModeProvider({
  children,
  brand = foundation,
  defaultMode = 'light',
}: ThemeModeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);

  useEffect(() => {
    setModeState(readInitialMode(defaultMode));
  }, [defaultMode]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }, [mode, setMode]);

  const theme = useMemo(() => createBrandTheme(brand, mode), [brand, mode]);

  const value = useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode, setMode, toggleMode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeModeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (ctx === undefined) {
    throw new Error('useThemeMode must be used inside a ThemeModeProvider');
  }
  return ctx;
}
