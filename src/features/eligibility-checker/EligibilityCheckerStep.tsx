import { useId, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { RadioGroup } from '@/components/RadioGroup';
import type { Answers, EligibilityAnswer, EligibilityOutcome, EligibilityQuestion, EligibilityStepConfig } from './types';

interface QuestionFieldProps {
  question: EligibilityQuestion;
  answers: Answers;
  onChange: (id: string, value: EligibilityAnswer) => void;
  showError?: boolean;
}

function QuestionField({ question, answers, onChange, showError }: QuestionFieldProps) {
  const labelId = useId();
  const value = answers[question.id] ?? '';
  const isEmpty = value === '';

  if (question.kind === 'checkbox') {
    return (
      <Box role="group" aria-labelledby={labelId}>
        <Typography
          id={labelId}
          variant="body"
          component="p"
          sx={{ fontWeight: 700, mb: question.helperText ? 0.25 : 1 }}
        >
          {question.text}
        </Typography>
        <Checkbox
          label={question.checkboxLabel ?? ''}
          checked={value === 'yes'}
          helperText={question.helperText}
          helperTextPosition="top"
          error={showError && isEmpty}
          errorMessage={showError && isEmpty ? 'This question is required.' : undefined}
          onChange={(checked) => onChange(question.id, checked ? 'yes' : '')}
        />
      </Box>
    );
  }

  return (
    <RadioGroup
      legend={question.text}
      helperText={question.helperText}
      helperTextPosition="top"
      value={value}
      options={question.options ?? []}
      direction={question.direction ?? 'row'}
      error={showError && isEmpty}
      errorMessage={showError && isEmpty ? 'This question is required.' : undefined}
      onChange={(v) => onChange(question.id, v as EligibilityAnswer)}
    />
  );
}

export interface EligibilityCheckerStepProps {
  step: EligibilityStepConfig;
  answers: Answers;
  outcome: EligibilityOutcome;
  onChange: (id: string, value: EligibilityAnswer) => void;
  onForward: () => void;
  onBack?: () => void;
}

export function EligibilityCheckerStep({ step, answers, outcome, onChange, onForward, onBack }: EligibilityCheckerStepProps) {
  const primaryAnswer = answers[step.question.id] ?? '';
  const activeConditional = step.conditionals?.find((c) => c.whenAnswer === primaryAnswer);
  const conditionalAnswer = activeConditional ? (answers[activeConditional.question.id] ?? '') : null;
  const canAdvance = outcome === 'eligible' || outcome === 'warning';
  const isBlocked = outcome === 'ineligible';
  const [attempted, setAttempted] = useState(false);

  function handleChange(id: string, value: EligibilityAnswer) {
    // Reset validation state when the primary question is re-answered so the
    // newly-revealed conditional doesn't inherit the error immediately.
    if (id === step.question.id) setAttempted(false);
    onChange(id, value);
  }

  const primaryMissing = attempted && primaryAnswer === '';
  const conditionalMissing = attempted && activeConditional !== undefined && conditionalAnswer === '';

  function handleNext() {
    if (!canAdvance) {
      setAttempted(true);
      return;
    }
    onForward();
  }

  return (
    <Stack spacing={3}>
      <QuestionField question={step.question} answers={answers} onChange={handleChange} showError={primaryMissing} />

      {activeConditional && (
        <Box sx={{ pt: 1 }}>
          <QuestionField question={activeConditional.question} answers={answers} onChange={handleChange} showError={conditionalMissing} />
        </Box>
      )}

      {outcome === 'ineligible' && step.ineligibleMessage && (
        <Alert severity="error" message={step.ineligibleMessage} />
      )}

      {outcome === 'warning' && step.warningMessage && (
        <Alert severity="warning" message={step.warningMessage} />
      )}

      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {onBack && (
          <Button label="Back" variant="outlined" condensed onClick={onBack} />
        )}
        <Button label="Next" variant="contained" condensed disabled={isBlocked} onClick={handleNext} />
      </Box>
    </Stack>
  );
}
