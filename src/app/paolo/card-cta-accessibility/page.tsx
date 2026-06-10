"use client";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { TextButton } from '../../../components/TextButton';

type LightSurface = 'white' | 'neutral' | 'cool';
type DarkSurface = 'paper' | 'neutral' | 'cool';

interface LightRow {
  style: 'Button outlined' | 'TextButton';
  color: 'primary';
  state: 'rest' | 'hover' | 'active';
  values: Record<LightSurface, number>;
}

interface DarkRow {
  style: 'Button outlined' | 'TextButton';
  color: 'primary';
  state: 'rest' | 'hover' | 'active';
  values: Record<DarkSurface, number>;
}

interface ContainedRow {
  mode: 'light' | 'dark';
  color: 'primary';
  rest: number;
  hover: number;
}

interface PreviewBackground {
  key: 'white' | 'neutral' | 'cool';
  label: string;
  token: 'background.paper' | 'background.tintNeutral' | 'background.tintNeutralCool';
}

const BACKGROUNDS: PreviewBackground[] = [
  { key: 'white', label: 'White', token: 'background.paper' },
  { key: 'neutral', label: 'Neutral', token: 'background.tintNeutral' },
  { key: 'cool', label: 'Cool', token: 'background.tintNeutralCool' },
];

const LIGHT_ROWS: LightRow[] = [
  { style: 'Button outlined', color: 'primary', state: 'rest', values: { white: 5.8, neutral: 5.18, cool: 5.13 } },
  { style: 'Button outlined', color: 'primary', state: 'hover', values: { white: 6.97, neutral: 6.28, cool: 6.22 } },
  { style: 'Button outlined', color: 'primary', state: 'active', values: { white: 6.4, neutral: 5.81, cool: 5.77 } },
  { style: 'TextButton', color: 'primary', state: 'rest', values: { white: 5.8, neutral: 5.18, cool: 5.13 } },
  { style: 'TextButton', color: 'primary', state: 'hover', values: { white: 8.82, neutral: 7.88, cool: 7.8 } },
];

const DARK_ROWS: DarkRow[] = [
  { style: 'Button outlined', color: 'primary', state: 'rest', values: { paper: 6.93, neutral: 5.87, cool: 5.87 } },
  { style: 'Button outlined', color: 'primary', state: 'hover', values: { paper: 7.38, neutral: 6.31, cool: 6.31 } },
  { style: 'Button outlined', color: 'primary', state: 'active', values: { paper: 6.5, neutral: 5.58, cool: 5.58 } },
  { style: 'TextButton', color: 'primary', state: 'rest', values: { paper: 6.93, neutral: 5.87, cool: 5.87 } },
  { style: 'TextButton', color: 'primary', state: 'hover', values: { paper: 5.36, neutral: 4.54, cool: 4.54 } },
];

const CONTAINED_ROWS: ContainedRow[] = [
  { mode: 'light', color: 'primary', rest: 5.8, hover: 8.82 },
  { mode: 'dark', color: 'primary', rest: 8.37, hover: 6.47 },
];

function ratioCell(ratio: number) {
  const passes = ratio >= 4.5;

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="small" component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>
        {ratio.toFixed(2)}:1
      </Typography>
      <Typography
        variant="caption"
        component="span"
        sx={{
          color: passes ? 'success.dark' : 'error.dark',
          bgcolor: passes ? 'success.background' : 'error.background',
          border: '1px solid',
          borderColor: passes ? 'success.border' : 'error.border',
          borderRadius: '999px',
          px: '0.5rem',
          py: '0.125rem',
          fontWeight: 700,
        }}
      >
        {passes ? 'Pass' : 'Fail'}
      </Typography>
    </Box>
  );
}

function FindingsTable({
  headerA,
  headerB,
  headerC,
  rows,
}: {
  headerA: string;
  headerB: string;
  headerC: string;
  rows: Array<{
    style: string;
    color: string;
    state: string;
    values: { a: number; b: number; c: number };
  }>;
}) {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '56rem',
          '& th, & td': {
            borderBottom: '1px solid',
            borderColor: 'border.default',
            textAlign: 'left',
            py: '0.75rem',
            pr: '1rem',
            verticalAlign: 'middle',
          },
          '& th': { color: 'text.heading' },
          '& td': { color: 'text.primary' },
        }}
      >
        <Box component="thead">
          <Box component="tr">
            <Box component="th"><Typography variant="small" component="span" sx={{ fontWeight: 700 }}>Style</Typography></Box>
            <Box component="th"><Typography variant="small" component="span" sx={{ fontWeight: 700 }}>Color</Typography></Box>
            <Box component="th"><Typography variant="small" component="span" sx={{ fontWeight: 700 }}>State</Typography></Box>
            <Box component="th"><Typography variant="small" component="span" sx={{ fontWeight: 700 }}>{headerA}</Typography></Box>
            <Box component="th"><Typography variant="small" component="span" sx={{ fontWeight: 700 }}>{headerB}</Typography></Box>
            <Box component="th"><Typography variant="small" component="span" sx={{ fontWeight: 700 }}>{headerC}</Typography></Box>
          </Box>
        </Box>
        <Box component="tbody">
          {rows.map((row) => (
            <Box component="tr" key={`${row.style}-${row.color}-${row.state}`}>
              <Box component="td"><Typography variant="body" component="span">{row.style}</Typography></Box>
              <Box component="td"><Typography variant="body" component="span">{row.color}</Typography></Box>
              <Box component="td"><Typography variant="body" component="span">{row.state}</Typography></Box>
              <Box component="td">{ratioCell(row.values.a)}</Box>
              <Box component="td">{ratioCell(row.values.b)}</Box>
              <Box component="td">{ratioCell(row.values.c)}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function cardActionSamples() {
  return (
    <Stack spacing={1.25} sx={{ alignItems: 'flex-start' }}>
      <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
        <Button label="Outlined primary" variant="outlined" color="primary" />
        <TextButton label="TextButton primary" color="primary" />
      </Stack>
      <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
        <Button label="Contained primary" variant="contained" color="primary" />
      </Stack>
      <Typography variant="caption" component="p" sx={{ color: 'text.muted' }}>
        Card CTA policy: button/text actions use primary only.
      </Typography>
    </Stack>
  );
}

export default function CardCtaAccessibilityPage() {
  const lightRowsForTable = LIGHT_ROWS.map((row) => ({
    style: row.style,
    color: row.color,
    state: row.state,
    values: {
      a: row.values.white,
      b: row.values.neutral,
      c: row.values.cool,
    },
  }));

  const darkRowsForTable = DARK_ROWS.map((row) => ({
    style: row.style,
    color: row.color,
    state: row.state,
    values: {
      a: row.values.paper,
      b: row.values.neutral,
      c: row.values.cool,
    },
  }));

  return (
    <Box sx={{ py: { xs: 4, md: 7 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Stack spacing={1.25}>
            <Typography variant="display-5" component="h1" sx={{ color: 'text.heading' }}>
              Card CTA Accessibility Lab
            </Typography>
            <Typography variant="lead" component="p" sx={{ color: 'text.primary', maxWidth: '60rem' }}>
              Full findings across light and dark modes for card CTAs using primary only. This includes Button
              outlined, TextButton, and contained Button checks on approved card backgrounds.
            </Typography>
            <Typography variant="small" component="p" sx={{ color: 'text.muted' }}>
              WCAG 2.2 AA target for normal text: 4.5:1 or higher.
            </Typography>
          </Stack>

          <Card
            variant="contained"
            header="Light Mode Findings"
            body="Text-like CTA contrast on white, neutral, and cool card backgrounds in light mode."
            actions={<FindingsTable headerA="White" headerB="Neutral" headerC="Cool" rows={lightRowsForTable} />}
          />

          <Card
            variant="contained"
            header="Dark Mode Findings"
            body="Text-like CTA contrast on paper, neutral, and cool card backgrounds in dark mode."
            actions={<FindingsTable headerA="Paper" headerB="Neutral" headerC="Cool" rows={darkRowsForTable} />}
          />

          <Card
            variant="contained"
            header="Contained Button Summary (Text On Fill)"
            body="Contained button (primary) contrast remains AA-compliant in both modes."
            actions={
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Box
                  component="table"
                  sx={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    minWidth: '38rem',
                    '& th, & td': {
                      borderBottom: '1px solid',
                      borderColor: 'border.default',
                      textAlign: 'left',
                      py: '0.75rem',
                      pr: '1rem',
                      verticalAlign: 'middle',
                    },
                    '& th': { color: 'text.heading' },
                    '& td': { color: 'text.primary' },
                  }}
                >
                  <Box component="thead">
                    <Box component="tr">
                      <Box component="th"><Typography variant="small" component="span" sx={{ fontWeight: 700 }}>Mode</Typography></Box>
                      <Box component="th"><Typography variant="small" component="span" sx={{ fontWeight: 700 }}>Color</Typography></Box>
                      <Box component="th"><Typography variant="small" component="span" sx={{ fontWeight: 700 }}>Rest</Typography></Box>
                      <Box component="th"><Typography variant="small" component="span" sx={{ fontWeight: 700 }}>Hover</Typography></Box>
                    </Box>
                  </Box>
                  <Box component="tbody">
                    {CONTAINED_ROWS.map((row) => (
                      <Box component="tr" key={`${row.mode}-${row.color}`}>
                        <Box component="td"><Typography variant="body" component="span">{row.mode}</Typography></Box>
                        <Box component="td"><Typography variant="body" component="span">{row.color}</Typography></Box>
                        <Box component="td">{ratioCell(row.rest)}</Box>
                        <Box component="td">{ratioCell(row.hover)}</Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            }
          />

          <Stack spacing={2}>
            <Typography variant="h4" component="h2" sx={{ color: 'text.heading' }}>
              Live Card Background Previews
            </Typography>
            {BACKGROUNDS.map((background) => (
              <Card
                key={background.key}
                variant="contained"
                header={`${background.label} background (${background.token})`}
                body="Each row shows the same CTA styles on a different card surface token."
                actions={cardActionSamples()}
                sx={{ backgroundColor: background.token }}
              />
            ))}
          </Stack>

          <Card
            variant="border"
            header="Recommended Fix"
            body={
              'Approved card CTA color is primary. Primary-only button/text actions in cards remain AA-compliant across the light and dark mode surfaces shown above.'
            }
          />
        </Stack>
      </Container>
    </Box>
  );
}
