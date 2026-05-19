'use client'

import { useTheme } from '@mui/material'
import { ARTHeader } from './ARTHeader'
import { QSuperHeader } from './QSuperHeader'
import type { HeaderProps } from './types'

export function Header(props: HeaderProps) {
  const theme = useTheme()
  const isQSuper = theme.brandConfig.name === 'QSuper'
  return isQSuper ? <QSuperHeader {...props} /> : <ARTHeader {...props} />
}

