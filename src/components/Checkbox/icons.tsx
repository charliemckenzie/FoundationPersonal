import Box from '@mui/material/Box';
import { alpha, type Theme } from '@mui/material/styles';
import { Icon } from '../Icon';

const SQUARE_BASE = {
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '0.25rem',
  boxSizing: 'border-box' as const,
};

const FILLED_SQUARE_SX = {
  ...SQUARE_BASE,
  bgcolor: 'currentColor',
  border: '1px solid currentColor',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export function CheckboxUncheckedIcon({ error, disabled }: { error?: boolean; disabled?: boolean }) {
  return (
    <Box
      component="span"
      sx={(theme) => ({
        ...SQUARE_BASE,
        border: '1px solid',
        borderColor: disabled
          ? alpha(theme.palette.border.input, 0.6)
          : error
          ? 'error.main'
          : 'border.input',
        display: 'inline-block',
        backgroundColor: disabled
          ? alpha(theme.palette.background.default, 0.6)
          : theme.palette.background.paper,
      })}
    />
  );
}

export function CheckboxIndeterminateIcon() {
  return (
    <Box component="span" sx={FILLED_SQUARE_SX}>
      <Box component="span" sx={{ color: (t: Theme) => t.palette.primary.contrastText, display: 'flex', lineHeight: 0, mt: '-0.0625rem' }}>
        <Icon icon="minus" size="lg" color="inherit" />
      </Box>
    </Box>
  );
}

export function CheckboxCheckedIcon() {
  return (
    <Box component="span" sx={FILLED_SQUARE_SX}>
      <Box component="span" sx={{ color: (t: Theme) => t.palette.primary.contrastText, display: 'flex', lineHeight: 0, mt: '-0.0625rem' }}>
        <Icon icon="check" size="lg" color="inherit" />
      </Box>
    </Box>
  );
}
