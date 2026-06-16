import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Accordion } from '../../../components/Accordion';
import { Alert } from '../../../components/Alert';
import { Icon } from '../../../components/Icon';
import { MoneyField } from '../../../components/MoneyField';
import { MIN_PURCHASE_AMOUNT, PENSION_ESTIMATE_AGE } from '../constants';
import type { FundingAccount, PensionOption } from '../types';
import { estimatePension, formatCurrency } from '../utils';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface StepFundingProps {
  purchaseAmount: number;
  onPurchaseAmountChange: (amount: number) => void;
  pensionOption: PensionOption;
  accounts: FundingAccount[];
  showValidation: boolean;
}

// ---------------------------------------------------------------------------
// Transfer panel — visual "from accounts → to Lifetime Pension" design
// ---------------------------------------------------------------------------

const TODAY = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

interface TransferPanelProps {
  totalAvailable: number;
  purchaseAmount: number;
  onPurchaseAmountChange: (amount: number) => void;
  pensionOption: PensionOption;
  showValidation: boolean;
}

function TransferPanel({ totalAvailable, purchaseAmount, onPurchaseAmountChange, pensionOption, showValidation }: TransferPanelProps) {
  const [liveAmount, setLiveAmount] = useState(purchaseAmount);
  const [prevPurchase, setPrevPurchase] = useState(purchaseAmount);

  // Sync liveAmount only when purchaseAmount actually changes externally — a
  // committed value on blur, a draft resume, or a reset. Never during typing,
  // when purchaseAmount still lags at its old value behind the live keystrokes.
  if (purchaseAmount !== prevPurchase) {
    setPrevPurchase(purchaseAmount);
    setLiveAmount(purchaseAmount);
  }

  const displayAmount = liveAmount;
  const hasValue = displayAmount > 0;
  const estimate = estimatePension(displayAmount, PENSION_ESTIMATE_AGE, pensionOption);
  const remaining = totalAvailable - displayAmount;
  const overFunds = hasValue && remaining < 0;
  const lowBalance = hasValue && remaining >= 0 && remaining < MIN_PURCHASE_AMOUNT;
  // Default colour when healthy; only shift to warning/error states.
  const remainingColor = overFunds ? 'error.text' : lowBalance ? 'warning.text' : undefined;
  const optionLabel = pensionOption === 'spouse' ? 'spouse protection' : 'single';
  const annualEstimate = estimate?.annual ?? 0;
  const fortnightlyEstimate = estimate?.fortnightly ?? 0;
  // Muted while the purchase price is $0; default heading colour once a value is entered.
  const estimateColor = estimate ? undefined : 'text.muted';

  const fieldError = showValidation && (purchaseAmount === 0 || purchaseAmount < MIN_PURCHASE_AMOUNT);
  const helperText = fieldError
    ? purchaseAmount === 0
      ? 'Enter a purchase price to continue.'
      : `Minimum purchase price is ${formatCurrency(MIN_PURCHASE_AMOUNT)}.`
    : `Minimum ${formatCurrency(MIN_PURCHASE_AMOUNT)}`;

  return (
    <Box
      sx={{
        borderRadius: (t: Theme) => `${t.shape.lg}px`,
        border: '1px solid',
        borderColor: 'border.default',
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      {/* Grey header — available funds, updates live as purchase price is entered */}
      <Box sx={{ px: 4, pt: 4, pb: 4, bgcolor: 'background.default' }}>
        <Typography variant="small" sx={{ color: 'text.primary', display: 'block', mb: 0.5 }}>
          Available funds as at {TODAY}
        </Typography>
        <Typography
          variant="h4"
          sx={{ ...(remainingColor && { color: remainingColor }), transition: 'color 200ms ease' }}
        >
          {formatCurrency(Math.max(0, hasValue ? remaining : totalAvailable))}
        </Typography>
      </Box>

      {/* White body — purchase price + estimate, with the arrow straddling the seam */}
      <Box sx={{ position: 'relative', px: 4, pt: 4, pb: 4, borderTop: '1px solid', borderColor: 'border.subtle' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: (t) => t.spacing(4),
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            border: '1px solid',
            borderColor: 'border.subtle',
            bgcolor: 'background.paper',
          }}
        >
          <Icon icon="arrow-down" size="lg" color="primary" />
        </Box>

        {/* Purchase price */}
        <MoneyField
          label="Lifetime Pension purchase price"
          value={purchaseAmount || null}
          fullWidth
          error={fieldError}
          helperText={helperText}
          onInputChange={(v) => setLiveAmount(v ?? 0)}
          onChange={(v) => onPurchaseAmountChange(v ?? 0)}
        />

      {/* Estimated payments — always visible, updates live as the purchase price is entered */}
      <Box sx={{ mt: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
          <Box>
            <Typography variant="h5" component="p" sx={{ ...(estimateColor && { color: estimateColor }), transition: 'color 200ms ease' }}>
              {formatCurrency(annualEstimate)}
            </Typography>
            <Typography variant="small" sx={{ display: 'block' }}>Year 1 income</Typography>
          </Box>
          <Box sx={{ alignSelf: 'stretch', width: '1px', bgcolor: 'border.subtle' }} />
          <Box>
            <Typography variant="h5" component="p" sx={{ ...(estimateColor && { color: estimateColor }), transition: 'color 200ms ease' }}>
              {formatCurrency(fortnightlyEstimate)}
            </Typography>
            <Typography variant="small" sx={{ display: 'block' }}>Fortnightly payments</Typography>
          </Box>
        </Box>
        <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mt: 1.5, lineHeight: 1.5 }}>
          Income estimates for year 1 based on {optionLabel} option and a starting age of {PENSION_ESTIMATE_AGE},
          payments are adjusted each 1 July each year.
        </Typography>
      </Box>

      {/* Minimum balance warning — shown inline when remaining drops below threshold */}
      {lowBalance && (
        <Box sx={{ mt: 2, p: 2, borderRadius: (t: Theme) => `${t.shape.sm}px`, bgcolor: 'warning.background', border: '1px solid', borderColor: 'warning.main' }}>
          <Typography variant="small" sx={{ color: 'warning.text', fontWeight: 600, display: 'block', mb: 0.5 }}>
            Minimum balance warning
          </Typography>
          <Typography variant="small" sx={{ color: 'warning.text' }}>
            Your remaining balance will be below $10,000. You need to leave at least $10,000 in your
            Accumulation account to keep it open. If all accounts are closed, any insurance you hold
            will be cancelled.
          </Typography>
        </Box>
      )}
      {overFunds && (
        <Box sx={{ mt: 2, p: 2, borderRadius: (t: Theme) => `${t.shape.sm}px`, bgcolor: 'error.background', border: '1px solid', borderColor: 'error.main' }}>
          <Typography variant="small" sx={{ color: 'error.text' }}>
            Purchase price exceeds your available funds by {formatCurrency(Math.abs(remaining))}.
          </Typography>
        </Box>
      )}
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Considerations
// ---------------------------------------------------------------------------

const ALLOCATION_CONSIDERATIONS = [
  {
    id: 'age-pension',
    title: 'How it could affect the Age Pension',
    content: (
      <Typography variant="body" sx={{ lineHeight: 1.75 }}>
        Only 60% of your purchase price counts under the Age Pension assets test until you reach life
        expectancy, then 30% after that. Only 60% of your payments count under the income test. Because of
        this, buying a Lifetime Pension may make you eligible for the Age Pension, or increase the amount you
        receive.
      </Typography>
    ),
  },
  {
    id: 'access',
    title: 'Access to your money',
    content: (
      <Typography variant="body" sx={{ lineHeight: 1.75 }}>
        A Lifetime Pension is a permanent purchase once the 6-month cooling-off period ends. You can&apos;t
        make lump-sum withdrawals or take extra money out. The funds you use are committed for life. Consider
        keeping enough in a flexible account, such as a Retirement Income account, for one-off expenses.
      </Typography>
    ),
  },
  {
    id: 'investment-risk',
    title: 'Investment risk',
    content: (
      <Typography variant="body" sx={{ lineHeight: 1.75 }}>
        Your money is pooled with other members and invested in the Balanced Risk-Adjusted option, and you
        can&apos;t choose how it&apos;s invested. Payments are reviewed on 1 July each year and may go up or
        down depending on the performance of the pool.
      </Typography>
    ),
  },
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function StepFunding({
  purchaseAmount,
  onPurchaseAmountChange,
  pensionOption,
  accounts,
  showValidation,
}: StepFundingProps) {
  const totalAvailable = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <>
      <Stack spacing={4}>
        {/* ── Purchase price ── */}
        <Stack spacing={1}>
          <Typography variant="h5">Purchase price</Typography>
          <Typography variant="body" sx={{ color: 'text.primary', lineHeight: 1.75 }}>
            The purchase price is the amount of super you use to buy your Lifetime Pension. Unlike
            transferring money into an account you can draw on, this amount is pooled with other members to
            fund your payments for life. A higher purchase price means higher payments.
          </Typography>
        </Stack>

        {/* ── Transfer panel ── */}
        <TransferPanel
          totalAvailable={totalAvailable}
          purchaseAmount={purchaseAmount}
          onPurchaseAmountChange={onPurchaseAmountChange}
          pensionOption={pensionOption}
          showValidation={showValidation}
        />

        {/* ── Retirement bonus ── */}
        {purchaseAmount >= MIN_PURCHASE_AMOUNT && (
          <Alert
            severity="info"
            title="You're eligible for a Retirement bonus!"
            message="Your estimated bonus will be shown in the next step."
          />
        )}

        {/* ── Considerations ── */}
        <Stack spacing={2}>
          <div>
            <Typography variant="h5" sx={{ mb: 0.5 }}>Considerations when allocating funds</Typography>
            <Typography variant="body" sx={{ color: 'text.primary' }}>
              A Lifetime Pension is a long-term commitment, so it&apos;s worth weighing up these points before
              you decide how much to use.
            </Typography>
          </div>
          <Accordion items={ALLOCATION_CONSIDERATIONS} />
        </Stack>
      </Stack>
    </>
  );
}
