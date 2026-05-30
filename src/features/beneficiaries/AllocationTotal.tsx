'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '../../components/Icon';

interface AllocationTotalProps {
  total: number;
}

export function AllocationTotal({ total }: AllocationTotalProps) {
  const complete = total === 100;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: 2,
        borderRadius: (t) => `${t.shape.sm}px`,
        bgcolor: complete ? 'success.background' : 'background.default',
        border: '1px solid',
        borderColor: complete ? 'success.main' : 'border.default',
        transition: 'background-color 200ms ease, border-color 200ms ease',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {complete && <Icon icon="circle-check" color="success" size="lg" />}
        <Typography variant="body" sx={{ color: complete ? 'success.text' : 'text.primary' }}>Total allocated</Typography>
      </Box>
      <Typography variant="body" sx={{ color: complete ? 'success.text' : 'text.primary' }}>
        <Typography
          component="span"
          variant="body"
          sx={{ fontWeight: 700, color: complete ? 'success.text' : 'text.primary' }}
        >
          {Math.round(total)}%
        </Typography>
        {' '}of 100%
      </Typography>
    </Box>
  );
}
