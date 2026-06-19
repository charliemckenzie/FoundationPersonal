import type { MemberBalance, MemberNavItem } from '../../../../components/MemberOnline';

/**
 * Shape of one `configs/*.json` file.
 *
 * `primary` and `secondary` are plain {@link MemberNavItem} trees — the exact
 * shape the Member Online nav consumes — so a config file *is* the data, with
 * no transform step. See `README.md` in this folder for the authoring guide.
 */
export interface NavConfigData {
  /** Human label shown in the dashboard "Navigation config" switcher. */
  label: string;
  /** Total balance shown in the nav header for this member state. */
  balance: MemberBalance;
  /** Primary nav items, in display order. Items with `children` open a flyout. */
  primary: MemberNavItem[];
  /** Account-level secondary nav items, in display order. */
  secondary: MemberNavItem[];
}

/** A config resolved into the prop names {@link MemberOnlineLayout} expects. */
export interface ResolvedNavConfig {
  label: string;
  balance: MemberBalance;
  primaryItems: MemberNavItem[];
  secondaryItems: MemberNavItem[];
}
