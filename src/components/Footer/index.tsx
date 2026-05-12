'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { Logo } from '../Logo';
import { FooterNavSection } from './FooterNavSection';
import { FooterContact } from './FooterContact';
import { FooterBottom } from './FooterBottom';
import { AwardPlaceholder } from './AwardPlaceholder';
import { NAV_SECTIONS } from './footerData';

export function Footer() {
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
        {/* Logo — sits above the nav/contact grid on all breakpoints */}
        <Box sx={{ mb: 4, lineHeight: 0, '& svg': { width: '2.75rem', height: 'auto' }, '& > div': { height: '3.4375rem' } }}>
          <Logo variant="mark" size="sm" />
        </Box>

        {/* Main two-column body */}
        <Box
          sx={{
            display: { xs: 'block', sm: 'grid' },
            gridTemplateColumns: { sm: '1fr 17.5rem' },
            gap: { sm: 4, md: 6 },
            mb: { xs: 4, md: 5 },
          }}
        >
          {/* Left: nav columns/accordions + desktop awards */}
          <Box sx={{ mb: { xs: 4, sm: 0 } }}>
            {/* Nav — desktop: 4-col grid; mobile/tablet: stacked accordions */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
                gap: { xs: 0, md: 3 },
              }}
            >
              {NAV_SECTIONS.map((section) => (
                <FooterNavSection key={section.title} title={section.title} links={section.links} />
              ))}
            </Box>

            {/* Closing divider for mobile accordions */}
            <Box sx={{ display: { md: 'none' } }}>
              <Divider />
            </Box>

            {/* Awards — desktop only; mobile awards are in FooterContact */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, mt: 4 }}>
              <AwardPlaceholder />
              <AwardPlaceholder />
            </Box>
          </Box>

          {/* Right: Contact info */}
          <FooterContact />
        </Box>

        <FooterBottom />
      </Container>
    </Box>
  );
}
