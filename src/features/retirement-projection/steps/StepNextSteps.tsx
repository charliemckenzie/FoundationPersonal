'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../../components/Button';
import { Dialog } from '../../../components/Dialog';
import { Icon } from '../../../components/Icon';

interface StepNextStepsProps {
  onBack: () => void;
  onFinish: () => void;
}

export function StepNextSteps({ onBack, onFinish }: StepNextStepsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const actions = [
    {
      icon: 'file-arrow-down',
      label: 'View Statement of Advice (SoA)',
      external: false,
      color: 'primary' as const,
    },
    {
      icon: 'phone',
      label: 'Book an advice appointment (tbc)',
      external: false,
      color: 'primary' as const,
    },
    {
      icon: 'users',
      label: 'See other advice options',
      external: true,
      color: 'error' as const,
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
        columnGap: { xs: 0, md: 3 },
        rowGap: 3,
      }}
    >
      {/* Left content — 6 cols */}
      <Box sx={{ gridColumn: { md: '1 / 7' } }}>
        <Stack spacing={3}>
          <Typography variant="h3" component="h1">
            What would you like to do next?
          </Typography>
          <Typography variant="body" color="text.muted">
            Before you make any changes, read your Statement of Advice. It explains the recommendation, assumptions, risks and next steps.
          </Typography>

          <Stack spacing={2}>
            {actions.map((action) => (
              <Box
                key={action.label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 3,
                  borderRadius: '0.75rem',
                  border: '1px solid',
                  borderColor: 'border.default',
                  backgroundColor: 'background.paper',
                  cursor: 'pointer',
                  transition: 'border-color 150ms ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                }}
                role="button"
                tabIndex={0}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      backgroundColor: 'background.elevated',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon icon={action.icon} color={action.color} />
                  </Box>
                  <Typography variant="body" color="primary.main" sx={{ fontWeight: 500 }}>
                    {action.label}
                  </Typography>
                </Box>
                <Icon
                  icon={action.external ? 'arrow-up-right-from-square' : 'chevron-right'}
                  size="sm"
                  color="text.muted"
                />
              </Box>
            ))}
          </Stack>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button label="Back" variant="outlined" onClick={onBack} />
            <Button label="Finish" onClick={() => setConfirmOpen(true)} />
          </Box>

          <Dialog
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            variant="warning"
            title="Finish and clear your details?"
            description="This clears everything you've entered and returns you to the start. Make sure you've read or saved your Statement of Advice first."
            confirmLabel="Finish"
            cancelLabel="Go back"
            onConfirm={() => {
              setConfirmOpen(false);
              onFinish();
            }}
          />
        </Stack>
      </Box>

      {/* Right decorative panel — 5 cols */}
      <Box
        sx={{
          gridColumn: { md: '8 / 13' },
          display: { xs: 'none', md: 'block' },
          borderRadius: '1rem',
          overflow: 'hidden',
          minHeight: 500,
          backgroundColor: 'background.tintCool',
        }}
      />
    </Box>
  );
}
