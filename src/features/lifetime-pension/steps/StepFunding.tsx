import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert, SEVERITY_ICONS } from '../../../components/Alert';
import { Checkbox } from '../../../components/Checkbox';
import { Icon } from '../../../components/Icon';
import { TextField } from '../../../components/TextField';
import { Tooltip } from '../../../components/Tooltip';
import { MIN_PURCHASE_AMOUNT } from '../constants';
import type { FundingAccount } from '../types';
import { formatCurrency } from '../utils';

interface StepFundingProps {
  accounts: FundingAccount[];
  totalAmount: number;
  hasSelectedAccount: boolean;
  hasEnoughFunds: boolean;
  hasInvalidTransferAmounts: boolean;
  onToggleAccount: (id: string, checked: boolean) => void;
  onTransferAmountChange: (id: string, amount: number) => void;
  showValidation: boolean;
}

function parseMoney(value: string): number {
  const parsed = Number(value.replace(/,/g, ''));
  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
}

export function StepFunding({
  accounts,
  totalAmount,
  hasSelectedAccount,
  hasEnoughFunds,
  hasInvalidTransferAmounts,
  onToggleAccount,
  onTransferAmountChange,
  showValidation,
}: StepFundingProps) {
  return (
    <Stack spacing={4}>
      <Typography component="h1" variant="h2">
        Purchase price and funding
      </Typography>

      <Stack spacing={2}>
        <div>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Your purchase details
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Enter the amount you want to buy and choose the account(s) to transfer from.
          </Typography>
        </div>

      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: (t) => `${t.shape.md}px`,
          backgroundColor: 'background.paper',
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <div>
            <Typography variant="h5" sx={{ mb: 1 }}>Purchase and transfer from</Typography>
            <Typography variant="small" sx={{ color: 'text.primary' }}>
              All balances accurate as of 12 June 2025.
            </Typography>
          </div>

          {accounts.map((account) => (
            <Box
              key={account.id}
              sx={{
                border: '1px solid',
                borderColor: account.selected ? 'primary.main' : 'border.default',
                borderRadius: (t) => `${t.shape.sm}px`,
                px: 2,
                py: 1.5,
                bgcolor: account.selected ? 'action.hover' : 'background.default',
              }}
            >
              <Stack spacing={1.25}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'flex-start' }}>
                  <Checkbox
                    checked={account.selected}
                    onChange={(checked) => onToggleAccount(account.id, checked)}
                    label={account.label}
                  />
                  <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading' }}>
                    {formatCurrency(account.balance)}
                  </Typography>
                </Box>

                {account.selected && (
                  <TextField
                    label="Transfer amount"
                    fullWidth
                    value={account.transferAmount > 0 ? String(account.transferAmount) : ''}
                    startAdornment="$"
                    onChange={(event) => {
                      const clamped = Math.min(parseMoney(event.target.value), account.balance);
                      onTransferAmountChange(account.id, clamped);
                    }}
                    helperText={`Available balance: ${formatCurrency(account.balance - account.transferAmount)}`}
                  />
                )}
              </Stack>
            </Box>
          ))}

          <Box sx={{ pt: 1, pb: 1 }}>
            <Divider />
          </Box>

          <Box>
            {totalAmount >= MIN_PURCHASE_AMOUNT && (
              <Box sx={{ mb: 3 }}>
                <Alert
                  severity="info"
                  title="You're eligible for a Retirement bonus!"
                  message="Your estimated bonus will be shown in the next step."
                  icon={<Icon icon={SEVERITY_ICONS.info} color="inherit" size="lg" />}
                />
              </Box>
            )}
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: (t) => `${t.shape.sm}px`,
                p: 2,
                backgroundColor: 'background.default',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                <div>
                  <Typography variant="body" sx={{ fontWeight: 700, color: 'text.heading' }}>
                    Purchase price (minimum {formatCurrency(MIN_PURCHASE_AMOUNT)})
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5 }}>
                    <Typography variant="small" sx={{ color: 'text.muted' }}>
                      This amount could be subject to change
                    </Typography>
                    <Tooltip title="The final purchase price may be adjusted based on updated fund information before your application is processed." placement="top">
                      <Box component="span" sx={{ display: 'inline-flex', color: 'info.main', cursor: 'help' }}>
                        <Icon icon="circle-info" size="sm" color="info" />
                      </Box>
                    </Tooltip>
                  </Box>
                </div>
                <Typography variant="h6" sx={{ whiteSpace: 'nowrap', color: 'text.heading' }}>{formatCurrency(totalAmount)}</Typography>
              </Box>
            </Box>
          </Box>

          {showValidation && hasSelectedAccount && (!hasEnoughFunds || hasInvalidTransferAmounts) && (
            <Alert
              severity="error"
              message="You do not have enough funds to start this account. Increase your selected transfer amounts or choose different accounts."
            />
          )}

          {showValidation && !hasSelectedAccount && (
            <Alert
              severity="error"
              message="Select at least one account and enter a transfer amount to continue."
            />
          )}
        </Stack>
      </Box>
      </Stack>
    </Stack>
  );
}
