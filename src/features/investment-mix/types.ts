export interface InvestmentAccount {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  /** True for pension/retirement income accounts — they have a different set of change options. */
  isIncomeAccount?: boolean;
  /** True for Transition to Retirement (TTR) accounts. Lifecycle Investment Strategy is not available. */
  isTTRAccount?: boolean;
}

export interface InvestmentOption {
  id: string;
  name: string;
  category: string;
  riskLevel: string;
  returnProfile: string;
  currentAllocation: number;
  /** Total fee % p.a. (investment fees + transaction costs). e.g. 0.70 means 0.70% */
  annualFee: number;
}

/** Accumulation account apply-to options */
export type AccumulationApplyTo = 'all' | 'balance' | 'future';

/**
 * Retirement Income account apply-to options.
 * - income-both: change both the current balance investment and the payment/withdrawal options
 * - income-balance: change only where the current balance is invested
 * - income-payments: change only which options future payments and withdrawals are taken from
 */
export type IncomeApplyTo = 'income-both' | 'income-balance' | 'income-payments';

export type ApplyTo = AccumulationApplyTo | IncomeApplyTo;

export function isIncomeApplyTo(v: ApplyTo): v is IncomeApplyTo {
  return v === 'income-both' || v === 'income-balance' || v === 'income-payments';
}

/** Whether the chosen apply-to option involves changing payment/withdrawal options. */
export function applyToIncludesPayments(v: ApplyTo): boolean {
  return v === 'income-both' || v === 'income-payments';
}

/** Payment preference for retirement income accounts. */
export type PaymentPreferenceType = 'brand-chooses' | 'percentage' | 'priority';

export interface PaymentPreference {
  type: PaymentPreferenceType;
  /** Whole-number percentages per option (totalling 100). Only present when type === 'percentage'. */
  percentages?: Record<string, number>;
  /** Investment option IDs in priority order (draw from first = index 0). Only present when type === 'priority'. */
  priorityOrder?: string[];
}

export interface InvestmentMixChange {
  accountId: string;
  accountName: string;
  applyTo: ApplyTo;
  allocations: Record<string, number>;
  /** Only present for retirement income accounts when applyTo includes payments. */
  paymentPreference?: PaymentPreference;
  referenceNumber: string;
  submittedAt: string;
}

export const APPLY_TO_OPTIONS = [
  {
    value: 'all' as ApplyTo,
    label: 'All funds',
    description: 'Apply to my current balance and future contributions.',
  },
  {
    value: 'balance' as ApplyTo,
    label: 'Current balance only',
    description: 'Only apply to my existing account balance.',
  },
  {
    value: 'future' as ApplyTo,
    label: 'Future contributions only',
    description: 'Only apply to contributions I make from now on.',
  },
] as const;

export const INCOME_APPLY_TO_OPTIONS = [
  {
    value: 'income-both' as ApplyTo,
    label: 'Change both balance and payments',
    description:
      'Choose investment options for your current balance, and choose which options you receive payments and withdrawals from.',
  },
  {
    value: 'income-balance' as ApplyTo,
    label: 'Change current account balance only',
    description:
      "This is where your current balance is invested. It won't change which options you receive payments and withdrawals from.",
  },
  {
    value: 'income-payments' as ApplyTo,
    label: 'Change payment/withdrawal investment',
    description:
      "These are the options your future payments and withdrawals are taken from. It won't change how your current balance is invested.",
  },
] as const;
