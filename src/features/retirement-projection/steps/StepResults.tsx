'use client';

import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Modal } from '../../../components/Modal';
import { StepperActions } from '../../../components/StepperActions';
import { computeProjection, ASSUMPTIONS } from '../projection';
import { ResultsCharts } from '../ResultsCharts';
import { WaysToImprove } from '../WaysToImprove';
import { InvestmentStrategySummary } from '../InvestmentStrategySummary';
import type { RetirementProjectionState } from '../types';

interface StepResultsProps {
  state: RetirementProjectionState;
  onStateChange: (updates: Partial<RetirementProjectionState>) => void;
  onBack: () => void;
  onNext: () => void;
  onExit: () => void;
}

function dollars(value: number): string {
  return `$${value.toLocaleString('en-AU', { maximumFractionDigits: 0 })}`;
}

/** Returns the MUI palette key based on retirement score thresholds */
function getScoreSeverity(score: number): 'success' | 'warning' | 'error' {
  if (score >= 90) return 'success';
  if (score >= 50) return 'warning';
  return 'error';
}

/** Circular retirement score indicator */
function RetirementScore({ score, severity }: { score: number; severity: 'success' | 'warning' | 'error' }) {
  const size = 80;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - score / 100);

  return (
    <Box sx={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          opacity={0.12}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
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

/** Label + value row for the breakdown tables */
function BreakdownRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', py: 1.5, '&:not(:last-child)': { borderBottom: '1px solid', borderColor: 'divider' } }}>
      <Typography variant="small" color="text.secondary">{label}</Typography>
      <Typography variant="small" sx={{ fontWeight: 600, ...(highlight === true && { color: 'success.main' }), ...(highlight === false && { color: 'error.main' }) }}>{value}</Typography>
    </Box>
  );
}

/** Row for the assumptions table: label, value badge, and explanation */
function AssumptionRow({ label, value, info }: { label: string; value: string; info: string }) {
  return (
    <Box sx={{ py: 2, '&:not(:last-child)': { borderBottom: '1px solid', borderColor: 'divider' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
        <Typography variant="small" sx={{ fontWeight: 600 }}>{label}</Typography>
        <Typography variant="small" sx={{ fontWeight: 700, color: 'primary.main' }}>{value}</Typography>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>{info}</Typography>
    </Box>
  );
}

export function StepResults({ state, onStateChange, onBack, onNext, onExit }: StepResultsProps) {
  const projection = useMemo(() => computeProjection(state), [state]);
  const onTrack = projection.projectedIncome >= projection.targetIncome;

  const superVariance = projection.projectedBalance - projection.targetBalance;
  const incomeVariance = projection.projectedIncome - projection.targetIncome;

  // Score: 100% if on track, proportional otherwise
  const score = onTrack ? 100 : Math.max(0, Math.round((projection.projectedIncome / projection.targetIncome) * 100));
  const severity = getScoreSeverity(score);
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '4fr 1fr 7fr' },
        rowGap: { xs: 4, md: 0 },
        columnGap: { md: 0 },
        alignItems: 'start',
      }}
    >
      {/* ═══ LEFT COLUMN: title, score, breakdowns, tips, assumptions ═══ */}
      <Box sx={{ gridColumn: { md: '1 / 2' } }}>
        <Typography variant="h3" component="h1" sx={{ mb: 1.5 }}>
          Your retirement projection
        </Typography>
        <Typography variant="body" color="text.secondary" sx={{ mb: 4, lineHeight: 1.75 }}>
          Based on what you told us, we recommend changing how much you add to your super.
        </Typography>

        {/* Breakdowns card */}
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            mb: 3,
          }}
        >
          {/* Super balance breakdown */}
          <Box sx={{ p: 3 }}>
            <Typography variant="small" sx={{ color: 'secondary.main', fontWeight: 700, mb: 1.5 }}>Super balance</Typography>
            <BreakdownRow label={`Super at ${state.retirementAge}`} value={dollars(projection.projectedBalance)} />
            <BreakdownRow label="Your goal" value={dollars(projection.targetBalance)} />
            <BreakdownRow
              label="Variance"
              value={`${superVariance >= 0 ? '+ ' : '- '}${dollars(Math.abs(superVariance))}`}
              highlight={superVariance >= 0}
            />
          </Box>

          {/* Retirement income breakdown */}
          <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="small" sx={{ color: 'secondary.main', fontWeight: 700, mb: 1.5 }}>Retirement income</Typography>
            <BreakdownRow label="Projected retirement income" value={`${dollars(projection.projectedIncome)} /yr`} />
            <BreakdownRow label="Your goal" value={`${dollars(projection.targetIncome)}/yr`} />
            <BreakdownRow
              label="Variance"
              value={`${incomeVariance >= 0 ? '+' : '-'}${dollars(Math.abs(incomeVariance))}`}
              highlight={incomeVariance >= 0}
            />
          </Box>
        </Box>

        {/* Assumptions */}
        <Box
          sx={{
            p: 3,
            borderRadius: '0.75rem',
            backgroundColor: '#F5F5F5',
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
            Assumptions
          </Typography>
          <Typography variant="small" color="text.secondary" sx={{ lineHeight: 1.75 }}>
            This calculator works for accumulation funds only, not defined benefit. To understand the assumptions behind this projection, you can{' '}
            <Typography
              component="button"
              variant="small"
              onClick={() => setAssumptionsOpen(true)}
              sx={{ textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', p: 0, font: 'inherit', color: 'primary.main' }}
            >
              read them here
            </Typography>
            .
          </Typography>
        </Box>
      </Box>

      {/* Gap column — provides spacing between columns */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }} />

      {/* ═══ RIGHT COLUMN: score, chart, ways to improve, action tiles ═══ */}
      <Box sx={{ gridColumn: { md: '3 / 4' }, minWidth: 0 }}>
        {/* Retirement score card */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
            p: 2.5,
            mb: 3,
            backgroundColor: `${severity}.background`,
            color: `${severity}.main`,
            border: '1px solid',
            borderColor: `${severity}.border`,
            borderRadius: '0.75rem',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: `${severity}.dark`, mb: 0.5 }}>
              Retirement score
            </Typography>
            <Typography variant="small" sx={{ color: `${severity}.dark`, lineHeight: 1.6 }}>
              {onTrack
                ? 'This means your projected income meets or exceeds your goal. Adjust the inputs on the right to explore different scenarios.'
                : `Your projected income falls short of your goal by ${dollars(projection.targetIncome - projection.projectedIncome)} a year. Explore the options below to improve your projection.`}
            </Typography>
          </Box>
          <RetirementScore score={score} severity={severity} />
        </Box>

        {/* Chart */}
        <Box sx={{ mb: 4 }}>
          <ResultsCharts years={projection.years} targetIncome={projection.targetIncome} />
        </Box>

        {/* Ways to improve your projection */}
        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
          Ways to improve your projection
        </Typography>
        <Typography variant="body" color="text.secondary" sx={{ mb: 3 }}>
          Explore simple breakdowns on our website to learn how investing works.
        </Typography>

        <WaysToImprove
          state={state}
          onStateChange={onStateChange}
          projectedBalance={projection.projectedBalance}
          currentScore={score}
        />

        {/* Investment strategy summary (shows after completing the journey) */}
        <InvestmentStrategySummary projectedBalance={projection.projectedBalance} />
      </Box>

      {/* Actions — full width */}
      <Box sx={{ gridColumn: { md: '1 / -1' }, mt: 4 }}>
        <StepperActions
          step={2}
          nextLabel="Next"
          cancelLabel="Exit"
          exitDialogTitle="Exit the projection?"
          exitDialogDescription="This clears everything you've entered. You can come back and start again at any time."
          exitDialogConfirmLabel="Exit"
          onBack={onBack}
          onNext={onNext}
          onExit={onExit}
        />
      </Box>

      {/* Assumptions modal */}
      <Modal open={assumptionsOpen} onClose={() => setAssumptionsOpen(false)} title="Assumptions" size="large">
        <Typography variant="body" color="text.secondary" sx={{ mb: 3, lineHeight: 1.75 }}>
          This projection uses the following assumptions. All results are shown in today&rsquo;s dollars (adjusted for inflation).
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>Retirement</Typography>
        <Box sx={{ mb: 3 }}>
          <AssumptionRow
            label="Age you want your super to last to"
            value={`${ASSUMPTIONS.planningHorizonAge}`}
            info="We project your income to this age to ensure your savings last through retirement."
          />
          <AssumptionRow
            label="Default retirement age"
            value={`${ASSUMPTIONS.pensionEligibilityAge}`}
            info="Aligned to when you are eligible to apply for the Government Age Pension. If you are 67 or older, the default adjusts to your current age plus one."
          />
          <AssumptionRow
            label="Preservation age"
            value={`${ASSUMPTIONS.preservationAge}`}
            info="The earliest age you can access your super (for most people born after 1 July 1964)."
          />
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>Economic assumptions</Typography>
        <Box sx={{ mb: 3 }}>
          <AssumptionRow
            label="Expected price inflation per annum"
            value={`${(ASSUMPTIONS.inflation * 100).toFixed(1)}%`}
            info="Used to convert future dollar amounts to today's dollars and to index Age Pension thresholds. Based on the 2023 Intergenerational Report."
          />
          <AssumptionRow
            label="Expected salary growth per annum"
            value={`${(ASSUMPTIONS.salaryGrowth * 100).toFixed(1)}%`}
            info="Used to grow your salary, contribution caps, Age Pension payments, and retirement income targets each year. Also used as the deflator to show results in today's dollars."
          />
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>Super assumptions</Typography>
        <Box>
          <AssumptionRow
            label="Investment return (accumulation)"
            value={`${(ASSUMPTIONS.superReturnAccumulation * 100).toFixed(1)}%`}
            info="Expected nominal return per annum while you are still working and contributing to super."
          />
          <AssumptionRow
            label="Investment return (retirement)"
            value={`${(ASSUMPTIONS.superReturnRetirement * 100).toFixed(1)}%`}
            info="Expected nominal return per annum once you've retired and are drawing down from super."
          />
          <AssumptionRow
            label="Super Guarantee rate"
            value={`${ASSUMPTIONS.superGuaranteeRate}%`}
            info="The minimum percentage your employer must contribute to your super. Used as the default if you don't specify your employer's rate."
          />
          <AssumptionRow
            label="Contributions tax"
            value={`${(ASSUMPTIONS.contributionsTax * 100).toFixed(0)}%`}
            info="Tax applied to concessional (before-tax) contributions into super."
          />
        </Box>
      </Modal>
    </Box>
  );
}
