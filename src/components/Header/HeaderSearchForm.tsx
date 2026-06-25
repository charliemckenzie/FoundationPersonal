'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import { Icon } from '../Icon'

interface HeaderSearchFormProps {
  onSubmit: (query: string) => void
  placeholder?: string
  inverted?: boolean
  /** Aria label for the input. Defaults to the placeholder, or "Search" if neither is set. */
  inputAriaLabel?: string
}

/**
 * The pill-shaped search box used in UtilityBar (desktop + tablet) and other header bars.
 * Single source of truth — was previously duplicated across each bar component.
 */
export function HeaderSearchForm({ onSubmit, placeholder = 'Search', inverted = false, inputAriaLabel }: HeaderSearchFormProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) onSubmit(query.trim())
  }

  return (
    <Box
      component="form"
      role="search"
      onSubmit={handleSubmit}
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        bgcolor: inverted ? 'rgba(255,255,255,0.16)' : 'action.hover',
        borderRadius: 6,
        px: 2,
        py: 0.5,
        gap: 1,
      }}
    >
      <InputBase
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        inputProps={{ 'aria-label': inputAriaLabel ?? placeholder }}
        sx={(t) => ({ flex: 1, fontSize: t.typography.body.fontSize, color: inverted ? t.palette.common.white : t.palette.text.primary })}
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
          color: inverted ? 'text.inverse' : 'text.secondary',
          borderRadius: 1,
          '&:focus-visible': { outline: '2px solid', outlineColor: inverted ? 'common.white' : 'border.focus', outlineOffset: '2px' },
          '&:focus': { outline: 'none' },
        }}
      >
        <Icon icon="magnifying-glass" size="md" />
      </Box>
    </Box>
  )
}
