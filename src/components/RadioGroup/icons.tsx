import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

const CIRCLE_BASE = {
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '50%',
  boxSizing: 'border-box' as const,
};

export function RadioUncheckedIcon({ disabled }: { disabled?: boolean }) {
  return (
    <Box
      component="span"
      sx={(theme) => ({
        ...CIRCLE_BASE,
        border: '1px solid',
        borderColor: disabled ? alpha(theme.palette.border.input, 0.6) : 'border.input',
        display: 'inline-block',
        backgroundColor: disabled
          ? alpha(theme.palette.background.default, 0.6)
          : theme.palette.background.paper,
      })}
    />
  );
}

export function RadioCheckedIcon() {
  return (
    <Box
      component="span"
      sx={{
        ...CIRCLE_BASE,
        border: '1px solid currentColor',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        component="span"
        sx={{
          width: '0.875rem',
          height: '0.875rem',
          bgcolor: 'currentColor',
          borderRadius: '50%',
          display: 'block',
        }}
      />
    </Box>
  );
}
