'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { RadioGroup } from '../../../components/RadioGroup';
import { TextButton } from '../../../components/TextButton';
import { Dialog } from '../../../components/Dialog';
import { IconList } from '../../../components/IconList';
import type { ApplyTo } from '../types';

interface Step2ApplyToProps {
  applyTo: ApplyTo | null;
  isIncomeAccount: boolean;
  onChange: (value: ApplyTo) => void;
}

const INCOME_COMMON_OPTIONS = [
  {
    value: 'income-both' as ApplyTo,
    label: 'Change both balance and payments',
    description: 'Updates where your current balance is invested and which options your payments and withdrawals are taken from.',
  },
];

const INCOME_OTHER_OPTIONS = [
  {
    value: 'income-balance' as ApplyTo,
    label: 'Change current balance only',
    description: 'Updates where your balance is invested. Your payment and withdrawal options remain unchanged.',
  },
  {
    value: 'income-payments' as ApplyTo,
    label: 'Change payment/withdrawal options only',
    description: 'Updates which investment options your future payments and withdrawals are taken from. Your current balance stays invested as-is.',
  },
];

const ACCUM_COMMON_OPTIONS = [
  {
    value: 'all' as ApplyTo,
    label: 'Change both current balance and future contributions',
    description: 'Your entire account will be invested according to your new mix.',
  },
];

const ACCUM_OTHER_OPTIONS = [
  {
    value: 'balance' as ApplyTo,
    label: 'Change current balance only',
    description: 'Updates where your existing balance is invested. Future contributions remain unchanged.',
  },
  {
    value: 'future' as ApplyTo,
    label: 'Change future contributions only',
    description: 'Updates where new contributions are invested. Your current balance remains unchanged.',
  },
];

export function Step2ApplyTo({ applyTo, isIncomeAccount, onChange }: Step2ApplyToProps) {
  const [explainerOpen, setExplainerOpen] = useState(false);

  if (isIncomeAccount) {
    return (
      <>
      <Stack spacing={3}>
        <div>
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            What do you want to change?
          </Typography>
          <Typography variant="body">
            Choose whether to update your balance investment, your payment options, or both.
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextButton
              label="What does this mean?"
              startIcon="circle-info"
              iconStyle="regular"
              iconDirection="left"
              size="medium"
              onClick={() => setExplainerOpen(true)}
            />
          </Box>
        </div>

        <Stack spacing={3}>
          <Stack spacing={1.5}>
            <Typography variant="h6">Most commonly used</Typography>
            <RadioGroup
              options={INCOME_COMMON_OPTIONS}
              variant="boxed"
              value={applyTo ?? ''}
              onChange={(v) => onChange(v as ApplyTo)}
            />
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="h6">Other options</Typography>
            <RadioGroup
              options={INCOME_OTHER_OPTIONS}
              variant="boxed"
              value={applyTo ?? ''}
              onChange={(v) => onChange(v as ApplyTo)}
            />
          </Stack>
        </Stack>
      </Stack>

      <Dialog
        open={explainerOpen}
        onClose={() => setExplainerOpen(false)}
        title="What does this mean?"
        variant="neutral"
        size="medium"
        titleVariant="h4"
        confirmLabel="Got it"
        onConfirm={() => setExplainerOpen(false)}
        hideCancel
      >
        <Stack spacing={2}>
          <Typography variant="body" sx={{ lineHeight: 1.75 }}>
            Your account has two things you can change: where your <strong>current balance</strong> is
            invested, and which options your <strong>future payments and withdrawals</strong> are drawn
            from. These can be set independently.
          </Typography>
          <Typography variant="body" sx={{ lineHeight: 1.75 }}>
            <strong>Change current balance only</strong> — moves the money already in your account
            into a new mix of options. It does not affect where your payments come from.
          </Typography>
          <Typography variant="body" sx={{ lineHeight: 1.75 }}>
            <strong>Change payment/withdrawal options only</strong> — updates which investment options
            your regular payments and lump-sum withdrawals are drawn from. Your existing balance stays
            invested as-is.
          </Typography>
          <Typography variant="body" sx={{ lineHeight: 1.75 }}>
            <strong>Change both</strong> — applies your new mix to both your current balance and your
            payment and withdrawal options at the same time.
          </Typography>
        </Stack>
      </Dialog>
      </>
    );
  }

  return (
    <>
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          What do you want to change?
        </Typography>
        <Typography variant="body">
          Choose whether this change applies to your current balance, future contributions, or both.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextButton
            label="What does this mean?"
            startIcon="circle-info"
            iconStyle="regular"
            iconDirection="left"
            size="medium"
            onClick={() => setExplainerOpen(true)}
          />
        </Box>
      </div>

      <Stack spacing={3}>
        <Stack spacing={1.5}>
          <Typography variant="h6">
            Most commonly used
          </Typography>
          <RadioGroup
            options={ACCUM_COMMON_OPTIONS}
            variant="boxed"
            value={applyTo ?? ''}
            onChange={(v) => onChange(v as ApplyTo)}
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="h6">
            Other options
          </Typography>
          <RadioGroup
            options={ACCUM_OTHER_OPTIONS}
            variant="boxed"
            value={applyTo ?? ''}
            onChange={(v) => onChange(v as ApplyTo)}
          />
        </Stack>
      </Stack>
    </Stack>

    <Dialog
      open={explainerOpen}
      onClose={() => setExplainerOpen(false)}
      title="What does this mean?"
      variant="neutral"
      size="medium"
      titleVariant="h4"
      confirmLabel="Got it"
      onConfirm={() => setExplainerOpen(false)}
      hideCancel
    >
      <Stack spacing={2}>
        <Typography variant="body" sx={{ lineHeight: 1.75 }}>
          Your account has two pools of money you can change: your <strong>current balance</strong>{' '}
          (money already in your account) and your <strong>future contributions</strong> (new money
          coming in from your employer or personal payments).
        </Typography>
        <IconList
          size="md"
          items={[
            {
              heading: 'Change both',
              text: 'Applies your new mix to your existing balance and all future contributions at the same time. Choose this if you want a clean break — everything in one go.',
            },
            {
              heading: 'Change current balance only',
              text: 'Switches the money already invested into your new mix. Choose this if you\'re happy with where new contributions go but want to reposition your existing savings.',
            },
            {
              heading: 'Change future contributions only',
              text: 'New money coming in will follow your new mix. Choose this if you want to gradually shift your strategy without moving what\'s already invested.',
            },
          ]}
        />
        <Typography variant="small" sx={{ color: 'text.muted' }}>
          Not sure which to pick? Our{' '}
          <Box component="span" sx={{ color: 'primary.main', cursor: 'pointer', textDecoration: 'underline' }}>
            online advice tool
          </Box>{' '}
          can help you decide based on your situation.
        </Typography>
      </Stack>
    </Dialog>
    </>
  );
}

