'use client'

import type React from 'react'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import { Icon } from '../Icon'

interface CondensedSearchProps {
  searchOpen: boolean
  query: string
  inputRef: React.RefObject<HTMLInputElement | null>
  searchPlaceholder?: string
  onQueryChange: (value: string) => void
  onOpenSearch: () => void
  onSearchBlur: (e: React.FocusEvent<HTMLFormElement>) => void
  onSearchSubmit: (e: React.FormEvent) => void
}

export function CondensedSearch({
  searchOpen,
  query,
  inputRef,
  searchPlaceholder,
  onQueryChange,
  onOpenSearch,
  onSearchBlur,
  onSearchSubmit,
}: CondensedSearchProps) {
  if (searchOpen) {
    return (
      <Box
        component="form"
        role="search"
        onSubmit={onSearchSubmit}
        onBlur={onSearchBlur}
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
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={searchPlaceholder ?? 'Search'}
          inputProps={{ 'aria-label': 'Search' }}
          sx={{ flex: 1, typography: 'small' }}
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
    )
  }

  return (
    <Box
      component="button"
      type="button"
      aria-label="Open search"
      onClick={onOpenSearch}
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
  )
}
