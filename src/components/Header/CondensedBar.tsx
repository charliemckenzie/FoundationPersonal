'use client'

import { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import InputBase from '@mui/material/InputBase'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Logo } from '../Logo'
import { Icon } from '../Icon'
import { NavItemButton } from './NavItemButton'
import { HeaderCtaButton } from './CtaButton'
import type { NavItem, CtaAction, UtilityLink } from './types'

export interface CondensedBarProps {
  navItems: NavItem[]
  utilityLinks?: UtilityLink[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  activePanel: string | null
  onNavClick: (item: NavItem, el: HTMLButtonElement) => void
  onNavHover?: (item: NavItem, el: HTMLButtonElement) => void
  onNavHoverEnd?: () => void
}

export function CondensedBar({
  navItems,
  utilityLinks,
  primaryCta,
  secondaryCta,
  searchPlaceholder,
  onSearch,
  activePanel,
  onNavClick,
  onNavHover,
  onNavHoverEnd,
}: CondensedBarProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOpenSearch = () => {
    setSearchOpen(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleSearchBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setSearchOpen(false)
    setQuery('')
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) onSearch?.(query.trim())
  }

  return (
    <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ gap: 1, py: 1, alignItems: 'center' }}>
        {/* Mark logo */}
        <Box component="a" href="/" aria-label="Go to home" sx={{ flexShrink: 0, mr: 1, display: 'inline-flex', textDecoration: 'none', '& > div': { height: '2.5rem' } }}>
          <Logo variant="mark" size="lg" />
        </Box>

        {/* Primary nav — hidden when search is expanded */}
        {!searchOpen && (
          <Box sx={{ display: 'flex', alignSelf: 'stretch', my: '-8px', gap: 2 }}>
            {navItems.map((item) => (
              <NavItemButton
                key={item.label}
                item={item}
                active={activePanel === item.label}
                sx={{ px: 0, pt: 0, pb: 0 }}
                fontSize="1rem"
                onClick={onNavClick}
                onHover={onNavHover}
                onHoverEnd={onNavHoverEnd}
              />
            ))}
          </Box>
        )}

        <Box sx={{ flex: 1, display: searchOpen ? 'none' : 'block' }} />

        {/* Search — icon collapses to full bar */}
        {onSearch &&
          (searchOpen ? (
            <Box
              component="form"
              role="search"
              onSubmit={handleSearchSubmit}
              onBlur={handleSearchBlur}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'action.hover',
                borderRadius: 6,
                px: 2,
                py: 0.5,
                gap: 1,
                outline: '2px solid',
                outlineColor: 'border.focus',
              }}
            >
              <InputBase
                inputRef={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder ?? 'Search'}
                inputProps={{ 'aria-label': 'Search' }}
                sx={{ flex: 1, fontSize: '0.875rem' }}
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
                  color: 'primary.main',
                  borderRadius: 1,
                  '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus', outlineOffset: '2px' },
                  '&:focus': { outline: 'none' },
                }}
              >
                <Icon icon="magnifying-glass" size="md" />
              </Box>
            </Box>
          ) : (
            <Box
              component="button"
              type="button"
              aria-label="Open search"
              onClick={handleOpenSearch}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'action.hover',
                borderRadius: 6,
                px: 1.5,
                py: 0.75,
                border: 'none',
                cursor: 'pointer',
                color: 'text.secondary',
                outline: '2px solid transparent',
                '&:hover': { bgcolor: 'action.selected' },
                '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus' },
                '&:focus': { outline: 'none' },
              }}
            >
              <Icon icon="magnifying-glass" size="md" />
            </Box>
          ))}

        {/* Utility links — text only, no icons */}
        {utilityLinks && (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {utilityLinks.map((link) => (
              <ButtonBase
                key={link.href}
                component="a"
                href={link.href}
                sx={{
                  px: 0.75,
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
                <Typography variant="small" sx={{ color: 'inherit' }}>
                  {link.label}
                </Typography>
              </ButtonBase>
            ))}
          </Box>
        )}

        {/* CTAs — small */}
        {(primaryCta || secondaryCta) && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {primaryCta && <HeaderCtaButton cta={primaryCta} variant="outlined" size="small" condensed sx={{ px: 2 }} />}
            {secondaryCta && <HeaderCtaButton cta={secondaryCta} variant="contained" size="small" condensed sx={{ px: 2 }} />}
          </Box>
        )}
      </Toolbar>
    </Container>
  )
}
