'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export type ScoreSeverity = 'success' | 'warning' | 'error';

/** Maps a 0–100 retirement score to a semantic severity colour. */
export function getScoreSeverity(score: number): ScoreSeverity {
  if (score >= 90) return 'success';
  if (score >= 50) return 'warning';
  return 'error';
}

interface RetirementScoreProps {
  /** 0–100 score. */
  score: number;
  severity: ScoreSeverity;
}

/** Circular retirement-score indicator (SVG progress ring with the % in the centre). */
export function RetirementScore({ score, severity }: RetirementScoreProps) {
  const size = 80;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - score / 100);

  return (
    <Box sx={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} opacity={0.12} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body" sx={{ fontWeight: 700, color: `${severity}.dark` }}>{score}%</Typography>
      </Box>
    </Box>
  );
}
