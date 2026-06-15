'use client';

import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { RadioGroup } from '../../components/RadioGroup';
import { TextField } from '../../components/TextField';
import { MoneyField } from '../../components/MoneyField';
import { ContributionsSummary } from './ContributionsSummary';
import { TransitionToRetirementSummary } from './TransitionToRetirementSummary';
import { computeProjection } from './projection';
import type { LifestyleOption, RetirementProjectionState } from './types';
import { LIFESTYLE_TARGETS } from './constants';

function dollars(value: number): string {
  return `$${value.toLocaleString('en-AU', { maximumFractionDigits: 0 })}`;
}

function getLifestyleLabel(lifestyle: LifestyleOption | null, couple: boolean, customTarget: string): string {
  if (lifestyle === 'modest') return `Modest (${dollars(couple ? LIFESTYLE_TARGETS.modest.couple : LIFESTYLE_TARGETS.modest.single)} p.a.)`;
  if (lifestyle === 'comfortable') return `Comfortable (${dollars(couple ? LIFESTYLE_TARGETS.comfortable.couple : LIFESTYLE_TARGETS.comfortable.single)} p.a.)`;
  if (lifestyle === 'custom' && customTarget) return `Custom (${dollars(Number(customTarget))} p.a.)`;
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
  const [savedAge, setSavedAge] = useState('');
  const [savedLifestyle, setSavedLifestyle] = useState<string>('');

  const couple = state.includePartner === 'yes';

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
    setSavedAge(localAge);
    setSavedLifestyle(incomeTarget);
    onStateChange(updates);
    setTileState('saved');
  }

  function handleUndo() {
    // Revert to original values before this tile was used
    onStateChange({
      retirementAge: savedAge !== state.retirementAge ? state.retirementAge : undefined,
      lifestyle: savedLifestyle !== state.lifestyle ? state.lifestyle : undefined,
    });
    setTileState('default');
  }

  // Default state — collapsed tile showing current values
  if (tileState === 'default') {
    return (
      <Box
        onClick={handleOpen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2.5,
          borderRadius: '0.75rem',
          border: '1px dashed',
          borderColor: 'border.default',
          cursor: 'pointer',
          '&:hover': { borderColor: 'primary.main', backgroundColor: 'grey.50' },
        }}
      >
        <Box component="img" src="/images/profile.svg" alt="" sx={{ width: '2rem', height: '2rem', flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="body" sx={{ fontWeight: 700, mb: 0.5 }}>Change your retirement age or target income</Typography>
          <Typography variant="small" color="text.secondary">
            Adjusting your retirement age or income goal can significantly change your projected outcome.
          </Typography>
        </Box>
        <Icon icon="pen-to-square" size="lg" color="primary" />
      </Box>
    );
  }

  // Editing state — expanded form with live preview
  if (tileState === 'editing') {
    const scoreDiff = previewScore !== null ? previewScore - currentScore : 0;

    return (
      <Box
        sx={{
          borderRadius: '0.75rem',
          border: '1px solid',
          borderColor: 'primary.main',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 2.5 }}>
          <Typography variant="body" sx={{ fontWeight: 700, mb: 0.5 }}>
            Change your retirement age or target income
          </Typography>
          <Typography variant="small" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
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
                { value: 'modest', label: 'Modest', description: `${dollars(couple ? LIFESTYLE_TARGETS.modest.couple : LIFESTYLE_TARGETS.modest.single)} per year` },
                { value: 'comfortable', label: 'Comfortable', description: `${dollars(couple ? LIFESTYLE_TARGETS.comfortable.couple : LIFESTYLE_TARGETS.comfortable.single)} per year` },
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
    <Box
      sx={{
        borderRadius: '0.75rem',
        border: '1px solid',
        borderColor: 'success.border',
        overflow: 'hidden',
      }}
    >
      {/* Green header */}
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
        <Typography variant="body" sx={{ fontWeight: 700, color: 'success.dark' }}>
          Retirement Goal updated
        </Typography>
      </Box>

      {/* White body */}
      <Box sx={{ px: 2.5, py: 2, backgroundColor: 'background.paper' }}>
        <Stack spacing={0} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="small" sx={{ fontWeight: 500 }}>Retirement age</Typography>
            <Typography variant="small" sx={{ fontWeight: 700 }}>{state.retirementAge}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
            <Typography variant="small" sx={{ fontWeight: 500 }}>Target income</Typography>
            <Typography variant="small" sx={{ fontWeight: 700 }}>{getLifestyleLabel(state.lifestyle, couple, state.customTarget)}</Typography>
          </Box>
        </Stack>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button label="Edit" size="small" variant="outlined" onClick={handleOpen} />
          <Button label="Undo" size="small" variant="ghost" onClick={handleUndo} />
        </Box>
      </Box>
    </Box>
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
      <RetirementGoalTile
        state={state}
        onStateChange={onStateChange}
        currentScore={currentScore}
      />

      <ContributionsSummary projectedBalance={projectedBalance} />
      <TransitionToRetirementSummary retirementAge={state.retirementAge} />
    </Stack>
  );
}
