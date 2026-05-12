import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { LEGAL_LINKS, AOC_TEXT } from './footerData';

const navLinkSx = {
  color: 'text.primary',
  textDecoration: 'none',
  fontSize: '0.875rem',
  lineHeight: 1.5,
  '&:hover': { textDecoration: 'underline' },
} as const;

const inlineLinkSx = {
  color: 'text.link',
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
} as const;

export function FooterBottom() {
  return (
    <>
      <Divider sx={{ mb: 3 }} />

      {/* Legal links + copyright */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: { xs: 'flex-start', md: 'space-between' },
          gap: { xs: 1.5, md: 2 },
          mb: 4,
        }}
      >
        <Box
          component="nav"
          aria-label="Legal"
          className="link-hover-only"
          sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, md: 2 } }}
        >
          {LEGAL_LINKS.map((link) => (
            <Box key={link} component="a" href="#" sx={navLinkSx}>
              {link}
            </Box>
          ))}
        </Box>
        <Typography
          component="p"
          sx={{ color: 'text.primary', fontSize: '0.875rem', lineHeight: 1.5, whiteSpace: { md: 'nowrap' } }}
        >
          © Australian Retirement Trust. All rights reserved.
        </Typography>
      </Box>

      {/* Acknowledgement of Country */}
      <Box
        sx={{
          backgroundColor: 'background.elevated',
          borderRadius: (theme) => `${theme.shape.lg}px`,
          p: 3,
          mb: 3,
        }}
      >
        <Typography
          component="p"
          sx={{ fontWeight: 700, color: 'text.heading', fontSize: '0.875rem', lineHeight: 1.5, mb: 1 }}
        >
          Acknowledgement of Country
        </Typography>
        <Typography component="p" sx={{ color: 'text.primary', fontSize: '0.875rem', lineHeight: 1.5 }}>
          {AOC_TEXT}
        </Typography>
      </Box>

      {/* Disclaimer */}
      <Typography component="p" sx={{ color: 'text.muted', fontSize: '0.8125rem', lineHeight: 1.5 }}>
        The information on this website contains general information only. It doesn&apos;t consider
        your personal objectives, financial situation, or needs. Before making any decisions about
        ART, you should read the relevant{' '}
        <Box component="a" href="#" sx={inlineLinkSx}>
          Product Disclosure Statement (PDS)
        </Box>{' '}
        and{' '}
        <Box component="a" href="#" sx={inlineLinkSx}>
          Target Market Determinations (TMD)
        </Box>{' '}
        to consider whether the product is right for you.
      </Typography>
    </>
  );
}
