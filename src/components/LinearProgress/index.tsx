import MuiLinearProgress from '@mui/material/LinearProgress';

export type LinearProgressVariant = 'determinate' | 'indeterminate' | 'buffer' | 'query';

export interface LinearProgressProps {
  /** 0–100; required when variant is "determinate". */
  value?: number;
  variant?: LinearProgressVariant;
  /** Accessible label announced by screen readers. Defaults to "Loading". */
  label?: string;
}

export function LinearProgress({
  value,
  variant = 'indeterminate',
  label,
}: LinearProgressProps) {
  return (
    <MuiLinearProgress
      variant={variant}
      value={value}
      color="primary"
      aria-label={label ?? 'Loading'}
      sx={{
        borderRadius: 999,
        '& .MuiLinearProgress-bar': { borderRadius: 999 },
      }}
    />
  );
}
