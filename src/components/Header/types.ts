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

export interface NavGroup {
  heading?: string
  links: NavLink[]
}

export interface NavPromoCard {
  image?: string
  imageAlt?: string
  title: string
  description?: string
  cta: { label: string; href: string }
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
}
