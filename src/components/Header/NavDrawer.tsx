import { useState } from 'react'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import InputBase from '@mui/material/InputBase'
import { Button } from '../Button'
import { Icon } from '../Icon'
import type { NavItem, NavItemMegamenu, CtaAction, UtilityLink } from './types'

// Flatten all links from megamenu columns into a single ordered list
function flattenMegamenuLinks(item: NavItemMegamenu): Array<{ label: string; href: string }> {
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
interface NavDrawerProps {
  open: boolean
  onClose: () => void
  navItems: NavItem[]
  secondaryNavItems?: NavItem[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
  utilityLinks?: UtilityLink[]
  onSearch?: (query: string) => void
  audienceLinks?: Array<{ label: string; href: string }>
  activeAudienceHref?: string
}

export function NavDrawer({
  open,
  onClose,
  navItems,
  secondaryNavItems,
  primaryCta,
  secondaryCta,
  onSearch,
  audienceLinks,
  activeAudienceHref,
}: NavDrawerProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const handleClose = () => {
    setOpenAccordion(null)
    onClose()
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) onSearch?.(query.trim())
  }

  return (
    <MuiDrawer
      open={open}
      onClose={handleClose}
      anchor="right"
      slotProps={{ paper: { sx: { width: 'min(430px, 100vw)', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', fontFamily: (t) => t.typography.fontFamily } } }}
    >
      {/* Close — grey ×, top right */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1.5, pt: 1.5, pb: 0.5, flexShrink: 0 }}>
        <ButtonBase
          onClick={handleClose}
          aria-label="Close menu"
          sx={{ p: 0.75, borderRadius: 1, color: 'text.secondary', '&:hover': { bgcolor: 'action.hover' }, '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus' }, '&:focus': { outline: 'none' } }}
        >
          <Icon icon="xmark" size="lg" />
        </ButtonBase>
      </Box>

      {/* Audience tabs — Personal / Employers / Advisers, full width */}
      {audienceLinks && audienceLinks.length > 0 && (
        <Box
          component="nav"
          aria-label="Audience selection"
          sx={{ display: 'flex', flexShrink: 0, borderBottom: '1px solid', borderColor: 'border.subtle' }}
        >
          {audienceLinks.map((link) => {
            const isActive = activeAudienceHref === link.href
            return (
              <Box
                key={link.href}
                component="a"
                href={link.href}
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  py: 1.5,
                  fontSize: '0.9375rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'primary.main' : 'text.secondary',
                  borderBottom: '2px solid',
                  borderColor: isActive ? 'primary.main' : 'transparent',
                  mb: '-1px',
                  textDecorationLine: 'none !important',
                  '&:hover': { color: 'primary.main' },
                  '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus' },
                  '&:focus': { outline: 'none' },
                }}
              >
                {link.label}
              </Box>
            )
          })}
        </Box>
      )}

      {/* Search */}
      {onSearch && (
        <Box
          component="form"
          role="search"
          onSubmit={handleSearchSubmit}
          sx={{ display: 'flex', alignItems: 'center', mx: 2, mt: 2, bgcolor: 'action.hover', borderRadius: 6, px: 2, py: 0.75, gap: 1, flexShrink: 0 }}
        >
          <InputBase
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            inputProps={{ 'aria-label': 'Search' }}
            sx={{ flex: 1, fontSize: '0.9375rem' }}
          />
          <Box
            component="button"
            type="submit"
            aria-label="Submit search"
            sx={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', p: 0, color: 'text.secondary', '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus' }, '&:focus': { outline: 'none' } }}
          >
            <Icon icon="magnifying-glass" size="md" />
          </Box>
        </Box>
      )}

      {/* CTAs — no dropdowns */}
      {(primaryCta || secondaryCta) && (
        <Box sx={{ display: 'flex', gap: 1.5, px: 2, mt: 1.5, pb: 2, flexShrink: 0 }}>
          {primaryCta && (
            <Box sx={{ flex: 1 }}>
              <Button label={primaryCta.label} variant="outlined" fullWidth onClick={primaryCta.onClick} />
            </Box>
          )}
          {secondaryCta && (
            <Box sx={{ flex: 1 }}>
              <Button label={secondaryCta.label} variant="contained" fullWidth onClick={secondaryCta.onClick} />
            </Box>
          )}
        </Box>
      )}

      <Divider sx={{ flexShrink: 0, borderColor: 'border.subtle' }} />

      {/* Scrollable nav — accordion */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box component="nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const isOpen = openAccordion === item.label
            const links = item.type === 'megamenu' ? flattenMegamenuLinks(item) : []
            const hasChildren = links.length > 0

            return (
              <Box key={item.label}>
                <ButtonBase
                  disableRipple
                  onClick={() => {
                    if (hasChildren) {
                      setOpenAccordion(isOpen ? null : item.label)
                    } else if (item.type === 'link') {
                      window.location.href = item.href
                      handleClose()
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
                    <Box sx={{ display: 'flex', color: isOpen ? 'primary.main' : 'text.secondary' }}>
                      <Icon icon={isOpen ? 'chevron-up' : 'chevron-down'} size="sm" />
                    </Box>
                  )}
                </ButtonBase>

                {hasChildren && (
                  <Collapse in={isOpen}>
                    <Box sx={{ bgcolor: 'grey.100' }}>
                      {links.map((link, i) => (
                        <Box key={link.href}>
                          <Box
                            component="a"
                            href={link.href}
                            onClick={handleClose}
                            sx={{
                              display: 'block',
                              px: 2,
                              py: 1.75,
                              fontSize: '1rem',
                              lineHeight: 1.5,
                              color: 'text.primary',
                              textDecorationLine: 'none !important',
                              '&:hover': { color: 'primary.main', textDecorationLine: 'none !important' },
                              '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '-2px' },
                              '&:focus': { outline: 'none' },
                            }}
                          >
                            {link.label}
                          </Box>
                          {i < links.length - 1 && <Divider sx={{ borderColor: 'white' }} />}
                        </Box>
                      ))}
                    </Box>
                  </Collapse>
                )}
              </Box>
            )
          })}
        </Box>

        {secondaryNavItems && secondaryNavItems.length > 0 && (
          <Box component="nav" aria-label="Secondary navigation">
            {secondaryNavItems.map((item) => (
              <Box
                key={item.label}
                component="a"
                href={item.type === 'link' ? item.href : undefined}
                onClick={handleClose}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 2,
                  py: 1.75,
                  fontSize: '1.125rem',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: 'text.primary',
                  textDecorationLine: 'none !important',
                  borderBottom: '2px solid',
                  borderColor: 'border.subtle',
                  '&:hover': { color: 'primary.main', textDecorationLine: 'none !important' },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </MuiDrawer>
  )
}
