'use client';

import { forwardRef } from 'react';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { Icon } from '../../Icon';
import { DEFAULT_MEMBER_ONLINE_COPY } from '../types';

export interface SearchFieldProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  /** Keyboard shortcut hint shown on the right (e.g. `"⌘ K"`). Omit to hide. */
  shortcutHint?: string;
  /** Visual size variant. `pill` is the rounded header style; `field` is a standard rectangle. */
  variant?: 'pill' | 'field';
  fullWidth?: boolean;
  'aria-label'?: string;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  {
    value,
    defaultValue,
    onChange,
    onSubmit,
    placeholder = DEFAULT_MEMBER_ONLINE_COPY.searchPlaceholder,
    shortcutHint,
    variant = 'pill',
    fullWidth = false,
    ...rest
  },
  ref,
) {
  const isPill = variant === 'pill';

  return (
    <Box
      component="form"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const next = String(formData.get('search') ?? '');
        onSubmit?.(next);
      }}
      sx={(t) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: isPill ? 2 : 1.5,
        height: isPill ? '2.5rem' : '3rem',
        width: fullWidth ? '100%' : 'auto',
        minWidth: isPill ? '14rem' : '16rem',
        borderRadius: isPill ? `${t.shape.full}px` : `${t.shape.sm}px`,
        backgroundColor: t.palette.background.paper,
        border: `1px solid ${t.palette.border.subtle}`,
        transition: t.transitions.create(['border-color', 'box-shadow'], {
          duration: t.transitions.duration.shortest,
        }),
        '&:hover': { borderColor: t.palette.border.default },
        '&:focus-within': {
          outline: `2px solid ${t.palette.border.focus}`,
          outlineOffset: '2px',
          borderColor: t.palette.border.focus,
        },
      })}
    >
      <Box
        component="label"
        sx={{ display: 'inline-flex', color: 'text.muted', cursor: 'text' }}
      >
        <Icon icon="magnifying-glass" size="md" color="inherit" aria-label={placeholder} />
        <Box
          component="span"
          sx={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            border: 0,
          }}
        >
          {rest['aria-label'] ?? placeholder}
        </Box>
      </Box>
      <InputBase
        inputRef={ref}
        name="search"
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        sx={{
          flex: 1,
          fontSize: '0.9375rem',
          color: 'text.primary',
          '& input::placeholder': { color: 'text.muted', opacity: 1 },
        }}
        inputProps={{ 'aria-label': rest['aria-label'] ?? placeholder }}
      />
      {shortcutHint !== undefined && (
        <Box
          aria-hidden="true"
          sx={(t) => ({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '1.75rem',
            height: '1.5rem',
            px: 0.75,
            borderRadius: `${t.shape.xs}px`,
            border: `1px solid ${t.palette.border.subtle}`,
            color: t.palette.text.muted,
            fontSize: '0.75rem',
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
          })}
        >
          {shortcutHint}
        </Box>
      )}
    </Box>
  );
});
