import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '@/components/Alert';
import { Checkbox } from '@/components/Checkbox';

export interface AtoStep1ConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function AtoStep1Consent({ checked, onChange }: AtoStep1ConsentProps) {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
          SuperMatch consent
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted', lineHeight: 1.75 }}>
          To find your super, we need your consent to search the Australian Tax Office (ATO)
          SuperMatch service using your Tax File Number (TFN). The search may return active
          accounts, lost member accounts, and any ATO-held money.
        </Typography>
      </div>

      <Alert
        severity="info"
        message="Your TFN is used only to locate super registered in your name. It will not be shared with any third party for any other purpose."
      />

      <Checkbox
        variant="boxed"
        label="I consent to Australian Retirement Trust searching the ATO SuperMatch service for super held in my name using my Tax File Number."
        checked={checked}
        onChange={onChange}
      />
    </Stack>
  );
}
