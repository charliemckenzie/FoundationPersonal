import type { BankDetailsValue } from '../BankDetailsField';

export type { BankDetailsValue };

export interface SavedBankAccount extends BankDetailsValue {
  id: string;
  nickname?: string;
}

/**
 * Confirmation of Payee result per the ABA Scam-Safe Accord.
 * - `match`       — name and details match exactly
 * - `close-match` — name is similar but not exact
 * - `no-match`    — name does not match the account
 */
export type CopResult = 'match' | 'close-match' | 'no-match';

export interface VerificationResult {
  success: boolean;
  errorMessage?: string;
  /**
   * Confirmation of Payee outcome. When present, the panel shows Part 2 CoP
   * UI before adding the account. Absent = backwards-compatible auto-add.
   */
  copResult?: CopResult;
  /**
   * Account holder name returned by the bank lookup. Needed for close-match
   * and no-match so the mismatch can be surfaced to the user.
   */
  resolvedName?: string;
}
