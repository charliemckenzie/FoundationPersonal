import { useId } from 'react';
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
}

function QuestionField({ question, answers, onChange }: QuestionFieldProps) {
  const labelId = useId();
  const value = answers[question.id] ?? '';

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
      onChange={(v) => onChange(question.id, v as EligibilityAnswer)}
    />
  );
}

export interface EligibilityCheckerStepProps {
  step: EligibilityStepConfig;
  answers: Answers;
  outcome: EligibilityOutcome;
  onChange: (id: string, value: EligibilityAnswer) => void;
  onForward?: () => void;
}

export function EligibilityCheckerStep({ step, answers, outcome, onChange, onForward }: EligibilityCheckerStepProps) {
  const primaryAnswer = answers[step.question.id] ?? '';
  const activeConditional = step.conditionals?.find((c) => c.whenAnswer === primaryAnswer);

  return (
    <Stack spacing={3}>
      <QuestionField question={step.question} answers={answers} onChange={onChange} />

      {activeConditional && (
        <Box sx={{ pt: 1 }}>
          <QuestionField question={activeConditional.question} answers={answers} onChange={onChange} />
        </Box>
      )}

      {outcome === 'ineligible' && step.ineligibleMessage && (
        <Alert severity="error" message={step.ineligibleMessage} />
      )}

      {outcome === 'warning' && step.warningMessage && (
        <>
          <Alert severity="warning" message={step.warningMessage} />
          {onForward && (
            <Box>
              <Button label="Next" variant="contained" condensed onClick={onForward} />
            </Box>
          )}
        </>
      )}

      {outcome === 'eligible' && onForward && (
        <Box>
          <Button label="Next" variant="contained" condensed onClick={onForward} />
        </Box>
      )}
    </Stack>
  );
}
