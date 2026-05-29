'use client'

import { useState } from 'react'
import MuiMenu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import type { SxProps, Theme } from '@mui/material/styles'
import { Button } from '../Button'
import { Icon } from '../Icon'
import type { CtaAction, CtaMenuItem } from './types'

export interface HeaderCtaButtonProps {
  cta: CtaAction
  variant: 'contained' | 'outlined'
  size?: 'small' | 'medium' | 'large'
  condensed?: boolean
  noMenu?: boolean
  sx?: SxProps<Theme>
}

export function HeaderCtaButton({ cta, variant, size, condensed, noMenu, sx }: HeaderCtaButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const hasMenu = !noMenu && (cta.menu?.length ?? 0) > 0
  const open = anchorEl !== null

  const handleClose = () => {
    setAnchorEl(null)
    setExpanded(null)
  }

  return (
    <>
      <Button
        label={cta.label}
        variant={variant}
        size={size}
        condensed={condensed}
        endIcon={hasMenu ? 'chevron-down' : undefined}
        aria-expanded={hasMenu ? open : undefined}
        aria-haspopup={hasMenu ? 'menu' : undefined}
        onClick={hasMenu ? (event) => setAnchorEl((current) => current === null ? event.currentTarget : null) : cta.onClick}
        sx={sx}
      />
      {hasMenu && (
        <MuiMenu
          open={open}
          anchorEl={anchorEl}
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
