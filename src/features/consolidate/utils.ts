import type { ConsolidateSubmission, ExternalFund, FoundFund, TransferAmount, SmsfDetails, SmsfReadiness } from './types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);
}

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDateDMY(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd} / ${mm} / ${d.getFullYear()}`;
}

function generateReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export function buildSubmission(
  method: 'ato',
  selectedFunds: FoundFund[],
): ConsolidateSubmission;
export function buildSubmission(
  method: 'manual',
  funds: ExternalFund[],
): ConsolidateSubmission;
export function buildSubmission(
  method: 'smsf',
  smsf: SmsfDetails,
): ConsolidateSubmission;
export function buildSubmission(
  method: 'ato' | 'manual' | 'smsf',
  data: FoundFund[] | ExternalFund[] | SmsfDetails,
): ConsolidateSubmission {
  const submission: ConsolidateSubmission = {
    method,
    referenceNumber: generateReference(),
    submittedAt: new Date().toISOString(),
  };

  if (method === 'ato') {
    submission.selectedFunds = data as FoundFund[];
  } else if (method === 'manual') {
    submission.funds = data as ExternalFund[];
  } else if (method === 'smsf') {
    submission.smsf = data as SmsfDetails;
  }

  return submission;
}

/** Validation: Manual flow — per-fund. */
export function validateFund(fund: Partial<ExternalFund>): boolean {
  if (!fund.fundName?.trim()) return false;
  if (!fund.memberNumber?.trim()) return false;
  return validateAmount(fund.amount);
}

/** Validation: amount choice (full vs partial). */
export function validateAmount(amount: TransferAmount | null | undefined): boolean {
  if (!amount) return false;
  if (amount.type === 'full') return true;
  if (amount.type === 'partial') {
    return amount.amount != null && amount.amount > 0;
  }
  return false;
}

/** Validation: SMSF readiness gate — all four checkboxes. */
export function validateReadiness(readiness: SmsfReadiness): boolean {
  return (
    readiness.assetsLiquidated &&
    readiness.esaConfirmed &&
    readiness.detailsVerifiable &&
    readiness.windUpUnderstood
  );
}

/** Validation: SMSF details. */
export function validateSmsfDetails(smsf: Partial<SmsfDetails>): boolean {
  if (!smsf.smsfName?.trim()) return false;
  if (!smsf.abn?.trim()) return false;
  if (!smsf.esa?.trim()) return false;
  if (!smsf.bankVerified) return false;
  return validateAmount(smsf.amount);
}

/** Validation: ATO results — at least one fund selected. */
export function validateAtoSelection(funds: FoundFund[]): boolean {
  return funds.some((f) => f.selected);
}

/** Total balance of selected ATO funds. */
export function calculateAtoTotal(funds: FoundFund[]): number {
  return funds.filter((f) => f.selected).reduce((sum, f) => sum + f.balance, 0);
}
