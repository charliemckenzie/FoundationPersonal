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
          Before you start
        </Typography>
        <Typography variant="body">
          Use this form to open a Lifetime Pension account. Here&rsquo;s what to expect.
        </Typography>
      </div>

      <IconList
        items={[
          { text: 'Takes around 10 minutes to complete' },
          { text: 'Minimum purchase amount of $10,000' },
          { text: 'You may need to confirm your identity before your application is processed' },
          { text: 'Your payments will start from the next business day after processing' },
        ]}
      />

      <Divider sx={{ borderColor: 'border.subtle' }} />

      <Stack spacing={1.5}>
        <Typography variant="h6">Important information</Typography>
        <Stack
          component="ul"
          spacing={1}
          sx={{ m: 0, pl: 2.5 }}
        >
          <Typography component="li" variant="small">
            This is a <strong>permanent purchase</strong> after a 6-month cooling-off period. Funds cannot be withdrawn after this point, except in the case of a terminal medical condition if money-back protection is payable.
          </Typography>
          <Typography component="li" variant="small">
            Leave at least <strong>$10,000</strong> in your accumulation account to maintain any insurance cover you may hold. Falling below this balance may cause your insurance to be cancelled.
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
        label="I have read and reviewed the information and I am ready to complete the application. I also confirm that I have received, read and understood the accompanying Super Savings Product Disclosure Statement for Income Account and Lifetime Pension (PDS) which summarises the significant information about the product."
      />
      <Checkbox
        variant="default"
        checked={declarationPermanent}
        onChange={onDeclarationPermanentChange}
        error={showValidation && !declarationPermanent}
        errorMessage={
          showValidation && !declarationPermanent
            ? 'Please confirm you understand the permanent purchase terms.'
            : undefined
        }
        label="I understand Lifetime Pension is a permanent purchase after a 6-month cooling-off period and funds cannot be withdrawn after this point, except in the case of a terminal medical condition if money-back protection is payable."
      />
    </Stack>
  );
}
