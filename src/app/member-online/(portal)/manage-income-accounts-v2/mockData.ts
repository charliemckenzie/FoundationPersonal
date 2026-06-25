import type { Application, IncomeAccount, MemberStatus, Payment } from './types';

export const MOCK_INCOME_ACCOUNTS: IncomeAccount[] = [
  {
    id: 'acc-ria',
    name: 'Retirement Income Account',
    accountType: 'ria',
    memberNumber: '235896',
    balance: 1289130.55,
    status: 'active',
    nextPaymentAmount: '$2,847.65',
    nextPaymentDate: '15 Jul 2026',
    icon: 'money-simple-from-bracket',
  },
  {
    id: 'acc-ria-2',
    name: 'Retirement Income Account',
    accountType: 'ria',
    memberNumber: '235897',
    balance: 89130.55,
    status: 'active',
    nextPaymentAmount: '$2,847.65',
    nextPaymentDate: '15 Jul 2026',
    icon: 'money-simple-from-bracket',
  },
  {
    id: 'acc-lp',
    name: 'Lifetime Pension',
    accountType: 'lp',
    memberNumber: '235898',
    balance: 180.99,
    status: 'active',
    nextPaymentAmount: '$3,021.15',
    nextPaymentDate: '30 Jun 2026',
    purchasePrice: 750000,
    icon: 'money-check-dollar',
  },
  {
    id: 'acc-ttr',
    name: 'Retirement Income Account',
    accountType: 'ttr',
    memberNumber: '235899',
    balance: 0.77,
    status: 'active',
    nextPaymentAmount: '$500.00',
    nextPaymentDate: '1 Aug 2026',
    icon: 'money-simple-from-bracket',
  },
  {
    id: 'acc-closed-1',
    name: 'Retirement Income Account',
    accountType: 'ria',
    memberNumber: '235900',
    balance: 0,
    status: 'closed',
    nextPaymentAmount: '—',
    nextPaymentDate: '—',
    closingDate: '14 Mar 2025',
    icon: 'money-simple-from-bracket',
  },
  {
    id: 'acc-closed-2',
    name: 'Retirement Income Account',
    accountType: 'ria',
    memberNumber: '235901',
    balance: 0,
    status: 'closed',
    nextPaymentAmount: '—',
    nextPaymentDate: '—',
    closingDate: '2 Jan 2024',
    icon: 'money-simple-from-bracket',
  },
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app-001',
    accountType: 'Retirement Income Account',
    status: 'In progress',
    severity: 'info',
    startedAt: '10 Jun 2026',
    continuePath: '#',
  },
  {
    id: 'app-002',
    accountType: 'Lifetime Pension',
    status: 'Verification required',
    severity: 'warning',
    startedAt: '12 Jun 2026',
    continuePath: '/member-online/lifetime-pension/submitted',
  },
  {
    id: 'app-003',
    accountType: 'Transition to Retirement account',
    status: 'Submitted',
    severity: 'success',
    startedAt: '8 Jun 2026',
    continuePath: '/member-online/lifetime-pension/view-application',
  },
];

export const MOCK_RECENT_PAYMENTS: Payment[] = [
  {
    id: 'pay-001',
    accountName: 'Retirement Income Account',
    memberNumber: '235896',
    date: '15 Jun 2026',
    amount: 2847.65,
  },
  {
    id: 'pay-002',
    accountName: 'Lifetime Pension',
    memberNumber: '235898',
    date: '15 Jun 2026',
    amount: 3021.15,
  },
  {
    id: 'pay-003',
    accountName: 'Retirement Income Account',
    memberNumber: '235897',
    date: '15 Jun 2026',
    amount: 2847.65,
  },
];

export const MOCK_MEMBER_STATUS: MemberStatus = {
  tfnProvided: true,
  annualReviewDue: false,
};
