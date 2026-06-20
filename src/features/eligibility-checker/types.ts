import type { ReactNode } from 'react';

/** A single answer. Radio questions use `'yes' | 'no'`; checkbox questions map ticked → `'yes'`, unticked → `''`. */
export type EligibilityAnswer = 'yes' | 'no' | '';

/** Per-step outcome derived from the current answers. */
export type EligibilityOutcome = 'eligible' | 'ineligible' | 'warning' | 'pending';

/** All answers across the flow, keyed by question id. */
export type Answers = Record<string, EligibilityAnswer>;

export interface EligibilityOption {
  value: string;
  label: string;
}

export interface EligibilityQuestion {
  /** Unique key this question's answer is stored under in `Answers`. */
  id: string;
  /** Bold field label / legend text shown above the control. */
  text: string;
  /** Optional descriptive guidance rendered between the label and the control. */
  helperText?: ReactNode;
  /** Control type. Conditional follow-ups are always `'radio'`. */
  kind: 'radio' | 'checkbox';
  /** Layout direction for `kind: 'radio'`. Defaults to `'row'`. */
  direction?: 'row' | 'column';
  /** Options for `kind: 'radio'`. */
  options?: EligibilityOption[];
  /** Label shown beside the box for `kind: 'checkbox'`. */
  checkboxLabel?: string;
}

export interface ConditionalQuestion {
  /** Show this follow-up only when the primary question's answer matches. */
  whenAnswer: 'yes' | 'no';
  question: EligibilityQuestion;
}

export interface EligibilityStepConfig {
  id: string;
  question: EligibilityQuestion;
  /** Follow-up questions keyed to the primary answer; the matching one is shown. */
  conditionals?: ConditionalQuestion[];
  /** Derives this step's outcome from the full answer set. */
  getOutcome: (answers: Answers) => EligibilityOutcome;
  /** Shown in an error Alert when the outcome is `'ineligible'`. */
  ineligibleMessage?: string;
  /** Shown in a warning Alert when the outcome is `'warning'` (advisory — does not block). */
  warningMessage?: string;
  /** Shown on the success screen checklist when this step's outcome was `'warning'`. */
  eligibleWarningNote?: string;
}

export interface EligibilityCheckerConfig {
  steps: EligibilityStepConfig[];
  eligibleTitle: string;
  /** Items shown as a sequential-fade checklist on the success view. */
  eligibleChecklist: string[];
}
