'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { Logo } from '../Logo';
import { FooterNavSection } from './FooterNavSection';
import { FooterContact } from './FooterContact';
import { FooterBottom } from './FooterBottom';
import { AwardPlaceholder } from './AwardPlaceholder';
import { ART_NAV_SECTIONS, QSUPER_NAV_SECTIONS } from './footerData';

export function Footer() {
  const theme = useTheme();
  const isQSuper = theme.brandConfig.name === 'QSuper';
  const navSections = isQSuper ? QSUPER_NAV_SECTIONS : ART_NAV_SECTIONS;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'border.subtle',
        pt: { xs: 4, md: 6 },
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        {isQSuper ? (
          <>
            {/* QSuper: 5-col flat grid, no logo, no contact sidebar */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(5, 1fr)' },
                gap: { xs: 0, md: 3 },
                mb: { xs: 0, md: 5 },
              }}
            >
              {navSections.map((section) => (
                <FooterNavSection key={section.title} title={section.title} links={section.links} uppercaseTitle />
              ))}
            </Box>
            <Box sx={{ display: { md: 'none' }, mb: 4 }}>
              <Divider />
            </Box>
          </>
        ) : (
          <>
            {/* ART: logo + 4-col nav + right contact sidebar */}
            <Box sx={{ mb: 4, lineHeight: 0, '& svg': { width: '2.75rem', height: 'auto' }, '& > div': { height: '3.4375rem' } }}>
              <Logo variant="mark" size="sm" />
            </Box>
            <Box
              sx={{
                display: { xs: 'block', sm: 'grid' },
                gridTemplateColumns: { sm: '1fr 17.5rem' },
                gap: { sm: 4, md: 6 },
                mb: { xs: 4, md: 5 },
              }}
            >
              <Box sx={{ mb: { xs: 4, sm: 0 } }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
                    gap: { xs: 0, md: 3 },
                  }}
                >
                  {navSections.map((section) => (
                    <FooterNavSection key={section.title} title={section.title} links={section.links} />
                  ))}
                </Box>
                <Box sx={{ display: { md: 'none' } }}>
                  <Divider />
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, mt: 4 }}>
                  <AwardPlaceholder />
                  <AwardPlaceholder />
                </Box>
              </Box>
              <FooterContact />
            </Box>
          </>
        )}

        <FooterBottom />
      </Container>
    </Box>
  );
}

