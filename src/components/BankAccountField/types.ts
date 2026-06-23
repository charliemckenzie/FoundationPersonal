import type { BankDetailsValue } from '../BankDetailsField';

export type { BankDetailsValue };

export interface SavedBankAccount extends BankDetailsValue {
  id: string;
  nickname?: string;
}

export interface VerificationResult {
  success: boolean;
  errorMessage?: string;
}
