'use client';

import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';

export function ThemeTest() {
  const theme = useTheme();
  
  useEffect(() => {
    console.log('=== THEME TYPOGRAPHY DIAGNOSTICS ===');
    console.log('Full typography object:', theme.typography);
    console.log('display-1:', theme.typography['display-1']);
    console.log('h1:', theme.typography.h1);
    console.log('Keys:', Object.keys(theme.typography));
  }, [theme]);
  
  return null;
}
