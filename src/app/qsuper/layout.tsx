'use client';

import type React from 'react';
import { ThemeModeProvider } from '../themes/ThemeModeContext';
import { themeB } from '../themes/brands/theme-b';

export default function QSuperLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeModeProvider brand={themeB}>
      {children}
    </ThemeModeProvider>
  );
}
