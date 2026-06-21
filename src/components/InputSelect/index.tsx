'use client';

import { useId, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { ChevronIcon, InputSelectOptions } from './parts';
import { containerSx, inputPortionSx, triggerButtonSx, visuallyHiddenSx } from './styles';
import type { InputSelectContainerProps } from './types';

export type { SelectAdornmentOption, SelectAdornmentConfig, InputSelectContainerProps } from './types';

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
      <Box sx={containerSx(error, containerFocused, disabled)}>
        {/* Input portion — flex-grow to fill available space */}
        <Box sx={inputPortionSx(error)}>{children}</Box>

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
          aria-label={selectAdornment.label
            ? `Edit ${selectAdornment.label}: ${displayText || selectAdornment.placeholder || 'Select option'}`
            : (!currentValue ? (selectAdornment.placeholder ?? 'Select option') : undefined)}
          id={selectId}
          sx={triggerButtonSx(buttonFocused, !!currentValue, size)}
        >
          {selectAdornment.label && (
            <Box component="span" sx={visuallyHiddenSx}>
              {selectAdornment.label}:
            </Box>
          )}
          <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
            {displayText}
          </Box>
          <ChevronIcon />
        </Box>
      </Box>

      <InputSelectOptions
        options={selectAdornment.options}
        currentValue={currentValue}
        isMobile={isMobile}
        anchorEl={anchorRef.current}
        menuOpen={menuOpen}
        drawerOpen={drawerOpen}
        onMenuClose={() => setMenuOpen(false)}
        onDrawerClose={() => setDrawerOpen(false)}
        onSelect={handleSelect}
      />
    </>
  );
}
