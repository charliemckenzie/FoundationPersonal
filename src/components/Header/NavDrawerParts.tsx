'use client'

import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import { Icon } from '../Icon'
import type { NavItem } from './types'
import { flattenMegamenuLinks } from './headerUtils'

interface AudienceTabBarProps {
  links: Array<{ label: string; href: string }>
  activeHref?: string
}

/** Personal / Employers / Advisers tab strip shown at the top of QSuper's NavDrawer. */
export function AudienceTabBar({ links, activeHref }: AudienceTabBarProps) {
  return (
    <Box
      component="nav"
      aria-label="Audience selection"
      sx={{ display: 'flex', flexShrink: 0, borderBottom: '1px solid', borderColor: 'border.subtle' }}
    >
      {links.map((link) => {
        const isActive = activeHref === link.href
        return (
          <Box
            key={link.href}
            component="a"
            href={link.href}
            sx={(t) => ({
              flex: 1,
              textAlign: 'center',
              py: 1.5,
              fontSize: t.typography.small.fontSize,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'primary.main' : 'text.secondary',
              borderBottom: '2px solid',
              borderColor: isActive ? 'primary.main' : 'transparent',
              mb: '-1px',
              textDecorationLine: 'none !important',
              '&:hover': { color: 'primary.main' },
              '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus' },
              '&:focus': { outline: 'none' },
            })}
          >
            {link.label}
          </Box>
        )
      })}
    </Box>
  )
}

interface NavDrawerAccordionItemProps {
  item: NavItem
  isOpen: boolean
  onToggle: () => void
  onLinkClick: () => void
}

/**
 * Top-level item in the NavDrawer accordion. Megamenu items render flattened children
 * in a Collapse panel; link items navigate directly.
 */
export function NavDrawerAccordionItem({ item, isOpen, onToggle, onLinkClick }: NavDrawerAccordionItemProps) {
  const links = item.type === 'megamenu' ? flattenMegamenuLinks(item) : []
  const hasChildren = links.length > 0

  return (
    <Box>
      <ButtonBase
        disableRipple
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-controls={hasChildren ? `nav-panel-${item.label}` : undefined}
        onClick={() => {
          if (hasChildren) {
            onToggle()
          } else if (item.type === 'link') {
            window.location.href = item.href
            onLinkClick()
          }
        }}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1.75,
          fontFamily: (t) => t.typography.fontFamily,
          color: isOpen ? 'primary.main' : 'text.primary',
          borderBottom: '2px solid',
          borderColor: isOpen ? 'primary.main' : 'border.subtle',
          '&:hover': { color: 'primary.main' },
          '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '-2px' },
          '&:focus': { outline: 'none' },
        }}
      >
        <Box component="span" sx={{ fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.5 }}>
          {item.label}
        </Box>
        {hasChildren && (
          <Box aria-hidden="true" sx={{ display: 'flex', color: isOpen ? 'primary.main' : 'text.secondary' }}>
            <Icon icon={isOpen ? 'chevron-up' : 'chevron-down'} size="sm" />
          </Box>
        )}
      </ButtonBase>

      {hasChildren && (
        <Collapse in={isOpen} id={`nav-panel-${item.label}`}>
          <Box sx={{ bgcolor: 'background.elevated' }}>
            {links.map((link, i) => (
              <Box key={link.href}>
                <Box
                  component="a"
                  href={link.href}
                  onClick={onLinkClick}
                  sx={(t) => ({
                    display: 'block',
                    px: 2,
                    py: 1.75,
                    fontSize: t.typography.body.fontSize,
                    lineHeight: t.typography.body.lineHeight,
                    color: 'text.primary',
                    textDecorationLine: 'none !important',
                    '&:hover': { color: 'primary.main', textDecorationLine: 'none !important' },
                    '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '-2px' },
                    '&:focus': { outline: 'none' },
                  })}
                >
                  {link.label}
                </Box>
                {i < links.length - 1 && <Divider sx={{ borderColor: 'background.paper' }} />}
              </Box>
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  )
}
