import { useState } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import MuiAccordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Drawer } from '../Drawer'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { NavPanelLink } from './NavPanelLink'
import type { NavItem, NavItemMegamenu, CtaAction } from './types'

interface NavDrawerProps {
  open: boolean
  onClose: () => void
  navItems: NavItem[]
  secondaryNavItems?: NavItem[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
  onSearch?: (query: string) => void
}

function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function NavAccordion({ item, expanded, onToggle, onClose }: { item: NavItemMegamenu; expanded: boolean; onToggle: () => void; onClose: () => void }) {
  const links = item.columns.flatMap((col) => col.links)

  return (
    <MuiAccordion
      expanded={expanded}
      onChange={onToggle}
      disableGutters
      elevation={0}
      sx={{
        bgcolor: 'transparent',
        '&::before': { display: 'none' },
        '&.Mui-expanded': { margin: 0 },
      }}
    >
      <AccordionSummary
        expandIcon={<Icon icon="chevron-down" size="sm" />}
        aria-controls={`drawer-${slugify(item.label)}-content`}
        id={`drawer-${slugify(item.label)}-header`}
        sx={{
          px: 1,
          py: 1.5,
          minHeight: 'unset',
          '& .MuiAccordionSummary-content': { margin: 0 },
          '&:hover': { bgcolor: 'action.hover', borderRadius: 1 },
          '&.Mui-focusVisible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px', boxShadow: 'none', bgcolor: 'transparent' },
          borderRadius: 1,
        }}
      >
        <Typography variant="body" sx={{ fontWeight: 700 }}>
          {item.label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0, pt: 0.5, pb: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {links.map((link) => (
            <NavPanelLink key={link.href} {...link} onClick={onClose} />
          ))}
        </Box>
      </AccordionDetails>
    </MuiAccordion>
  )
}

export function NavDrawer({ open, onClose, navItems, secondaryNavItems, primaryCta, secondaryCta, onSearch }: NavDrawerProps) {
  const [query, setQuery] = useState('')
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null)

  const handleToggle = (label: string) => {
    setExpandedPanel((prev) => (prev === label ? null : label))
  }

  const handleClose = () => {
    setExpandedPanel(null)
    onClose()
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) onSearch?.(query.trim())
  }

  const actions =
    primaryCta || secondaryCta ? (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {primaryCta && (
          <Button
            label={primaryCta.label}
            variant="contained"
            fullWidth
            onClick={primaryCta.onClick ?? (() => { if (primaryCta.menu?.[0]) window.location.href = primaryCta.menu[0].href })}
          />
        )}
        {secondaryCta && (
          <Button
            label={secondaryCta.label}
            variant="outlined"
            fullWidth
            onClick={secondaryCta.onClick ?? (() => { if (secondaryCta.menu?.[0]) window.location.href = secondaryCta.menu[0].href })}
          />
        )}
      </Box>
    ) : undefined

  return (
    <Drawer open={open} onClose={handleClose} anchor="left" title="Menu" width={320} actions={actions}>
      {onSearch && (
        <Box
          component="form"
          role="search"
          onSubmit={handleSearchSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'action.hover',
            borderRadius: 6,
            px: 2,
            py: 0.5,
            gap: 1,
            mb: 1,
          }}
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
            sx={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              p: 0,
              color: 'text.secondary',
              borderRadius: 1,
              '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
              '&:focus': { outline: 'none' },
            }}
          >
            <Icon icon="magnifying-glass" size="md" />
          </Box>
        </Box>
      )}
      <Box component="nav" aria-label="Mobile navigation" sx={{ display: 'flex', flexDirection: 'column' }}>
        {navItems.map((item) => (
          <Box key={item.label}>
            {item.type === 'link' && (
              <NavPanelLink href={item.href} label={item.label} onClick={handleClose} />
            )}
            {item.type === 'megamenu' && (
              <NavAccordion item={item} expanded={expandedPanel === item.label} onToggle={() => handleToggle(item.label)} onClose={handleClose} />
            )}
          </Box>
        ))}
      </Box>
      {secondaryNavItems && secondaryNavItems.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
          <Divider sx={{ mb: 1 }} />
          {secondaryNavItems.map((item) => (
            <Box key={item.label}>
              {item.type === 'link' && (
                <NavPanelLink href={item.href} label={item.label} onClick={handleClose} />
              )}
              {item.type === 'megamenu' && (
                <NavAccordion item={item} expanded={expandedPanel === item.label} onToggle={() => handleToggle(item.label)} onClose={handleClose} />
              )}
            </Box>
          ))}
        </Box>
      )}
    </Drawer>
  )
}
