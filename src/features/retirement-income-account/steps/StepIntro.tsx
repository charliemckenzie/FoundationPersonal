import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Checkbox } from '../../../components/Checkbox';
import { IconList } from '../../../components/IconList';

interface StepIntroProps {
  declarationRead: boolean;
  declarationPermanent: boolean;
  showValidation: boolean;
  onDeclarationReadChange: (checked: boolean) => void;
  onDeclarationPermanentChange: (checked: boolean) => void;
}

export function StepIntro({
  declarationRead,
  declarationPermanent,
  showValidation,
  onDeclarationReadChange,
  onDeclarationPermanentChange,
}: StepIntroProps) {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Eligibility Criteria
        </Typography>
        <Typography variant="body">
          You must meet the following criteria before opening a Retirement Income account.
        </Typography>
      </div>

      <IconList
        items={[
          {
            text: 'Aged 60+. If you are aged 60-64, you must meet at least one access condition. If you are aged 65 or over, you automatically qualify to open an account.',
          },
          { text: 'You must open your account with a balance greater than $0.' },
          {
            text: 'Be able to verify identity. We may require a Driver\'s licence, Passport, or Medicare card. If online verification fails, certified documents must be posted.',
          },
        ]}
      />

      <Divider sx={{ borderColor: 'border.subtle' }} />

      <Stack spacing={1.5}>
        <Typography variant="h6">Important to note</Typography>
        <Stack
          component="ul"
          spacing={1}
          sx={{ m: 0, pl: 2.5 }}
        >
          <Typography component="li" variant="small">
            Leave at least <strong>$10,000</strong> in your accumulation account if you wish to keep it open.
          </Typography>
          <Typography component="li" variant="small">
            <strong>Tax contributions:</strong> If you claimed a tax deduction on voluntary contributions in the current or last financial year, you must have confirmation. Without it, we cannot process your notice of deduction.
          </Typography>
        </Stack>
      </Stack>

      <Checkbox
        variant="default"
        checked={declarationRead}
        onChange={onDeclarationReadChange}
        error={showValidation && !declarationRead}
        errorMessage={
          showValidation && !declarationRead
            ? 'Please confirm you have reviewed the information and PDS.'
            : undefined
        }
        label="I have enough money in my accumulation account/s to transfer an amount greater than $0 to start a Retirement Income account and leave at least $10,000 in my accumulation account if I want my insurance cover to continue."
      />
      <Checkbox
        variant="default"
        checked={declarationPermanent}
        onChange={onDeclarationPermanentChange}
        error={showValidation && !declarationPermanent}
        errorMessage={
          showValidation && !declarationPermanent
            ? 'Please confirm you have reviewed the identity and PDS requirements.'
            : undefined
        }
        label="I have read and reviewed the information and have all the listed ID documents ready to complete the application. I also confirm that I have received, read and understood the accompanying Super Savings Product Disclosure Statement for Income Account and Lifetime Pension (PDS) which summarises the significant information about the product."
      />
    </Stack>
  );
}
