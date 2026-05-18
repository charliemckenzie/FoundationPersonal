import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button } from '../Button'

interface PromoCardProps {
  image?: string
  imageAlt?: string
  title: string
  description?: string
  cta: { label: string; href: string }
  width?: number
}

export function PromoCard({
  image,
  imageAlt,
  title,
  description,
  cta,
  width = 280,
}: PromoCardProps) {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'border.subtle',
        borderRadius: (t) => `${t.shape.md}px`,
        overflow: 'hidden',
        width,
        flexShrink: 0,
      }}
    >
      {image && (
        <Box
          component="img"
          src={image}
          alt={imageAlt ?? ''}
          sx={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', display: 'block' }}
        />
      )}
      <Box sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h5" sx={{ color: 'text.heading' }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body" sx={{ color: 'text.muted' }}>
            {description}
          </Typography>
        )}
        <Button
          label={cta.label}
          variant="outlined"
          size="small"
          onClick={() => {
            window.location.href = cta.href
          }}
        />
      </Box>
    </Box>
  )
}
