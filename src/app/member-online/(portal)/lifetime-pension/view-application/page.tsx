'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../../../components/Button';
import { Dialog } from '../../../../../components/Dialog';
import { Icon } from '../../../../../components/Icon';
import { TextButton } from '../../../../../components/TextButton';
import { ContentContainer } from '../../../../../components/MemberOnline';
import { DescriptionList } from '../../../../../components/DescriptionList';
import { MOCK_USER_PROFILE } from '../../../../../features/lifetime-pension/constants';
import { PENSION_ESTIMATE_AGE } from '../../../../../features/lifetime-pension/constants';
import { formatCurrency, estimatePension } from '../../../../../features/lifetime-pension/utils';

// ---------------------------------------------------------------------------
// Mock submitted application data (using LP data for TTR as instructed)
// ---------------------------------------------------------------------------

const MOCK_SUBMISSION = {
  accountType: 'Transition to Retirement account',
  referenceNumber: 'QS20930331M',
  submittedDate: '8 Jun 2026',
  submittedTime: '4:19PM AEST',
  email: 'jane.smith@gmail.com',
  purchasePrice: 295253.82,
  bankDetails: { bsb: '064-000', accountNumber: '****4321', accountName: 'Jane Smith' },
  option: 'Single option',
  fundsFrom: [{ label: 'Super Savings - 123456789', amount: 295253.82 }],
};

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

interface TimelineStep {
  label: string;
  description: string;
  date?: string;
  status: 'done' | 'current' | 'pending';
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    label: 'Application submitted',
    description: 'Your application has been successfully received',
    date: '8 Jun 2026',
    status: 'done',
  },
  {
    label: 'Under review',
    description: 'Our team is currently reviewing your application',
    status: 'current',
  },
  {
    label: 'Application approved',
    description: 'Your account will be set up and payments will begin',
    status: 'pending',
  },
];

function ApplicationTimeline() {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: (t) => `${t.shape.lg}px`,
        bgcolor: 'background.paper',
        px: 3,
        py: 3,
      }}
    >
      <Stack spacing={0}>
        {TIMELINE_STEPS.map((step, i) => {
          const isDone = step.status === 'done';
          const isCurrent = step.status === 'current';
          const isLast = i === TIMELINE_STEPS.length - 1;
          return (
            <Box key={step.label} sx={{ display: 'flex', gap: 2 }}>
              {/* Left column: dot + connector */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '2.5rem', flexShrink: 0 }}>
                <Box
                  sx={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: isDone || isCurrent ? 'primary.main' : 'border.default',
                    bgcolor: isDone || isCurrent ? 'primary.main' : 'background.paper',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  {(isDone || isCurrent) && (
                    <Box sx={{ color: 'common.white', display: 'flex' }}>
                      <Icon icon="check" size="sm" />
                    </Box>
                  )}
                </Box>
                {!isLast && (
                  <Box
                    sx={{
                      width: '2px',
                      flex: 1,
                      minHeight: '2rem',
                      bgcolor: isDone ? 'primary.main' : 'border.default',
                      my: '2px',
                    }}
                  />
                )}
              </Box>

              {/* Right column: text */}
              <Box sx={{ pb: isLast ? 0 : 3, flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'flex-start' }}>
                  <Typography
                    variant="body"
                    sx={{ fontWeight: 700, color: isDone || isCurrent ? 'text.heading' : 'text.muted' }}
                  >
                    {step.label}
                  </Typography>
                  {step.date && (
                    <Typography variant="small" sx={{ color: 'text.muted', flexShrink: 0 }}>
                      {step.date}
                    </Typography>
                  )}
                </Box>
                <Typography variant="small" sx={{ color: 'text.muted', mt: 0.25 }}>
                  {step.description}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Application details table
// ---------------------------------------------------------------------------

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 2fr' },
        columnGap: 2,
        rowGap: { xs: 0.5, sm: 0 },
        alignItems: 'flex-start',
        py: 1.5,
        borderTop: '1px solid',
        borderTopColor: 'border.subtle',
      }}
    >
      <Typography variant="body" component="dt" sx={{ fontWeight: 700, color: 'text.primary' }}>
        {label}
      </Typography>
      <Box component="dd" sx={{ m: 0 }}>
        {typeof children === 'string'
          ? <Typography variant="body" sx={{ color: 'text.primary' }}>{children}</Typography>
          : children}
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Read-only summary dialog content
// ---------------------------------------------------------------------------

function SummaryContent() {
  const estimate = estimatePension(MOCK_SUBMISSION.purchasePrice, PENSION_ESTIMATE_AGE, 'single');
  const annualPayment = estimate?.annual ?? 0;
  const fortnightlyPayment = estimate?.fortnightly ?? 0;
  const profile = MOCK_USER_PROFILE;

  return (
    <Stack spacing={3} sx={{ pb: 1 }}>
      <DescriptionList title="Personal details" titleVariant="h6">
        <DescriptionList.Item label="Full name" value={[profile.firstName, profile.middleName, profile.lastName].filter(Boolean).join(' ')} />
        <DescriptionList.Item label="Residential address" value={profile.residentialAddress} />
        <DescriptionList.Item label="Email address" value={profile.email} />
        <DescriptionList.Item label="Date of birth" value={profile.dateOfBirth} />
        <DescriptionList.Item label="Mobile phone" value={profile.mobilePhone} />
      </DescriptionList>

      <DescriptionList title="Option" titleVariant="h6">
        <DescriptionList.Item label="Pension option" value={MOCK_SUBMISSION.option} />
      </DescriptionList>

      <DescriptionList title="Purchase price and funding" titleVariant="h6">
        <DescriptionList.Item label="Purchase price" value={formatCurrency(MOCK_SUBMISSION.purchasePrice)} />
        <DescriptionList.Item
          label="Funded from"
          value={
            <Stack spacing={0.5}>
              {MOCK_SUBMISSION.fundsFrom.map((f) => (
                <Box key={f.label}>
                  <Typography variant="small" sx={{ color: 'text.primary' }}>Transferring {formatCurrency(f.amount)} from</Typography>
                  <Typography variant="small" sx={{ color: 'text.muted' }}>{f.label}</Typography>
                </Box>
              ))}
            </Stack>
          }
        />
      </DescriptionList>

      <DescriptionList title="Payment details" titleVariant="h6">
        <DescriptionList.Item label="First year's income" value={formatCurrency(annualPayment)} />
        <DescriptionList.Item label="Fortnightly payments" value={`${formatCurrency(fortnightlyPayment)} / fortnight`} />
        <DescriptionList.Item label="First payment date" value="Tue, 03 Feb 2026" />
        <DescriptionList.Item label="BSB" value={MOCK_SUBMISSION.bankDetails.bsb} />
        <DescriptionList.Item label="Account number" value={MOCK_SUBMISSION.bankDetails.accountNumber} />
        <DescriptionList.Item label="Account name" value={MOCK_SUBMISSION.bankDetails.accountName} />
      </DescriptionList>
    </Stack>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ViewApplicationPage() {
  const router = useRouter();
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [resendOpen, setResendOpen] = useState(false);

  function handleResend() {
    setResendOpen(true);
  }

  return (
    <ContentContainer size="md">
      <Stack spacing={1.5} sx={{ pb: 4 }}>
        <Typography variant="h1" component="h1">Application details</Typography>
        <Typography variant="lead" sx={{ color: 'text.muted' }}>
          {MOCK_SUBMISSION.accountType}
        </Typography>
      </Stack>

      <Stack spacing={3}>
        <ApplicationTimeline />

        <Box
          sx={{
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: (t) => `${t.shape.lg}px`,
            bgcolor: 'background.paper',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ px: 3, py: 2, bgcolor: 'background.default', borderBottom: '1px solid', borderBottomColor: 'border.subtle' }}>
            <Typography variant="h5">Application details</Typography>
          </Box>
          <Box sx={{ px: 3 }}>
            <Box component="dl" sx={{ m: 0 }}>
              <DetailRow label="Account">
                <Stack spacing={0.25} sx={{ alignItems: 'flex-start' }}>
                  <Typography variant="body" sx={{ color: 'text.primary' }}>{MOCK_SUBMISSION.accountType}</Typography>
                  <TextButton
                    label="View summary"
                    size="small"
                    hideIcon
                    onClick={() => setSummaryOpen(true)}
                  />
                </Stack>
              </DetailRow>
              <DetailRow label="Submitted date">
                {MOCK_SUBMISSION.submittedDate} at {MOCK_SUBMISSION.submittedTime}
              </DetailRow>
              <DetailRow label="Reference number">{MOCK_SUBMISSION.referenceNumber}</DetailRow>
              <DetailRow label="Email confirmation">
                <Stack spacing={0.25} sx={{ alignItems: 'flex-start' }}>
                  <Typography variant="body" sx={{ color: 'text.primary' }}>Sent to {MOCK_SUBMISSION.email}</Typography>
                  <TextButton label="Resend confirmation" size="small" hideIcon onClick={handleResend} />
                </Stack>
              </DetailRow>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            label="Back to income accounts"
            onClick={() => router.push('/member-online/manage-income-accounts')}
          />
        </Box>
      </Stack>

      {/* Resend confirmation dialog */}
      <Dialog
        open={resendOpen}
        onClose={() => setResendOpen(false)}
        title="Confirmation resent"
        description={`A confirmation email has been sent to ${MOCK_SUBMISSION.email}.`}
        variant="neutral"
        confirmLabel="Done"
        onConfirm={() => setResendOpen(false)}
        hideCancel
      />

      {/* View summary dialog */}
      <Dialog
        open={summaryOpen}
        onClose={() => setSummaryOpen(false)}
        title="Application summary"
        size="medium"
        confirmLabel="Print application"
        onConfirm={() => window.print()}
        cancelLabel="Close"
        hideCancel={false}
      >
        <SummaryContent />
      </Dialog>
    </ContentContainer>
  );
}
