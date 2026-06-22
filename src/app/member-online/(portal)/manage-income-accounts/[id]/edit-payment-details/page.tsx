'use client';

import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter, useParams } from 'next/navigation';
import { ContentContainer, MOBreadcrumb } from '../../../../../../components/MemberOnline';
import { FormProgress } from '../../../../../../components/FormProgress';
import { StepperActions } from '../../../../../../components/StepperActions';
import { StepTransition } from '../../../../../../components/StepTransition';
import { Select } from '../../../../../../components/Select';
import { Button } from '../../../../../../components/Button';
import { Icon } from '../../../../../../components/Icon';
import { MOCK_INCOME_ACCOUNTS } from '../../mockData';
import { formatCurrency as _fc } from '../../../../../../lib/format';

// ── Frequency / date helpers (mirrors StepPaymentSchedule logic) ──────────────

const FREQUENCY_OPTIONS = [
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'half-yearly', label: 'Every 6 months' },
  { value: 'annually', label: 'Annually' },
];

const FREQUENCY_HELPER: Record<string, string> = {
  fortnightly: 'Payments will be made fortnightly on a Wednesday.',
  monthly: 'Payments will begin on the 11th of your chosen month and monthly thereafter.',
  quarterly: 'Payments will begin on the 11th of your chosen month and every 3 months thereafter.',
  'half-yearly': 'Payments will begin on the 11th of your chosen month and every 6 months thereafter.',
  annually: 'Payments will begin on the 11th of your chosen month and annually thereafter.',
};

function nextWednesday(from: Date): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + ((3 - d.getDay() + 7) % 7));
  return d;
}

function toDateString(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function buildDateOptions(frequency: string | null): { value: string; label: string }[] {
  const now = new Date();
  const minDate = new Date(now);
  minDate.setDate(minDate.getDate() + 14);

  if (frequency === 'fortnightly') {
    const options = [];
    let d = nextWednesday(minDate);
    for (let i = 0; i < 13; i++) {
      options.push({
        value: toDateString(d),
        label: d.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
      });
      d = new Date(d);
      d.setDate(d.getDate() + 14);
    }
    return options;
  }

  if (!frequency) return [];

  const monthCount = frequency === 'quarterly' ? 4 : frequency === 'half-yearly' ? 3 : frequency === 'annually' ? 3 : 12;
  const stepMonths = frequency === 'quarterly' ? 3 : frequency === 'half-yearly' ? 6 : frequency === 'annually' ? 12 : 1;
  const dayOfMonth = 11;
  const options: { value: string; label: string }[] = [];
  let year = minDate.getFullYear();
  let month = minDate.getMonth() + (minDate.getDate() > dayOfMonth ? 1 : 0);

  for (let i = 0; i < monthCount; i++) {
    const d = new Date(year, month, dayOfMonth);
    options.push({
      value: toDateString(d),
      label: d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
    });
    month += stepMonths;
    if (month >= 12) { year += Math.floor(month / 12); month = month % 12; }
  }
  return options;
}

// ── Mock current payment schedule — replace with real data ───────────────────
const MOCK_CURRENT_SCHEDULE = { frequency: 'fortnightly' as const, firstPaymentDate: '' };

const STEPS = [{ id: 'edit', label: 'Payment details' }];

// ── Edit step ─────────────────────────────────────────────────────────────────

function StepEditPayment({
  frequency,
  onFrequencyChange,
  paymentDate,
  onPaymentDateChange,
  showValidation,
}: {
  frequency: string;
  onFrequencyChange: (v: string) => void;
  paymentDate: string;
  onPaymentDateChange: (v: string) => void;
  showValidation: boolean;
}) {
  const dateOptions = useMemo(() => buildDateOptions(frequency || null), [frequency]);
  const freqError = showValidation && !frequency ? 'Select a payment frequency' : undefined;
  const dateError = showValidation && !paymentDate ? 'Select a payment date' : undefined;
  const helperText = frequency ? FREQUENCY_HELPER[frequency] : undefined;

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5" component="h2">Your payments</Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          Choose how often you receive payments and when they start. You can change this at any time.
        </Typography>
      </Stack>

      <Stack spacing={3}>
        <Select
          label="Payment frequency"
          value={frequency}
          onChange={(v) => {
            onFrequencyChange(v);
            onPaymentDateChange('');
          }}
          options={FREQUENCY_OPTIONS}
          error={!!freqError}
          helperText={freqError ?? helperText}
        />

        {frequency && (
          <Select
            label={frequency === 'fortnightly' ? 'Next payment date' : 'First payment month'}
            value={paymentDate}
            onChange={onPaymentDateChange}
            options={dateOptions}
            error={!!dateError}
            helperText={dateError}
          />
        )}
      </Stack>
    </Stack>
  );
}

// ── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen({
  frequency,
  paymentDate,
  dateOptions,
  onDone,
}: {
  frequency: string;
  paymentDate: string;
  dateOptions: { value: string; label: string }[];
  onDone: () => void;
}) {
  const freqLabel = FREQUENCY_OPTIONS.find((o) => o.value === frequency)?.label ?? frequency;
  const dateLabel = dateOptions.find((o) => o.value === paymentDate)?.label ?? paymentDate;

  return (
    <Stack spacing={4} sx={{ textAlign: 'center', alignItems: 'center', py: 4 }}>
      <Box
        sx={{
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          bgcolor: 'success.light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon icon="circle-check" size="xl" color="success" />
      </Box>
      <Stack spacing={1} sx={{ maxWidth: '28rem' }}>
        <Typography variant="h4">Payment details updated</Typography>
        <Typography variant="body" sx={{ color: 'text.muted' }}>
          Your payments will now be made <strong>{freqLabel.toLowerCase()}</strong>, starting{' '}
          <strong>{dateLabel}</strong>.
        </Typography>
      </Stack>
      <Button variant="contained" label="Back to account" onClick={onDone} />
    </Stack>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function EditPaymentDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const account = MOCK_INCOME_ACCOUNTS.find((a) => a.id === id);
  const backToManage = () => router.push(`/member-online/manage-income-accounts?account=${id}`);

  const [submitted, setSubmitted] = useState(false);
  const [frequency, setFrequency] = useState(MOCK_CURRENT_SCHEDULE.frequency);
  const [paymentDate, setPaymentDate] = useState(MOCK_CURRENT_SCHEDULE.firstPaymentDate);
  const [showValidation, setShowValidation] = useState(false);

  const dateOptions = useMemo(() => buildDateOptions(frequency || null), [frequency]);

  if (!account) {
    return (
      <>
        <Box sx={{ px: 3, pt: 2 }}>
          <MOBreadcrumb
            items={[{ label: 'Income accounts', href: '/member-online/manage-income-accounts' }, { label: 'Account not found' }]}
            onBack={backToManage}
          />
        </Box>
        <ContentContainer size="md">
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="h3">Account not found</Typography>
          </Box>
        </ContentContainer>
      </>
    );
  }

  function handleNext() {
    if (!frequency || !paymentDate) {
      setShowValidation(true);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <Box sx={{ px: 3, pt: 2 }}>
          <MOBreadcrumb
            items={[
              { label: 'Income accounts', href: '/member-online/manage-income-accounts' },
              { label: account.name, href: `/member-online/manage-income-accounts?account=${id}` },
              { label: 'Edit payment details' },
            ]}
            onBack={backToManage}
          />
        </Box>
        <ContentContainer size="md">
          <SuccessScreen
            frequency={frequency}
            paymentDate={paymentDate}
            dateOptions={dateOptions}
            onDone={backToManage}
          />
        </ContentContainer>
      </>
    );
  }

  return (
    <>
      <Box sx={{ px: 3, pt: 2 }}>
        <MOBreadcrumb
          items={[
            { label: 'Income accounts', href: '/member-online/manage-income-accounts' },
            { label: account.name, href: `/member-online/manage-income-accounts?account=${id}` },
            { label: 'Edit payment details' },
          ]}
          onBack={backToManage}
        />
      </Box>

      <ContentContainer size="md">
        <Stack spacing={4}>
          <div>
            <Typography variant="h2" component="h1" sx={{ mb: 3 }}>
              Edit payment details
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormProgress
                variant="simple"
                value={0}
                steps={STEPS}
                activeStep={0}
                showStepIndicator
                sx={{ flex: 1, minWidth: 0 }}
              />
            </Box>
          </div>

          <Box>
            <StepTransition step={0}>
              <StepEditPayment
                frequency={frequency}
                onFrequencyChange={setFrequency}
                paymentDate={paymentDate}
                onPaymentDateChange={setPaymentDate}
                showValidation={showValidation}
              />
            </StepTransition>
          </Box>

          <StepperActions
            step={1}
            isSubmitStep
            nextLabel="Save changes"
            onNext={handleNext}
            onBack={backToManage}
            onExit={backToManage}
            skipExitDialog
          />
        </Stack>
      </ContentContainer>
    </>
  );
}
