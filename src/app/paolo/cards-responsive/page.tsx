import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Card, CardGrid } from '../../../components/Card';
import { Divider } from '../../../components/Divider';

const CARD_BODY = 'Resize the viewport to test behavior: stack below tablet, two-up at tablet, and capped rows on desktop.';

function DemoCard({ label }: { label: string }) {
  return (
    <Card
      variant="contained"
      header={label}
      body={CARD_BODY}
      ctas={{
        primary: { label: 'Primary action' },
        secondary: { label: 'Secondary action' },
      }}
    />
  );
}

function Section({ title, count }: { title: string; count: number }) {
  return (
    <Stack spacing={2.5}>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <CardGrid>
        {Array.from({ length: count }, (_, index) => (
          <DemoCard key={`${title}-${index + 1}`} label={`Card ${index + 1}`} />
        ))}
      </CardGrid>
    </Stack>
  );
}

export default function PaoloCardsResponsivePage() {
  return (
    <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Box>
            <Typography variant="display-5" component="h1" sx={{ mb: 1 }}>
              Paolo Local: Card Responsive Grid
            </Typography>
            <Typography variant="lead" component="p" sx={{ color: 'text.secondary' }}>
              This page is a local dev sandbox for Card responsive grid behavior.
            </Typography>
          </Box>

          <Divider />

          <Section title="Two Cards" count={2} />

          <Divider />

          <Section title="Three Cards" count={3} />

          <Divider />

          <Section title="Six Cards" count={6} />
        </Stack>
      </Container>
    </Box>
  );
}
