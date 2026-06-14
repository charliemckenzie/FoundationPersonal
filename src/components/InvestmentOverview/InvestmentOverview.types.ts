export interface InvestmentOption {
  id: string;
  name: string;
}

/**
 * One investment "dial" on an account — either how the current balance is invested
 * or where future contributions (accumulation) / payments (income) are directed.
 * An account always has exactly two; they can hold the same or different mixes.
 */
export interface InvestmentMixDial {
  /** Stable id, e.g. 'balance' | 'future' | 'payments'. */
  id: string;
  /** Item heading, e.g. "Current balance". */
  title: string;
  /** Supporting line beneath the title, e.g. "$80,000 · as at 14 Jun 2026". */
  subtitle?: string;
  /** optionId → whole-number percentage. */
  allocations: Record<string, number>;
  /** Edit just this dial. Omit to hide the per-card edit button (e.g. the combined card, where the footer action covers it). */
  onEdit?: () => void;
  /** Accessible name for the edit button. Required when `onEdit` is set. */
  editLabel?: string;
  /**
   * Rebalancing status for this dial. Only set on balance/combined dials — omit for
   * future-contributions and payments dials where rebalancing does not apply.
   * `nextDate` present → active; absent → configured off or never set.
   */
  rebalancing?: { nextDate?: string };
}

export interface InvestmentOverviewProps {
  accountName: string;
  /** Total account balance — shown as "Total balance $X" in the header. */
  totalBalance: number;
  /** ISO datetime for the balance "as at" line. */
  balanceDate: string;
  /** Controls the header icon. Defaults to false (accumulation). */
  isIncomeAccount?: boolean;
  /** When true, renders a skeleton placeholder instead of the panel content. */
  loading?: boolean;
  options: InvestmentOption[];
  /** The account's investment dials — typically [balance, future]. */
  dials: InvestmentMixDial[];
  /** Footer action label for editing both dials at once. Defaults to "Change all". */
  changeAllLabel?: string;
  onChangeAll: () => void;
  onViewHistory: () => void;
}
