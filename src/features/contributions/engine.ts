import type {
  ContributionsState,
  CapAnalysis,
  TaxComparison,
  ProjectionYear,
  ContributionsResult,
  AdviserTrigger,
} from './types';
import {
  SG_RATE,
  CONCESSIONAL_CAP,
  NON_CONCESSIONAL_CAP,
  CARRY_FORWARD_BALANCE_THRESHOLD,
  DIVISION_293_THRESHOLD,
  CONTRIBUTIONS_TAX_RATE,
  EARNINGS_TAX_RATE,
  TAX_BRACKETS,
  MEDICARE_LEVY_RATE,
  DEFAULT_INVESTMENT_RETURN,
  DEFAULT_SALARY_GROWTH,
  annualise,
} from './constants';

// ─── Tax Calculation ────────────────────────────────────────────────────────

function calculateIncomeTax(taxableIncome: number): number {
  let tax = 0;
  for (const bracket of TAX_BRACKETS) {
    if (taxableIncome <= bracket.min) break;
    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min + (bracket.min === 0 ? 0 : 1);
    // Correct calculation: tax from min to min of (income, max)
    const lower = bracket.min === 0 ? 0 : bracket.min;
    const upper = Math.min(taxableIncome, bracket.max);
    if (upper > lower) {
      tax += (upper - lower) * bracket.rate;
    }
  }
  return Math.max(0, tax);
}

function calculateMedicare(taxableIncome: number): number {
  return Math.max(0, taxableIncome * MEDICARE_LEVY_RATE);
}

// ─── Cap Analysis ───────────────────────────────────────────────────────────

function analyseContributions(state: ContributionsState): CapAnalysis {
  const salary = annualise(Number(state.salary) || 0, state.salaryFrequency);
  const sgRate = (Number(state.employerSgRate) || SG_RATE * 100) / 100;

  // Concessional contributions = SG + additional employer + salary sacrifice + personal deductible
  const sg = salary * sgRate;
  const additionalEmployer = annualise(
    Number(state.additionalEmployerContributions) || 0,
    state.additionalEmployerFrequency,
  );
  const salarySacrifice = annualise(
    Number(state.salarySacrifice) || 0,
    state.salarySacrificeFrequency,
  );
  const personalDeductible = annualise(
    Number(state.personalDeductible) || 0,
    state.personalDeductibleFrequency,
  );

  // Other fund before-tax contributions also count toward concessional cap
  const otherFundBeforeTax = state.contributingToOtherFund === 'yes'
    ? annualise(Number(state.otherFundBeforeTax) || 0, state.otherFundBeforeTaxFrequency)
    : 0;

  const currentConcessional = sg + additionalEmployer + salarySacrifice + personalDeductible + otherFundBeforeTax;

  // Non-concessional contributions = after-tax (member voluntary, not claimed as deduction)
  const afterTax = annualise(Number(state.afterTaxContributions) || 0, state.afterTaxFrequency);
  const otherFundAfterTax = state.contributingToOtherFund === 'yes'
    ? annualise(Number(state.otherFundAfterTax) || 0, state.otherFundAfterTaxFrequency)
    : 0;
  const currentNonConcessional = afterTax + otherFundAfterTax;

  // Carry-forward (unused concessional cap from prior years)
  const previousBalance = Number(state.previousYearBalance) || Number(state.superBalance) || 0;
  const carryForwardEligible = previousBalance < CARRY_FORWARD_BALANCE_THRESHOLD;
  const carryForwardAvailable = carryForwardEligible && state.hasUnusedCarryForward === 'yes'
    ? Number(state.unusedCarryForwardAmount) || 0
    : 0;

  const effectiveConcessionalCap = CONCESSIONAL_CAP + carryForwardAvailable;

  // Division 293 check
  const otherIncome = annualise(Number(state.otherIncomeAmount) || 0, state.otherIncomeFrequency);
  const totalIncome = salary + otherIncome;
  const division293Applies = (totalIncome + currentConcessional) > DIVISION_293_THRESHOLD;

  return {
    concessionalCap: CONCESSIONAL_CAP,
    nonConcessionalCap: NON_CONCESSIONAL_CAP,
    currentConcessional,
    currentNonConcessional,
    concessionalRemaining: Math.max(0, effectiveConcessionalCap - currentConcessional),
    nonConcessionalRemaining: Math.max(0, NON_CONCESSIONAL_CAP - currentNonConcessional),
    concessionalExceeded: currentConcessional > effectiveConcessionalCap,
    nonConcessionalExceeded: currentNonConcessional > NON_CONCESSIONAL_CAP,
    carryForwardAvailable,
    effectiveConcessionalCap,
    division293Applies,
  };
}

// ─── Tax Comparison (current vs recommended) ────────────────────────────────

function buildTaxComparison(state: ContributionsState, caps: CapAnalysis): TaxComparison {
  const salary = annualise(Number(state.salary) || 0, state.salaryFrequency);
  const currentSalarySacrifice = annualise(Number(state.salarySacrifice) || 0, state.salarySacrificeFrequency);
  const taxDeductions = annualise(Number(state.taxDeductionsAmount) || 0, state.taxDeductionsFrequency);
  const otherIncome = annualise(Number(state.otherIncomeAmount) || 0, state.otherIncomeFrequency);

  // Current position
  const currentTaxableIncome = salary - currentSalarySacrifice + otherIncome - taxDeductions;
  const currentIncomeTax = calculateIncomeTax(currentTaxableIncome);
  const currentMedicare = calculateMedicare(currentTaxableIncome);
  const currentTakeHome = salary - currentSalarySacrifice - currentIncomeTax - currentMedicare;

  // Work out recommended additional contributions
  const additionalBudget = annualise(Number(state.additionalAmount) || 0, state.additionalAmountFrequency);
  const goal = state.optimisationGoal;
  const preference = state.contributionPreference;

  let recommendedSalarySacrifice = currentSalarySacrifice;
  let recommendedPersonalDeductible = annualise(Number(state.personalDeductible) || 0, state.personalDeductibleFrequency);
  let recommendedAfterTax = annualise(Number(state.afterTaxContributions) || 0, state.afterTaxFrequency);

  if (additionalBudget > 0) {
    const concessionalRoom = caps.concessionalRemaining;
    const nonConcessionalRoom = caps.nonConcessionalRemaining;

    if (preference === 'before-tax' || preference === 'mix') {
      // Fill concessional cap first (tax-efficient)
      const toConcessional = Math.min(additionalBudget, concessionalRoom);

      if (goal === 'take-home-stability') {
        // Use personal deductible (claimed at tax time, doesn't affect fortnightly pay)
        recommendedPersonalDeductible += toConcessional;
      } else {
        // Use salary sacrifice (immediate tax benefit)
        recommendedSalarySacrifice += toConcessional;
      }

      // If mix preference and still have budget, put remainder into after-tax
      if (preference === 'mix' && additionalBudget > toConcessional) {
        const remaining = additionalBudget - toConcessional;
        recommendedAfterTax += Math.min(remaining, nonConcessionalRoom);
      }
    } else if (preference === 'after-tax') {
      recommendedAfterTax += Math.min(additionalBudget, nonConcessionalRoom);
    } else {
      // No preference — optimise based on goal
      if (goal === 'tax-efficiency') {
        const toConcessional = Math.min(additionalBudget, concessionalRoom);
        recommendedSalarySacrifice += toConcessional;
        if (additionalBudget > toConcessional) {
          recommendedAfterTax += Math.min(additionalBudget - toConcessional, nonConcessionalRoom);
        }
      } else if (goal === 'balance-growth') {
        // Max into super regardless of type
        const toConcessional = Math.min(additionalBudget, concessionalRoom);
        recommendedSalarySacrifice += toConcessional;
        if (additionalBudget > toConcessional) {
          recommendedAfterTax += Math.min(additionalBudget - toConcessional, nonConcessionalRoom);
        }
      } else {
        // take-home-stability: personal deductible instead of salary sacrifice
        const toConcessional = Math.min(additionalBudget, concessionalRoom);
        recommendedPersonalDeductible += toConcessional;
      }
    }
  }

  // Recommended position
  const newTaxableIncome = salary - recommendedSalarySacrifice + otherIncome - taxDeductions;
  const newIncomeTax = calculateIncomeTax(newTaxableIncome);
  const newMedicare = calculateMedicare(newTaxableIncome);
  const newTakeHome = salary - recommendedSalarySacrifice - recommendedAfterTax - newIncomeTax - newMedicare;

  const taxSavings = (currentIncomeTax + currentMedicare) - (newIncomeTax + newMedicare);
  const additionalToSuper = (recommendedSalarySacrifice - currentSalarySacrifice)
    + (recommendedPersonalDeductible - annualise(Number(state.personalDeductible) || 0, state.personalDeductibleFrequency))
    + (recommendedAfterTax - annualise(Number(state.afterTaxContributions) || 0, state.afterTaxFrequency));

  const effectiveContributionsTax = (recommendedSalarySacrifice + recommendedPersonalDeductible) * CONTRIBUTIONS_TAX_RATE;

  return {
    currentTaxableIncome,
    currentIncomeTax,
    currentMedicare,
    currentTakeHome,
    recommendedSalarySacrifice,
    recommendedPersonalDeductible,
    recommendedAfterTax,
    newTaxableIncome,
    newIncomeTax,
    newMedicare,
    newTakeHome,
    taxSavings,
    additionalToSuper,
    effectiveContributionsTax,
  };
}

// ─── Balance Projection ─────────────────────────────────────────────────────

function projectBalances(state: ContributionsState, taxComparison: TaxComparison): ProjectionYear[] {
  const currentAge = Number(state.currentAge) || 30;
  const retirementAge = Number(state.retirementAge) || 67;
  const startBalance = Number(state.superBalance) || 0;
  const salary = annualise(Number(state.salary) || 0, state.salaryFrequency);
  const sgRate = (Number(state.employerSgRate) || SG_RATE * 100) / 100;

  // Current annual contributions (going into THIS fund)
  const currentSg = salary * sgRate;
  const currentSalarySacrifice = annualise(Number(state.salarySacrifice) || 0, state.salarySacrificeFrequency);
  const currentPersonalDeductible = annualise(Number(state.personalDeductible) || 0, state.personalDeductibleFrequency);
  const currentAfterTax = annualise(Number(state.afterTaxContributions) || 0, state.afterTaxFrequency);
  const currentAdditionalEmployer = annualise(Number(state.additionalEmployerContributions) || 0, state.additionalEmployerFrequency);
  const currentTotalContributions = currentSg + currentSalarySacrifice + currentPersonalDeductible + currentAfterTax + currentAdditionalEmployer;
  const currentConcessional = currentSg + currentSalarySacrifice + currentPersonalDeductible + currentAdditionalEmployer;

  // Recommended contributions
  const recommendedConcessional = taxComparison.recommendedSalarySacrifice + taxComparison.recommendedPersonalDeductible + currentSg + currentAdditionalEmployer;
  const recommendedTotalContributions = recommendedConcessional + taxComparison.recommendedAfterTax;

  const years: ProjectionYear[] = [];
  let currentBalance = startBalance;
  let recommendedBalance = startBalance;
  let salaryMultiplier = 1;

  for (let year = 0; year <= retirementAge - currentAge; year++) {
    years.push({
      age: currentAge + year,
      year,
      currentBalance: Math.round(currentBalance),
      recommendedBalance: Math.round(recommendedBalance),
    });

    if (year < retirementAge - currentAge) {
      // Current path
      const currentYearConcessional = currentConcessional * salaryMultiplier;
      const currentYearAfterTax = currentAfterTax * salaryMultiplier;
      const currentYearContributions = currentYearConcessional + currentYearAfterTax;
      const currentContribAfterTax = currentYearConcessional * (1 - CONTRIBUTIONS_TAX_RATE) + currentYearAfterTax;
      currentBalance = (currentBalance + currentContribAfterTax) * (1 + DEFAULT_INVESTMENT_RETURN * (1 - EARNINGS_TAX_RATE));

      // Recommended path
      const recYearConcessional = recommendedConcessional * salaryMultiplier;
      const recYearAfterTax = taxComparison.recommendedAfterTax * salaryMultiplier;
      const recContribAfterTax = recYearConcessional * (1 - CONTRIBUTIONS_TAX_RATE) + recYearAfterTax;
      recommendedBalance = (recommendedBalance + recContribAfterTax) * (1 + DEFAULT_INVESTMENT_RETURN * (1 - EARNINGS_TAX_RATE));

      salaryMultiplier *= (1 + DEFAULT_SALARY_GROWTH);
    }
  }

  return years;
}

// ─── Adviser Triggers ───────────────────────────────────────────────────────

function checkTriggers(state: ContributionsState, caps: CapAnalysis): AdviserTrigger[] {
  const triggers: AdviserTrigger[] = [];
  const currentAge = Number(state.currentAge) || 30;
  const balance = Number(state.superBalance) || 0;

  if (caps.concessionalExceeded) triggers.push('exceeded-concessional');
  if (caps.nonConcessionalExceeded) triggers.push('exceeded-non-concessional');
  if (caps.carryForwardAvailable > 0) triggers.push('carry-forward-available');
  if (currentAge < 67 && balance < 1_660_000) triggers.push('bring-forward-eligible');
  if (caps.division293Applies) triggers.push('division-293');
  if (balance > 1_700_000) triggers.push('high-balance');

  return triggers;
}

// ─── Summary Text ───────────────────────────────────────────────────────────

function buildSummary(tax: TaxComparison, caps: CapAnalysis): string {
  const parts: string[] = [];

  if (tax.additionalToSuper > 0) {
    parts.push(`By contributing an additional $${Math.round(tax.additionalToSuper).toLocaleString()} per year to super`);
    if (tax.taxSavings > 0) {
      parts.push(`you could save approximately $${Math.round(tax.taxSavings).toLocaleString()} in tax`);
    }
  }

  if (caps.concessionalRemaining > 0 && tax.additionalToSuper === 0) {
    parts.push(`You have $${Math.round(caps.concessionalRemaining).toLocaleString()} of unused concessional cap available`);
  }

  return parts.join(', ') + '.';
}

// ─── Main Engine ────────────────────────────────────────────────────────────

export function calculateContributions(state: ContributionsState): ContributionsResult {
  const capAnalysis = analyseContributions(state);
  const taxComparison = buildTaxComparison(state, capAnalysis);
  const projection = projectBalances(state, taxComparison);
  const triggers = checkTriggers(state, capAnalysis);
  const summary = buildSummary(taxComparison, capAnalysis);

  return { capAnalysis, taxComparison, projection, triggers, summary };
}
