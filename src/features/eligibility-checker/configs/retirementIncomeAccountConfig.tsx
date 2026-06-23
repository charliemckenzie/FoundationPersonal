import MuiLink from '@mui/material/Link';
import type { EligibilityCheckerConfig, EligibilityOption } from '../types';

const YES_NO: EligibilityOption[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

/**
 * Retirement Income Account eligibility pre-gate.
 *
 * 1. Minimum starting balance — radio yes/no (yes → eligible, no → ineligible).
 * 2. Tax deduction — radio with two follow-up branches (claimed → processed?,
 *    not claimed → intend to?). An unprocessed claim blocks; an intention to
 *    claim is advisory (warning, but the member may continue).
 * 3. Retirement status — radio, with a "left an employer after 60" fallback.
 */
export const retirementIncomeAccountConfig: EligibilityCheckerConfig = {
  eligibleTitle: "You're eligible to apply for a Retirement Income account",
  eligibleChecklist: [
    'Minimum starting balance',
    'Tax deduction consideration',
    'Retirement requirements',
  ],
  steps: [
    {
      id: 'transfer',
      question: {
        id: 'transfer',
        text: 'Minimum starting balance',
        kind: 'radio',
        direction: 'column',
        helperText: 'To open a Retirement Income account you need a starting balance greater than $0.',
        options: [
          { value: 'yes', label: "Yes, I'll be transferring more than $0" },
          { value: 'no', label: "No, I won't be" },
        ],
      },
      getOutcome: (answers) => {
        if (answers.transfer === 'yes') return 'eligible';
        if (answers.transfer === 'no') return 'ineligible';
        return 'pending';
      },
      ineligibleMessage: <>You cannot open a Retirement Income account without a starting balance greater than $0. Please <MuiLink href="#" sx={{ color: 'error.main' }}>contact us</MuiLink> if you need help.</>,
    },
    {
      id: 'taxDeduction',
      question: {
        id: 'taxDeduction',
        text: 'Have you claimed a tax deduction on voluntary contributions this or last financial year?',
        helperText: 'You would have submitted a Notice of Intent to claim form.',
        kind: 'radio',
        options: YES_NO,
      },
      conditionals: [
        {
          whenAnswer: 'yes',
          question: {
            id: 'taxDeductionProcessed',
            text: "Have you received confirmation it's been processed?",
            kind: 'radio',
            options: YES_NO,
          },
        },
        {
          whenAnswer: 'no',
          question: {
            id: 'taxDeductionIntends',
            text: 'Do you intend to?',
            kind: 'radio',
            options: YES_NO,
          },
        },
      ],
      getOutcome: (answers) => {
        const primary = answers.taxDeduction;
        if (primary === 'yes') {
          if (answers.taxDeductionProcessed === 'yes') return 'eligible';
          if (answers.taxDeductionProcessed === 'no') return 'warning';
          return 'pending';
        }
        if (primary === 'no') {
          if (answers.taxDeductionIntends === 'yes') return 'warning';
          if (answers.taxDeductionIntends === 'no') return 'eligible';
          return 'pending';
        }
        return 'pending';
      },
      warningMessage: (
        <>If you claimed a tax deduction on voluntary contributions in the current or last financial year, you must have confirmation it has been processed. Without it, we cannot process your notice of deduction. We recommend completing this before submitting your application. Please <MuiLink href="#">contact us</MuiLink> if you need help.</>
      ),
      eligibleWarningNote:
        'While you can proceed with this application, we recommend finalising any outstanding voluntary tax deduction issues to avoid processing delays.',
    },
    {
      id: 'retiredFromWork',
      question: {
        id: 'retiredFromWork',
        text: 'Have you permanently retired from work?',
        helperText: (
          <>
            This means you were in paid employment for at least 10 hours a week and now you do not intend to work 10 or
            more hours in any given future week.
          </>
        ),
        kind: 'radio',
        options: YES_NO,
      },
      conditionals: [
        {
          whenAnswer: 'no',
          question: {
            id: 'leftEmployerAfter60',
            text: 'Have you left an employer on or after turning 60?',
            kind: 'radio',
            options: YES_NO,
          },
        },
      ],
      getOutcome: (answers) => {
        if (answers.retiredFromWork === 'yes') return 'eligible';
        if (answers.retiredFromWork === 'no') {
          if (answers.leftEmployerAfter60 === 'yes') return 'eligible';
          if (answers.leftEmployerAfter60 === 'no') return 'ineligible';
          return 'pending';
        }
        return 'pending';
      },
      ineligibleMessage:
        'You are not eligible for this account yet. To open a Retirement Income account, you will need to be permanently retired or have left an employer on or after turning 60.',
    },
  ],
};
