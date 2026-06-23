import type { SavedBankAccount, VerificationResult } from './types';
import type { BankDetailsValue } from '../BankDetailsField';

export const MOCK_SAVED_ACCOUNTS: SavedBankAccount[] = [
  {
    id: 'acc-001',
    bsb: '062-000',
    accountNumber: '12345678',
    accountName: 'Jane Smith',
    nickname: 'CBA Everyday',
  },
  {
    id: 'acc-002',
    bsb: '032-001',
    accountNumber: '87654321',
    accountName: 'Jane Smith',
    nickname: 'Westpac Savings',
  },
];

export const MOCK_SAVED_ACCOUNTS_SINGLE: SavedBankAccount[] = [
  MOCK_SAVED_ACCOUNTS[0],
];

export const MOCK_SAVED_ACCOUNTS_MANY: SavedBankAccount[] = [
  { id: 'acc-001', bsb: '062-000', accountNumber: '12345678', accountName: 'Jane Smith' },
  { id: 'acc-002', bsb: '032-001', accountNumber: '87654321', accountName: 'Jane Smith' },
  { id: 'acc-003', bsb: '083-001', accountNumber: '11223344', accountName: 'Jane Smith' },
  { id: 'acc-004', bsb: '014-001', accountNumber: '55667788', accountName: 'Jane Smith' },
  { id: 'acc-005', bsb: '012-003', accountNumber: '99887766', accountName: 'Jane Smith' },
  { id: 'acc-006', bsb: '923-100', accountNumber: '44332211', accountName: 'Jane Smith' },
];

export const MOCK_SAVED_ACCOUNTS_EMPTY: SavedBankAccount[] = [];

/**
 * Mock verification service. Simulates network latency (1.2s).
 * BSB starting with "999" is treated as invalid.
 */
export async function mockVerifyAndAdd(
  details: BankDetailsValue
): Promise<VerificationResult> {
  await new Promise<void>((resolve) => setTimeout(resolve, 1200));
  if (details.bsb.startsWith('999')) {
    return {
      success: false,
      errorMessage:
        'We could not verify this account. Check the BSB and account number and try again.',
    };
  }
  return { success: true };
}
