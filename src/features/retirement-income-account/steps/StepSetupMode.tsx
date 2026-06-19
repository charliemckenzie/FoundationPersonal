import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { Alert } from '../../../components/Alert';
import { Icon } from '../../../components/Icon';
import { RadioGroup } from '../../../components/RadioGroup';
import { PENSION_ESTIMATE_AGE } from '../constants';
import type { FundingAccount, SetupMode } from '../types';
import { estimatePension, formatCurrency, getMinDrawdownRate } from '../utils';

function SectionLabel({ children, mb = 0.5 }: { children: React.ReactNode; mb?: number }) {
  return (
    <Typography variant="h6" sx={{ color: 'text.heading', mb }}>
      {children}
    </Typography>
  );
}

function KeyPoint({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
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
        <Icon icon={icon} size="lg" style="light" color="inherit" />
      </Box>
      <Box>
        <Typography variant="body" sx={{ fontWeight: 600, color: 'text.primary', display: 'block' }}>
          {title}
        </Typography>
        <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
          {children}
        </Typography>
      </Box>
    </Stack>
  );
}

const TODAY = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

interface StepSetupModeProps {
  setupMode: SetupMode;
  onSetupModeChange: (value: SetupMode) => void;
  accounts: FundingAccount[];
  showValidation: boolean;
}

const SETUP_OPTIONS = [
  {
    value: 'simple',
    label: 'Yes, set it up for me',
    description: "We'll handle everything. You can always change it later.",
  },
  {
    value: 'custom',
    label: "No, I'd like to customise",
    description: 'Choose your own funding amount, payment schedule, investment mix, and drawdown order.',
  },
];

export function StepSetupMode({ setupMode, onSetupModeChange, accounts, showValidation }: StepSetupModeProps) {
  const hasError = showValidation && setupMode === null;
  const [showDetailsB, setShowDetailsB] = useState(false);

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const estimate = estimatePension(totalBalance, PENSION_ESTIMATE_AGE, 'single');
  const fortnightlyAmount = estimate?.fortnightly ?? 0;

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          How would you like to set up your account?
        </Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          You can customise your Retirement Income account yourself, or we can set it up using our
          recommended settings. Either way, you can make changes anytime once your account is open.
        </Typography>
      </div>

      <RadioGroup
        legend="How would you like to set up your account?"
        legendSx={{ display: 'none' }}
        variant="boxed"
        value={setupMode ?? ''}
        options={SETUP_OPTIONS}
        direction="column"
        onChange={(value) => onSetupModeChange(value as SetupMode)}
        error={hasError}
      />

      <Collapse in={setupMode === 'simple'} unmountOnExit>
        <Box
          sx={{
            borderRadius: (t: Theme) => `${t.shape.lg}px`,
            border: '1px solid',
            borderColor: 'border.default',
            bgcolor: 'background.paper',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box sx={{ px: { xs: 3, sm: 4 }, py: { xs: 2.5, sm: 3 }, bgcolor: 'background.default' }}>
            <Typography variant="h5" sx={{ color: 'text.heading', mb: 0.5 }}>Your setup</Typography>
            <Typography variant="small" sx={{ color: 'text.primary' }}>
              Here&rsquo;s how we&rsquo;ll set up your account. You can change any of this later.
            </Typography>
          </Box>

          {/* Key points */}
          <Box sx={{ px: { xs: 3, sm: 4 }, py: { xs: 3, sm: 3 } }}>
            <Stack spacing={3}>
              <Stack spacing={0}>
                <KeyPoint icon="circle-check" title={`Full balance transfer of ${formatCurrency(totalBalance)}`}>
                  This is from your Super Savings and Defined Benefit accounts.
                </KeyPoint>
                <Box sx={{ pl: '3.5rem' }}>
                  <Box
                    component="button"
                    onClick={() => setShowDetailsB((v) => !v)}
                    sx={{ background: 'none', border: 'none', p: 0, cursor: 'pointer', color: 'primary.main', display: 'inline-flex', alignItems: 'center', gap: 0.25 }}
                  >
                    <Typography variant="small" sx={{ color: 'inherit' }}>
                      {showDetailsB ? 'Hide' : 'See balances after transfer'}
                    </Typography>
                    <Icon icon={showDetailsB ? 'chevron-up' : 'chevron-down'} size="xs" color="primary" />
                  </Box>
                  <Collapse in={showDetailsB}>
                    <Stack spacing={0.5} sx={{ mt: 1 }}>
                      <Typography variant="small" sx={{ color: 'text.primary', display: 'block', mb: 0.25 }}>Your account balances after transfer:</Typography>
                      {accounts.map((account) => (
                        <Stack key={account.id} direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }} spacing={2}>
                          <Typography variant="small" sx={{ color: 'text.muted' }}>{account.label}</Typography>
                          <Typography variant="small" sx={{ color: 'text.muted', flexShrink: 0 }}>{formatCurrency(0)}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Collapse>
                </Box>
              </Stack>

              <KeyPoint icon="circle-check" title="Invested in 100% Balanced Risk-Adjusted">
                Diversified mix of assets, balanced for growth and stability.
              </KeyPoint>

              <KeyPoint icon="circle-check" title={`${formatCurrency(fortnightlyAmount)} per fortnight payments`}>
                We pay you at the government minimum drawdown rate of{' '}
                <strong>{getMinDrawdownRate(PENSION_ESTIMATE_AGE)}%</strong> for age {PENSION_ESTIMATE_AGE}.
              </KeyPoint>
            </Stack>
          </Box>

          <Divider />

          {/* Supporting detail */}
          <Box sx={{ px: { xs: 3, sm: 4 }, py: { xs: 2.5, sm: 3 } }}>
            <Stack spacing={2}>
              <Alert severity="warning" message="Transferring your full balance will leave $0 in your Accumulation account. Any insurance cover held on that account will be cancelled." />
              <Typography variant="small" sx={{ color: 'text.primary' }}>
                Payments are made fortnightly on a Wednesday. These are estimates. Your actual payments
                may vary slightly as unit prices change each day.
              </Typography>
              <Typography variant="small" sx={{ color: 'text.primary' }}>
                You may also be eligible for a one-off retirement bonus. We&rsquo;ll show you the estimated amount on the next screen.
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Collapse>

      {hasError && (
        <Alert severity="error">
          Please select how you&rsquo;d like to set up your account.
        </Alert>
      )}
    </Stack>
  );
}
