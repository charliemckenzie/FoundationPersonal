import { useState } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import { Drawer } from '../Drawer'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { NavPanelLink } from './NavPanelLink'
import type { NavItem, CtaAction } from './types'

interface NavDrawerProps {
  open: boolean
  onClose: () => void
  navItems: NavItem[]
  secondaryNavItems?: NavItem[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
  onSearch?: (query: string) => void
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="small"
      sx={{ fontWeight: 700, color: 'text.muted', px: 1, py: 0.5, display: 'block' }}
    >
      {children}
    </Typography>
  )
}

export function NavDrawer({ open, onClose, navItems, secondaryNavItems, primaryCta, secondaryCta, onSearch }: NavDrawerProps) {
  const [query, setQuery] = useState('')

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
            onClick={primaryCta.onClick}
          />
        )}
        {secondaryCta && (
          <Button
            label={secondaryCta.label}
            variant="outlined"
            fullWidth
            onClick={secondaryCta.onClick}
          />
        )}
      </Box>
    ) : undefined

  return (
    <Drawer open={open} onClose={onClose} anchor="left" title="Menu" width={320} actions={actions}>
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
            }}
          >
            <Icon icon="magnifying-glass" size="md" />
          </Box>
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {navItems.map((item, index) => (
          <Box key={item.label}>
            {index > 0 && <Divider sx={{ my: 1 }} />}

            {item.type === 'link' && (
              <NavPanelLink href={item.href} label={item.label} onClick={onClose} />
            )}

            {item.type === 'megamenu' && (
              <Box>
                <SectionLabel>{item.label}</SectionLabel>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {item.columns.flatMap((col) => col.links).map((link) => (
                    <NavPanelLink key={link.href} {...link} onClick={onClose} />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      {secondaryNavItems && secondaryNavItems.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          <Divider />
          {secondaryNavItems.map((item) => (
            <Box key={item.label}>
              {item.type === 'link' && (
                <NavPanelLink href={item.href} label={item.label} onClick={onClose} />
              )}
              {item.type === 'megamenu' && (
                <Box>
                  <SectionLabel>{item.label}</SectionLabel>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {item.columns.flatMap((col) => col.links).map((link) => (
                      <NavPanelLink key={link.href} {...link} onClick={onClose} />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Drawer>
  )
}
