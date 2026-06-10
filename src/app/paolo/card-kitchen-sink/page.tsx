'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Card, CardGrid } from '../../../components/Card';
import { HeroIcon } from '../../../components/HeroIcon';
import { Icon } from '../../../components/Icon';

const BODY_COPY = "If you want to add super to your account before tax (salary sacrifice), you'll need to ask your employer to set this up.";

function SectionTitle({ title }: { title: string }) {
  return (
    <Typography variant="h4" component="h2" sx={{ color: 'text.heading' }}>
      {title}
    </Typography>
  );
}

function DemoCard({
  title,
  topSection,
  topSectionPosition = 'top',
  topSectionMobileBehavior = 'keep-left',
  cardBg = 'background.paper',
}: {
  title: string;
  topSection?: React.ReactNode;
  topSectionPosition?: 'top' | 'left';
  topSectionMobileBehavior?: 'keep-left' | 'stack-top';
  cardBg?: 'background.paper' | 'background.tintNeutral' | 'background.tintNeutralCool';
}) {
  return (
    <Card
      variant="contained"
      topSection={topSection}
      topSectionPosition={topSectionPosition}
      topSectionMobileBehavior={topSectionMobileBehavior}
      header={title}
      body={BODY_COPY}
      ctas={{
        primary: { label: 'Get started' },
        secondary: { label: 'Tertiary', kind: 'textButton' },
      }}
      sx={{ maxWidth: '48rem', backgroundColor: cardBg }}
    />
  );
}

export default function PaoloCardKitchenSinkPage() {
  return (
    <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Stack spacing={5}>
          <Box>
            <Typography variant="display-5" component="h1" sx={{ mb: 1 }}>
              Card Kitchen Sink (Local)
            </Typography>
            <Typography variant="lead" component="p" sx={{ color: 'text.secondary' }}>
              Local QA page for Card layout, icon placement, mobile behavior, and token-based backgrounds.
            </Typography>
          </Box>

          <Stack spacing={2}>
            <SectionTitle title="Hero Icon Left vs Stack On Mobile" />
            <CardGrid>
              <DemoCard
                title="Left (keep-left on mobile)"
                topSection={<HeroIcon name="Calculator" brand="art" background="brand" containerSizeOverride="5rem" iconSizeOverride="2.5rem" />}
                topSectionPosition="left"
                topSectionMobileBehavior="keep-left"
              />
              <DemoCard
                title="Left (stack-top on mobile)"
                topSection={<HeroIcon name="Calculator" brand="art" background="brand" containerSizeOverride="5rem" iconSizeOverride="2.5rem" />}
                topSectionPosition="left"
                topSectionMobileBehavior="stack-top"
              />
            </CardGrid>
          </Stack>

          <Stack spacing={2}>
            <SectionTitle title="Hero Icon Background Pairings" />
            <CardGrid>
              <DemoCard
                title="White Card + Cool Icon"
                topSection={<HeroIcon name="Calculator" brand="art" background="brand" containerSizeOverride="5rem" iconSizeOverride="2.5rem" />}
                topSectionPosition="left"
                cardBg="background.paper"
              />
              <DemoCard
                title="Neutral Card + White Icon"
                topSection={<HeroIcon name="Calculator" brand="art" background="white" containerSizeOverride="5rem" iconSizeOverride="2.5rem" />}
                topSectionPosition="left"
                cardBg="background.tintNeutral"
              />
              <DemoCard
                title="Cool Card + No Icon Background"
                topSection={<HeroIcon name="Calculator" brand="art" background="none" iconSizeOverride="3rem" />}
                topSectionPosition="left"
                cardBg="background.tintNeutralCool"
              />
            </CardGrid>
          </Stack>

          <Stack spacing={2}>
            <SectionTitle title="Font Awesome Top vs Left" />
            <CardGrid>
              <DemoCard
                title="FA Top"
                topSection={<Box sx={{ display: 'flex', justifyContent: 'flex-start', fontSize: '2.25rem', px: '2rem', pt: '1.5rem' }}><Icon icon="house" size="inherit" color="primary" /></Box>}
                topSectionPosition="top"
              />
              <DemoCard
                title="FA Left"
                topSection={<Box sx={{ display: 'flex', justifyContent: 'flex-start', fontSize: '2.25rem' }}><Icon icon="house" size="inherit" color="primary" /></Box>}
                topSectionPosition="left"
              />
            </CardGrid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
