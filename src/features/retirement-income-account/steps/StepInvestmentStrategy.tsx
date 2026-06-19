'use client';

import React from 'react';
import { Box, Collapse, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { Alert } from '../../../components/Alert';
import { Icon } from '../../../components/Icon';
import { RadioGroup } from '../../../components/RadioGroup';
import type { InvestmentStrategy } from '../types';

interface StepInvestmentStrategyProps {
  investmentStrategy: InvestmentStrategy;
  onInvestmentStrategyChange: (value: InvestmentStrategy) => void;
  showValidation: boolean;
}

const RADIO_OPTIONS = [
  {
    value: 'default',
    label: 'Use default settings',
    description: 'Balanced Risk-Adjusted investment mix with proportional drawdown.',
  },
  {
    value: 'custom',
    label: 'Customise my investment strategy',
    description: 'Choose your own investment mix and drawdown order across your account.',
  },
];

export function StepInvestmentStrategy({
  investmentStrategy,
  onInvestmentStrategyChange,
  showValidation,
}: StepInvestmentStrategyProps) {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        How would you like to manage your investments?
      </Typography>
      <Typography variant="body" sx={{ mb: 3, display: 'block' }}>
        You can change your investment strategy at any time after your account is open.
      </Typography>

      <Box sx={{ width: '100%', '& .MuiFormControl-root': { width: '100%' }, '& .MuiFormControlLabel-root': { width: '100%' } }}>
        <RadioGroup
          variant="boxed"
          value={investmentStrategy ?? ''}
          onChange={(value) => onInvestmentStrategyChange(value as InvestmentStrategy)}
          options={RADIO_OPTIONS}
        />
      </Box>

      <Collapse in={investmentStrategy === 'default'} unmountOnExit>
        <Box
          sx={{
            mt: 2,
            borderRadius: (t: Theme) => `${t.shape.lg}px`,
            border: '1px solid',
            borderColor: 'border.default',
            bgcolor: 'background.paper',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box sx={{ px: { xs: 3, sm: 4 }, py: { xs: 2.5, sm: 3 }, bgcolor: 'background.default' }}>
            <Typography variant="h5" sx={{ color: 'text.heading', mb: 0.5 }}>Your default settings</Typography>
            <Typography variant="small" sx={{ color: 'text.primary' }}>
              These are our recommended settings. You can change them any time after your account is open.
            </Typography>
          </Box>

          {/* Key points */}
          <Box sx={{ px: { xs: 3, sm: 4 }, py: { xs: 3, sm: 3 } }}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={(theme: Theme) => ({
                    flexShrink: 0,
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.softMain ?? alpha(theme.palette.primary.main, 0.12),
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  })}
                >
                  <Icon icon="circle-check" size="lg" style="light" color="inherit" />
                </Box>
                <Box>
                  <Typography variant="body" sx={{ fontWeight: 600, color: 'text.primary', display: 'block' }}>
                    100% Balanced Risk-Adjusted
                  </Typography>
                  <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
                    A diversified, managed option balancing growth and stability over the long term.
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={(theme: Theme) => ({
                    flexShrink: 0,
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.softMain ?? alpha(theme.palette.primary.main, 0.12),
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  })}
                >
                  <Icon icon="circle-check" size="lg" style="light" color="inherit" />
                </Box>
                <Box>
                  <Typography variant="body" sx={{ fontWeight: 600, color: 'text.primary', display: 'block' }}>
                    Proportional drawdown
                  </Typography>
                  <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
                    Payments are drawn proportionally from all your investment options.
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Collapse>

      {showValidation && investmentStrategy === null && (
        <Alert
          severity="error"
          message="Please select an investment strategy option to continue."
          sx={{ mt: 2 }}
        />
      )}
    </Box>
  );
}
