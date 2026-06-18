import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Alert } from '../../../components/Alert';
import { Icon } from '../../../components/Icon';
import { RadioGroup } from '../../../components/RadioGroup';
import { PENSION_ESTIMATE_AGE } from '../constants';
import type { FundingAccount, SetupMode } from '../types';
import { estimatePension, formatCurrency } from '../utils';

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
    description: "We'll handle everything — you can always change it later.",
  },
  {
    value: 'custom',
    label: "No, I'd like to customise",
    description: 'Choose your own funding amount, payment schedule, investment mix, and drawdown order.',
  },
];

export function StepSetupMode({ setupMode, onSetupModeChange, accounts, showValidation }: StepSetupModeProps) {
  const hasError = showValidation && setupMode === null;

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
          {/* Header — amount being transferred */}
          <Box sx={{ px: { xs: 3, sm: 4 }, py: { xs: 3, sm: 3 }, bgcolor: 'background.default' }}>
            <Typography variant="small" sx={{ color: 'text.primary', display: 'block', mb: 0.5 }}>
              Available funds as at {TODAY}
            </Typography>
            <Typography variant="h4">{formatCurrency(totalBalance)}</Typography>
          </Box>

          {/* Arrow divider */}
          <Box sx={{ position: 'relative', height: 0 }}>
            <Box
              sx={{
                position: 'absolute',
                left: { xs: 24, sm: 32 },
                top: '-1.25rem',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                border: '1px solid',
                borderColor: 'border.default',
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}
            >
              <Icon icon="arrow-down" size="sm" color="primary" />
            </Box>
          </Box>

          {/* Body */}
          <Box
            sx={{
              px: { xs: 3, sm: 4 },
              pt: { xs: 5, sm: 5 },
              pb: { xs: 3, sm: 4 },
              borderTop: '1px solid',
              borderColor: 'border.subtle',
            }}
          >
            <Stack spacing={3}>
              {/* Full balance transfer row */}
              <Stack direction="row" spacing={3} divider={<Divider orientation="vertical" flexItem />}>
                <Box>
                  <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mb: 0.25 }}>
                    Amount to transfer
                  </Typography>
                  <Typography variant="h5">{formatCurrency(totalBalance)}</Typography>
                  <Typography variant="small" sx={{ color: 'text.muted' }}>Full balance</Typography>
                </Box>
                <Box>
                  <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mb: 0.25 }}>
                    Remaining in accumulation
                  </Typography>
                  <Typography variant="h5">{formatCurrency(0)}</Typography>
                  <Typography variant="small" sx={{ color: 'text.muted' }}>After transfer</Typography>
                </Box>
              </Stack>

              <Alert severity="warning" message="Transferring your full balance will leave $0 in your Accumulation account. Any insurance cover held on that account will be cancelled." />

              <Divider />

              {/* Investment option */}
              <Box>
                <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mb: 0.25 }}>
                  Investment option
                </Typography>
                <Typography variant="body" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Balanced Risk-Adjusted
                </Typography>
                <Typography variant="small" sx={{ color: 'text.muted', display: 'block' }}>
                  Diversified mix of assets, balanced for growth and stability
                </Typography>
              </Box>

              <Divider />

              {/* Payment estimate */}
              <Stack direction="row" spacing={3} divider={<Divider orientation="vertical" flexItem />}>
                <Box>
                  <Typography variant="h5" sx={{ color: 'text.heading' }}>
                    {formatCurrency(estimate?.annual ?? 0)}
                  </Typography>
                  <Typography variant="small" sx={{ color: 'text.primary' }}>Year 1 income</Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ color: 'text.heading' }}>
                    {formatCurrency(fortnightlyAmount)}
                  </Typography>
                  <Typography variant="small" sx={{ color: 'text.primary' }}>Fortnightly payments</Typography>
                </Box>
              </Stack>

              <Typography variant="small" sx={{ color: 'text.muted' }}>
                Estimates based on the government minimum drawdown rate for age {PENSION_ESTIMATE_AGE} (5% per year).
                Paid fortnightly on Wednesdays. Your actual payments may be higher.
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Collapse>

      {hasError && (
        <Alert severity="error">
          Please select how you'd like to set up your account.
        </Alert>
      )}
    </Stack>
  );
}
