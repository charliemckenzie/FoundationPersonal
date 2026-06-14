'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { RadioGroup } from '../../../components/RadioGroup';
import { Alert } from '../../../components/Alert';
import { TextButton } from '../../../components/TextButton';
import { Dialog } from '../../../components/Dialog';
import { REBALANCE_FREQUENCY_OPTIONS } from '../types';
import type { InvestmentOption, RebalanceFrequency, RebalanceSetting } from '../types';

interface Step3bRebalanceProps {
  /** Options the member has allocated to (non-zero), used to personalise the example. */
  allocatedOptions: InvestmentOption[];
  /** Balance allocation percentages from the allocations step. */
  allocations: Record<string, number>;
  setting: RebalanceSetting | null;
  onChange: (setting: RebalanceSetting) => void;
}

const KEEP_ON_TRACK_OPTIONS = [
  {
    value: 'yes',
    label: 'Yes, keep my mix on track',
    description: 'We’ll automatically switch your investments back to the percentages you chose, on a regular schedule.',
  },
  {
    value: 'no',
    label: 'No, I’ll manage it myself',
    description: 'Your mix won’t be adjusted automatically. You can come back and change it anytime.',
  },
];

export function Step3bRebalance({
  allocatedOptions,
  allocations,
  setting,
  onChange,
}: Step3bRebalanceProps) {
  const [explainerOpen, setExplainerOpen] = useState(false);
  const choice = setting == null ? '' : setting.enabled ? 'yes' : 'no';
  const frequency: string = setting?.frequency ?? '';

  const chosenMix = allocatedOptions
    .map((o) => ({ id: o.id, name: o.name, pct: allocations[o.id] ?? 0 }))
    .sort((a, b) => b.pct - a.pct);
  const driftOption = chosenMix[0];

  function handleChoiceChange(value: string) {
    // No default frequency — the member must actively pick one (kept if they'd chosen before).
    if (value === 'yes') onChange({ enabled: true, frequency: setting?.frequency });
    else onChange({ enabled: false });
  }

  function handleFrequencyChange(value: string) {
    onChange({ enabled: true, frequency: value as RebalanceFrequency });
  }

  return (
    <>
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Keep your investment mix on track with rebalancing
        </Typography>
        <Typography variant="body" sx={{ lineHeight: 1.75 }}>
          Over time, your investments grow at different speeds, so your money slowly drifts away from
          the mix you chose. That can change how much risk you&apos;re taking without you realising.
          We can automatically switch it back to your chosen mix on a regular basis. This is also
          known as rebalancing.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextButton
            label="What this means for your mix"
            startIcon="circle-info"
            iconStyle="regular"
            iconDirection="left"
            size="medium"
            onClick={() => setExplainerOpen(true)}
          />
        </Box>
      </div>

      <RadioGroup
        legend="Set up automatic rebalancing"
        options={KEEP_ON_TRACK_OPTIONS}
        variant="boxed"
        value={choice}
        onChange={handleChoiceChange}
      />

      {choice === 'yes' && (
        <>
          <Divider sx={{ borderColor: 'border.subtle' }} />
          <Stack spacing={1.5}>
            <RadioGroup
              legend="How often should we do this?"
              options={REBALANCE_FREQUENCY_OPTIONS.map((o) => ({
                value: o.value,
                label: o.label,
                description: o.description,
              }))}
              variant="boxed"
              value={frequency}
              onChange={handleFrequencyChange}
            />
            <Typography variant="small" sx={{ color: 'text.muted' }}>
              If a rebalance date falls on a weekend or public holiday, we use the next business
              day&apos;s unit prices.
            </Typography>
          </Stack>
        </>
      )}

      {choice === 'no' && (
        <Alert
          severity="info"
          message="If you set up automatic rebalancing before, submitting this change will turn it off."
        />
      )}
    </Stack>

    <Dialog
      open={explainerOpen}
      onClose={() => setExplainerOpen(false)}
      title="What this means for your mix"
      variant="info"
      size="medium"
      cancelLabel="Got it"
    >
      <Stack spacing={2}>
        <Typography variant="body" sx={{ lineHeight: 1.75 }}>
          Your investment mix is the set of percentages you chose across your options. Because each
          option grows at a different rate, those percentages drift over time even though you
          haven&apos;t changed anything. As they drift, so does the overall level of risk in your
          account.
        </Typography>
        {driftOption && (
          <Typography variant="body" sx={{ lineHeight: 1.75 }}>
            For example, say {driftOption.name} makes up {driftOption.pct}% of your mix today. If it
            grows faster than your other options, its share creeps higher and quietly lifts your
            overall risk. Rebalancing trims it back to {driftOption.pct}% and tops up the rest,
            restoring the exact mix you chose.
          </Typography>
        )}
        <Typography variant="body" sx={{ lineHeight: 1.75 }}>
          When you turn rebalancing on, we do this for you automatically on the schedule you pick, so
          your mix keeps matching the level of risk you&apos;re comfortable with.
        </Typography>
      </Stack>
    </Dialog>
    </>
  );
}
