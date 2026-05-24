import type React from 'react';

export interface MemberNavItem {
  /** Unique id used as the React key and to identify the active item. */
  id: string;
  /** Display label. */
  label: string;
  /** Font Awesome icon name (e.g. `"house"`, `"piggy-bank"`). */
  icon?: string;
  /** Link destination. Rendered as a Next.js `Link` when present. */
  href?: string;
  /** Called when the leaf item is selected. Ignored if the item has `children`. */
  onClick?: () => void;
  /** Sub-items. Drives the desktop flyout panel and the mobile drill-down view. */
  children?: MemberNavItem[];
  /** Optional secondary text shown beneath the label (used in flyout / drill-down rows). */
  description?: string;
}

export interface MemberUser {
  /** Full display name. */
  name: string;
  /** Member number, account number, or similar identifier. */
  memberNumber: string;
  /** Optional avatar URL. Falls back to initials derived from `name`. */
  avatarUrl?: string;
}

export interface MemberBalance {
  /** Pre-formatted balance string (e.g. `"$112,200.00"`). */
  amount: string;
  /** Pre-formatted as-of date (e.g. `"As at 24 May 2026"`). */
  asAt: string;
}

export interface MemberFooterLink {
  label: string;
  href: string;
}

export interface MemberOnlineCopy {
  totalBalanceLabel?: string;
  memberNumberLabel?: string;
  copyLabel?: string;
  copiedLabel?: string;
  lastLoggedInLabel?: string;
  searchPlaceholder?: string;
  logoutLabel?: string;
  backLabel?: string;
  lightLabel?: string;
  darkLabel?: string;
  closeMenuLabel?: string;
  openMenuLabel?: string;
}

export type MemberOnlineCopyResolved = Required<MemberOnlineCopy>;

export const DEFAULT_MEMBER_ONLINE_COPY: MemberOnlineCopyResolved = {
  totalBalanceLabel: 'Total Balance:',
  memberNumberLabel: 'Member No.',
  copyLabel: 'Copy',
  copiedLabel: 'Copied',
  lastLoggedInLabel: 'Last logged in',
  searchPlaceholder: 'Search',
  logoutLabel: 'Log out',
  backLabel: 'Back',
  lightLabel: 'Light',
  darkLabel: 'Dark',
  closeMenuLabel: 'Close menu',
  openMenuLabel: 'Open menu',
};

export type LogoSlot = React.ReactNode;
