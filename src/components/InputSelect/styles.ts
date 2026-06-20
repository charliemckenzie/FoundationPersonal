import type { SxProps, Theme } from '@mui/material/styles';

/** Outer wrapper that draws the shared border/focus ring around the input + select trigger. */
export const containerSx = (error: boolean, focused: boolean, disabled: boolean): SxProps<Theme> => (t) => ({
  display: 'flex',
  alignItems: 'stretch',
  borderRadius: `${t.shape.sm}px`,
  border: `1px solid ${error ? t.palette.error.main : t.palette.border.input}`,
  backgroundColor: disabled
    ? `color-mix(in srgb, ${t.palette.background.default} 60%, transparent)`
    : t.palette.background.paper,
  ...(focused && !error && {
    outline: `2px solid ${t.palette.border.focus}`,
    outlineOffset: '2px',
  }),
  ...(focused && error && {
    outline: `2px solid ${t.palette.border.focus}`,
    outlineOffset: '2px',
    borderColor: t.palette.error.main,
  }),
  ...(disabled && {
    opacity: 0.6,
    pointerEvents: 'none',
  }),
  transition: 'border-color 0.2s, outline 0.2s',
});

/** Input portion — flex-grows to fill space, divided from the trigger by a border. */
export const inputPortionSx = (error: boolean): SxProps<Theme> => (t) => ({
  flex: 1,
  minWidth: 0,
  borderRight: `1px solid ${error ? t.palette.error.main : t.palette.border.input}`,
});

/** The select trigger button on the right of the field. */
export const triggerButtonSx = (buttonFocused: boolean, hasValue: boolean): SxProps<Theme> => (t) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 0.75,
  px: 1.5,
  border: 'none',
  backgroundColor: buttonFocused ? t.palette.action.selected : 'transparent',
  cursor: 'pointer',
  flexShrink: 0,
  minWidth: 'fit-content',
  typography: 'body',
  color: hasValue ? t.palette.text.primary : t.palette.text.secondary,
  borderRadius: `0 ${t.shape.sm}px ${t.shape.sm}px 0`,
  '&:hover:not(:disabled)': {
    backgroundColor: t.palette.action.hover,
  },
  '&:focus-visible': {
    outline: 'none',
    backgroundColor: t.palette.action.selected,
  },
});

/** Visually-hidden label text (announced to assistive tech, not shown). */
export const visuallyHiddenSx: SxProps<Theme> = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
};

export const menuItemSx: SxProps<Theme> = (t) => ({
  fontSize: t.typography.body.fontSize,
  mx: '4px',
  borderRadius: `${t.shape.xs}px`,
  width: 'calc(100% - 8px)',
});

export const menuSlotProps = {
  list: { role: 'listbox' as const, sx: { py: '4px' } },
  paper: { sx: (t: Theme) => ({ borderRadius: `${t.shape.sm}px`, mt: 0.5 }) },
};
