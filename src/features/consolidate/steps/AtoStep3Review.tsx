import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '@/components/Alert';
import { Checkbox } from '@/components/Checkbox';
import { DescriptionList } from '@/components/DescriptionList';
import { TextButton } from '@/components/TextButton';
import { MOCK_TARGET_ACCOUNT } from '../mockData';
import { formatCurrency, calculateAtoTotal } from '../utils';
import type { FoundFund } from '../types';

export interface AtoStep3ReviewProps {
  funds: FoundFund[];
  declarationChecked: boolean;
  onDeclarationChange: (checked: boolean) => void;
  onEdit: () => void;
  error?: string;
}

export function AtoStep3Review({
  funds,
  declarationChecked,
  onDeclarationChange,
  onEdit,
  error,
}: AtoStep3ReviewProps) {
  const total = calculateAtoTotal(funds);

  return (
    <Stack spacing={4}>
      <div>
        <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
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
        <Typography variant="body" sx={{ fontWeight: 600, display: 'block', mb: 2 }}>
          Transferring to
        </Typography>
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
            <TextButton onClick={onEdit} startIcon="pen">
              Edit
            </TextButton>
          </Box>
          <DescriptionList>
            <DescriptionList.Item label="Fund" value={fund.fundName} />
            <DescriptionList.Item label="Account" value={fund.accountNumber} />
            <DescriptionList.Item label="Balance" value={formatCurrency(fund.balance)} />
          </DescriptionList>
        </Box>
      ))}

      <Box
        sx={{
          p: 3,
          bgcolor: 'surface.secondary',
          borderRadius: (t) => `${(t.shape as { md: number }).md}px`,
        }}
      >
        <DescriptionList>
          <DescriptionList.Item label="Total amount" value={formatCurrency(total)} />
          <DescriptionList.Item label="Investment strategy" value="Your current investment strategy" />
        </DescriptionList>
      </Box>

      <Alert severity="info" message="Transferred funds will be invested according to your current investment strategy." />

      <Checkbox
        variant="boxed"
        label="I authorise the transfer of my super from the accounts listed above. I understand this may affect any insurance cover or benefits I have with those funds."
        checked={declarationChecked}
        onChange={onDeclarationChange}
        error={!!error}
        errorMessage={error}
      />
    </Stack>
  );
}
