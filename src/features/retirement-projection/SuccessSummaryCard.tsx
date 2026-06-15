'use client';

import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '../../components/Icon';

interface SuccessSummaryCardProps {
  /** Banner heading, e.g. "Extra contributions added". */
  title: string;
  /** Body content — breakdown rows, impact summary, etc. */
  children: ReactNode;
  /** Action buttons rendered below the body (e.g. View details + Undo). */
  actions: ReactNode;
}

/**
 * Expanded "completed journey" card: a green success header above a white body
 * and an action row. Shared shell for the contributions / investment / TTR summaries
 * and the saved state of the retirement-goal tile.
 */
export function SuccessSummaryCard({ title, children, actions }: SuccessSummaryCardProps) {
  return (
    <Box sx={{ borderRadius: '0.75rem', border: '1px solid', borderColor: 'success.border', overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2.5,
          py: 2,
          backgroundColor: 'success.background',
        }}
      >
        <Box
          sx={{
            width: '1.75rem',
            height: '1.75rem',
            borderRadius: '50%',
            backgroundColor: 'success.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'common.white',
          }}
        >
          <Icon icon="check" size="sm" color="inherit" />
        </Box>
        <Typography variant="h6" component="p" sx={{ color: 'success.dark' }}>{title}</Typography>
      </Box>

      <Box sx={{ px: 2.5, py: 2, backgroundColor: 'background.paper' }}>
        {children}
        <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>{actions}</Box>
      </Box>
    </Box>
  );
}

interface SummaryRowProps {
  label: string;
  value: ReactNode;
  /** Colour the value to signal a positive or negative outcome. */
  tone?: 'default' | 'positive' | 'negative';
  /** Bottom divider — set false on the final row. */
  divider?: boolean;
  /** Slightly heavier label, for total rows. */
  strongLabel?: boolean;
}

/**
 * Label/value row used inside SuccessSummaryCard bodies. Centralises the value
 * weight emphasis (the small-size weight exception lives here, not at call sites).
 */
export function SummaryRow({ label, value, tone = 'default', divider = true, strongLabel = false }: SummaryRowProps) {
  const valueColor = tone === 'positive' ? 'success.main' : tone === 'negative' ? 'error.main' : undefined;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 1.5,
        ...(divider && { borderBottom: '1px solid', borderColor: 'divider' }),
      }}
    >
      <Typography variant="small" sx={{ fontWeight: strongLabel ? 600 : 500 }}>{label}</Typography>
      <Typography variant="small" sx={{ fontWeight: 700, ...(valueColor && { color: valueColor }) }}>{value}</Typography>
    </Box>
  );
}

/** Tinted "projected impact" panel shown at the foot of a summary body. */
export function ImpactBox({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <Box sx={{ p: 2, borderRadius: '0.5rem', backgroundColor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="small" color="text.muted" sx={{ mb: children ? 1 : 0 }}>{label}</Typography>
      {children}
    </Box>
  );
}
