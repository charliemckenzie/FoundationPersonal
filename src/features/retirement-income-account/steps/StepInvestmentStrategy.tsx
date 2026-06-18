'use client';

import React from 'react';
import { Box, Collapse, Divider, Typography } from '@mui/material';
import { Alert } from '../../../components/Alert';
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
    label: 'Use recommended settings',
    description: 'Balanced Risk-Adjusted investment mix with proportional drawdown — you can change this any time.',
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

      <RadioGroup
        variant="boxed"
        value={investmentStrategy ?? ''}
        onChange={(value) => onInvestmentStrategyChange(value as InvestmentStrategy)}
        options={RADIO_OPTIONS}
      />

      <Collapse in={investmentStrategy === 'default'} unmountOnExit>
        <Box
          sx={{
            mt: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ px: 3, py: 2, bgcolor: 'background.paper' }}>
            <Typography variant="small" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              Your recommended investment settings
            </Typography>
            <Typography variant="body" sx={{ fontWeight: 600 }}>
              Investment mix
            </Typography>
            <Typography variant="body" sx={{ display: 'block', mb: 0.5 }}>
              Balanced Risk-Adjusted — 100%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              A diversified, managed option balancing growth and stability over the long term.
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ px: 3, py: 2, bgcolor: 'background.paper' }}>
            <Typography variant="body" sx={{ fontWeight: 600 }}>
              Drawdown order
            </Typography>
            <Typography variant="body" sx={{ display: 'block', mb: 0.5 }}>
              Proportional drawdown
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Payments are drawn proportionally from all your investment options.
            </Typography>
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
