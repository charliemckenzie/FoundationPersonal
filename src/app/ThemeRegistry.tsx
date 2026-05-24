'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeModeProvider } from './themes/ThemeModeContext';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeModeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </ThemeModeProvider>
    </AppRouterCacheProvider>
  );
}
