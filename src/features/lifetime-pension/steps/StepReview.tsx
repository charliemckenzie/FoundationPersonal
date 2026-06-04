import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { Checkbox } from '../../../components/Checkbox';
import { DescriptionList } from '../../../components/DescriptionList';
import { TextButton } from '../../../components/TextButton';
import type { LifetimePensionState, LifetimePensionStepId } from '../types';
import { formatCurrency, totalSelectedAmount } from '../utils';

interface StepReviewProps {
  state: LifetimePensionState;
  onEditStep: (stepId: LifetimePensionStepId) => void;
  onDeclarationChange: (checked: boolean) => void;
  showValidation: boolean;
}

function eligibilityLabel(state: LifetimePensionState): string {
  const retired = state.retiredFromWork === 'yes' ? 'Retired from work' : 'Not retired from work';
  const leftEmployer = state.leftEmployerAfter60 === 'yes'
    ? 'Left employer on/after turning 60'
    : 'Did not leave employer on/after turning 60';
  return `${retired} · ${leftEmployer}`;
}

function optionLabel(state: LifetimePensionState): string {
  if (state.pensionOption === 'single') {
    return 'Single option';
  }
  if (state.pensionOption === 'spouse') {
    return 'Spouse protection option';
  }
  return 'Not selected';
}

export function StepReview({
  state,
  onEditStep,
  onDeclarationChange,
  showValidation,
}: StepReviewProps) {
  const selectedAccounts = state.accounts.filter((account) => account.selected);
  const purchasePrice = totalSelectedAmount(state);

  return (
    <Stack spacing={4}>
      <Typography component="h1" variant="h2">
        Review
      </Typography>

      <Stack spacing={2}>
        <div>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Review and submit
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Take a moment to confirm your details before submitting.
          </Typography>
        </div>

      <DescriptionList density="condensed" title="Lifetime Pension application">
        <DescriptionList.Item
          label="Eligibility"
          value={eligibilityLabel(state)}
          action={<TextButton label="Edit" hideIcon onClick={() => onEditStep('eligibility')} />}
        />
        <DescriptionList.Item
          label="Option"
          value={optionLabel(state)}
          action={<TextButton label="Edit" hideIcon onClick={() => onEditStep('option')} />}
        />
        <DescriptionList.Item
          label="Purchase price"
          value={formatCurrency(purchasePrice)}
          action={<TextButton label="Edit" hideIcon onClick={() => onEditStep('funding')} />}
        />
        <DescriptionList.Item
          label="Funding preferences"
          value={
            <Stack spacing={0.5}>
              {selectedAccounts.map((account) => (
                <Typography variant="small" key={account.id}>
                  {`${account.label}: ${formatCurrency(account.transferAmount)}`}
                </Typography>
              ))}
            </Stack>
          }
        />
        <DescriptionList.Item
          label="Bank account"
          value={`${state.bankDetails.bsb} · ${state.bankDetails.accountNumber} · ${state.bankDetails.accountName}`}
          action={<TextButton label="Edit" hideIcon onClick={() => onEditStep('payments')} />}
        />
      </DescriptionList>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: (t) => `${t.shape.md}px`,
          backgroundColor: 'background.paper',
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5">Declaration and authorisation</Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            I confirm this application is accurate and I have reviewed the product disclosure statement.
          </Typography>
          <Checkbox
            variant="boxed"
            checked={state.reviewDeclarationChecked}
            onChange={onDeclarationChange}
            label="I accept these declarations and understand purchasing a Lifetime Pension account is a permanent purchase after the cooling-off period."
          />
        </Stack>
      </Box>

      {showValidation && !state.reviewDeclarationChecked && (
        <Alert severity="error" message="Accept the declaration before you submit." />
      )}
      </Stack>
    </Stack>
  );
}
