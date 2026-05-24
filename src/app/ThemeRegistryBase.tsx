'use client';

import { ThemeModeProvider } from './themes/ThemeModeContext';

export function ThemeRegistryBase({ children }: { children: React.ReactNode }) {
  return <ThemeModeProvider>{children}</ThemeModeProvider>;
}
