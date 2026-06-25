import type { NavItemMegamenu } from './types'
import type { SxProps, Theme } from '@mui/material/styles'

export const HOMEPAGE_HEADER_CONTAINER_SX: SxProps<Theme> = {
  width: '100%',
  maxWidth: '100rem',
  mx: 'auto',
  px: { xs: 2, sm: 3, md: 4, lg: 5 },
}

/**
 * Flatten all links from a megamenu's columns into a single ordered list.
 * Used by the mobile NavDrawer (accordion) and potentially other compact navs
 * that can't render the full multi-column megamenu layout.
 */
export function flattenMegamenuLinks(item: NavItemMegamenu): Array<{ label: string; href: string }> {
  const links: Array<{ label: string; href: string }> = []
  for (const col of item.columns) {
    for (const link of col.links ?? []) {
      links.push({ label: link.label, href: link.href })
    }
    for (const group of col.groups ?? []) {
      for (const link of group.links ?? []) {
        links.push({ label: link.label, href: link.href })
      }
    }
  }
  return links
}
