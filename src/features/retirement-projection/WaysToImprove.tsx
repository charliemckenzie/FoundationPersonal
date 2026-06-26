'use client';

import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../components/Button';
import { RadioGroup } from '../../components/RadioGroup';
import { TextField } from '../../components/TextField';
import { MoneyField } from '../../components/MoneyField';
import { ContributionsSummary } from './ContributionsSummary';
import { TransitionToRetirementSummary } from './TransitionToRetirementSummary';
import { JourneyTile } from './JourneyTile';
import { SuccessSummaryCard, SummaryRow } from './SuccessSummaryCard';
import { computeProjection } from './projection';
import { formatCurrency } from './format';
import type { LifestyleOption, RetirementProjectionState } from './types';
import { LIFESTYLE_TARGETS, getModestTarget } from './constants';

function getLifestyleLabel(lifestyle: LifestyleOption, couple: boolean, homeowner: boolean, customTarget: string): string {
  if (lifestyle === 'modest') return `Modest (${formatCurrency(getModestTarget(couple, homeowner))} p.a.)`;
  if (lifestyle === 'comfortable') return `Comfortable (${formatCurrency(couple ? LIFESTYLE_TARGETS.comfortable.couple : LIFESTYLE_TARGETS.comfortable.single)} p.a.)`;
  if (lifestyle === 'custom' && customTarget) return `Custom (${formatCurrency(Number(customTarget))} p.a.)`;
  return 'Not set';
}

type TileState = 'default' | 'editing' | 'saved';

interface RetirementGoalTileProps {
  state: RetirementProjectionState;
  onStateChange: (updates: Partial<RetirementProjectionState>) => void;
  currentScore: number;
}

function RetirementGoalTile({ state, onStateChange, currentScore }: RetirementGoalTileProps) {
  const [tileState, setTileState] = useState<TileState>('default');
  const [localAge, setLocalAge] = useState(state.retirementAge);
  const [incomeTarget, setIncomeTarget] = useState<string>(state.lifestyle ?? '');
  const [localCustom, setLocalCustom] = useState(state.customTarget);
  // Pre-change snapshot captured at save time so Undo can restore the originals.
  const [original, setOriginal] = useState<Pick<
    RetirementProjectionState,
    'retirementAge' | 'lifestyle' | 'customTarget'
  > | null>(null);

  const couple = state.includePartner === 'yes';
  const homeowner = state.ownHome === 'yes';

  // Live preview: compute score with the draft values
  const previewScore = useMemo(() => {
    if (tileState !== 'editing') return null;
    const draftState: RetirementProjectionState = {
      ...state,
      retirementAge: localAge || state.retirementAge,
      lifestyle: (incomeTarget || state.lifestyle) as LifestyleOption,
      customTarget: incomeTarget === 'custom' ? localCustom : state.customTarget,
    };
    const projection = computeProjection(draftState);
    const onTrack = projection.projectedIncome >= projection.targetIncome;
    return onTrack ? 100 : Math.max(0, Math.round((projection.projectedIncome / projection.targetIncome) * 100));
  }, [tileState, localAge, incomeTarget, localCustom, state]);

  function handleOpen() {
    setLocalAge(state.retirementAge);
    setIncomeTarget(state.lifestyle ?? '');
    setLocalCustom(state.customTarget);
    setTileState('editing');
  }

  function handleSave() {
    const updates: Partial<RetirementProjectionState> = {};
    if (localAge && localAge !== state.retirementAge) {
      updates.retirementAge = localAge;
    }
    if (incomeTarget && incomeTarget !== state.lifestyle) {
      updates.lifestyle = incomeTarget as LifestyleOption;
    }
    if (incomeTarget === 'custom' && localCustom) {
      updates.customTarget = localCustom;
    }
    // Snapshot the values as they are *before* applying, so Undo can restore them.
    setOriginal({
      retirementAge: state.retirementAge,
      lifestyle: state.lifestyle,
      customTarget: state.customTarget,
    });
    onStateChange(updates);
    setTileState('saved');
  }

  function handleUndo() {
    if (original) {
      onStateChange(original);
    }
    setOriginal(null);
    setTileState('default');
  }

  if (tileState === 'default') {
    return (
      <JourneyTile
        image="/images/profile.svg"
        icon="pen-to-square"
        title="Change your retirement age or target income"
        description="Adjusting your retirement age or income goal can significantly change your projected outcome."
        onActivate={handleOpen}
      />
    );
  }

  if (tileState === 'editing') {
    const scoreDiff = previewScore !== null ? previewScore - currentScore : 0;

    return (
      <Box sx={{ borderRadius: '0.75rem', border: '1px solid', borderColor: 'primary.main', overflow: 'hidden' }}>
        <Box sx={{ p: 2.5 }}>
          <Typography variant="h6" component="p" sx={{ mb: 0.5 }}>
            Change your retirement age or target income
          </Typography>
          <Typography variant="small" color="text.muted" sx={{ mb: 3, lineHeight: 1.6 }}>
            Adjust the values below to see how they affect your retirement score in real time.
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="What age would you like to retire?"
              placeholder="Enter age in years"
              value={localAge}
              onChange={(e) => setLocalAge(e.target.value)}
              htmlInputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
            <RadioGroup
              legend="Target retirement income"
              variant="boxed"
              direction="column"
              options={[
                { value: 'modest', label: 'Modest', description: `${formatCurrency(getModestTarget(couple, homeowner))} per year` },
                { value: 'comfortable', label: 'Comfortable', description: `${formatCurrency(couple ? LIFESTYLE_TARGETS.comfortable.couple : LIFESTYLE_TARGETS.comfortable.single)} per year` },
                { value: 'custom', label: 'Custom amount', description: 'Set your own target income' },
              ]}
              value={incomeTarget}
              onChange={setIncomeTarget}
            />
            {incomeTarget === 'custom' && (
              <MoneyField
                label="Custom yearly income target"
                placeholder="Enter dollar amount"
                value={localCustom ? Number(localCustom) : null}
                onChange={(val) => setLocalCustom(val?.toString() ?? '')}
              />
            )}
          </Stack>

          {/* Live impact preview */}
          {previewScore !== null && scoreDiff !== 0 && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: '0.5rem',
                backgroundColor: scoreDiff > 0 ? 'success.background' : 'warning.background',
                border: '1px solid',
                borderColor: scoreDiff > 0 ? 'success.border' : 'warning.border',
              }}
            >
              <Typography variant="small" sx={{ fontWeight: 600, color: scoreDiff > 0 ? 'success.dark' : 'warning.dark' }}>
                Score: {currentScore}% → {previewScore}% ({scoreDiff > 0 ? '+' : ''}{scoreDiff}%)
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
            <Button label="Save changes" size="small" onClick={handleSave} />
            <Button label="Cancel" size="small" variant="ghost" onClick={() => setTileState('default')} />
          </Box>
        </Box>
      </Box>
    );
  }

  // Saved state — success summary
  return (
    <SuccessSummaryCard
      title="Retirement goal updated"
      actions={
        <>
          <Button label="Edit" size="small" variant="outlined" onClick={handleOpen} />
          <Button label="Undo" size="small" variant="ghost" onClick={handleUndo} />
        </>
      }
    >
      <Box sx={{ mb: 2 }}>
        <SummaryRow label="Retirement age" value={state.retirementAge} />
        <SummaryRow label="Target income" value={getLifestyleLabel(state.lifestyle, couple, homeowner, state.customTarget)} divider={false} />
      </Box>
    </SuccessSummaryCard>
  );
}

interface WaysToImproveProps {
  state: RetirementProjectionState;
  onStateChange: (updates: Partial<RetirementProjectionState>) => void;
  projectedBalance: number;
  currentScore: number;
}

export function WaysToImprove({ state, onStateChange, projectedBalance, currentScore }: WaysToImproveProps) {
  return (
    <Stack spacing={2}>
      <RetirementGoalTile state={state} onStateChange={onStateChange} currentScore={currentScore} />
      <ContributionsSummary projectedBalance={projectedBalance} />
      <TransitionToRetirementSummary retirementAge={state.retirementAge} />
    </Stack>
  );
}
