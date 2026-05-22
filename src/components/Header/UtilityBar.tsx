'use client'

import { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import InputBase from '@mui/material/InputBase'
import MuiMenu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Logo } from '../Logo'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { IconButton } from '../IconButton'
import type { CtaAction, CtaMenuItem, UtilityLink } from './types'

interface CtaButtonProps {
  cta: CtaAction
  variant: 'contained' | 'outlined'
  size?: 'small' | 'medium' | 'large'
  condensed?: boolean
  noMenu?: boolean
}

function CtaButton({ cta, variant, size, condensed, noMenu }: CtaButtonProps) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const hasMenu = !noMenu && (cta.menu?.length ?? 0) > 0

  const handleClose = () => {
    setOpen(false)
    setExpanded(null)
  }

  return (
    <>
      <Button
        ref={anchorRef}
        label={cta.label}
        variant={variant}
        size={size}
        condensed={condensed}
        endIcon={hasMenu ? 'chevron-down' : undefined}
        aria-expanded={hasMenu ? open : undefined}
        aria-haspopup={hasMenu ? 'menu' : undefined}
        onClick={hasMenu ? () => setOpen((o) => !o) : cta.onClick}
      />
      {hasMenu && (
        <MuiMenu
          open={open}
          anchorEl={anchorRef.current}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          disableScrollLock
          slotProps={{ list: { sx: { py: 2 } }, paper: { sx: { border: '1px solid', borderColor: 'divider', borderRadius: '8px', mt: '8px', width: 250 } } }}
        >
          {cta.menu!.map((item: CtaMenuItem) =>
            item.items?.length ? (
              <Box key={item.label}>
                <Divider sx={{ my: 1 }} />
                <MenuItem
                  onClick={() => setExpanded((p) => (p === item.label ? null : item.label))}
                  sx={{ py: '7px', px: 3, fontSize: '1rem', display: 'flex', justifyContent: 'space-between', gap: 1 }}
                >
                  {item.label}
                  <Icon icon={expanded === item.label ? 'chevron-up' : 'chevron-down'} size="sm" />
                </MenuItem>
                <Collapse in={expanded === item.label}>
                  {item.description && (
                    <Typography sx={{ px: 3, pt: 1, pb: 0.5, fontSize: '0.875rem', color: 'text.secondary', lineHeight: 1.5 }}>
                      {item.description}
                    </Typography>
                  )}
                  {item.items.map((sub) => (
                    <MenuItem
                      key={sub.label}
                      onClick={() => { window.location.href = sub.href; handleClose() }}
                      sx={{ py: '7px', px: 3, fontSize: '1rem' }}
                    >
                      {sub.label}
                    </MenuItem>
                  ))}
                </Collapse>
              </Box>
            ) : (
              <MenuItem
                key={item.label}
                onClick={() => {
                  if (item.href) window.location.href = item.href
                  handleClose()
                }}
                sx={{ py: '7px', px: 3, fontSize: '1rem' }}
              >
                {item.label}
              </MenuItem>
            )
          )}
        </MuiMenu>
      )}
    </>
  )
}

export interface UtilityBarProps {
  utilityLinks?: UtilityLink[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
  onSearch?: (query: string) => void
  onMenuOpen: () => void
  isMobile: boolean
  isPhone?: boolean
}

export function UtilityBar({
  utilityLinks,
  primaryCta,
  secondaryCta,
  onSearch,
  onMenuOpen,
  isMobile,
  isPhone = false,
}: UtilityBarProps) {
  const [query, setQuery] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) onSearch?.(query.trim())
  }

  return (
    <Container maxWidth="lg">
      {isMobile ? (
        /* Mobile/tablet: hamburger LEFT — logo — [search on tablet] — CTAs RIGHT */
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Box sx={{ ml: '-12px' }}>
            <IconButton icon="bars" label="Open navigation menu" variant="ghost" onClick={onMenuOpen} />
          </Box>
          {isPhone ? <Logo size="md" variant="mark" /> : <Logo size="md" />}
          {!isPhone && onSearch && (
            <Box
              component="form"
              role="search"
              onSubmit={handleSearchSubmit}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'action.hover',
                borderRadius: 6,
                px: 2,
                py: 0.5,
                gap: 1,
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
          {isPhone && <Box sx={{ flex: 1 }} />}
          {(secondaryCta || primaryCta) && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {primaryCta && <CtaButton cta={primaryCta} variant="outlined" condensed noMenu={isPhone} />}
              {secondaryCta && <CtaButton cta={secondaryCta} variant="contained" condensed noMenu={isPhone} />}
            </Box>
          )}
        </Toolbar>
      ) : (
        /* Desktop: logo — search — utility links — CTAs */
        <Toolbar disableGutters sx={{ gap: 3, py: 1.5 }}>
          <Logo size="lg" />

          {onSearch && (
            <Box
              component="form"
              role="search"
              onSubmit={handleSearchSubmit}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'action.hover',
                borderRadius: 6,
                px: 2,
                py: 0.5,
                gap: 1,
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

          {utilityLinks && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {utilityLinks.map((link) => (
                <ButtonBase
                  key={link.href}
                  component="a"
                  href={link.href}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 0.5,
                    py: 0.5,
                    borderRadius: 1,
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&, & *': { textDecoration: 'none !important' },
                    '&:hover': { color: 'primary.main' },
                    '&:focus-visible': {
                      outline: '2px solid',
                      outlineColor: 'border.focus',
                      outlineOffset: '2px',
                    },
                    '&:focus': { outline: 'none' },
                  }}
                >
                  <Icon icon={link.icon} size="xl" />
                  <Typography variant="small" sx={{ color: 'inherit', lineHeight: 1.2 }}>
                    {link.label}
                  </Typography>
                </ButtonBase>
              ))}
            </Box>
          )}

          {(secondaryCta || primaryCta) && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {primaryCta && <CtaButton cta={primaryCta} variant="outlined" condensed />}
              {secondaryCta && <CtaButton cta={secondaryCta} variant="contained" condensed />}
            </Box>
          )}
        </Toolbar>
      )}
    </Container>
  )
}
