import type { ChipSeverity } from '../../../../components/Chip';

export type AccountStatus = 'active' | 'closed';

export interface IncomeAccount {
  id: string;
  name: string;
  memberNumber: string;
  balance: number;
  status: AccountStatus;
  nextPaymentAmount: string;
  nextPaymentDate: string;
  closingDate?: string;
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
