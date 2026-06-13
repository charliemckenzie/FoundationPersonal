import type { InvestmentAccount, InvestmentOption, InvestmentSwitchRecord } from './types';

export const MOCK_ACCOUNTS: InvestmentAccount[] = [
  {
    id: 'acc-001',
    name: 'Accumulation account',
    accountNumber: '123 456 789',
    balance: 84250.0,
  },
  {
    id: 'acc-002',
    name: 'Retirement Income account',
    accountNumber: '987 654 321',
    balance: 880450.5,
    isIncomeAccount: true,
  },
  {
    id: 'acc-003',
    name: 'Transition to Retirement account',
    accountNumber: '456 789 123',
    balance: 215000.0,
    isTTRAccount: true,
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
    currentAllocation: 0,
    annualFee: 0.65, // representative blended rate; actual fee varies by age/pool split
  },
  // Diversified options
  {
    id: 'opt-high-growth',
    name: 'High Growth',
    category: 'Diversified options',
    riskLevel: 'High',
    returnProfile: 'High',
    currentAllocation: 40,
    annualFee: 0.70,
  },
  {
    id: 'opt-balanced',
    name: 'Balanced',
    category: 'Diversified options',
    riskLevel: 'Medium',
    returnProfile: 'Medium to high',
    currentAllocation: 60,
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
export const CURRENT_MIX_BY_ACCOUNT: Record<string, Record<string, number>> = {
  'acc-001': { 'opt-high-growth': 40, 'opt-balanced': 60 },
  'acc-002': { 'opt-balanced': 50, 'opt-conservative-balanced': 30, 'opt-cash': 20 },
  'acc-003': { 'opt-balanced': 70, 'opt-conservative': 30 },
};

/**
 * Past investment switches per account, newest first. A switch inside the
 * 2–3 business-day window is `processing`; the latest applied switch is
 * `active` (the account's current mix); earlier ones are `superseded`.
 * Relative to a "today" of mid-June 2026.
 */
export const MOCK_SWITCH_HISTORY: InvestmentSwitchRecord[] = [
  {
    id: 'sw-001',
    accountId: 'acc-001',
    submittedAt: '2026-06-11T09:24:00+10:00',
    applyTo: 'all',
    allocations: { 'opt-high-growth': 40, 'opt-balanced': 60 },
    status: 'processing',
    referenceNumber: 'AB12CD34',
  },
  {
    id: 'sw-002',
    accountId: 'acc-001',
    submittedAt: '2026-02-03T14:02:00+11:00',
    applyTo: 'future',
    allocations: { 'opt-balanced': 100 },
    status: 'active',
    referenceNumber: 'EF56GH78',
  },
  {
    id: 'sw-003',
    accountId: 'acc-001',
    submittedAt: '2025-10-18T11:47:00+11:00',
    applyTo: 'balance',
    allocations: { 'opt-conservative-balanced': 50, 'opt-balanced': 50 },
    status: 'superseded',
    referenceNumber: 'JK90LM12',
  },
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
