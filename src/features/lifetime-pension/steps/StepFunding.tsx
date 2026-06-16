import { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import { Icon } from '../../../components/Icon';
import { MoneyField } from '../../../components/MoneyField';
import { Tooltip } from '../../../components/Tooltip';
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
  const barRef = useRef<HTMLDivElement | null>(null);
  const [isFloating, setIsFloating] = useState(false);
  const over = totalAllocated > purchaseAmount;
  const shortfall = purchaseAmount - totalAllocated;

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
    <Stack spacing={4}>
      {/* ── Section 1: Purchase amount ── */}
      <Stack spacing={2}>
        <div>
          <Typography variant="h5" sx={{ mb: 0.5 }}>How much do you want to purchase?</Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            Enter the amount you want to put into your Lifetime Pension. The minimum purchase is {formatCurrency(MIN_PURCHASE_AMOUNT)}.
          </Typography>
        </div>

        <Box sx={{ maxWidth: '20rem' }}>
          <MoneyField
            label="Purchase amount"
            value={purchaseAmount || null}
            fullWidth
            onChange={(v) => onPurchaseAmountChange(v ?? 0)}
          />
        </Box>

        {showValidation && purchaseAmount === 0 && (
          <Alert severity="error" message="Enter a purchase amount to continue." />
        )}
        {showValidation && purchaseAmount > 0 && purchaseAmount < MIN_PURCHASE_AMOUNT && (
          <Alert severity="error" message={`The minimum purchase amount is ${formatCurrency(MIN_PURCHASE_AMOUNT)}.`} />
        )}
        {purchaseAmount >= MIN_PURCHASE_AMOUNT && (
          <Alert
            severity="info"
            title="You're eligible for a Retirement bonus!"
            message="Your estimated bonus will be shown in the next step."
          />
        )}
      </Stack>

      {/* ── Section 2: Account allocation ── */}
      {purchaseAmount >= MIN_PURCHASE_AMOUNT && (
        <Stack spacing={3}>
          <div>
            <Typography variant="h5" sx={{ mb: 0.5 }}>Allocate from your accounts</Typography>
            <Typography variant="body" sx={{ color: 'text.primary' }}>
              Select the accounts to transfer from and enter the amount from each. Your total must equal {formatCurrency(purchaseAmount)}.
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
                          onChange={(v) => {
                            onTransferAmountChange(account.id, v ?? 0);
                          }}
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
          {showValidation && !over && shortfall > 0 && (
            <Alert severity="error" message={`Allocate ${formatCurrency(shortfall)} more to reach your purchase amount.`} />
          )}

          <AllocationBar
            allocated={totalAllocated}
            target={purchaseAmount}
            attempted={showValidation}
            barRef={barRef}
            isFloating={isFloating}
          />
        </Stack>
      )}
    </Stack>
  );
}
