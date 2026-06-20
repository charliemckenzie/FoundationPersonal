import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@/components/Button';
import { TextButton } from '@/components/TextButton';
import { FundDetailFields } from '../components/FundDetailFields';
import type { ExternalFund, TransferAmount } from '../types';

export interface ManualStep1FundsProps {
  funds: ExternalFund[];
  onChange: (funds: ExternalFund[]) => void;
  errors?: Record<string, Record<string, string>>;
}

export function ManualStep1Funds({ funds, onChange, errors = {} }: ManualStep1FundsProps) {
  function handleAddFund() {
    const newFund: ExternalFund = {
      id: `fund-${Date.now()}`,
      fundName: '',
      abn: '',
      usi: '',
      esa: '',
      fundPhone: '',
      memberNumber: '',
      amount: { type: 'full' },
    };
    onChange([...funds, newFund]);
  }

  function handleRemoveFund(id: string) {
    if (funds.length === 1) return;
    onChange(funds.filter((f) => f.id !== id));
  }

  function handleFieldChange(id: string, field: string, value: string | boolean | TransferAmount) {
    onChange(
      funds.map((f) =>
        f.id === id
          ? {
              ...f,
              [field]: value,
            }
          : f,
      ),
    );
  }

  return (
    <Stack spacing={4}>
      <div>
        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
          Fund details
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted', lineHeight: 1.75 }}>
          Enter the details for each fund you want to transfer. You can add up to 4 funds.
        </Typography>
      </div>

      <Stack spacing={3}>
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
            <Stack spacing={3}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body" sx={{ fontWeight: 600 }}>
                  {funds.length > 1 ? `Fund ${index + 1}` : 'Fund details'}
                </Typography>
                {funds.length > 1 && (
                  <TextButton
                    label="Remove"
                    onClick={() => handleRemoveFund(fund.id)}
                    startIcon="trash-can"
                    color="primary"
                  />
                )}
              </Box>

              <FundDetailFields
                fundName={fund.fundName}
                abn={fund.abn}
                usi={fund.usi}
                esa={fund.esa}
                fundPhone={fund.fundPhone}
                memberNumber={fund.memberNumber}
                amount={fund.amount}
                onChange={(field, value) => handleFieldChange(fund.id, field, value)}
                errors={errors[fund.id]}
              />
            </Stack>
          </Box>
        ))}
      </Stack>

      {funds.length < 4 && (
        <Box>
          <Button label="Add another fund" variant="outlined" onClick={handleAddFund} startIcon="plus" />
        </Box>
      )}
    </Stack>
  );
}
