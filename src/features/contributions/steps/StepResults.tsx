'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '../../../components/Alert';
import type { ContributionsResult, AdviserTrigger } from '../types';
import { NON_CONCESSIONAL_CAP } from '../constants';

interface StepResultsProps {
  result: ContributionsResult;
}

function formatMoney(value: number): string {
  return `$${Math.round(value).toLocaleString()}`;
}

function formatMoneyPerFortnight(annual: number): string {
  return `$${Math.round(annual / 26).toLocaleString()}/fn`;
}

function getTriggerMessage(trigger: AdviserTrigger): string {
  switch (trigger) {
    case 'exceeded-concessional':
      return 'Your concessional contributions appear to exceed the annual cap. Excess contributions will be taxed at your marginal rate.';
    case 'exceeded-non-concessional':
      return 'Your non-concessional contributions appear to exceed the annual cap. Excess may attract additional tax.';
    case 'carry-forward-available':
      return 'You may have unused carry-forward cap amounts available. A financial adviser can help you calculate the exact amount.';
    case 'bring-forward-eligible':
      return 'You may be eligible to use the bring-forward rule for non-concessional contributions (up to 3 years in advance).';
    case 'division-293':
      return 'Division 293 tax may apply — an additional 15% tax on concessional contributions for high-income earners.';
    case 'high-balance':
      return 'Your super balance is approaching the transfer balance cap. Specific rules may limit further contributions.';
  }
}

/** Label + value row used in the breakdown cards. */
function BreakdownRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', py: 1.5, '&:not(:last-child)': { borderBottom: '1px solid', borderColor: 'divider' }, '&:last-child': { pb: 0 } }}>
      <Typography variant="small" color="text.muted">{label}</Typography>
      <Typography variant="small" sx={{ fontWeight: 600, ...(highlight === true && { color: 'success.main' }), ...(highlight === false && { color: 'error.main' }) }}>{value}</Typography>
    </Box>
  );
}

export function StepResults({ result }: StepResultsProps) {
  const { capAnalysis, taxComparison, projection, triggers } = result;
  const hasAdviserTriggers = triggers.length > 0;
  const finalProjection = projection[projection.length - 1];
  const balanceDifference = finalProjection
    ? finalProjection.recommendedBalance - finalProjection.currentBalance
    : 0;

  const hasSavings = taxComparison.additionalToSuper > 0;
  const savingsPercent = hasSavings
    ? Math.round((taxComparison.taxSavings / (taxComparison.currentIncomeTax + taxComparison.currentMedicare)) * 100)
    : 0;

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
      {/* ═══ LEFT COLUMN: title, hero stat, cap breakdowns ═══ */}
      <Box sx={{ gridColumn: { md: '1 / 2' } }}>
        <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
          Your contribution recommendation
        </Typography>
        <Typography variant="body" color="text.muted" sx={{ mb: 4, lineHeight: 1.75 }}>
          {hasSavings
            ? 'Based on what you told us, optimising your contributions could save you tax and grow your retirement balance faster.'
            : 'Based on your inputs, no additional contributions have been recommended. You may already be contributing close to the cap, or no additional budget was specified.'}
        </Typography>

        {/* Adviser trigger warning */}
        {hasAdviserTriggers && (
          <Box sx={{ mb: 3 }}>
            <Alert severity="warning" title="Consider speaking with a financial adviser" message={
              <Box component="ul" sx={{ pl: 2, m: 0, '& li': { mb: 0.5 } }}>
                {triggers.map((trigger) => (
                  <li key={trigger}>
                    <Typography variant="small">{getTriggerMessage(trigger)}</Typography>
                  </li>
                ))}
              </Box>
            } />
          </Box>
        )}

        {/* Cap breakdowns card */}
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            mb: 3,
          }}
        >
          {/* Concessional cap */}
          <Box sx={{ p: '1rem' }}>
            <Typography variant="small" sx={{ color: 'secondary.main', fontWeight: 700, mb: 1.5 }}>Concessional cap</Typography>
            <BreakdownRow label="Annual cap" value={formatMoney(capAnalysis.effectiveConcessionalCap)} />
            <BreakdownRow label="Current contributions" value={formatMoney(capAnalysis.currentConcessional)} highlight={!capAnalysis.concessionalExceeded} />
            <BreakdownRow
              label="Remaining"
              value={formatMoney(capAnalysis.concessionalRemaining)}
              highlight={capAnalysis.concessionalRemaining > 0}
            />
          </Box>

          {/* Non-concessional cap */}
          <Box sx={{ p: '1rem', borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="small" sx={{ color: 'secondary.main', fontWeight: 700, mb: 1.5 }}>Non-concessional cap</Typography>
            <BreakdownRow label="Annual cap" value={formatMoney(NON_CONCESSIONAL_CAP)} />
            <BreakdownRow label="Current contributions" value={formatMoney(capAnalysis.currentNonConcessional)} highlight={!capAnalysis.nonConcessionalExceeded} />
            <BreakdownRow
              label="Remaining"
              value={formatMoney(capAnalysis.nonConcessionalRemaining)}
              highlight={capAnalysis.nonConcessionalRemaining > 0}
            />
          </Box>
        </Box>

        {capAnalysis.carryForwardAvailable > 0 && (
          <Typography variant="caption" color="text.muted" sx={{ mb: 3, display: 'block' }}>
            Includes {formatMoney(capAnalysis.carryForwardAvailable)} carry-forward from previous years.
          </Typography>
        )}

        {/* How to contribute */}
        {hasSavings && (
          <Box
            sx={{
              p: 3,
              borderRadius: '0.75rem',
              backgroundColor: 'background.default',
            }}
          >
            <Typography variant="h6" component="h3" sx={{ mb: 1.5 }}>
              How to contribute
            </Typography>
            <Stack spacing={1}>
              {taxComparison.recommendedSalarySacrifice > 0 && (
                <BreakdownRow
                  label="Salary sacrifice"
                  value={`${formatMoney(taxComparison.recommendedSalarySacrifice)} /yr (${formatMoneyPerFortnight(taxComparison.recommendedSalarySacrifice)})`}
                />
              )}
              {taxComparison.recommendedPersonalDeductible > 0 && (
                <BreakdownRow
                  label="Personal deductible"
                  value={`${formatMoney(taxComparison.recommendedPersonalDeductible)} /yr`}
                />
              )}
              {taxComparison.recommendedAfterTax > 0 && (
                <BreakdownRow
                  label="After-tax"
                  value={`${formatMoney(taxComparison.recommendedAfterTax)} /yr (${formatMoneyPerFortnight(taxComparison.recommendedAfterTax)})`}
                />
              )}
            </Stack>
          </Box>
        )}
      </Box>

      {/* Gap column — provides spacing between columns */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }} />

      {/* ═══ RIGHT COLUMN: hero savings card, tax comparison, projection ═══ */}
      <Box sx={{ gridColumn: { md: '3 / 4' }, minWidth: 0 }}>
        {/* Hero savings card */}
        {hasSavings && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              p: 2.5,
              mb: 3,
              backgroundColor: 'success.background',
              color: 'success.main',
              border: '1px solid',
              borderColor: 'success.border',
              borderRadius: '0.75rem',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ color: 'success.dark', mb: 0.5 }}>
                Tax savings
              </Typography>
              <Typography variant="small" sx={{ color: 'success.dark', lineHeight: 1.6 }}>
                By optimising your contributions you could save {formatMoney(taxComparison.taxSavings)} in tax each year
                {balanceDifference > 0 && ` and retire with an extra ${formatMoney(balanceDifference)} in super`}.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <Typography variant="h3" component="span" sx={{ color: 'success.dark', fontWeight: 700 }}>
                {savingsPercent}%
              </Typography>
              <Typography variant="caption" sx={{ color: 'success.dark' }}>less tax</Typography>
            </Box>
          </Box>
        )}

        {!hasSavings && (
          <Box
            sx={{
              p: 2.5,
              mb: 3,
              backgroundColor: 'info.background',
              border: '1px solid',
              borderColor: 'info.border',
              borderRadius: '0.75rem',
            }}
          >
            <Typography variant="h6" sx={{ color: 'info.dark', mb: 0.5 }}>
              You&rsquo;re in good shape
            </Typography>
            <Typography variant="small" sx={{ color: 'info.dark', lineHeight: 1.6 }}>
              Your current contributions are well-positioned. No additional changes are recommended at this time.
            </Typography>
          </Box>
        )}

        {/* Tax comparison table */}
        {hasSavings && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
              Tax comparison
            </Typography>
            <Box sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: '0.75rem', overflow: 'hidden' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                {/* Current column */}
                <Box sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="small" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 2, display: 'block' }}>
                    Current
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box>
                      <Typography variant="caption" color="text.muted">Taxable income</Typography>
                      <Typography variant="body" sx={{ fontWeight: 600 }}>{formatMoney(taxComparison.currentTaxableIncome)}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.muted">Tax + Medicare</Typography>
                      <Typography variant="body" sx={{ fontWeight: 600 }}>{formatMoney(taxComparison.currentIncomeTax + taxComparison.currentMedicare)}</Typography>
                    </Box>
                    <Box sx={{ pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" color="text.muted">Take-home pay</Typography>
                      <Typography variant="h6" component="p">{formatMoney(taxComparison.currentTakeHome)}</Typography>
                      <Typography variant="caption" color="text.muted">{formatMoneyPerFortnight(taxComparison.currentTakeHome)} fortnightly</Typography>
                    </Box>
                  </Stack>
                </Box>

                {/* Recommended column */}
                <Box sx={{ p: 2 }}>
                  <Typography variant="small" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'success.main', mb: 2, display: 'block' }}>
                    Recommended
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box>
                      <Typography variant="caption" color="text.muted">Taxable income</Typography>
                      <Typography variant="body" sx={{ fontWeight: 600 }}>{formatMoney(taxComparison.newTaxableIncome)}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.muted">Tax + Medicare</Typography>
                      <Typography variant="body" sx={{ fontWeight: 600 }}>{formatMoney(taxComparison.newIncomeTax + taxComparison.newMedicare)}</Typography>
                    </Box>
                    <Box sx={{ pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" color="text.muted">Take-home pay</Typography>
                      <Typography variant="h6" component="p" sx={{ color: 'success.main' }}>{formatMoney(taxComparison.newTakeHome)}</Typography>
                      <Typography variant="caption" color="text.muted">{formatMoneyPerFortnight(taxComparison.newTakeHome)} fortnightly</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>

              {/* Savings strip */}
              <Box sx={{ p: 2, bgcolor: 'success.background', borderTop: '1px solid', borderColor: 'success.border' }}>
                <Stack direction="row" spacing={4} sx={{ flexWrap: 'wrap' }}>
                  <Box>
                    <Typography variant="caption" color="text.muted">Annual tax saving</Typography>
                    <Typography variant="h6" component="p" sx={{ color: 'success.dark' }}>
                      {formatMoney(taxComparison.taxSavings)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.muted">Additional to super</Typography>
                    <Typography variant="h6" component="p" sx={{ color: 'success.dark' }}>
                      {formatMoney(taxComparison.additionalToSuper)} /yr
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Box>
        )}

        {/* Balance projection */}
        {finalProjection && balanceDifference > 0 && (
          <Box>
            <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
              Balance at retirement
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <Box sx={{ p: 2.5, border: '1px solid', borderColor: 'border.default', borderRadius: '0.75rem' }}>
                <Typography variant="caption" color="text.muted">Current path</Typography>
                <Typography variant="h4" component="p" sx={{ mt: 0.5 }}>
                  {formatMoney(finalProjection.currentBalance)}
                </Typography>
                <Typography variant="small" color="text.muted">
                  at age {finalProjection.age}
                </Typography>
              </Box>
              <Box sx={{ p: 2.5, border: '1px solid', borderColor: 'success.border', borderRadius: '0.75rem', bgcolor: 'success.background' }}>
                <Typography variant="caption" sx={{ color: 'success.dark' }}>Recommended path</Typography>
                <Typography variant="h4" component="p" sx={{ color: 'success.dark', mt: 0.5 }}>
                  {formatMoney(finalProjection.recommendedBalance)}
                </Typography>
                <Typography variant="small" sx={{ color: 'success.dark' }}>
                  at age {finalProjection.age} (+{formatMoney(balanceDifference)})
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.muted" sx={{ mt: 2, display: 'block', lineHeight: 1.6 }}>
              Projection assumes 7.5% p.a. investment return (before tax), 3% salary growth, and 2.5% inflation.
              Actual results will vary.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
