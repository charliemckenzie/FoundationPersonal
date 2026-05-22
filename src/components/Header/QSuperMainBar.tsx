'use client'

import { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import InputBase from '@mui/material/InputBase'
import { Icon } from '../Icon'
import { IconButton } from '../IconButton'
import { HeaderCtaButton } from './CtaButton'
import { NavItemButton } from './NavItemButton'
import type { NavItem, CtaAction } from './types'

export interface QSuperMainBarProps {
  navItems: NavItem[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
  onSearch?: (query: string) => void
  searchPlaceholder?: string
  activePanel: string | null
  onNavClick: (item: NavItem, el: HTMLButtonElement) => void
  onNavHoverEnd?: () => void
  showHamburger?: boolean
  onMenuOpen?: () => void
}

export function QSuperMainBar({
  navItems,
  primaryCta,
  secondaryCta,
  onSearch,
  searchPlaceholder,
  activePanel,
  onNavClick,
  onNavHoverEnd,
  showHamburger = false,
  onMenuOpen,
}: QSuperMainBarProps) {
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
    <Toolbar disableGutters sx={{ gap: 0, pb: 0, minHeight: 'unset', alignItems: showHamburger ? 'center' : 'flex-end' }}>
      {/* Megamenu nav (desktop only) */}
      {!searchOpen && !showHamburger && (
        <Box
          component="nav"
          id="main-nav"
          aria-label="Main navigation"
          sx={{ display: 'flex', ml: '-15px', '& .MuiTypography-root': { fontWeight: 400 } }}
        >
          {navItems.map((item) => (
            <NavItemButton
              key={item.label}
              item={item}
              active={activePanel === item.label}
              fontSize="1rem"
              sx={{ px: '15px', color: '#4a4a4a' }}
              onClick={onNavClick}
              onHover={onNavClick}
              onHoverEnd={onNavHoverEnd}
            />
          ))}
        </Box>
      )}

      <Box sx={{ flex: 1, display: searchOpen ? 'none' : 'block' }} />

      {/* Search */}
      {onSearch && (
        searchOpen ? (
          <Box
            component="form"
            role="search"
            onSubmit={handleSearchSubmit}
            onBlur={handleSearchBlur}
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'center',
              height: '40px',
              boxSizing: 'border-box',
              bgcolor: 'action.hover',
              borderRadius: 1,
              px: 2,
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
              alignSelf: 'center',
              gap: 0.75,
              bgcolor: 'action.hover',
              borderRadius: 1,
              width: '86px',
              height: '40px',
              p: 0,
              boxSizing: 'border-box',
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
            <Box component="span" sx={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
              Search
            </Box>
          </Box>
        )
      )}

      {/* CTAs — no dropdown menus in QSuper */}
      {(primaryCta || secondaryCta) && (
        <Box sx={{ display: 'flex', gap: 1, ml: 1.5, alignSelf: 'center' }}>
          {primaryCta && <HeaderCtaButton cta={primaryCta} variant="outlined" size="small" condensed noMenu sx={{ height: '40px' }} />}
          {secondaryCta && <HeaderCtaButton cta={secondaryCta} variant="contained" size="small" condensed noMenu sx={{ height: '40px' }} />}
        </Box>
      )}

      {/* Hamburger — tablet only, far right */}
      {showHamburger && !searchOpen && (
        <Box sx={{ alignSelf: 'center', ml: 1 }}>
          <IconButton icon="bars" label="Open navigation menu" variant="ghost" onClick={onMenuOpen} />
        </Box>
      )}
    </Toolbar>
  )
}
