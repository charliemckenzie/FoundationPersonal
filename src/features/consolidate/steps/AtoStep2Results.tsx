import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '@/components/Alert';
import { Spinner } from '@/components/Spinner';
import { TextButton } from '@/components/TextButton';
import { Icon } from '@/components/Icon';
import { FoundFundRow } from '../components/FoundFundRow';
import type { FoundFund } from '../types';

export interface AtoStep2ResultsProps {
  loading: boolean;
  done: boolean;
  funds: FoundFund[];
  onFundsChange: (funds: FoundFund[]) => void;
  /** Dev toggle — true shows the empty-state branch. */
  showEmpty: boolean;
  onToggleEmpty: () => void;
}

export function AtoStep2Results({
  loading,
  done,
  funds,
  onFundsChange,
  showEmpty,
  onToggleEmpty,
}: AtoStep2ResultsProps) {
  function handleToggleFund(id: string, selected: boolean) {
    onFundsChange(funds.map((f) => (f.id === id ? { ...f, selected } : f)));
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          py: 8,
        }}
      >
        <Spinner size="large" label="Searching the ATO for your super…" />
      </Box>
    );
  }

  if (done && funds.length === 0) {
    return (
      <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center', py: 4 }}>
        <Icon icon="circle-check" size="4xl" color="success" />
        <div>
          <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
            No other super found
          </Typography>
          <Typography variant="body" sx={{ color: 'text.muted', lineHeight: 1.75 }}>
            We didn&apos;t find any other super accounts in your name. If you think this is
            incorrect, contact your other fund directly.
          </Typography>
        </div>
        <Alert severity="info" message="You can still transfer super manually if you know your other fund's details." />
        <TextButton onClick={onToggleEmpty} startIcon="arrow-rotate-left">
          Show sample results (dev)
        </TextButton>
      </Stack>
    );
  }

  if (!done) {
    return null;
  }

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
          Super found in your name
        </Typography>
        <Typography variant="body" sx={{ color: 'text.muted', lineHeight: 1.75 }}>
          Select the accounts you want to transfer into your Australian Retirement Trust
          Accumulation account. You must select at least one to continue.
        </Typography>
      </div>

      <Stack spacing={2}>
        {funds.map((fund) => (
          <FoundFundRow
            key={fund.id}
            fund={fund}
            onChange={(selected) => handleToggleFund(fund.id, selected)}
          />
        ))}
      </Stack>

      <Box>
        <TextButton onClick={onToggleEmpty} startIcon="circle-exclamation" color="secondary">
          Test empty state (dev)
        </TextButton>
      </Box>
    </Stack>
  );
}
