'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { Checkbox } from '../../../components/Checkbox';
import { DescriptionList } from '../../../components/DescriptionList';
import { IconButton } from '../../../components/IconButton';
import { Table } from '../../../components/Table';
import type { TableColumn } from '../../../components/Table';
import type { InvestmentAccount, InvestmentOption, ApplyTo, PaymentPreference } from '../types';
import { applyToLabel, formatCurrency, formatDate, blendedProfile, paymentPreferenceLabel } from '../utils';
import { APPLY_TO_OPTIONS, INCOME_APPLY_TO_OPTIONS } from '../types';

interface Step4ReviewProps {
  accounts: InvestmentAccount[];
  selectedAccountId: string;
  applyTo: ApplyTo;
  options: InvestmentOption[];
  allocations: Record<string, number>;
  paymentPreference?: PaymentPreference | null;
  declarationChecked: boolean;
  onDeclarationChange: (checked: boolean) => void;
  onEditAccount?: () => void;
  onEditApplyTo: () => void;
  onEditAllocations: () => void;
  onEditPaymentPreference?: () => void;
  error: string | null;
}

export function Step4Review({
  accounts,
  selectedAccountId,
  applyTo,
  options,
  allocations,
  paymentPreference,
  declarationChecked,
  onDeclarationChange,
  onEditAccount,
  onEditApplyTo,
  onEditAllocations,
  onEditPaymentPreference,
  error,
}: Step4ReviewProps) {
  const account = accounts.find((a) => a.id === selectedAccountId);
  const allocatedOptions = options.filter((o) => (allocations[o.id] ?? 0) > 0);

  const currentAllocMap = Object.fromEntries(options.map((o) => [o.id, o.currentAllocation]));
  const currentProfile = blendedProfile(options, currentAllocMap);
  const newProfile = blendedProfile(options, allocations);
  const balance = account?.balance ?? 0;
  const currentFeeAmt = (balance * currentProfile.annualFeePercent) / 100;
  const newFeeAmt = (balance * newProfile.annualFeePercent) / 100;
  const today = formatDate(new Date().toISOString());

  const impactColumns: TableColumn<{ id: string; metric: string; current: React.ReactNode; new: React.ReactNode }>[] = [
    { key: 'metric', label: '', width: '33.33%' },
    { key: 'current', label: 'Current', render: (row) => <>{row.current}</> },
    {
      key: 'new',
      label: 'New',
      render: (row) => (
        <Typography component="span" variant="body" sx={{ fontWeight: 700 }}>
          {row.new}
        </Typography>
      ),
    },
  ];

  const impactRows = [
    {
      id: 'risk',
      metric: 'Risk level',
      current: currentProfile.riskLabel,
      new: newProfile.riskLabel,
    },
    {
      id: 'fee',
      metric: 'Annual fee (est.)',
      current: (
        <Stack spacing={0}>
          <Typography variant="body">{formatCurrency(currentFeeAmt)}</Typography>
          <Typography variant="small" sx={{ color: 'text.muted' }}>
            {currentProfile.annualFeePercent.toFixed(2)}% p.a.
          </Typography>
        </Stack>
      ),
      new: (
        <Stack spacing={0}>
          <Typography variant="body" sx={{ fontWeight: 700 }}>{formatCurrency(newFeeAmt)}</Typography>
          <Typography variant="small" sx={{ color: 'text.muted', fontWeight: 700 }}>
            {newProfile.annualFeePercent.toFixed(2)}% p.a.
          </Typography>
        </Stack>
      ),
    },
  ];

  return (
    <Stack spacing={5}>
      <div>
        <Typography variant="h5" sx={{ mb: 2 }}>Review your request</Typography>

        {error && <Alert severity="error" message={error} />}

        <DescriptionList labelWidth="32%">
        <DescriptionList.Item
          label="Account"
          value={
            <Stack spacing={0.25}>
              <Typography variant="body" sx={{ fontWeight: 700 }}>
                {account?.name}
              </Typography>
              <Typography variant="small" sx={{ color: 'text.muted' }}>
                {account?.accountNumber} · {account ? formatCurrency(account.balance) : ''} as at {today}
              </Typography>
            </Stack>
          }
          action={
            <IconButton
              icon="pen"
              label="Edit account"
              variant="ghost"
              size="small"
              onClick={onEditAccount}
            />
          }
        />
        <DescriptionList.Item
          label="Applies to"
          value={
            <Stack spacing={0}>
              <Typography variant="body" sx={{ fontWeight: 700 }}>{applyToLabel(applyTo)}</Typography>
              <Typography variant="small" sx={{ color: 'text.muted' }}>
                {[...APPLY_TO_OPTIONS, ...INCOME_APPLY_TO_OPTIONS].find((o) => o.value === applyTo)?.description}
              </Typography>
            </Stack>
          }
          action={
            <IconButton
              icon="pen"
              label="Edit applies to"
              variant="ghost"
              size="small"
              onClick={onEditApplyTo}
            />
          }
        />
        <DescriptionList.Item
          label="New allocations"
          value={
            <Stack spacing={0.5}>
              {allocatedOptions.map((o) => (
                <Box key={o.id} sx={{ display: 'grid', gridTemplateColumns: '3rem 1fr', gap: 1, alignItems: 'baseline' }}>
                  <Typography variant="body" sx={{ fontWeight: 700 }}>
                    {allocations[o.id]}%
                  </Typography>
                  <Typography variant="body">{o.name}</Typography>
                </Box>
              ))}
            </Stack>
          }
          action={
            <IconButton
              icon="pen"
              label="Edit allocations"
              variant="ghost"
              size="small"
              onClick={onEditAllocations}
            />
          }
        />
        {paymentPreference && onEditPaymentPreference && (
          <DescriptionList.Item
            label="Payment preferences"
            value={
              <Stack spacing={0.5}>
                <Typography variant="body" sx={{ fontWeight: 700 }}>
                  {paymentPreferenceLabel(paymentPreference)}
                </Typography>
                {paymentPreference.type === 'percentage' &&
                  paymentPreference.percentages &&
                  options
                    .filter((o) => (paymentPreference.percentages?.[o.id] ?? 0) > 0)
                    .map((o) => (
                      <Box
                        key={o.id}
                        sx={{ display: 'grid', gridTemplateColumns: '3rem 1fr', gap: 1, alignItems: 'baseline' }}
                      >
                        <Typography variant="body">{paymentPreference.percentages![o.id]}%</Typography>
                        <Typography variant="body">{o.name}</Typography>
                      </Box>
                    ))}
                {paymentPreference.type === 'priority' &&
                  paymentPreference.priorityOrder &&
                  paymentPreference.priorityOrder.map((id, index) => {
                    const opt = options.find((o) => o.id === id);
                    if (!opt) return null;
                    return (
                      <Box
                        key={id}
                        sx={{ display: 'grid', gridTemplateColumns: '3rem 1fr', gap: 1, alignItems: 'baseline' }}
                      >
                        <Typography variant="body" sx={{ color: 'text.muted' }}>
                          {index + 1}.
                        </Typography>
                        <Typography variant="body">{opt.name}</Typography>
                      </Box>
                    );
                  })}
              </Stack>
            }
            action={
              <IconButton
                icon="pen"
                label="Edit payment preferences"
                variant="ghost"
                size="small"
                onClick={onEditPaymentPreference}
              />
            }
          />
        )}
      </DescriptionList>
      </div>

      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          How this affects you
        </Typography>
        <Table
          columns={impactColumns}
          rows={impactRows}
          headerStyle="paper"
        />
        <Typography variant="small" sx={{ color: 'text.muted', mt: 1, display: 'block' }}>
          Fee estimates are based on your selected account's current balance of {formatCurrency(balance)} as at {today}. Other fees may apply. See the relevant PDS for your account type.
        </Typography>
      </Box>

      <div>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Declaration
        </Typography>
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
          <Typography variant="body">
            I confirm that I want to change my investment allocation as shown above, and I understand
            this request will be processed using that business day's unit prices.
          </Typography>
        </Box>
        <Checkbox
          label="I have reviewed the information above and confirm I want to make this change."
          checked={declarationChecked}
          onChange={onDeclarationChange}
        />
      </div>
    </Stack>
  );
}
