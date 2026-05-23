import MuiDivider from '@mui/material/Divider';
import type React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle';
  textAlign?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
  flexItem?: boolean;
}

export function Divider({
  orientation = 'horizontal',
  variant = 'fullWidth',
  textAlign = 'center',
  children,
  flexItem,
}: DividerProps) {
  return (
    <MuiDivider
      orientation={orientation}
      variant={variant}
      textAlign={textAlign}
      flexItem={flexItem}
    >
      {children}
    </MuiDivider>
  );
}
