'use client';

import { useId, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type React from 'react';
import { MobileDrawer } from '../inputs/MobileDrawer';
import type { SelectOption } from '../Select';

export type SelectAdornmentOption = SelectOption;

export interface SelectAdornmentConfig {
  options: SelectAdornmentOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export interface InputSelectContainerProps {
  selectAdornment: SelectAdornmentConfig;
  error?: boolean;
  disabled?: boolean;
  focused?: boolean;
  size?: 'small' | 'medium';
  children: React.ReactNode;
  id?: string;
}

export function InputSelectContainer({
  selectAdornment,
  error = false,
  disabled = false,
  focused = false,
  size = 'medium',
  children,
  id,
}: InputSelectContainerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const generatedId = useId();
  const selectId = id ? `${id}-select` : `${generatedId}-select`;

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [buttonFocused, setButtonFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(selectAdornment.defaultValue ?? '');

  const currentValue = selectAdornment.value ?? internalValue;
  const selectedOption = selectAdornment.options.find((o) => o.value === currentValue);
  const displayText = selectedOption?.label ?? selectAdornment.placeholder ?? '';

  // Container ring shows when either the input or the button is focused
  const containerFocused = focused || buttonFocused;

  function handleOpen() {
    if (disabled) return;
    if (isMobile) {
      setDrawerOpen(true);
    } else {
      setMenuOpen(true);
    }
  }

  function handleClose() {
    setMenuOpen(false);
  }

  function handleSelect(value: string) {
    setInternalValue(value);
    selectAdornment.onChange?.(value);
    setMenuOpen(false);
    setDrawerOpen(false);
    // Return focus to trigger after selection (especially needed for mobile drawer)
    anchorRef.current?.focus();
  }

  return (
    <>
      <Box
        sx={(t) => ({
          display: 'flex',
          alignItems: 'stretch',
          borderRadius: `${t.shape.sm}px`,
          border: `1px solid ${error ? t.palette.error.main : t.palette.border.input}`,
          backgroundColor: disabled
            ? `color-mix(in srgb, ${t.palette.background.default} 60%, transparent)`
            : t.palette.background.paper,
          ...(containerFocused && !error && {
            outline: `2px solid ${t.palette.border.focus}`,
            outlineOffset: '2px',
          }),
          ...(containerFocused && error && {
            outline: `2px solid ${t.palette.border.focus}`,
            outlineOffset: '2px',
            borderColor: t.palette.error.main,
          }),
          ...(disabled && {
            opacity: 0.6,
            pointerEvents: 'none',
          }),
          transition: 'border-color 0.2s, outline 0.2s',
        })}
      >
        {/* Input portion — flex-grow to fill available space */}
        <Box sx={(t) => ({
          flex: 1,
          minWidth: 0,
          borderRight: `1px solid ${error ? t.palette.error.main : t.palette.border.input}`,
        })}>
          {children}
        </Box>

        {/* Select trigger button */}
        <Box
          component="button"
          type="button"
          ref={anchorRef}
          tabIndex={0}
          onClick={handleOpen}
          onFocus={() => setButtonFocused(true)}
          onBlur={() => setButtonFocused(false)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={menuOpen || drawerOpen}
          aria-label={selectAdornment.placeholder ?? 'Select option'}
          id={selectId}
          sx={(t) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1.5,
            border: 'none',
            backgroundColor: buttonFocused ? t.palette.action.selected : 'transparent',
            cursor: disabled ? 'default' : 'pointer',
            flexShrink: 0,
            minWidth: 'fit-content',
            typography: 'body',
            color: currentValue ? t.palette.text.primary : t.palette.text.secondary,
            borderRadius: `0 ${t.shape.sm}px ${t.shape.sm}px 0`,
            '&:hover:not(:disabled)': {
              backgroundColor: t.palette.action.hover,
            },
            '&:focus-visible': {
              outline: 'none',
              backgroundColor: t.palette.action.selected,
            },
          })}
        >
          <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
            {displayText}
          </Box>
          <ChevronIcon />
        </Box>
      </Box>

      {/* Desktop dropdown menu */}
      {!isMobile && (
        <Menu
          anchorEl={anchorRef.current}
          open={menuOpen}
          onClose={handleClose}
          slotProps={{
            list: { role: 'listbox', sx: { py: '4px' } },
            paper: { sx: (t) => ({ borderRadius: `${t.shape.sm}px`, mt: 0.5 }) },
          }}
        >
          {selectAdornment.options.map((option) => (
            <MenuItem
              key={option.value}
              disabled={option.disabled}
              selected={currentValue === option.value}
              onClick={() => handleSelect(option.value)}
              disableRipple
              sx={(t) => ({
                fontSize: t.typography.body.fontSize,
                mx: '4px',
                borderRadius: `${t.shape.xs}px`,
                width: 'calc(100% - 8px)',
              })}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      )}

      {/* Mobile drawer */}
      {isMobile && (
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List sx={{ pt: 1, pb: 2, px: 1, overflowY: 'auto' }}>
            {selectAdornment.options.map((option) => (
              <ListItemButton
                key={option.value}
                disabled={option.disabled}
                selected={currentValue === option.value}
                onClick={() => handleSelect(option.value)}
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
      )}
    </>
  );
}

function ChevronIcon() {
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
