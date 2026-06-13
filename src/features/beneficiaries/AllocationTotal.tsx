'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '../../components/Icon';

interface AllocationTotalProps {
  total: number;
  /** When true, an under-100 total is shown as an error (set after a submit attempt). */
  attempted?: boolean;
}

export function AllocationTotal({ total, attempted = false }: AllocationTotalProps) {
  const complete = total === 100;
  const over = total > 100;
  const under = total < 100;
  const isError = over || (under && attempted);

  const color = complete ? 'success.text' : isError ? 'error.text' : 'text.inverse';

  const remaining = Math.round((100 - total) * 100) / 100;
  const showRemaining = total > 0 && under && !isError;
  const hint = over
    ? 'You cannot allocate more than 100%'
    : under && attempted
      ? `Allocate ${remaining}% more to continue`
      : null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1,
        px: 3,
        py: 2,
        borderRadius: (t) => `${t.shape.sm}px`,
        bgcolor: complete ? 'success.background' : isError ? 'error.background' : 'background.highContrast',
        border: '1px solid',
        borderColor: complete ? 'success.main' : isError ? 'error.main' : 'border.subtle',
        transition: 'background-color 200ms ease, border-color 200ms ease',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {complete && <Icon icon="circle-check" color="success" size="lg" />}
        {isError && <Icon icon="circle-exclamation" color="error" size="lg" />}
        <Typography variant="body" sx={{ color }}>Total allocated</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
        <Typography component="p" variant="body" sx={{ color, m: 0, textAlign: 'right' }}>
          <Typography component="span" variant="body" sx={{ fontWeight: 700, color }}>
            {Math.round(total)}%
          </Typography>
          {' '}of 100%
          <Typography
            component="span"
            variant="caption"
            sx={{
              display: 'block',
              color,
              overflow: 'hidden',
              maxHeight: showRemaining ? '1.5rem' : 0,
              opacity: showRemaining ? 1 : 0,
              transition: 'max-height 250ms ease, opacity 250ms ease',
            }}
          >
            {remaining}% remaining
          </Typography>
        </Typography>
        {hint && (
          <Typography variant="small" sx={{ color: 'error.text' }}>
            {hint}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
