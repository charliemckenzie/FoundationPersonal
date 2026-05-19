import type React from 'react'

export interface NavLink {
  label: string
  href: string
  description?: string
}

export interface CtaMenuItem {
  label: string
  href: string
}

export interface UtilityLink {
  label: string
  href: string
  icon: string
}

export interface AudienceLink {
  label: string
  href: string
}

export interface ResourceLink {
  label: string
  href: string
}

export interface NavGroup {
  heading?: string
  links?: NavLink[]
  /** Stack multiple sub-groups vertically within a single visual column. */
  groups?: NavGroup[]
}

export interface NavPromoCard {
  children: React.ReactNode
}

export interface NavItemMegamenu {
  type: 'megamenu'
  label: string
  promoCard?: NavPromoCard
  columns: NavGroup[] // 1–4 columns
}

export interface NavItemLink {
  type: 'link'
  label: string
  href: string
}

export type NavItem = NavItemMegamenu | NavItemLink

export interface CtaAction {
  label: string
  onClick?: () => void
  href?: string
  menu?: CtaMenuItem[]
}

export interface HeaderProps {
  navItems: NavItem[]
  secondaryNavItems?: NavItem[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
  utilityLinks?: UtilityLink[]
  onSearch?: (query: string) => void
  searchPlaceholder?: string
  /** Override scroll-driven condensed state — useful for Storybook and testing. */
  condensed?: boolean
  /** QSuper: audience section links shown in the top utility bar (Personal, Employers, Advisers). */
  audienceLinks?: AudienceLink[]
  /** QSuper: resource links shown in the top utility bar (Calculators & forms, News Hub, Contact us). */
  resourceLinks?: ResourceLink[]
  /** QSuper: href of the currently active audience link — renders with an underline indicator. */
  activeAudienceHref?: string
}
