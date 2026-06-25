import type { ChipSeverity } from '../../../../components/Chip';

export type AccountStatus = 'active' | 'closed';

export interface IncomeAccount {
  id: string;
  name: string;
  accountType: 'ria' | 'lp' | 'ttr';
  memberNumber: string;
  balance: number;
  status: AccountStatus;
  nextPaymentAmount: string;
  nextPaymentDate: string;
  closingDate?: string;
  purchasePrice?: number;
  icon: string;
}

export interface Application {
  id: string;
  accountType: string;
  status: string;
  severity: ChipSeverity;
  startedAt: string;
  continuePath: string;
}

export interface Payment {
  id: string;
  accountName: string;
  memberNumber: string;
  date: string;
  amount: number;
}

export interface MemberStatus {
  tfnProvided: boolean;
  annualReviewDue: boolean;
  annualReviewDueDate?: string;
}
