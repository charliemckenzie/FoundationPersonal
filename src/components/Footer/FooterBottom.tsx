import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Icon } from '../Icon';
import { AwardPlaceholder } from './AwardPlaceholder';
import { ART_LEGAL_LINKS, QSUPER_LEGAL_LINKS, ART_SOCIAL_LINKS, QSUPER_SOCIAL_LINKS, AOC_TEXT } from './footerData';

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

function SocialIcons({ links }: { links: ReadonlyArray<{ icon: string; label: string; href: string }> }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      {links.map(({ icon, label, href }) => (
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
          }}
        >
          <Icon icon={icon} size="md" color="primary" />
        </Box>
      ))}
    </Box>
  );
}

export function FooterBottom() {
  const theme = useTheme();
  const isQSuper = theme.brandConfig.name === 'QSuper';
  const legalLinks = isQSuper ? QSUPER_LEGAL_LINKS : ART_LEGAL_LINKS;
  const socialLinks = isQSuper ? QSUPER_SOCIAL_LINKS : ART_SOCIAL_LINKS;

  return (
    <>
      <Divider sx={{ mb: 3 }} />

      {/* Legal links + right-side text */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: { xs: 'flex-start', md: 'space-between' },
          gap: { xs: 1.5, md: 2 },
          mb: isQSuper ? 3 : 4,
        }}
      >
        <Box
          component="nav"
          aria-label="Legal"
          className="link-hover-only"
          sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, md: 2 } }}
        >
          {legalLinks.map((link) => (
            <Box key={link} component="a" href="#" sx={navLinkSx}>
              {link}
            </Box>
          ))}
        </Box>
        {isQSuper ? (
          <Typography
            component="p"
            sx={{ color: 'text.primary', fontSize: '0.875rem', lineHeight: 1.5, whiteSpace: { md: 'nowrap' } }}
          >
            We&apos;re part of{' '}
            <Box component="a" href="https://www.australianretirementtrust.com.au" sx={inlineLinkSx}>
              Australian Retirement Trust
            </Box>
          </Typography>
        ) : (
          <Typography
            component="p"
            sx={{ color: 'text.primary', fontSize: '0.875rem', lineHeight: 1.5, whiteSpace: { md: 'nowrap' } }}
          >
            © Australian Retirement Trust. All rights reserved.
          </Typography>
        )}
      </Box>

      {/* QSuper: awards + social icons row */}
      {isQSuper && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <AwardPlaceholder />
          </Box>
          <SocialIcons links={socialLinks} />
        </Box>
      )}

      {/* Acknowledgement of Country */}
      <Box
        sx={{
          backgroundColor: 'background.elevated',
          borderRadius: (t) => `${t.shape.lg}px`,
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
        your personal objectives, financial situation, or needs. Before making any decisions about{' '}
        {isQSuper ? 'QSuper' : 'ART'}, you should read the relevant{' '}
        <Box component="a" href="#" sx={inlineLinkSx}>
          Product Disclosure Statement (PDS)
        </Box>{' '}
        and{' '}
        <Box component="a" href="#" sx={inlineLinkSx}>
          Target Market Determinations (TMD)
        </Box>{' '}
        to consider whether the {isQSuper ? 'QSuper products are' : 'product is'} right for you.
      </Typography>
    </>
  );
}
