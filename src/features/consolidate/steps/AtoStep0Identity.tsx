import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { StepIDV, VerifyDetailsContent, MOCK_USER_PROFILE } from '@/features/idv';
import type { UseIdvGate, VerifyDetailsState } from '@/features/idv';

export interface AtoStep0IdentityProps {
  gate: UseIdvGate;
  verifyState: VerifyDetailsState;
  onVerifyStateChange: (next: VerifyDetailsState) => void;
}

export function AtoStep0Identity({
  gate,
  verifyState,
  onVerifyStateChange,
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

      <div>
        <Typography variant="h4" component="h3" sx={{ mb: 2 }}>
          Confirm your details
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted', lineHeight: 1.75, mb: 2 }}>
          Please check that your personal details are correct. Incorrect details — especially your
          address — may cause identity verification to fail.
        </Typography>
        <VerifyDetailsContent
          profile={MOCK_USER_PROFILE}
          state={verifyState}
          onChange={onVerifyStateChange}
          showValidation={false}
        />
      </div>

      <StepIDV
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
