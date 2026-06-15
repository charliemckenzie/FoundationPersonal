import type { InvestmentAccount, InvestmentOption, InvestmentSwitchRecord, ApplyTo } from './types';
import { formatDate, allocationsEqual } from './utils';

export const MOCK_ACCOUNTS: InvestmentAccount[] = [
  {
    id: 'acc-001',
    name: 'Accumulation account',
    accountNumber: '123 456 789',
    balance: 84250.0,
    openedAt: '2019-03-15',
  },
  {
    id: 'acc-002',
    name: 'Retirement Income account',
    accountNumber: '987 654 321',
    balance: 880450.5,
    openedAt: '2024-07-01',
    isIncomeAccount: true,
  },
];

export const MOCK_INVESTMENT_OPTIONS: InvestmentOption[] = [
  // Strategy options
  {
    id: 'opt-lifecycle',
    name: 'Lifecycle Investment Strategy',
    category: 'Strategy options',
    riskLevel: 'Varies by age',
    returnProfile: 'Varies by age',
    currentAllocation: 100,
    annualFee: 0.65, // representative blended rate; actual fee varies by age/pool split
  },
  // Diversified options
  {
    id: 'opt-high-growth',
    name: 'High Growth',
    category: 'Diversified options',
    riskLevel: 'High',
    returnProfile: 'High',
    currentAllocation: 0,
    annualFee: 0.70,
  },
  {
    id: 'opt-balanced',
    name: 'Balanced',
    category: 'Diversified options',
    riskLevel: 'Medium',
    returnProfile: 'Medium to high',
    currentAllocation: 0,
    annualFee: 0.65,
  },
  {
    id: 'opt-conservative-balanced',
    name: 'Conservative Balanced',
    category: 'Diversified options',
    riskLevel: 'Low to medium',
    returnProfile: 'Low to medium',
    currentAllocation: 0,
    annualFee: 0.63,
  },
  {
    id: 'opt-conservative',
    name: 'Conservative',
    category: 'Diversified options',
    riskLevel: 'Low',
    returnProfile: 'Low',
    currentAllocation: 0,
    annualFee: 0.60,
  },
  {
    id: 'opt-balanced-risk-adjusted',
    name: 'Balanced Risk-Adjusted',
    category: 'Diversified options',
    riskLevel: 'Medium',
    returnProfile: 'Medium',
    currentAllocation: 0,
    annualFee: 0.46,
  },
  {
    id: 'opt-socially-conscious',
    name: 'Socially Conscious Balanced',
    category: 'Diversified options',
    riskLevel: 'Medium',
    returnProfile: 'Medium to high',
    currentAllocation: 0,
    annualFee: 0.66,
  },
  {
    id: 'opt-high-growth-index',
    name: 'High Growth Index',
    category: 'Diversified options',
    riskLevel: 'High',
    returnProfile: 'High',
    currentAllocation: 0,
    annualFee: 0.08,
  },
  {
    id: 'opt-balanced-index',
    name: 'Balanced Index',
    category: 'Diversified options',
    riskLevel: 'Medium',
    returnProfile: 'Medium to high',
    currentAllocation: 0,
    annualFee: 0.08,
  },
  // Asset class options
  {
    id: 'opt-aus-shares',
    name: 'Australian Shares',
    category: 'Asset class options',
    riskLevel: 'High',
    returnProfile: 'High',
    currentAllocation: 0,
    annualFee: 0.08,
  },
  {
    id: 'opt-intl-shares-hedged',
    name: 'International Shares Hedged Index',
    category: 'Asset class options',
    riskLevel: 'High',
    returnProfile: 'High',
    currentAllocation: 0,
    annualFee: 0.10,
  },
  {
    id: 'opt-intl-shares-unhedged',
    name: 'International Shares Unhedged Index',
    category: 'Asset class options',
    riskLevel: 'High',
    returnProfile: 'High',
    currentAllocation: 0,
    annualFee: 0.10,
  },
  {
    id: 'opt-listed-property',
    name: 'Listed Property Index',
    category: 'Asset class options',
    riskLevel: 'High',
    returnProfile: 'High',
    currentAllocation: 0,
    annualFee: 0.10,
  },
  {
    id: 'opt-unlisted-assets',
    name: 'Unlisted Assets',
    category: 'Asset class options',
    riskLevel: 'Medium to high',
    returnProfile: 'Medium to high',
    currentAllocation: 0,
    annualFee: 1.73,
  },
  {
    id: 'opt-bonds',
    name: 'Bonds Index',
    category: 'Asset class options',
    riskLevel: 'Low to medium',
    returnProfile: 'Low',
    currentAllocation: 0,
    annualFee: 0.08,
  },
  {
    id: 'opt-cash',
    name: 'Cash',
    category: 'Asset class options',
    riskLevel: 'Very low',
    returnProfile: 'Low',
    currentAllocation: 0,
    annualFee: 0.07,
  },
];

/**
 * Each account's *current* investment mix (optionId → whole-number percentage).
 * Distinct from the shared `currentAllocation` on the options, which the change
 * flow uses as a generic starting point. Used by the Change your investments
 * landing to show the selected account's mix.
 */
/**
 * Each account's *actual current investments* — where the money sits right now.
 * acc-001 has a typical two-option diversified mix; balance and future are the same,
 * so the overview collapses to a single combined card. acc-002 (income) is a split:
 * the balance dial holds three options while the payments dial is 100% cash.
 */
export const CURRENT_MIX_BY_ACCOUNT: Record<string, Record<string, number>> = {
  'acc-001': { 'opt-balanced': 70, 'opt-high-growth': 30 },
  'acc-002': { 'opt-balanced': 50, 'opt-conservative-balanced': 30, 'opt-cash': 20 },
};

/**
 * The account's *second* investment dial: where future contributions are directed
 * (accumulation) or which options payments/withdrawals are drawn from (income).
 * Independent of the balance mix — a "future/payments only" change moves this dial
 * without touching the current balance, so the two can diverge.
 */
export const FUTURE_OR_PAYMENT_MIX_BY_ACCOUNT: Record<string, Record<string, number>> = {
  'acc-001': { 'opt-balanced': 70, 'opt-high-growth': 30 },
  'acc-002': { 'opt-cash': 100 },
};

/**
 * When each dial was last deliberately changed (ISO date). The balance dial reflects
 * the last balance switch (the holdings have drifted since); the future dial reflects
 * when the contribution/payment direction was last set.
 */
const DIAL_DATES_BY_ACCOUNT: Record<string, { balance: string; future: string }> = {
  'acc-001': { balance: '2025-11-03', future: '2025-11-03' },
  'acc-002': { balance: '2026-05-02', future: '2026-05-15' },
};

/**
 * Rebalancing status per account. Present on balance/combined dials only.
 * `nextDate` set → rebalancing is active; absent → never configured or turned off.
 * Six-monthly cadence fires around 31 Mar and 30 Sep; yearly fires around 31 Mar.
 * Relative to "today" of mid-June 2026, the next six-monthly date is 30 Sep 2026.
 */
const REBALANCE_BY_ACCOUNT: Record<string, { nextDate?: string }> = {
  'acc-001': { nextDate: '2026-09-30' },
  'acc-002': {},
};

/** A single investment dial's display + routing data for the account overview. */
export interface AccountDialDescriptor {
  id: 'balance' | 'future' | 'combined';
  title: string;
  subtitle?: string;
  allocations: Record<string, number>;
  editLabel: string;
  /** apply-to value to preselect in the change flow when editing this dial. */
  applyTo: ApplyTo;
  /** Rebalancing status — only set on balance/combined dials; undefined on future/payments. */
  rebalancing?: { nextDate?: string };
}

/**
 * The two dials for an account — balance + future/payments — ready to render in
 * `InvestmentOverview`. Labels and apply-to values adapt to the account type.
 */
export function accountDials(account: InvestmentAccount): AccountDialDescriptor[] {
  const income = !!account.isIncomeAccount;
  const balanceMix = CURRENT_MIX_BY_ACCOUNT[account.id] ?? {};
  const futureMix = FUTURE_OR_PAYMENT_MIX_BY_ACCOUNT[account.id] ?? balanceMix;
  const dates = DIAL_DATES_BY_ACCOUNT[account.id];

  const rebalancing = REBALANCE_BY_ACCOUNT[account.id];

  // Aligned account ("apply to both" / never diverged) — show one combined dial, not two identical cards.
  if (allocationsEqual(balanceMix, futureMix)) {
    return [
      {
        id: 'combined',
        title: 'Investment mix',
        allocations: balanceMix,
        editLabel: 'Edit your investment mix',
        applyTo: income ? 'income-both' : 'all',
        rebalancing,
      },
    ];
  }

  return [
    {
      id: 'balance',
      title: 'Current investments',
      subtitle: `Existing balance · last switched ${formatDate(dates.balance)}`,
      allocations: balanceMix,
      editLabel: 'Edit current investments',
      applyTo: income ? 'income-balance' : 'balance',
      rebalancing,
    },
    {
      id: 'future',
      title: income ? 'Payments' : 'Future contributions',
      subtitle: `${income ? 'Payments out' : 'New money in'} · set ${formatDate(dates.future)}`,
      allocations: futureMix,
      editLabel: income ? 'Edit payment investment options' : 'Edit future contributions investment mix',
      applyTo: income ? 'income-payments' : 'future',
    },
  ];
}

/**
 * Past investment switches per account, newest first. A switch inside the
 * 2–3 business-day window is `processing`; the latest applied switch is
 * `active` (the account's current mix); earlier ones are `superseded`.
 * Relative to a "today" of mid-June 2026.
 */
export const MOCK_SWITCH_HISTORY: InvestmentSwitchRecord[] = [
  {
    id: 'sw-004',
    accountId: 'acc-002',
    submittedAt: '2026-05-02T10:15:00+10:00',
    applyTo: 'income-balance',
    allocations: { 'opt-balanced': 50, 'opt-conservative-balanced': 30, 'opt-cash': 20 },
    status: 'active',
    referenceNumber: 'NP34QR56',
  },
  {
    id: 'sw-005',
    accountId: 'acc-002',
    submittedAt: '2025-12-09T15:30:00+11:00',
    applyTo: 'income-payments',
    allocations: { 'opt-cash': 100 },
    status: 'superseded',
    referenceNumber: 'ST78UV90',
  },
];

/** The current investment mix for an account (optionId → percentage). */
export function currentMixForAccount(accountId: string): Record<string, number> {
  return CURRENT_MIX_BY_ACCOUNT[accountId] ?? {};
}

/** Past switches for an account, newest first. */
export function historyForAccount(accountId: string): InvestmentSwitchRecord[] {
  return MOCK_SWITCH_HISTORY.filter((s) => s.accountId === accountId).sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}
