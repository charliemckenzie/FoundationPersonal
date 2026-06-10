export interface InvestmentAccount {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
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

export type ApplyTo = 'all' | 'balance' | 'future';

export interface InvestmentMixChange {
  accountId: string;
  accountName: string;
  applyTo: ApplyTo;
  allocations: Record<string, number>;
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
