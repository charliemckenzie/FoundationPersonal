export interface InvestmentAccount {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  /** ISO date string for when the account was opened. */
  openedAt?: string;
  /** True for pension/retirement income accounts — they have a different set of change options. */
  isIncomeAccount?: boolean;
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

/**
 * Whether the chosen apply-to option changes how the *current balance* is invested.
 * Automatic rebalancing only makes sense when the balance is being set to a target mix —
 * not for "future contributions only", which never touches the existing balance.
 */
export function applyToIncludesBalance(v: ApplyTo): boolean {
  return v === 'all' || v === 'balance' || v === 'income-both' || v === 'income-balance';
}

/** How often we automatically switch the balance back to the member's chosen mix. */
export type RebalanceFrequency = 'six-monthly' | 'yearly';

export interface RebalanceSetting {
  /** True if the member wants us to keep their mix on track automatically. */
  enabled: boolean;
  /** Present only when enabled. */
  frequency?: RebalanceFrequency;
}

export const REBALANCE_FREQUENCY_OPTIONS = [
  {
    value: 'six-monthly' as RebalanceFrequency,
    label: 'Every 6 months',
    description: 'We switch your investments back to your chosen mix twice a year, around 31 March and 30 September.',
  },
  {
    value: 'yearly' as RebalanceFrequency,
    label: 'Every 12 months',
    description: 'We switch your investments back to your chosen mix once a year, around 31 March.',
  },
] as const;

/** Payment preference for retirement income accounts. */
export type PaymentPreferenceType = 'proportional' | 'percentage';

export interface PaymentPreference {
  type: PaymentPreferenceType;
  /** Whole-number percentages per option (totalling 100). Only present when type === 'percentage'. */
  percentages?: Record<string, number>;
}

export interface InvestmentMixChange {
  accountId: string;
  accountName: string;
  applyTo: ApplyTo;
  allocations: Record<string, number>;
  /** Only present for retirement income accounts when applyTo includes payments. */
  paymentPreference?: PaymentPreference;
  /** Only present when the rebalancing step was shown (balance change with 2+ non-Lifecycle options). */
  rebalance?: RebalanceSetting;
  referenceNumber: string;
  submittedAt: string;
}

/**
 * Lifecycle status of an investment switch:
 * - `processing` — submitted and still being applied (2–3 business days).
 * - `active` — applied and currently in effect (the account's live mix).
 * - `superseded` — replaced by a later switch; no longer in use.
 */
export type SwitchStatus = 'processing' | 'active' | 'superseded';

/**
 * A single past investment switch recorded against an account.
 * Powers the per-account investment mix history list.
 */
export interface InvestmentSwitchRecord {
  id: string;
  accountId: string;
  /** ISO timestamp the switch was submitted. */
  submittedAt: string;
  applyTo: ApplyTo;
  /** Resulting target allocations: optionId → whole-number percentage. */
  allocations: Record<string, number>;
  status: SwitchStatus;
  referenceNumber: string;
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
