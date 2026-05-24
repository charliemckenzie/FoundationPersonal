'use client'

import { useState } from 'react'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Divider from '@mui/material/Divider'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { HeaderSearchForm } from './HeaderSearchForm'
import { AudienceTabBar, NavDrawerAccordionItem } from './NavDrawerParts'
import type { NavItem, CtaAction, UtilityLink } from './types'

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

  const handleClose = () => {
    setOpenAccordion(null)
    onClose()
  }

  return (
    <MuiDrawer
      open={open}
      onClose={handleClose}
      anchor="right"
      slotProps={{
        paper: {
          sx: {
            width: 'min(430px, 100vw)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
            fontFamily: (t) => t.typography.fontFamily,
          },
        },
      }}
    >
      {/* Close — grey ×, top right */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1.5, pt: 1.5, pb: 0.5, flexShrink: 0 }}>
        <ButtonBase
          onClick={handleClose}
          aria-label="Close menu"
          sx={{
            p: 0.75,
            borderRadius: 1,
            color: 'text.secondary',
            '&:hover': { bgcolor: 'action.hover' },
            '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus' },
            '&:focus': { outline: 'none' },
          }}
        >
          <Icon icon="xmark" size="lg" />
        </ButtonBase>
      </Box>

      {audienceLinks && audienceLinks.length > 0 && (
        <AudienceTabBar links={audienceLinks} activeHref={activeAudienceHref} />
      )}

      {onSearch && (
        <Box sx={{ mx: 2, mt: 2, flexShrink: 0 }}>
          <HeaderSearchForm onSubmit={onSearch} />
        </Box>
      )}

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
          {navItems.map((item) => (
            <NavDrawerAccordionItem
              key={item.label}
              item={item}
              isOpen={openAccordion === item.label}
              onToggle={() => setOpenAccordion((p) => (p === item.label ? null : item.label))}
              onLinkClick={handleClose}
            />
          ))}
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
