import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert, SEVERITY_ICONS } from '../../../components/Alert';
import { Icon } from '../../../components/Icon';
import { RadioGroup } from '../../../components/RadioGroup';
import type { EligibilityAnswer } from '../types';

interface StepEligibilityProps {
  retiredFromWork: EligibilityAnswer;
  leftEmployerAfter60: EligibilityAnswer;
  onRetiredFromWorkChange: (value: EligibilityAnswer) => void;
  onLeftEmployerAfter60Change: (value: EligibilityAnswer) => void;
  eligible: boolean;
  showValidation: boolean;
}

const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

export function StepEligibility({
  retiredFromWork,
  leftEmployerAfter60,
  onRetiredFromWorkChange,
  onLeftEmployerAfter60Change,
  eligible,
  showValidation,
}: StepEligibilityProps) {
  const isComplete = retiredFromWork === 'yes' || (retiredFromWork === 'no' && Boolean(leftEmployerAfter60));

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <div>
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            Confirm this account is right for me
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Answer the eligibility questions below before you continue.
          </Typography>
        </div>

      <Stack
        spacing={3}
        sx={{
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: (t) => `${t.shape.md}px`,
          backgroundColor: 'background.paper',
          p: 3,
        }}
      >
        <RadioGroup
          legend="Have you permanently retired from work?"
          legendSx={{ typography: 'h6', color: 'text.heading', fontWeight: 700, '&.Mui-focused': { color: 'text.heading' } }}
          helperText={
            <>
              This means you were in paid employment for at least 10 hours a week and{' '}
              <Box component="span" sx={{ fontWeight: 700 }}>
                now you do not intend to work 10 or more hours in any given future week.
              </Box>
            </>
          }
          helperTextPosition="top"
          value={retiredFromWork}
          options={YES_NO_OPTIONS}
          direction="row"
          onChange={(value) => onRetiredFromWorkChange(value as EligibilityAnswer)}
        />

        {retiredFromWork === 'no' && (
          <Box sx={{ pt: 1 }}>
          <RadioGroup
            legend="Have you left an employer on or after turning 60?"
            legendSx={{ typography: 'h6', color: 'text.heading', fontWeight: 700, mb: 2, '&.Mui-focused': { color: 'text.heading' } }}
            value={leftEmployerAfter60}
            options={YES_NO_OPTIONS}
            direction="row"
            onChange={(value) => onLeftEmployerAfter60Change(value as EligibilityAnswer)}
          />
          </Box>
        )}

        {eligible && Boolean(retiredFromWork) && (
          <Alert
            severity="success"
            title="You are eligible for a Retirement Income account"
            message="You can continue setting up your Retirement Income account."
            icon={<Icon icon={SEVERITY_ICONS.success} color="inherit" size="lg" />}
          />
        )}

        {!eligible && isComplete && (
          <Alert
            severity="warning"
            title="You are not eligible for this account yet"
            message="To open a Retirement Income account, you will need to be permanently retired or have left an employer on or after turning 60."
            icon={<Icon icon={SEVERITY_ICONS.info} color="inherit" size="lg" />}
          />
        )}

        {showValidation && !eligible && isComplete && (
          <Typography variant="small" sx={{ color: 'error.main' }}>
            You cannot proceed with this application. Please go back or exit.
          </Typography>
        )}

        {showValidation && !isComplete && (
          <Alert
            severity="error"
            message="Please answer the eligibility question above to continue."
          />
        )}
      </Stack>
      </Stack>
    </Stack>
  );
}
