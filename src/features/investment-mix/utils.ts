import type { InvestmentAccount, InvestmentOption, ApplyTo, InvestmentMixChange, PaymentPreference, RebalanceSetting } from './types';
import { APPLY_TO_OPTIONS, INCOME_APPLY_TO_OPTIONS } from './types';

export function applyToLabel(applyTo: ApplyTo): string {
  return (
    [...APPLY_TO_OPTIONS, ...INCOME_APPLY_TO_OPTIONS].find((o) => o.value === applyTo)?.label ??
    applyTo
  );
}

export function paymentPreferenceLabel(pref: PaymentPreference, brandName?: string): string {
  switch (pref.type) {
    case 'brand-chooses':
      return `Let ${brandName ?? 'the fund'} choose`;
    case 'percentage':
      return 'By percentage';
    case 'priority':
      return 'By order of priority';
  }
}

/** Short summary of the rebalancing choice for review and confirmation screens. */
export function rebalanceLabel(setting?: RebalanceSetting | null): string {
  if (!setting || !setting.enabled) return 'Not turned on';
  return setting.frequency === 'six-monthly' ? 'Every 6 months' : 'Every 12 months';
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);
}

/**
 * One-line summary of an allocation map for compact display (e.g. history rows).
 * Lists each allocated option and its percentage in option order.
 * → "High Growth 40%, Balanced 60%"
 */
export function summariseMix(
  options: InvestmentOption[],
  allocations: Record<string, number>,
): string {
  return options
    .filter((o) => (allocations[o.id] ?? 0) > 0)
    .map((o) => `${o.name} ${allocations[o.id]}%`)
    .join(', ');
}

const ORDINALS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

/** Human ordinal for a zero-based index: 0 → "1st", 1 → "2nd", … */
export function ordinal(index: number): string {
  return ORDINALS[index] ?? `${index + 1}th`;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function validateStep1(accountId: string): boolean {
  return accountId.trim().length > 0;
}

export function validateStep2(applyTo: ApplyTo | null): boolean {
  return applyTo !== null;
}

export interface Step3Validation {
  valid: boolean;
  total: number;
}

export function validateStep3(
  allocations: Record<string, number>,
  options: InvestmentOption[],
): Step3Validation {
  const total = options.reduce((sum, opt) => sum + (allocations[opt.id] ?? 0), 0);
  const valid = Math.abs(total - 100) <= 0.001;
  return { valid, total };
}

export function validateStep4(declared: boolean): boolean {
  return declared;
}

export function validatePaymentPreference(
  pref: PaymentPreference | null,
  allocatedOptions: InvestmentOption[],
): boolean {
  if (!pref) return false;
  if (pref.type === 'brand-chooses') return true;
  if (pref.type === 'percentage') {
    if (!pref.percentages) return false;
    const total = allocatedOptions.reduce((s, o) => s + (pref.percentages![o.id] ?? 0), 0);
    return total === 100;
  }
  if (pref.type === 'priority') {
    return (pref.priorityOrder?.length ?? 0) > 0;
  }
  return false;
}

/**
 * The rebalancing step demands an explicit choice. "No" is valid on its own;
 * "Yes" is only valid once a frequency is picked.
 */
export function validateRebalance(setting: RebalanceSetting | null): boolean {
  if (!setting) return false;
  if (!setting.enabled) return true;
  return setting.frequency != null;
}

const RISK_SCORES: Record<string, number> = {
  'Very low': 1,
  'Low': 2,
  'Low to medium': 2.5,
  'Medium': 3,
  'Medium to high': 3.5,
  'High': 4,
  'Very high': 5,
};

function scoreToRiskLabel(score: number): string {
  if (score < 1.5) return 'Very low';
  if (score < 2.2) return 'Low';
  if (score < 2.8) return 'Low to medium';
  if (score < 3.2) return 'Medium';
  if (score < 3.8) return 'Medium to high';
  if (score < 4.5) return 'High';
  return 'Very high';
}

export interface BlendedProfile {
  riskLabel: string;
  /** Blended investment cost ratio as a percentage p.a., e.g. 0.10 = 0.10% */
  annualFeePercent: number;
}

export function blendedProfile(
  options: InvestmentOption[],
  allocations: Record<string, number>,
): BlendedProfile {
  let weightedRiskScore = 0;
  let riskWeight = 0;
  let weightedFee = 0;

  for (const opt of options) {
    const alloc = allocations[opt.id] ?? 0;
    if (alloc === 0) continue;
    const score = RISK_SCORES[opt.riskLevel];
    if (score !== undefined) {
      weightedRiskScore += score * alloc;
      riskWeight += alloc;
    }
    weightedFee += opt.annualFee * alloc;
  }

  return {
    riskLabel: riskWeight > 0 ? scoreToRiskLabel(weightedRiskScore / riskWeight) : '—',
    annualFeePercent: weightedFee / 100,
  };
}

function generateReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export function buildChange(
  accountId: string,
  accounts: InvestmentAccount[],
  applyTo: ApplyTo,
  allocations: Record<string, number>,
  paymentPreference?: PaymentPreference,
  rebalance?: RebalanceSetting,
): InvestmentMixChange {
  const account = accounts.find((a) => a.id === accountId);
  return {
    accountId,
    accountName: account?.name ?? accountId,
    applyTo,
    allocations,
    ...(paymentPreference ? { paymentPreference } : {}),
    ...(rebalance ? { rebalance } : {}),
    referenceNumber: generateReference(),
    submittedAt: new Date().toISOString(),
  };
}
