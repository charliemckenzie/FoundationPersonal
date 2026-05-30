export const focusRingSx = {
  outline: '2px solid',
  outlineColor: 'border.focus',
  outlineOffset: 2,
  boxShadow: 'none',
} as const;

export const elevatedFocusRingSx = {
  ...focusRingSx,
  position: 'relative',
  zIndex: 1,
} as const;
