import MuiCircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export type SpinnerSize = 'small' | 'medium' | 'large';
export type SpinnerColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
}

const SIZE_MAP: Record<SpinnerSize, string> = {
  small: '1rem',
  medium: '1.5rem',
  large: '2.5rem',
};

export function Spinner({ size = 'medium', color = 'primary', label }: SpinnerProps) {
  return (
    <Box
      role="status"
      aria-label={label ?? 'Loading'}
      sx={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}
    >
      <MuiCircularProgress size={SIZE_MAP[size]} color={color} aria-hidden />
      {label && (
        <Typography variant="small" color="text.muted">
          {label}
        </Typography>
      )}
    </Box>
  );
}
