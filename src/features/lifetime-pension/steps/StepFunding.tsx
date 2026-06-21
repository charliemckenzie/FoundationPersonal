import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';
import { Dialog } from '../../../components/Dialog';
import { Icon } from '../../../components/Icon';
import { MoneyField } from '../../../components/MoneyField';
import { TextButton } from '../../../components/TextButton';
import { MIN_PURCHASE_AMOUNT, MIN_REMAINING_BALANCE, PENSION_ESTIMATE_AGE } from '../constants';
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
  declarationPermanent: boolean;
  onDeclarationPermanentChange: (checked: boolean) => void;
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
  showPriceError?: boolean;
}

function TransferPanel({ totalAvailable, purchaseAmount, onPurchaseAmountChange, pensionOption, showValidation, showPriceError = false }: TransferPanelProps) {
  // Live value as the member types — drives the live estimate panel only. Synced
  // when purchaseAmount changes externally (commit on blur, draft resume, reset).
  const [liveAmount, setLiveAmount] = useState(purchaseAmount);
  const [prevPurchase, setPrevPurchase] = useState(purchaseAmount);
  if (purchaseAmount !== prevPurchase) {
    setPrevPurchase(purchaseAmount);
    setLiveAmount(purchaseAmount);
  }

  // Whether the field has been blurred at least once — drives blur-time validation.
  const [touched, setTouched] = useState(false);

  const displayAmount = liveAmount;
  const hasValue = displayAmount > 0;
  const estimate = estimatePension(displayAmount, PENSION_ESTIMATE_AGE, pensionOption);
  const remaining = totalAvailable - displayAmount;
  const overFunds = hasValue && remaining < 0;
  const lowBalance = hasValue && remaining >= 0 && remaining < MIN_REMAINING_BALANCE;
  // Default colour when healthy; only shift to warning/error states.
  const remainingColor = overFunds ? 'error.text' : lowBalance ? 'warning.text' : undefined;
  const optionLabel = pensionOption === 'spouse' ? 'spouse protection' : 'single';
  const annualEstimate = estimate?.annual ?? 0;
  const fortnightlyEstimate = estimate?.fortnightly ?? 0;
  // Muted while the purchase price is $0; default heading colour once a value is entered.
  const estimateColor = estimate ? undefined : 'text.muted';

  // Validation runs on the committed value, so the error only appears/clears on
  // blur — never mid-keystroke. The below-minimum error shows once the field has
  // been blurred (touched); pressing Next (showValidation) additionally flags an
  // empty field.
  const isEmpty = purchaseAmount === 0;
  const belowMin = purchaseAmount > 0 && purchaseAmount < MIN_PURCHASE_AMOUNT;
  const fieldError = showValidation ? (isEmpty || belowMin) : (showPriceError && isEmpty) || (touched && belowMin);
  const helperText = fieldError
    ? isEmpty
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
          label="Lifetime Pension purchase price"
          value={purchaseAmount || null}
          fullWidth
          error={fieldError}
          helperText={helperText}
          onInputChange={(v) => setLiveAmount(v ?? 0)}
          onChange={(v) => {
            onPurchaseAmountChange(v ?? 0);
            setTouched(true);
          }}
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
          Estimated year 1 income based on the {optionLabel} option, starting at age {PENSION_ESTIMATE_AGE}.
          Payments are reviewed and adjusted each 1 July.
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
              <Typography variant="h6" component="p" sx={{ color: 'success.text', mb: 0.25 }}>
                Your estimated bonus is {formatCurrency(amount)}
              </Typography>
              <Typography variant="body" sx={{ color: 'success.text' }}>
                We&apos;ll add it to your balance when your Lifetime Pension is set up.
              </Typography>
            </motion.div>
          ) : (
            <motion.div
              key="prompt"
              exit={{ opacity: 0, y }}
              transition={{ duration: 0.18, ease: 'easeIn' }}
            >
              <Typography variant="h6" component="p" sx={{ color: 'success.text', mb: 0.25 }}>
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
  declarationPermanent,
  onDeclarationPermanentChange,
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
  const [showPriceError, setShowPriceError] = useState(false);

  useEffect(() => {
    if (purchaseAmount > 0) setShowPriceError(false);
  }, [purchaseAmount]);
  // Retirement Bonus eligibility: assume eligible whenever the member is
  // transferring money into the Lifetime Pension (conditions 2 & 3 of the ART
  // rules). The >12-month membership condition can't be checked — there's no
  // such field in the mock data yet. Gated on the committed purchaseAmount so the
  // tile appears on blur, not mid-keystroke.
  const bonusValue = bonus?.forAmount === purchaseAmount ? bonus.value : null;

  // Clear any pending mock-calculation timer on unmount.
  useEffect(() => () => {
    if (calcTimer.current) clearTimeout(calcTimer.current);
  }, []);

  function handleCalculateBonus() {
    if (purchaseAmount === 0) {
      setShowPriceError(true);
      return;
    }
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
          <Typography variant="h5" component="h2">Purchase price</Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            The purchase price is the amount of super you use to buy your Lifetime Pension. Unlike
            transferring money into an account you can draw on, this amount is pooled with other members to
            fund your payments for life.
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
          showPriceError={showPriceError}
        />

        <RetirementBonus
          amount={bonusValue}
          loading={calculating}
          onCalculate={handleCalculateBonus}
        />
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
            A Lifetime Pension is a long-term commitment, so it&apos;s worth weighing up these points before
            you decide how much to use.
          </Typography>
        </Stack>
        <Stack spacing={3}>
          <div>
            <Typography variant="h6" sx={{ mb: 0.75 }}>It could boost your Age Pension</Typography>
            <Typography variant="body" sx={{ color: 'text.primary', lineHeight: 1.75 }}>
              A Lifetime Pension is one of the few retirement products that receives favourable treatment under
              government means tests. Only 60% of your purchase price counts under the Age Pension assets test,
              dropping to just 30% once you reach life expectancy. Only 60% of your payments count under the
              income test. For many people, this means becoming eligible for the Age Pension for the first time,
              or receiving a higher payment than they&apos;d otherwise qualify for.
            </Typography>
          </div>
          <div>
            <Typography variant="h6" sx={{ mb: 0.75 }}>It&apos;s designed to be a lifelong commitment</Typography>
            <Typography variant="body" sx={{ color: 'text.primary', lineHeight: 1.75 }}>
              You have a 6-month cooling-off period after purchase, so there&apos;s no need to rush this
              decision. After that, a Lifetime Pension is permanent. You won&apos;t be able to make lump-sum
              withdrawals, and that&apos;s intentional: the certainty of income for life comes from committing
              the funds for the long term. Many members pair their Lifetime Pension with a Retirement Income
              account to keep some money accessible for one-off expenses.
            </Typography>
          </div>
          <div>
            <Typography variant="h6" sx={{ mb: 0.75 }}>Your money is managed by experts</Typography>
            <Typography variant="body" sx={{ color: 'text.primary', lineHeight: 1.75 }}>
              Your funds are pooled with other Lifetime Pension members and invested in QSuper&apos;s Balanced
              Risk-Adjusted option, a diversified, professionally managed portfolio. This shared approach is
              what makes it possible to guarantee income for life, no matter how long you live. Payments are
              reviewed each 1 July and adjusted to reflect how the pool performed. Over the long term,
              they&apos;re designed to grow.
            </Typography>
          </div>
        </Stack>
      </Dialog>

      {/* ── Designed to be a lifelong commitment ── */}
      <Stack spacing={2}>
        <Typography variant="h6" component="h3">Designed to be a lifelong commitment</Typography>
        <Checkbox
          variant="default"
          checked={declarationPermanent}
          onChange={onDeclarationPermanentChange}
          error={showValidation && !declarationPermanent}
          errorMessage={
            showValidation && !declarationPermanent
              ? 'Please confirm you understand the permanent purchase terms.'
              : undefined
          }
          label="I understand that after the 6-month cooling-off period my purchase is permanent, and I will not be able to withdraw these funds, except in the case of a terminal medical condition if money-back protection is payable."
        />
      </Stack>
    </Stack>
  );
}
