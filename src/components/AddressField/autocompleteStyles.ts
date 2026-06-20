import { alpha, type Theme } from '@mui/material/styles';

export const inputSx = (t: Theme) => ({
  fontSize: t.typography.body.fontSize,
  borderRadius: `${t.shape.sm}px`,
  backgroundColor: 'background.paper',
  '&.MuiAutocomplete-inputRoot': { paddingTop: 0, paddingBottom: 0 },
  '&.Mui-disabled': { backgroundColor: alpha(t.palette.background.default, 0.6) },
  '&&.Mui-disabled fieldset': { borderColor: alpha(t.palette.border.input, 0.6) },
  '&.MuiAutocomplete-inputRoot .MuiAutocomplete-input': { paddingTop: '12px', paddingBottom: '12px', lineHeight: 1.5 },
  '& fieldset': { borderColor: 'border.input', borderRadius: `${t.shape.sm}px` },
  '&:hover:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled) fieldset': { borderColor: 'border.input' },
  '&.Mui-focused': { outline: `2px solid ${t.palette.border.focus}`, outlineOffset: '2px' },
  '&&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderWidth: '1px', borderColor: 'border.input' },
});

export const listboxSx = (t: Theme) => ({
  py: '4px',
  '& .MuiAutocomplete-option': { fontSize: t.typography.body.fontSize, mx: '4px', borderRadius: `${t.shape.xs}px`, width: 'calc(100% - 8px)' },
});

export const paperSx = (t: Theme) => ({
  borderRadius: `${t.shape.sm}px`,
  boxShadow: t.shadows[8],
  '& .MuiAutocomplete-noOptions': { fontSize: t.typography.body.fontSize },
  '& .MuiAutocomplete-loading': { fontSize: t.typography.body.fontSize },
});

export const linkSx = (t: Theme) => ({
  fontSize: t.typography.small.fontSize,
  color: 'primary.main',
  fontFamily: t.typography.fontFamily,
  fontWeight: 400,
  lineHeight: 1.5,
  textAlign: 'left' as const,
  alignSelf: 'flex-start',
  borderRadius: '2px',
  '&:hover': { color: 'primary.dark', textDecoration: 'underline' },
  '&.Mui-focusVisible': { outline: `2px solid ${t.palette.border.focus}`, outlineOffset: '2px' },
  '&:disabled': { color: 'action.disabled' },
});
