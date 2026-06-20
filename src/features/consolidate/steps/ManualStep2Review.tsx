import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DescriptionList } from '@/components/DescriptionList';
import { TextButton } from '@/components/TextButton';
import { Checkbox } from '@/components/Checkbox';
import { Alert } from '@/components/Alert';
import { MOCK_TARGET_ACCOUNT } from '../mockData';
import { formatCurrency } from '../utils';
import type { ExternalFund } from '../types';

export interface ManualStep2ReviewProps {
  funds: ExternalFund[];
  declarationChecked: boolean;
  onDeclarationChange: (checked: boolean) => void;
  onEdit: () => void;
  error?: string;
}

export function ManualStep2Review({
  funds,
  declarationChecked,
  onDeclarationChange,
  onEdit,
  error,
}: ManualStep2ReviewProps) {
  return (
    <Stack spacing={4}>
      <div>
        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
          Review and submit
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted', lineHeight: 1.75 }}>
          Check the details below before submitting your consolidation request.
        </Typography>
      </div>

      <Box
        sx={{
          p: 3,
          bgcolor: 'surface.secondary',
          borderRadius: (t) => `${(t.shape as { md: number }).md}px`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="body" sx={{ fontWeight: 600 }}>
            Transferring to
          </Typography>
        </Box>
        <DescriptionList>
          <DescriptionList.Item label="Account" value={MOCK_TARGET_ACCOUNT.name} />
          <DescriptionList.Item label="Account number" value={MOCK_TARGET_ACCOUNT.accountNumber} />
        </DescriptionList>
      </Box>

      {funds.map((fund, index) => (
        <Box
          key={fund.id}
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: (t) => `${(t.shape as { md: number }).md}px`,
            bgcolor: 'background.paper',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="body" sx={{ fontWeight: 600 }}>
              {funds.length > 1 ? `Fund ${index + 1}` : 'Fund to transfer'}
            </Typography>
            <TextButton label="Edit" onClick={onEdit} startIcon="pen" />
          </Box>
          <DescriptionList>
            <DescriptionList.Item label="Fund name" value={fund.fundName} />
            <DescriptionList.Item label="ABN" value={fund.abn} />
            {fund.usi && <DescriptionList.Item label="USI" value={fund.usi} />}
            <DescriptionList.Item label="Your member number" value={fund.memberNumber} />
            <DescriptionList.Item
              label="Amount"
              value={fund.amount.type === 'full' ? 'Full balance' : formatCurrency(fund.amount.amount ?? 0)}
            />
          </DescriptionList>
        </Box>
      ))}

      <Alert severity="info" message="Transferred funds will be invested according to your current investment strategy." />

      <Checkbox
        label="I authorise the transfer of my super from the fund(s) listed above. I understand this may affect any insurance cover or benefits I have with those funds."
        checked={declarationChecked}
        onChange={onDeclarationChange}
        variant="boxed"
        error={!!error}
        errorMessage={error}
      />
    </Stack>
  );
}
