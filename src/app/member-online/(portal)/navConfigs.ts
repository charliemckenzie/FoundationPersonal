import type { MemberBalance, MemberNavItem } from '../../../components/MemberOnline';

// --- Shared nav items -------------------------------------------------------
// Defined once and composed into each config below so shared items (e.g. the
// Transactions / Investments flyouts) stay identical across configs.

const HOME: MemberNavItem = { id: 'home', label: 'Home', icon: 'house', href: '#' };

const TRANSACTIONS: MemberNavItem = {
  id: 'transactions',
  label: 'Transactions',
  icon: 'arrow-left-arrow-right',
  children: [
    { id: 'tx-history', label: 'Transaction history', icon: 'arrow-left-arrow-right', href: '#' },
    { id: 'tx-summary', label: 'Transaction summary', icon: 'chart-line', href: '#' },
    { id: 'tx-concessional', label: 'Concessional contributions', icon: 'piggy-bank', href: '#' },
    { id: 'tx-statements', label: 'Statements and letters', icon: 'copy', href: '#' },
  ],
};

const INVESTMENTS: MemberNavItem = {
  id: 'investments',
  label: 'Investments',
  icon: 'chart-line',
  children: [
    { id: 'investment-performance', label: 'Investment performance', icon: 'chart-column', href: '#' },
    { id: 'manage-investments', label: 'Manage investments', icon: 'chart-pie-simple', href: '/member-online/investments/manage-investments' },
  ],
};

const PUT_MONEY_IN_CHILDREN: MemberNavItem[] = [
  { id: 'voluntary', label: 'Make a voluntary contribution', icon: 'circle-dollar', description: 'BPAY or Direct Debit' },
  { id: 'tax-deduction', label: 'Claim a tax deduction', icon: 'copy', description: 'Submit a Notice of Intent to your fund' },
  { id: 'find-combine', label: 'Find or combine super', icon: 'magnifying-glass', description: 'Roll-in money from another fund' },
  { id: 'fund-details', label: 'Fund and account details', icon: 'circle-info', description: 'ABN, USI, Letter of compliance' },
  { id: 'spouse', label: 'Make a spouse contribution', icon: 'gift', description: "After-tax contribution to your partner's super" },
];

const PUT_MONEY_IN: MemberNavItem = {
  id: 'put-money-in',
  label: 'Put money in',
  icon: 'plus',
  children: PUT_MONEY_IN_CHILDREN,
};

// $0 members can't claim a deduction or split with a spouse yet — trim those.
const PUT_MONEY_IN_ZERO: MemberNavItem = {
  id: 'put-money-in',
  label: 'Put money in',
  icon: 'plus',
  children: PUT_MONEY_IN_CHILDREN.filter((c) => c.id !== 'tax-deduction' && c.id !== 'spouse'),
};

const TAKE_MONEY_OUT: MemberNavItem = { id: 'take-money-out', label: 'Take money out', icon: 'money-simple-from-bracket', href: '#' };

// Income-account setup, surfaced under Take money out for members who can retire.
const RETIREMENT_ITEMS: MemberNavItem[] = [
  { id: 'ret-income-account', label: 'Set up an income account', icon: 'circle-dollar-to-slot', description: 'Start receiving regular payments from your super', href: '/member-online/income-accounts' },
  { id: 'ret-ttr', label: 'Transition to Retirement', icon: 'briefcase', description: 'Access your super while still working' },
  { id: 'ret-lifetime', label: 'Lifetime Pension', icon: 'money-check-dollar', description: 'Guaranteed income for life', href: '/member-online/lifetime-pension' },
  { id: 'ret-planning', label: 'Retirement planning', icon: 'user-question' },
];

const TAKE_MONEY_OUT_RETIREMENT: MemberNavItem = {
  id: 'take-money-out',
  label: 'Take money out',
  icon: 'money-simple-from-bracket',
  children: RETIREMENT_ITEMS,
};

// Lump-sum withdrawals for members drawing an income account.
const TAKE_MONEY_OUT_LUMP: MemberNavItem = {
  id: 'take-money-out',
  label: 'Take money out',
  icon: 'money-simple-from-bracket',
  children: [
    { id: 'pay-lump-sum', label: 'Lump sum withdrawal', icon: 'money-simple-from-bracket', href: '#' },
  ],
};

const FUTURE_PLANNING: MemberNavItem = { id: 'future-planning', label: 'Future planning', icon: 'user-question', href: '#' };

const INSURANCE: MemberNavItem = { id: 'insurance', label: 'Insurance', icon: 'umbrella', href: '#' };

// Managing regular drawdowns from an income account.
const PAYMENTS: MemberNavItem = {
  id: 'payments',
  label: 'Your Payments',
  icon: 'money-check-dollar',
  children: [
    { id: 'pay-details', label: 'Payment details', icon: 'circle-info', href: '#' },
    { id: 'pay-summary', label: 'Payment summary', icon: 'file-invoice-dollar', href: '#' },
    { id: 'pay-change', label: 'Change payment amount', icon: 'pen-to-square', href: '#' },
  ],
};

// Decumulation-only members manage payments plus the option to start another stream.
const PAYMENTS_DECUM: MemberNavItem = {
  id: 'payments',
  label: 'Your Payments',
  icon: 'money-check-dollar',
  children: [
    { id: 'pay-details', label: 'Payment details', icon: 'circle-info', href: '#' },
    { id: 'pay-new-stream', label: 'Start a new income stream', icon: 'circle-plus', href: '#' },
  ],
};

const ASAT = 'As at 24 May 2026';

// --- Configs ----------------------------------------------------------------

export interface NavConfig {
  label: string;
  balance: MemberBalance;
  primaryItems: MemberNavItem[];
}

export const NAV_CONFIGS = {
  accumulation: {
    label: 'Accumulation (default)',
    balance: { amount: '$112,200.00', asAt: ASAT },
    primaryItems: [HOME, TRANSACTIONS, INVESTMENTS, PUT_MONEY_IN, TAKE_MONEY_OUT, FUTURE_PLANNING, INSURANCE],
  },
  zero: {
    label: '$0 state',
    balance: { amount: '$0.00', asAt: ASAT },
    primaryItems: [HOME, INVESTMENTS, PUT_MONEY_IN_ZERO, FUTURE_PLANNING, INSURANCE],
  },
  eligible: {
    label: 'Eligible for retirement',
    balance: { amount: '$112,200.00', asAt: ASAT },
    primaryItems: [HOME, TRANSACTIONS, INVESTMENTS, PUT_MONEY_IN, TAKE_MONEY_OUT_RETIREMENT, FUTURE_PLANNING, INSURANCE],
  },
  decumulation: {
    label: 'Decumulation only',
    balance: { amount: '$340,000.00', asAt: ASAT },
    primaryItems: [HOME, TRANSACTIONS, INVESTMENTS, PAYMENTS_DECUM, TAKE_MONEY_OUT_LUMP, FUTURE_PLANNING],
  },
  both: {
    label: 'Accum and Decumulation',
    balance: { amount: '$452,200.00', asAt: ASAT },
    primaryItems: [HOME, TRANSACTIONS, INVESTMENTS, PUT_MONEY_IN, PAYMENTS, TAKE_MONEY_OUT_LUMP, FUTURE_PLANNING],
  },
} satisfies Record<string, NavConfig>;

export type NavConfigKey = keyof typeof NAV_CONFIGS;

export const NAV_CONFIG_OPTIONS = (Object.keys(NAV_CONFIGS) as NavConfigKey[]).map(
  (value) => ({ value, label: NAV_CONFIGS[value].label }),
);
