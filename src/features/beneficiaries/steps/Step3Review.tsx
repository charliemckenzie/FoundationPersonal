'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DescriptionList } from '../../../components/DescriptionList';
import { IconButton } from '../../../components/IconButton';
import { Checkbox } from '../../../components/Checkbox';
import { Alert } from '../../../components/Alert';
import type { BeneficiaryDraft, ExpiryOption } from '../types';
import { formatDate, relationshipLabel, expiryLabel } from '../utils';

interface Step3ReviewProps {
  beneficiaries: BeneficiaryDraft[];
  expiry: ExpiryOption;
  declarationChecked: boolean;
  onDeclarationChange: (checked: boolean) => void;
  onEditBeneficiaries: () => void;
  onEditExpiry: () => void;
  error: string | null;
}

function BeneficiaryValue({ b }: { b: BeneficiaryDraft }) {
  const details = [
    relationshipLabel(b.relationship),
    b.dateOfBirth ? formatDate(b.dateOfBirth) : null,
    b.phone || null,
    b.email || null,
  ].filter(Boolean);

  return (
    <Stack spacing={0.25}>
      <Typography variant="body" sx={{ fontWeight: 700 }}>
        {b.firstName} {b.lastName}
      </Typography>
      <Typography variant="body">Allocation {b.allocation}%</Typography>
      {details.map((d) => (
        <Typography key={d} variant="small" sx={{ color: 'text.muted' }}>{d}</Typography>
      ))}
    </Stack>
  );
}

const DECLARATION_POINTS = [
  'This nomination is a binding death benefit nomination.',
  'The trustee is legally bound to pay my death benefit in accordance with this nomination, provided it is valid.',
  'I should review this nomination regularly to ensure it reflects my current circumstances.',
  'The persons named above are eligible to receive my death benefit as defined in the fund’s trust deed.',
];

export function Step3Review({
  beneficiaries,
  expiry,
  declarationChecked,
  onDeclarationChange,
  onEditBeneficiaries,
  onEditExpiry,
  error,
}: Step3ReviewProps) {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>Review your nomination</Typography>
      </div>

      {error && <Alert severity="error" message={error} />}

      <DescriptionList>
        {beneficiaries.map((b, i) => (
          <DescriptionList.Item
            key={b.id}
            label={`Beneficiary ${i + 1}`}
            value={<BeneficiaryValue b={b} />}
            action={
              <IconButton
                icon="pen"
                label={`Edit beneficiary ${i + 1}`}
                variant="ghost"
                size="small"
                onClick={onEditBeneficiaries}
              />
            }
          />
        ))}
        <DescriptionList.Item
          label="Nomination expiry"
          value={expiryLabel(expiry)}
          action={
            <IconButton
              icon="pen"
              label="Edit nomination expiry"
              variant="ghost"
              size="small"
              onClick={onEditExpiry}
            />
          }
        />
      </DescriptionList>

      <div>
        <Typography variant="h5" sx={{ mb: 2 }}>Declaration</Typography>
        <Box
          sx={{
            bgcolor: 'background.default',
            border: '1px solid',
            borderColor: 'border.subtle',
            borderRadius: (t) => `${t.shape.sm}px`,
            px: 3,
            py: 2.5,
            mb: 2,
          }}
        >
          <Typography variant="body" sx={{ mb: 1.5, display: 'block' }}>I understand that:</Typography>
          <Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2.5 }}>
            {DECLARATION_POINTS.map((point) => (
              <Typography key={point} component="li" variant="body">{point}</Typography>
            ))}
          </Stack>
        </Box>
        <Checkbox
          label="I confirm all information above is correct and I understand the implications of this binding death benefit nomination."
          checked={declarationChecked}
          onChange={onDeclarationChange}
        />
      </div>
    </Stack>
  );
}
