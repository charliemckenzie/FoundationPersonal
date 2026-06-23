import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { Dialog } from '../../../components/Dialog';
import { Icon } from '../../../components/Icon';
import { MoneyField } from '../../../components/MoneyField';
import { TextButton } from '../../../components/TextButton';
import { MIN_REMAINING_BALANCE, PENSION_ESTIMATE_AGE } from '../constants';
import type { FundingAccount, PensionOption } from '../types';
import { estimatePension, estimateRetirementBonus, formatCurrency } from '../utils';

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
  // Live value as the member types — drives the live estimate panel only. Synced
  // when purchaseAmount changes externally (commit on blur, draft resume, reset).
  const [liveAmount, setLiveAmount] = useState(purchaseAmount);
  const [prevPurchase, setPrevPurchase] = useState(purchaseAmount);
  if (purchaseAmount !== prevPurchase) {
    setPrevPurchase(purchaseAmount);
    setLiveAmount(purchaseAmount);
  }

  // Whether the field has been blurred at least once — drives blur-time validation.

  const displayAmount = liveAmount;
  const hasValue = displayAmount > 0;
  const estimate = estimatePension(displayAmount, PENSION_ESTIMATE_AGE, pensionOption);
  const remaining = totalAvailable - displayAmount;
  const overFunds = hasValue && remaining < 0;
  const lowBalance = hasValue && remaining >= 0 && remaining < MIN_REMAINING_BALANCE;
  // Default colour when healthy; only shift to warning/error states.
  const remainingColor = overFunds ? 'error.text' : lowBalance ? 'warning.text' : undefined;
  const annualEstimate = estimate?.annual ?? 0;
  const fortnightlyEstimate = estimate?.fortnightly ?? 0;
  // Muted while the purchase price is $0; default heading colour once a value is entered.
  const estimateColor = estimate ? undefined : 'text.muted';

  // Validation runs on the committed value, so the error only appears/clears on
  // blur — never mid-keystroke. The below-minimum error shows once the field has
  // been blurred (touched); pressing Next (showValidation) additionally flags an
  // empty field.
  const isEmpty = purchaseAmount === 0;
  const fieldError = showValidation ? isEmpty : false;
  const helperText = 'Enter a purchase price to continue.';

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
      <Box sx={{ px: { xs: 3, sm: 4 }, pt: { xs: 3, sm: 4 }, pb: { xs: 3, sm: 4 }, bgcolor: 'background.default' }}>
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
      <Box sx={{ position: 'relative', px: { xs: 3, sm: 4 }, pt: { xs: 3, sm: 4 }, pb: { xs: 3, sm: 4 }, borderTop: '1px solid', borderColor: 'border.subtle' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: { xs: (t: Theme) => t.spacing(3), sm: (t: Theme) => t.spacing(4) },
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
          label="Amount to transfer into your account"
          value={purchaseAmount || null}
          fullWidth
          error={fieldError}
          helperText={fieldError ? helperText : ''}
          onInputChange={(v) => setLiveAmount(v ?? 0)}
          onChange={(v) => {
            onPurchaseAmountChange(v ?? 0);
          }}
        />

      {/* Estimated payments — always visible, updates live as the purchase price is entered */}
      <Box sx={{ mt: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
          <Box>
            <Typography variant="h5" component="p" sx={{ ...(estimateColor && { color: estimateColor }), transition: 'color 200ms ease' }}>
              {formatCurrency(annualEstimate)}
            </Typography>
            <Typography variant="small" sx={{ display: 'block' }}>Annual payment</Typography>
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
          These figures are estimates only based on the government minimum drawdown rate for age {PENSION_ESTIMATE_AGE} (5% per year).
          Your actual payments may vary. You can choose your payment frequency in the next step. Minimum rates are set by the ATO and reviewed periodically.
        </Typography>
      </Box>

      {/* Minimum balance warning — shown inline when remaining drops below threshold */}
      {lowBalance && (
        <Box sx={{ mt: 3 }}>
          <Alert
            severity="warning"
            title="Minimum balance warning"
            message={`Please be aware that leaving less than ${formatCurrency(MIN_REMAINING_BALANCE)} in your Accumulation account will close it. If all your accounts close, any insurance you hold will also be cancelled.`}
          />
        </Box>
      )}
      {overFunds && (
        <Box sx={{ mt: 3 }}>
          <Alert
            severity="error"
            message={`Purchase price exceeds your available funds by ${formatCurrency(Math.abs(remaining))}.`}
          />
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
    id: 'tax-free',
    title: 'Tax-free payments and investments',
    content: (
      <Typography variant="body" sx={{ lineHeight: 1.75 }}>
        If you&apos;re over 60, your income payments and investment earnings from a Retirement Income account
        are tax-free. That means the full amount you receive goes to you — with no tax taken out. The more
        you transfer into your account, the more you can earn in tax-free investment returns before each
        payment.
      </Typography>
    ),
  },
  {
    id: 'access',
    title: 'Withdraw money when you need it',
    content: (
      <Typography variant="body" sx={{ lineHeight: 1.75 }}>
        You can take out one-off lump-sum payments from your balance whenever you need — on top of your
        regular income payments. You also choose how much you receive and how often, subject to the
        government minimum drawdown amount. This flexibility makes it easy to handle unexpected expenses
        without disrupting your regular income.
      </Typography>
    ),
  },
  {
    id: 'investment',
    title: 'You choose how your money is invested',
    content: (
      <Typography variant="body" sx={{ lineHeight: 1.75 }}>
        Your Retirement Income account balance stays invested while you&apos;re drawing from it, so it can
        keep growing. You choose which investment options your balance is held in, and you can also specify
        which options your payments come from. If you&apos;re not sure where to start, our default Lifecycle
        strategy automatically adjusts your mix as you age.
      </Typography>
    ),
  },
];

// ---------------------------------------------------------------------------
// Retirement bonus — celebratory good-news callout (intentionally not an Alert)
// ---------------------------------------------------------------------------

interface RetirementBonusProps {
  /** The calculated bonus, or null before the member has calculated it. */
  amount: number | null;
  /** True while the (mock) calculation is processing. */
  loading: boolean;
  onCalculate: () => void;
}

function RetirementBonus({ amount, loading, onCalculate }: RetirementBonusProps) {
  const reduceMotion = useReducedMotion();
  // Old copy slides down + fades out; new copy slides up + fades in. Under
  // reduced-motion we drop the translate and let it cross-fade only.
  const y = reduceMotion ? 0 : 8;
  const calculated = amount !== null;

  return (
    <Box
      role="status"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: { xs: 2, sm: 2.5 },
        p: { xs: 2.5, sm: 3 },
        borderRadius: (t: Theme) => `${t.shape.lg}px`,
        border: '1px solid',
        borderColor: 'success.border',
        bgcolor: 'success.background',
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          alignSelf: { xs: 'flex-start', sm: 'auto' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          bgcolor: 'success.main',
          color: 'success.contrastText',
        }}
      >
        <Icon icon="gift" size="xl" color="inherit" />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <AnimatePresence mode="wait" initial={false}>
          {calculated ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <Typography variant="h5" component="p" sx={{ color: 'success.text', mb: 0.25 }}>
                Your estimated bonus is {formatCurrency(amount)}
              </Typography>
              <Typography variant="body" sx={{ color: 'success.text' }}>
                We&apos;ll add it to your balance when your Retirement Income account is set up.
              </Typography>
            </motion.div>
          ) : (
            <motion.div
              key="prompt"
              exit={{ opacity: 0, y }}
              transition={{ duration: 0.18, ease: 'easeIn' }}
            >
              <Typography variant="h5" component="p" sx={{ color: 'success.text', mb: 0.25 }}>
                You&apos;re eligible for a Retirement bonus!
              </Typography>
              <Typography variant="body" sx={{ color: 'success.text' }}>
                Calculate your estimated bonus to see how much you could receive.
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
      <AnimatePresence initial={false}>
        {!calculated && (
          <motion.div key="cta" exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <Button
              label="Calculate"
              variant="outlined"
              color="success"
              size="small"
              condensed
              loading={loading}
              onClick={onCalculate}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

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
  const [considerationsOpen, setConsiderationsOpen] = useState(false);

  // The bonus is calculated on demand — the real calculation is expensive, so we
  // only run it when the member asks. We cache it against the purchase price it
  // was computed for, so changing the amount resets to the "Calculate" prompt
  // rather than showing a stale figure.
  const [bonus, setBonus] = useState<{ forAmount: number; value: number } | null>(null);
  const [calculating, setCalculating] = useState(false);
  const calcTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Retirement Bonus eligibility: assume eligible whenever the member is
  // transferring money into the Retirement Income account (conditions 2 & 3 of the ART
  // rules). The >12-month membership condition can't be checked — there's no
  // such field in the mock data yet. Gated on the committed purchaseAmount so the
  // tile appears on blur, not mid-keystroke.
  const eligibleForBonus = purchaseAmount > 0;
  const bonusValue = bonus?.forAmount === purchaseAmount ? bonus.value : null;

  // Clear any pending mock-calculation timer on unmount.
  useEffect(() => () => {
    if (calcTimer.current) clearTimeout(calcTimer.current);
  }, []);

  function handleCalculateBonus() {
    setCalculating(true);
    calcTimer.current = setTimeout(() => {
      setBonus({ forAmount: purchaseAmount, value: estimateRetirementBonus(purchaseAmount) });
      setCalculating(false);
    }, 1200);
  }

  return (
    <Stack spacing={4}>
      {/* ── Purchase price ── */}
      <Stack spacing={1.5}>
        <Stack spacing={1}>
          <Typography variant="h5" component="h2">Funding your income account</Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Transfer super into your Retirement Income account to start receiving regular income payments.
          </Typography>
        </Stack>
        <Box>
          <TextButton
            label="Considerations when allocating funds"
            startIcon="circle-info"
            iconDirection="left"
            onClick={() => setConsiderationsOpen(true)}
          />
        </Box>
      </Stack>

      {/* ── Transfer panel + bonus (kept tight together) ── */}
      <Stack spacing={2}>
        <TransferPanel
          totalAvailable={totalAvailable}
          purchaseAmount={purchaseAmount}
          onPurchaseAmountChange={onPurchaseAmountChange}
          pensionOption={pensionOption}
          showValidation={showValidation}
        />

        {eligibleForBonus && (
          <RetirementBonus
            amount={bonusValue}
            loading={calculating}
            onCalculate={handleCalculateBonus}
          />
        )}
      </Stack>

      <Dialog
        open={considerationsOpen}
        onClose={() => setConsiderationsOpen(false)}
        title="Considerations when allocating funds"
        size="medium"
        confirmLabel="Close"
        onConfirm={() => setConsiderationsOpen(false)}
      >
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            A Retirement Income account is a long-term commitment, so it&apos;s worth weighing up these points
            before you decide how much to transfer.
          </Typography>
        </Stack>
        <Stack spacing={3}>
          {ALLOCATION_CONSIDERATIONS.map(({ id, title, content }) => (
            <div key={id}>
              <Typography variant="h6" sx={{ mb: 0.75 }}>{title}</Typography>
              {content}
            </div>
          ))}
        </Stack>
      </Dialog>
    </Stack>
  );
}
