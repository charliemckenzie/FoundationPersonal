import Box from '@mui/material/Box';
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
    <Stack spacing={4}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Before you start
        </Typography>
        <Typography variant="body">
          Use this form to open a Retirement Income account. Here&rsquo;s what to expect.
        </Typography>
      </div>

      <IconList
        items={[
          { text: 'You must open your account with a balance greater than $0.' },
          { text: 'You may need to confirm your identity before your application is processed' },
        ]}
      />

      {/* Important to note — grey callout to give it visual weight */}
      <Box
        sx={{
          backgroundColor: 'action.hover',
          borderRadius: (t) => `${t.shape.lg}px`,
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 1.5 }}>Important to note</Typography>
        <Stack component="ul" spacing={1} sx={{ m: 0, pl: 2.5 }}>
          <Typography component="li" variant="body" sx={{ color: 'text.primary' }}>
            Leave at least <strong>$6,000</strong> in your accumulation account if you wish to keep it open.
          </Typography>
          <Typography component="li" variant="body" sx={{ color: 'text.primary' }}>
            <strong>Tax contributions:</strong> If you claimed a tax deduction on voluntary contributions in the current or last financial year, you must have confirmation. Without it, we cannot process your notice of deduction.
          </Typography>
        </Stack>
      </Box>

      <Divider sx={{ borderColor: 'border.subtle' }} />

      {/* Declarations */}
      <Stack spacing={2}>
        <Typography variant="h6">Before you continue, please confirm</Typography>
        <Checkbox
          variant="default"
          checked={declarationRead}
          onChange={onDeclarationReadChange}
          error={showValidation && !declarationRead}
          errorMessage={
            showValidation && !declarationRead
              ? 'Please confirm you understand the insurance cover requirement.'
              : undefined
          }
          label="I understand that if I have insurance cover on my accumulation account, I need to leave at least $6,000 in that account for my cover to continue."
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
    </Stack>
  );
}
