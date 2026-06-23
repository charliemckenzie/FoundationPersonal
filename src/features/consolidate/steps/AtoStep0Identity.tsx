import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DigitalIDV } from '@/features/idv';
import type { UseIdvGate } from '@/features/idv';

export interface AtoStep0IdentityProps {
  gate: UseIdvGate;
}

export function AtoStep0Identity({
  gate,
}: AtoStep0IdentityProps) {
  return (
    <Stack spacing={4}>
      <div>
        <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
          Verify your identity
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted', lineHeight: 1.75 }}>
          To search the ATO for super held in your name, we need to confirm your identity. This
          uses the Equifax IDMatrix + DVS service. Your information is used only for this purpose.
        </Typography>
      </div>

      <DigitalIDV
        state={gate.idvState}
        onChange={gate.setIdvState}
        onSubmit={() => {}}
        loading={gate.status === 'submitting'}
        error=""
        embedded={true}
        hideSubmit={true}
      />
    </Stack>
  );
}
