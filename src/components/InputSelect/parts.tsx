'use client';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { MobileDrawer } from '../inputs/MobileDrawer';
import { menuItemSx, menuSlotProps } from './styles';
import type { SelectAdornmentOption } from './types';

export function ChevronIcon() {
  return (
    <Box
      component="svg"
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      sx={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }}
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </Box>
  );
}

interface InputSelectOptionsProps {
  options: SelectAdornmentOption[];
  currentValue: string;
  isMobile: boolean;
  anchorEl: HTMLButtonElement | null;
  menuOpen: boolean;
  drawerOpen: boolean;
  onMenuClose: () => void;
  onDrawerClose: () => void;
  onSelect: (value: string) => void;
}

/** The option list — a desktop dropdown Menu, or a MobileDrawer on small screens. */
export function InputSelectOptions({
  options,
  currentValue,
  isMobile,
  anchorEl,
  menuOpen,
  drawerOpen,
  onMenuClose,
  onDrawerClose,
  onSelect,
}: InputSelectOptionsProps) {
  if (isMobile) {
    return (
      <MobileDrawer open={drawerOpen} onClose={onDrawerClose}>
        <List sx={{ pt: 1, pb: 2, px: 1, overflowY: 'auto' }}>
          {options.map((option) => (
            <ListItemButton
              key={option.value}
              disabled={option.disabled}
              selected={currentValue === option.value}
              onClick={() => onSelect(option.value)}
              sx={(t) => ({ borderRadius: `${t.shape.xs}px` })}
            >
              <ListItemText
                primary={option.label}
                slotProps={{ primary: { sx: { typography: 'body' } } }}
              />
            </ListItemButton>
          ))}
        </List>
      </MobileDrawer>
    );
  }

  return (
    <Menu anchorEl={anchorEl} open={menuOpen} onClose={onMenuClose} slotProps={menuSlotProps}>
      {options.map((option) => (
        <MenuItem
          key={option.value}
          disabled={option.disabled}
          selected={currentValue === option.value}
          onClick={() => onSelect(option.value)}
          disableRipple
          sx={menuItemSx}
        >
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  );
}
