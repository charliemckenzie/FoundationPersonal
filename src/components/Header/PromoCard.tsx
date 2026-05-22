import Box from '@mui/material/Box'
import type React from 'react'

interface PromoCardProps {
  children: React.ReactNode
  width?: number
}

export function PromoCard({ children, width = 280 }: PromoCardProps) {
  return (
    <Box
      className="link-no-underline"
      sx={(t) => ({
        bgcolor: 'background.tableStripe',
        borderRadius: `${t.shape.lg}px`,
        overflow: 'hidden',
        width,
        flexShrink: 0,
        alignSelf: 'flex-start',
        p: 4,
      })}
    >
      {children}
    </Box>
  )
}
