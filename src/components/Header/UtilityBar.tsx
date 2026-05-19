'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import InputBase from '@mui/material/InputBase'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Logo } from '../Logo'
import { Icon } from '../Icon'
import { IconButton } from '../IconButton'
import { HeaderCtaButton } from './CtaButton'
import type { CtaAction, UtilityLink } from './types'

export interface UtilityBarProps {
  utilityLinks?: UtilityLink[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
  onSearch?: (query: string) => void
  onMenuOpen: () => void
  isMobile: boolean
  isPhone?: boolean
  searchPlaceholder?: string
}

export function UtilityBar({
  utilityLinks,
  primaryCta,
  secondaryCta,
  onSearch,
  onMenuOpen,
  isMobile,
  isPhone = false,
  searchPlaceholder,
}: UtilityBarProps) {
  const [query, setQuery] = useState('')
  const handleSearchSubmit = (e: React.FormEvent) => { e.preventDefault(); if (query.trim()) onSearch?.(query.trim()) }

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
                outline: '2px solid transparent',
                '&:focus-within': { outlineColor: 'border.focus' },
              }}
            >
              <InputBase
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder ?? 'Search'}
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
              {primaryCta && <HeaderCtaButton cta={primaryCta} variant="outlined" condensed noMenu={isPhone} />}
              {secondaryCta && <HeaderCtaButton cta={secondaryCta} variant="contained" condensed noMenu={isPhone} />}
            </Box>
          )}
        </Toolbar>
      ) : (
        /* Desktop: logo — search — utility links — CTAs */
        <Toolbar disableGutters sx={{ gap: 2, pt: 2, pb: 2, alignItems: 'center' }}>
          <Box sx={{ flexShrink: 0, '& > div': { height: '3.75rem' } }}>
            <Logo size="lg" />
          </Box>

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
                py: 0.75,
                gap: 1,
                outline: '2px solid transparent',
                '&:focus-within': { outlineColor: 'border.focus' },
              }}
            >
              <InputBase
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder ?? 'Search'}
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
            <Box sx={{ display: 'flex', gap: 1.5 }}>
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
                    '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
                    '&:focus': { outline: 'none' },
                  }}
                >
                  <Icon icon={link.icon} size="lg" />
                  <Typography variant="small" sx={{ color: 'inherit', lineHeight: 1.2 }}>
                    {link.label}
                  </Typography>
                </ButtonBase>
              ))}
            </Box>
          )}

          {(secondaryCta || primaryCta) && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {primaryCta && <HeaderCtaButton cta={primaryCta} variant="outlined" condensed />}
              {secondaryCta && <HeaderCtaButton cta={secondaryCta} variant="contained" condensed />}
            </Box>
          )}
        </Toolbar>
      )}
    </Container>
  )
}
