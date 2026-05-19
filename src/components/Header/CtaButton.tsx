'use client'

import { useState, useRef } from 'react'
import MuiMenu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Button } from '../Button'
import type { CtaAction, CtaMenuItem } from './types'

export interface HeaderCtaButtonProps {
  cta: CtaAction
  variant: 'contained' | 'outlined'
  size?: 'small' | 'medium' | 'large'
  condensed?: boolean
  noMenu?: boolean
}

export function HeaderCtaButton({ cta, variant, size, condensed, noMenu }: HeaderCtaButtonProps) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const hasMenu = !noMenu && (cta.menu?.length ?? 0) > 0

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
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          disableScrollLock
        >
          {cta.menu!.map((item: CtaMenuItem) => (
            <MenuItem
              key={item.href}
              onClick={() => {
                window.location.href = item.href
                setOpen(false)
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </MuiMenu>
      )}
    </>
  )
}
