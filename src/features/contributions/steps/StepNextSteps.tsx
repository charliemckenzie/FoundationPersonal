'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../../components/Button';

interface StepNextStepsProps {
  onStartOver: () => void;
}

export function StepNextSteps({ onStartOver }: StepNextStepsProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
        columnGap: { xs: 0, md: 3 },
        rowGap: 3,
      }}
    >
      <Box sx={{ gridColumn: { md: '1 / 6' } }}>
        <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
          What to do next
        </Typography>
        <Typography variant="body" color="text.muted">
          Here are the steps you can take to implement your contribution strategy.
        </Typography>
      </Box>

      <Box sx={{ gridColumn: { md: '7 / 13' } }}>
        <Stack spacing={3}>
          <Box sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: '0.75rem', p: 3 }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body" sx={{ fontWeight: 600 }}>
                  1. Set up salary sacrifice
                </Typography>
                <Typography variant="small" color="text.muted">
                  Contact your employer or payroll team to arrange a salary sacrifice agreement.
                  You&rsquo;ll need to specify the amount and frequency. The arrangement must be
                  agreed before the work is performed.
                </Typography>
              </Box>

              <Box>
                <Typography variant="body" sx={{ fontWeight: 600 }}>
                  2. Make personal contributions
                </Typography>
                <Typography variant="small" color="text.muted">
                  You can make personal contributions via BPAY or direct debit through your
                  ART member portal. If claiming a tax deduction, submit a Notice of Intent to
                  Claim form before lodging your tax return or rolling the money out.
                </Typography>
              </Box>

              <Box>
                <Typography variant="body" sx={{ fontWeight: 600 }}>
                  3. Lodge your Notice of Intent
                </Typography>
                <Typography variant="small" color="text.muted">
                  If making personal deductible contributions, you must lodge a valid Notice of
                  Intent to Claim a Tax Deduction with ART and receive an acknowledgement
                  before you can claim the deduction.
                </Typography>
              </Box>

              <Box>
                <Typography variant="body" sx={{ fontWeight: 600 }}>
                  4. Review annually
                </Typography>
                <Typography variant="small" color="text.muted">
                  Contribution caps are indexed and your circumstances change. Review your
                  strategy at least once a year — ideally before 30 June — to make sure
                  you&rsquo;re maximising your contributions without exceeding caps.
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ p: 2, borderRadius: '0.75rem', bgcolor: 'background.muted' }}>
            <Typography variant="small" color="text.muted">
              This calculator provides general information only. Consider obtaining personal
              financial advice before making changes to your super contributions, especially
              if you have complex circumstances like carry-forward amounts, multiple super
              funds, or income above $250,000.
            </Typography>
          </Box>

          <Button variant="outlined" onClick={onStartOver} label="Start over" />
        </Stack>
      </Box>
    </Box>
  );
}
