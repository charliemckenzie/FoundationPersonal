import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Alert } from '../../../components/Alert';
import { Dialog } from '../../../components/Dialog';
import { Icon } from '../../../components/Icon';
import { MoneyField } from '../../../components/MoneyField';
import { TextButton } from '../../../components/TextButton';
import { MIN_PURCHASE_AMOUNT } from '../constants';
import type { FundingAccount } from '../types';
import { formatCurrency } from '../utils';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface StepFundingProps {
  purchaseAmount: number;
  onPurchaseAmountChange: (amount: number) => void;
  accounts: FundingAccount[];
  totalAllocated: number;
  onTransferAmountChange: (id: string, amount: number) => void;
  showValidation: boolean;
}

// ---------------------------------------------------------------------------
// Sticky allocation total bar
// ---------------------------------------------------------------------------

function AllocationBar({
  allocated,
  target,
  attempted,
  barRef,
  isFloating,
}: {
  allocated: number;
  target: number;
  attempted: boolean;
  barRef: React.RefObject<HTMLDivElement | null>;
  isFloating: boolean;
}) {
  const remaining = target - allocated;
  const over = allocated > target;
  const exact = target > 0 && allocated === target;
  const isError = over || (remaining > 0 && attempted);

  const bgColor = exact ? 'success.background' : isError ? 'error.background' : 'background.highContrast';
  const borderColor = exact ? 'success.main' : isError ? 'error.main' : 'border.subtle';
  const textColor = exact ? 'success.text' : isError ? 'error.text' : 'text.inverse';

  const hint = over
    ? `Over by ${formatCurrency(allocated - target)} — reduce your allocations`
    : remaining > 0 && attempted
    ? `Allocate ${formatCurrency(remaining)} more to continue`
    : null;

  return (
    <Box
      ref={barRef}
      sx={{
        position: 'sticky',
        bottom: '1rem',
        zIndex: 1,
        borderRadius: (t) => `${t.shape.sm}px`,
        boxShadow: isFloating ? 16 : 0,
        transition: 'box-shadow 300ms ease',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1,
          px: 3,
          py: 2,
          borderRadius: (t) => `${t.shape.sm}px`,
          bgcolor: bgColor,
          border: '1px solid',
          borderColor,
          transition: 'background-color 200ms ease, border-color 200ms ease',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {exact && <Icon icon="circle-check" color="success" size="lg" />}
          {isError && <Icon icon="circle-exclamation" color="error" size="lg" />}
          <Typography variant="body" sx={{ color: textColor }}>Total allocated</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.25 }}>
          <Typography variant="body" sx={{ color: textColor, fontWeight: 700 }}>
            {formatCurrency(allocated)}
            {target > 0 && (
              <Box component="span" sx={{ fontWeight: 400, opacity: 0.7 }}>
                {' '}/ {formatCurrency(target)}
              </Box>
            )}
          </Typography>
          {hint && (
            <Typography variant="small" sx={{ color: textColor, opacity: 0.85 }}>{hint}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Transfer panel — visual "from accounts → to Lifetime Pension" design
// ---------------------------------------------------------------------------

const TODAY = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

interface TransferPanelProps {
  totalAvailable: number;
  purchaseAmount: number;
  onPurchaseAmountChange: (amount: number) => void;
  showValidation: boolean;
}

function TransferPanel({ totalAvailable, purchaseAmount, onPurchaseAmountChange, showValidation }: TransferPanelProps) {
  const [liveAmount, setLiveAmount] = useState(purchaseAmount);

  // Keep liveAmount in sync if purchaseAmount is reset externally
  if (purchaseAmount !== liveAmount && purchaseAmount === 0) {
    setLiveAmount(0);
  }

  const displayAmount = liveAmount;
  const hasValue = displayAmount > 0;
  const remaining = totalAvailable - displayAmount;
  const remainingColor =
    remaining < 0 ? 'error.main' : remaining < MIN_PURCHASE_AMOUNT ? 'warning.main' : 'success.text';

  const fieldError = showValidation && (purchaseAmount === 0 || purchaseAmount < MIN_PURCHASE_AMOUNT);
  const helperText = fieldError
    ? purchaseAmount === 0
      ? 'Enter a purchase price to continue.'
      : `Minimum purchase price is ${formatCurrency(MIN_PURCHASE_AMOUNT)}.`
    : `Minimum ${formatCurrency(MIN_PURCHASE_AMOUNT)}`;

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: (t: Theme) => `${t.shape.lg}px`,
        border: '1px solid',
        borderColor: 'border.default',
        bgcolor: 'background.paper',
      }}
    >
      {/* Available funds — updates live as purchase price is entered */}
      <Typography variant="small" sx={{ color: 'text.primary', display: 'block', mb: 0.5 }}>
        Available funds As at {TODAY}
      </Typography>
      <Typography
        variant="h4"
        sx={{ color: hasValue ? remainingColor : 'text.primary', mb: 2.5, transition: 'color 200ms ease' }}
      >
        {formatCurrency(Math.max(0, hasValue ? remaining : totalAvailable))
        }
      </Typography>

      {/* Divider with arrow on the left */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            border: '1px solid',
            borderColor: 'border.subtle',
            flexShrink: 0,
          }}
        >
          <Icon icon="arrow-down" size="lg" color="primary" />
        </Box>
        <Box sx={{ flex: 1, height: '1px', bgcolor: 'border.subtle' }} />
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

      {/* Minimum balance warning — shown inline when remaining drops below threshold */}
      {hasValue && remaining >= 0 && remaining < MIN_PURCHASE_AMOUNT && (
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
      {hasValue && remaining < 0 && (
        <Box sx={{ mt: 2, p: 2, borderRadius: (t: Theme) => `${t.shape.sm}px`, bgcolor: 'error.background', border: '1px solid', borderColor: 'error.main' }}>
          <Typography variant="small" sx={{ color: 'error.text' }}>
            Purchase price exceeds your available funds by {formatCurrency(Math.abs(remaining))}.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function StepFunding({
  purchaseAmount,
  onPurchaseAmountChange,
  accounts,
  totalAllocated,
  onTransferAmountChange,
  showValidation,
}: StepFundingProps) {
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [isFloating, setIsFloating] = useState(false);

  const totalAvailable = accounts.reduce((sum, a) => sum + a.balance, 0);
  const over = totalAllocated > purchaseAmount;
  const shortfall = purchaseAmount - totalAllocated;
  const accountsEnabled = purchaseAmount > 0;

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const STUCK_OFFSET = 16;
    const update = () => {
      setIsFloating(el.getBoundingClientRect().bottom >= window.innerHeight - STUCK_OFFSET - 0.5);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    let rafId = 0;
    const start = performance.now();
    const settle = () => { update(); if (performance.now() - start < 600) rafId = requestAnimationFrame(settle); };
    settle();
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <>
      <Stack spacing={4}>
        {/* ── Section 1: Purchase price ── */}
        <Stack spacing={1}>
          <Typography variant="h5">Purchase price</Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Specify the purchase price for your new Lifetime Pension. Use our Lifetime Pension Income
            Estimator to estimate your payment amounts.
          </Typography>
          <Box>
            <TextButton
              label="Lifetime Pension Income Estimator"
              startIcon="calculator"
              iconDirection="left"
              onClick={() => setEstimatorOpen(true)}
            />
          </Box>
        </Stack>

        {/* ── Transfer panel ── */}
        <TransferPanel
          totalAvailable={totalAvailable}
          purchaseAmount={purchaseAmount}
          onPurchaseAmountChange={onPurchaseAmountChange}
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

        {/* ── Section 2: Account allocation ── */}
        <Stack spacing={3}>
          <div>
            <Typography variant="h5" sx={{ mb: 0.5 }}>Allocate from your accounts</Typography>
            <Typography variant="body" sx={{ color: 'text.primary' }}>
              {accountsEnabled
                ? `Select accounts to transfer from and enter the amount from each. Your total must equal ${formatCurrency(purchaseAmount)}.`
                : 'Enter a purchase price above to allocate from your accounts.'}
            </Typography>
          </div>

          <Stack component="ul" spacing={0} sx={{ m: 0, p: 0, listStyle: 'none' }}>
            <Box component="li">
              <Typography
                variant="h6"
                sx={{ display: 'block', pt: 1.5, pb: 1.5, borderBottom: '1px solid', borderColor: 'border.input' }}
              >
                Your accounts
              </Typography>
              <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                {accounts.map((account) => (
                  <Box
                    component="li"
                    key={account.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      py: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'border.subtle',
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body" sx={{ fontWeight: 500, color: 'text.primary', display: 'block' }}>
                        {account.label}
                      </Typography>
                      <Typography variant="small" sx={{ color: 'text.muted', display: 'block', mt: 0.25 }}>
                        Available: {formatCurrency(account.balance)}
                      </Typography>
                    </Box>
                    <Box sx={{ width: '12rem', flexShrink: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          component="label"
                          variant="small"
                          sx={{ color: 'text.muted', whiteSpace: 'nowrap' }}
                        >
                          Amount:
                        </Typography>
                        <MoneyField
                          value={account.transferAmount > 0 ? account.transferAmount : null}
                          size="medium"
                          max={account.balance}
                          disabled={!accountsEnabled}
                          onChange={(v) => { onTransferAmountChange(account.id, v ?? 0); }}
                        />
                      </Box>
                      {account.transferAmount > account.balance && (
                        <Typography variant="small" sx={{ color: 'error.main', mt: 0.5, display: 'block' }}>
                          Exceeds available balance
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Stack>

          {showValidation && over && (
            <Alert severity="error" message={`Your allocations exceed the purchase amount by ${formatCurrency(totalAllocated - purchaseAmount)}.`} />
          )}
          {showValidation && !over && shortfall > 0 && purchaseAmount > 0 && (
            <Alert severity="error" message={`Allocate ${formatCurrency(shortfall)} more to reach your purchase amount.`} />
          )}

          {purchaseAmount > 0 && (
            <AllocationBar
              allocated={totalAllocated}
              target={purchaseAmount}
              attempted={showValidation}
              barRef={barRef}
              isFloating={isFloating}
            />
          )}
        </Stack>
      </Stack>

      {/* ── Estimator dialog ── */}
      <Dialog
        open={estimatorOpen}
        onClose={() => setEstimatorOpen(false)}
        title="Lifetime Pension Income Estimator"
        hideCancel
        confirmLabel="Close"
        onConfirm={() => setEstimatorOpen(false)}
        variant="info"
        size="medium"
      >
        <Typography variant="body">
          Use the Lifetime Pension Income Estimator to explore how different purchase prices and options
          affect your fortnightly payment amounts. This tool provides an estimate only — actual payments
          may vary.
        </Typography>
      </Dialog>
    </>
  );
}
