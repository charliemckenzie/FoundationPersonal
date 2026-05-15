import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '../Icon';
import { AwardPlaceholder } from './AwardPlaceholder';
import { ART_FUND_DETAILS, ART_SOCIAL_LINKS } from './footerData';

const linkSx = {
  color: 'text.link',
  textDecoration: 'none',
  fontSize: '0.875rem',
  lineHeight: 1.5,
  '&:hover': { textDecoration: 'underline' },
} as const;

function AppBadge({ store, src, href }: { store: string; src: string; href: string }) {
  return (
    <Box
      component="a"
      href={href}
      aria-label={`Download on ${store}`}
      className="link-hover-only"
      sx={{ display: 'inline-flex', lineHeight: 0 }}
    >
      <Box
        component="img"
        src={src}
        alt={`Download on ${store}`}
        sx={{ height: '2.5rem', width: 'auto' }}
      />
    </Box>
  );
}

export function FooterContact() {
  return (
    <Box sx={{ minWidth: { md: '17.5rem' } }}>
      {/* Phone */}
      <Box
        component="a"
        href="tel:131184"
        className="link-hover-only"
        sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1rem', lineHeight: 1.5, mb: 0.5, display: 'block', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
      >
        Call 13 11 84
      </Box>
      <Typography component="p" sx={{ color: 'text.primary', fontSize: '0.875rem', lineHeight: 1.5 }}>
        8am–7:30pm AEST Monday to Friday
      </Typography>
      <Box component="a" href="#" sx={linkSx}>
        More contact options
      </Box>

      {/* Fund details */}
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {ART_FUND_DETAILS.map(({ label, value }) => (
          <Typography key={label} component="p" sx={{ color: 'text.primary', fontSize: '0.875rem', lineHeight: 1.5 }}>
            <Box component="span" sx={{ fontWeight: 700 }}>{label}: </Box>{value}
          </Typography>
        ))}
        <Typography component="p" sx={{ color: 'text.primary', fontSize: '0.875rem', lineHeight: 1.5 }}>
          <Box component="span" sx={{ fontWeight: 700 }}>QSuper accounts: </Box>
          <Box component="a" href="#" sx={linkSx}>QSuper USIs</Box>
        </Typography>
      </Box>

      {/* Changing jobs */}
      <Box sx={{ mt: 1.5 }}>
        <Box component="a" href="#" sx={linkSx}>Changing jobs information</Box>
      </Box>

      {/* Social icons */}
      <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
        {ART_SOCIAL_LINKS.map(({ icon, label, href }) => (
          <Box
            key={label}
            component="a"
            href={href}
            aria-label={label}
            sx={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              backgroundColor: 'background.elevated',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              '&:hover': { backgroundColor: 'action.selected' },
              '& > span': { fontSize: '1.375rem' },
            }}
          >
            <Icon icon={icon} size="md" color="primary" />
          </Box>
        ))}
      </Box>

      {/* App store badges */}
      <Box sx={{ display: 'flex', gap: 1.5, mt: 3, flexWrap: 'wrap' }}>
        <AppBadge store="App Store" src="/footer/app-store-badge.svg" href="#" />
        <AppBadge store="Google Play" src="/footer/play-store-badge.svg" href="#" />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box component="a" href="#" sx={linkSx}>More about our app</Box>
      </Box>

      {/* Awards — mobile/tablet only (desktop awards appear in left nav column) */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 2, mt: 4 }}>
        <AwardPlaceholder />
        <AwardPlaceholder />
      </Box>
    </Box>
  );
}
