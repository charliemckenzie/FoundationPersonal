import { useState } from 'react'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Divider from '@mui/material/Divider'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Logo } from '../Logo'
import { NavPanelLink } from './NavPanelLink'
import type { NavItem, NavItemMegamenu, CtaAction, UtilityLink } from './types'

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Full-width nav row with chevron. bold=false for secondary nav items. */
function NavSlideRow({ item, bold = true, onClick }: { item: NavItem; bold?: boolean; onClick: () => void }) {
  return (
    <Box>
      <ButtonBase
        disableRipple
        onClick={onClick}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1.75,
          px: 2,
          fontFamily: (t) => t.typography.fontFamily,
          '&:hover': { bgcolor: 'action.hover' },
          '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '-2px' },
          '&:focus': { outline: 'none' },
        }}
      >
        <Typography component="span" variant="body" sx={{ fontWeight: bold ? 600 : 400, fontSize: '1.125rem' }}>
          {item.label}
        </Typography>
        <Box sx={{ color: 'text.primary', display: 'flex' }}>
          <Icon icon="chevron-right" size="md" />
        </Box>
      </ButtonBase>
      <Divider sx={{ borderColor: 'border.subtle' }} />
    </Box>
  )
}

/** Plain utility link row — no chevron, normal weight. */
function UtilityRow({ label, href, onClick }: { label: string; href: string; onClick: () => void }) {
  return (
    <Box
      component="a"
      href={href}
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: 1.875,
        color: 'text.primary',
        textDecorationLine: 'none !important',
        fontSize: '1.125rem',
        lineHeight: 1.5,
        fontWeight: 600,
        '&:hover': { bgcolor: 'action.hover', textDecorationLine: 'none !important' },
        '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '-2px' },
      }}
    >
      {label}
    </Box>
  )
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface NavDrawerProps {
  open: boolean
  onClose: () => void
  navItems: NavItem[]
  secondaryNavItems?: NavItem[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
  utilityLinks?: UtilityLink[]
  onSearch?: (query: string) => void
}

// ── Component ─────────────────────────────────────────────────────────────────

export function NavDrawer({
  open,
  onClose,
  navItems,
  secondaryNavItems,
  primaryCta,
  secondaryCta,
  utilityLinks,
  onSearch,
}: NavDrawerProps) {
  const [activePanel, setActivePanel] = useState<NavItem | null>(null)
  const [activeCta, setActiveCta] = useState<'primary' | 'secondary' | null>(null)
  const [expandedMenuItem, setExpandedMenuItem] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const contactLink = utilityLinks?.find((l) => l.label.toLowerCase().includes('contact'))

  const handleClose = () => {
    setActivePanel(null)
    setActiveCta(null)
    setExpandedMenuItem(null)
    onClose()
  }

  const toggleCta = (which: 'primary' | 'secondary') => {
    setActiveCta((p) => (p === which ? null : which))
    setExpandedMenuItem(null)
    setActivePanel(null)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) onSearch?.(query.trim())
  }

  const activeCfg = activeCta === 'primary' ? primaryCta : activeCta === 'secondary' ? secondaryCta : undefined

  return (
    <MuiDrawer
      open={open}
      onClose={handleClose}
      anchor="left"
      slotProps={{ paper: { sx: { width: 'min(430px, 100vw)', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', fontFamily: (t) => t.typography.fontFamily } } }}
    >
      {/* ── Top chrome ──────────────────────────────────────────────────── */}
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 2, pb: 2, flexShrink: 0 }}>
        {/* Close — blue, 16px icon */}
        <ButtonBase
          onClick={handleClose}
          aria-label="Close menu"
          sx={{ borderRadius: 1, py: 0.75, px: 0.5, color: 'primary.main', '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus' }, '&:focus': { outline: 'none' } }}
        >
          <Icon icon="xmark" size="xl" />
        </ButtonBase>

        {/* ART mark — absolutely centred to the full drawer width */}
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
          <Logo variant="mark" size="md" />
        </Box>

        {/* Contact pill — grey filled, 16px h-padding, no underline */}
        {contactLink ? (
          <Box
            component="a"
            href={contactLink.href}
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              px: 2,
              py: 0.75,
              bgcolor: 'action.hover',
              borderRadius: 6,
              color: 'text.primary',
              textDecorationLine: 'none !important',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              '&:hover': { textDecorationLine: 'none !important' },
              '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus' },
            }}
          >
            {contactLink.label}
          </Box>
        ) : (
          <Box sx={{ width: '2.5rem' }} />
        )}
      </Box>

      {/* ── CTA bar ─────────────────────────────────────────────────────── */}
      {(primaryCta || secondaryCta) && (
        <Box sx={{ display: 'flex', gap: 1.5, px: 2, pb: 2, flexShrink: 0 }}>
          {primaryCta && (
            <Box sx={{ flex: 1 }}>
              <Button
                label={primaryCta.label}
                variant="outlined"
                fullWidth
                endIcon={activeCta === 'primary' ? 'chevron-up' : 'chevron-down'}
                onClick={() => toggleCta('primary')}
              />
            </Box>
          )}
          {secondaryCta && (
            <Box sx={{ flex: 1 }}>
              <Button
                label={secondaryCta.label}
                variant="contained"
                fullWidth
                endIcon={activeCta === 'secondary' ? 'chevron-up' : 'chevron-down'}
                onClick={() => toggleCta('secondary')}
              />
            </Box>
          )}
        </Box>
      )}
      {/* Divider under CTAs */}
      <Divider sx={{ flexShrink: 0, borderColor: 'border.subtle' }} />


      {/* ── Scrollable area ──────────────────────────────────────────────── */}
      <Box sx={{ flex: 1, overflow: 'hidden', position: 'relative' }}>

        {/* CTA inline dropdown */}
        {activeCta && activeCfg?.menu && (
          <Box sx={{ position: 'absolute', inset: 0, overflow: 'auto', bgcolor: 'action.hover' }}>
            {activeCfg.menu.map((item) =>
              item.items?.length ? (
                <Box key={item.label}>
                  <ButtonBase
                    disableRipple
                    onClick={() => setExpandedMenuItem((p) => (p === item.label ? null : item.label))}
                    sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2, fontFamily: (t) => t.typography.fontFamily, '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus' }, '&:focus': { outline: 'none' } }}
                  >
                    <Typography component="span" variant="body">{item.label}</Typography>
                    <Icon icon={expandedMenuItem === item.label ? 'chevron-up' : 'chevron-down'} size="sm" />
                  </ButtonBase>
                  {expandedMenuItem === item.label && (
                    <Box sx={{ px: 5, pb: 1 }}>
                      {item.items.map((sub) => (
                        <Box key={sub.href} component="a" href={sub.href}
                          sx={{ display: 'block', py: 1.5, color: 'inherit', textDecorationLine: 'none !important', fontSize: '0.9375rem', '&:hover': { textDecorationLine: 'none !important' } }}
                        >
                          {sub.label}
                        </Box>
                      ))}
                    </Box>
                  )}
                  <Divider sx={{ borderColor: 'border.subtle' }} />
                </Box>
              ) : (
                <Box key={item.label}>
                  <Box component="a" href={item.href}
                    sx={{ display: 'block', px: 3, py: 2, color: 'inherit', textDecorationLine: 'none !important', fontSize: '0.9375rem', '&:hover': { textDecorationLine: 'none !important' } }}
                  >
                    {item.label}
                  </Box>
                  <Divider sx={{ borderColor: 'border.subtle' }} />
                </Box>
              )
            )}
          </Box>
        )}

        {/* Nav slide container */}
        {!activeCta && (
          <>
            {/* Level 1 — nav list */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                overflow: 'auto',
                transform: activePanel ? 'translateX(-100%)' : 'translateX(0)',
                transition: 'transform 280ms ease',
              }}
            >
              {/* ── Search ──────────────────────────────────────────────── */}
              {onSearch && (
                <Box
                  component="form"
                  role="search"
                  onSubmit={handleSearchSubmit}
                  sx={{ display: 'flex', alignItems: 'center', mx: 2, mt: 2.25, mb: 4, bgcolor: 'action.hover', borderRadius: 6, px: 2, py: 0.75, gap: 1 }}
                >
                  <InputBase
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Australian Retirement Trust"
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

              {/* Primary nav — bold, chevron */}
              <Box component="nav" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <NavSlideRow key={item.label} item={item} bold onClick={() => setActivePanel(item)} />
                ))}
              </Box>

              {/* Utility links — no chevron, bold, dividers between */}
              {utilityLinks && utilityLinks.length > 0 && (
                <Box>
                  {utilityLinks.map((link, i) => (
                    <Box key={link.href}>
                      <UtilityRow label={link.label} href={link.href} onClick={handleClose} />
                      {i < utilityLinks.length - 1 && <Divider sx={{ borderColor: 'border.subtle' }} />}
                    </Box>
                  ))}
                </Box>
              )}

              {/* Secondary nav — chevron, not bold */}
              {secondaryNavItems && secondaryNavItems.length > 0 && (
                <Box>
                  <Divider sx={{ borderColor: 'border.subtle' }} />
                  {secondaryNavItems.map((item) => (
                    <NavSlideRow key={item.label} item={item} bold={false} onClick={() => setActivePanel(item)} />
                  ))}
                </Box>
              )}
            </Box>

            {/* Level 2 — sub panel */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                overflow: 'auto',
                pt: 5,
                pb: 2,
                bgcolor: 'background.paper',
                transform: activePanel ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 280ms ease',
              }}
            >
              <ButtonBase
                disableRipple
                onClick={() => setActivePanel(null)}
                sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 0.5,
                  width: '100%', px: 2, py: 1.5, mb: 2,
                  color: 'primary.main', fontFamily: (t) => t.typography.fontFamily,
                  '&:hover': { bgcolor: 'action.hover' },
                  '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '-2px' },
                  '&:focus': { outline: 'none' },
                }}
              >
                <Icon icon="chevron-left" size="sm" />
                <Box component="span" sx={{ fontWeight: 600, fontSize: '1rem', lineHeight: 1.5 }}>Back</Box>
              </ButtonBase>

              {activePanel && (
                <Box sx={{ px: 2 }}>
                  <Typography variant="body" component="p" sx={{ fontWeight: 700, fontSize: '1.125rem', mb: 2 }}>
                    {activePanel.label}
                  </Typography>

                  {activePanel.type === 'link' ? (
                    /* Placeholder panel for plain link items */
                    <NavPanelLink href={activePanel.href} label={activePanel.label} onClick={handleClose} />
                  ) : (
                    /* Megamenu columns */
                    activePanel.columns.map((col, ci) => {
                      const colHasChildren = (col.links && col.links.length > 0) || (col.groups && col.groups.length > 0)
                      return (
                        <Box key={ci}>
                          {col.heading && (
                            <Typography variant="body" component="p"
                              sx={{ fontWeight: colHasChildren ? 700 : 400, fontSize: colHasChildren ? '1.125rem' : undefined, color: 'text.primary', mt: 2, mb: 0.5 }}
                            >
                              {col.heading}
                            </Typography>
                          )}
                          <Box sx={col.heading ? { pl: 2 } : undefined}>
                            {(col.links ?? []).map((link) => (
                              <NavPanelLink key={link.href} {...link} prominent={!col.heading} onClick={handleClose} />
                            ))}
                          </Box>
                          {col.groups?.map((subGroup, si) => {
                            const subHasChildren = subGroup.links && subGroup.links.length > 0
                            return (
                              <Box key={si}>
                                {subGroup.heading && (
                                  <Typography variant="body" component="p"
                                    sx={{ fontWeight: subHasChildren ? 700 : 400, fontSize: subHasChildren ? '1.125rem' : undefined, color: 'text.primary', mt: 2, mb: 0.5 }}
                                  >
                                    {subGroup.heading}
                                  </Typography>
                                )}
                                <Box sx={subGroup.heading ? { pl: 2 } : undefined}>
                                  {(subGroup.links ?? []).map((link) => (
                                    <NavPanelLink key={link.href} {...link} prominent={!subGroup.heading} onClick={handleClose} />
                                  ))}
                                </Box>
                              </Box>
                            )
                          })}
                        </Box>
                      )
                    })
                  )}
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </MuiDrawer>
  )
}
