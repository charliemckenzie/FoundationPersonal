import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Alert } from '@/components/Alert';
import { Checkbox } from '@/components/Checkbox';
import { Chip } from '@/components/Chip';
import { formatCurrency } from '../utils';
import type { FoundFund } from '../types';

export interface FoundFundRowProps {
  fund: FoundFund;
  onChange: (selected: boolean) => void;
}

export function FoundFundRow({ fund, onChange }: FoundFundRowProps) {
  const hasBadges = fund.isAtoHeld || fund.insuranceFlag;

  return (
    <Stack spacing={1}>
      <Checkbox
        variant="boxed"
        label={fund.fundName}
        description={`${fund.accountNumber} · ${formatCurrency(fund.balance)}`}
        checked={fund.selected}
        onChange={onChange}
      />

      {hasBadges && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', px: 0.5 }}>
          {fund.isAtoHeld && (
            <Chip label="ATO-held money" severity="info" size="small" />
          )}
          {fund.insuranceFlag && (
            <Chip label="May include insurance" severity="warning" size="small" />
          )}
        </Box>
      )}

      {fund.selected && fund.insuranceFlag && (
        <Alert
          severity="warning"
          message="This account may include insurance cover. Rolling it in may affect your coverage — check your other fund before proceeding."
        />
      )}
    </Stack>
  );
}
