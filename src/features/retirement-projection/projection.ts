import type { RetirementProjectionState } from './types';
import { LIFESTYLE_TARGETS, getModestTarget } from './constants';

/**
 * Deterministic retirement projection in today's dollars.
 *
 * All nominal assumptions are converted to real (inflation-adjusted) rates so
 * results read in today's purchasing power. Simplifications, documented here
 * and surfaced in the results Assumptions panel:
 * - Concessional contributions are taxed at 15%; the concessional cap is
 *   warned about in the form but not enforced in the projection.
 * - Age Pension uses the assets test only (no income test or deeming), with
 *   the family home exempt. Rates/thresholds are 2025 figures.
 * - Outstanding home-loan and unpaid personal debts are settled as a lump sum
 *   from savings/super at retirement.
 * - Investment income (rent, managed-fund distributions) is treated as spent
 *   while working and as retirement income afterwards.
 * - Unspecified growth/interest rates are treated as 0% nominal. An
 *   unspecified employer contribution defaults to the 12% Super Guarantee.
 */
export const ASSUMPTIONS = {
  inflation: 0.025,
  superReturnAccumulation: 0.065,
  superReturnRetirement: 0.06,
  salaryGrowth: 0.035,
  contributionsTax: 0.15,
  superGuaranteeRate: 12,
  preservationAge: 60,
  pensionEligibilityAge: 67,
  planningHorizonAge: 95,
} as const;

const PENSION = {
  single: { max: 29874, homeownerAssets: 314000, nonHomeownerAssets: 566000 },
  couple: { max: 45037, homeownerAssets: 470000, nonHomeownerAssets: 722000 },
  /** Pension reduces by $78 p.a. per $1,000 of assets over the threshold. */
  taperPerDollar: 0.078,
} as const;

export interface ProjectionYear {
  age: number;
  salary: number;
  investment: number;
  superIncome: number;
  agePension: number;
  superBalance: number;
  savings: number;
}

export interface ProjectionResult {
  retirementAge: number;
  /** Household super at the start of retirement (today's dollars). */
  projectedBalance: number;
  /** Estimated sustainable annual income through retirement. */
  projectedIncome: number;
  targetIncome: number;
  /** Capital needed at retirement to self-fund the target to the horizon. */
  targetBalance: number;
  /** First retirement age where income falls short of the target, if any. */
  fundsDepletedAge: number | null;
  years: ProjectionYear[];
}

function num(value: string): number {
  const n = parseFloat(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Annualise an amount string for a payment frequency. */
export function toAnnual(amount: string, frequency: string): number {
  const n = num(amount);
  switch (frequency) {
    case 'weekly': return n * 52;
    case 'fortnightly': return n * 26;
    case 'monthly': return n * 12;
    default: return n;
  }
}

/** Convert a nominal annual rate to a real (today's dollars) rate. */
function real(nominalRate: number): number {
  return (1 + nominalRate) / (1 + ASSUMPTIONS.inflation) - 1;
}

/** Resolve a percent-or-dollar input against a base value. */
function amountOrPercent(value: string, unit: string, base: number): number {
  return unit === 'dollar' ? num(value) : (base * num(value)) / 100;
}

/** Present value of $1/year for n years at real rate r. */
function annuityFactor(r: number, n: number): number {
  if (n <= 0) return 0;
  if (r === 0) return n;
  return (1 - Math.pow(1 + r, -n)) / r;
}

function agePension(assets: number, couple: boolean, homeowner: boolean): number {
  const band = couple ? PENSION.couple : PENSION.single;
  const threshold = homeowner ? band.homeownerAssets : band.nonHomeownerAssets;
  const reduction = Math.max(0, assets - threshold) * PENSION.taperPerDollar;
  return Math.max(0, band.max - reduction);
}

interface SimState {
  memberSuper: number;
  partnerSuper: number;
  savings: number;
  managed: number;
  propertyValue: number;
  salary: number;
  partnerSalary: number;
}

interface SimInputs {
  state: RetirementProjectionState;
  currentAge: number;
  retirementAge: number;
  partnerAgeOffset: number;
  partnerRetirementAge: number;
  couple: boolean;
  homeowner: boolean;
  targetIncome: number;
}

function parseSimInputs(state: RetirementProjectionState): SimInputs {
  const currentAge = Math.round(num(state.currentAge)) || 40;
  const retirementAge = Math.max(
    Math.round(num(state.retirementAge)) || 67,
    currentAge + 1,
  );
  const couple = state.includePartner === 'yes';
  const partnerAge = Math.round(num(state.partner.age)) || currentAge;
  return {
    state,
    currentAge,
    retirementAge,
    partnerAgeOffset: couple ? partnerAge - currentAge : 0,
    partnerRetirementAge: Math.round(num(state.partner.retirementAge)) || retirementAge,
    couple,
    homeowner: state.ownHome === 'yes',
    targetIncome:
      state.lifestyle === 'custom'
        ? num(state.customTarget)
        : (() => {
            const key = state.lifestyle ?? 'comfortable';
            const homeowner = state.ownHome === 'yes';
            if (key === 'modest') return getModestTarget(couple, homeowner);
            const band = LIFESTYLE_TARGETS[key] ?? LIFESTYLE_TARGETS.comfortable;
            return couple ? band.couple : band.single;
          })(),
  };
}

function initialSimState(inputs: SimInputs): SimState {
  const { state } = inputs;
  return {
    memberSuper:
      num(state.superBalance) +
      (state.superContributions.contributingToOtherFund === 'yes' ? num(state.otherFund.balance) : 0),
    partnerSuper: inputs.couple ? num(state.partner.superBalance) : 0,
    savings: state.hasSavings === 'yes' ? num(state.savings.totalSavings) : 0,
    managed: state.hasManagedFunds === 'yes' ? num(state.managedFunds.marketValue) : 0,
    propertyValue: state.ownInvestmentProperty === 'yes' ? num(state.investmentProperty.marketValue) : 0,
    salary: toAnnual(state.salary, state.salaryFrequency),
    partnerSalary: inputs.couple ? toAnnual(state.partner.salary, state.partner.salaryFrequency) : 0,
  };
}

/** Annual concessional + after-tax contributions landing in member super. */
function memberContributions(state: RetirementProjectionState, salary: number): number {
  const c = state.superContributions;
  const employer =
    c.employerRateUnit === 'dollar'
      ? num(c.employerRate)
      : (salary * (c.employerRate === '' ? ASSUMPTIONS.superGuaranteeRate : num(c.employerRate))) / 100;
  const concessional =
    employer +
    toAnnual(c.salarySacrifice, c.salarySacrificeFrequency) +
    (c.contributingToOtherFund === 'yes'
      ? toAnnual(state.otherFund.beforeTaxContributions, state.otherFund.beforeTaxFrequency)
      : 0);
  const afterTax =
    toAnnual(c.afterTaxContributions, c.afterTaxFrequency) +
    (c.contributingToOtherFund === 'yes'
      ? toAnnual(state.otherFund.afterTaxContributions, state.otherFund.afterTaxFrequency)
      : 0);
  return concessional * (1 - ASSUMPTIONS.contributionsTax) + afterTax;
}

/** Annual contributions landing in partner super (uses their actual inputs). */
function partnerContributions(state: RetirementProjectionState, partnerSalary: number): number {
  const p = state.partner;
  const employer =
    (p.employerRateUnit ?? 'percent') === 'dollar'
      ? num(p.employerRate ?? '')
      : (partnerSalary * ((p.employerRate ?? '') === '' ? ASSUMPTIONS.superGuaranteeRate : num(p.employerRate ?? ''))) / 100;
  const concessional =
    employer + toAnnual(p.salarySacrifice ?? '', p.salarySacrificeFrequency ?? 'fortnightly');
  const afterTax = toAnnual(p.afterTaxContributions ?? '', p.afterTaxFrequency ?? 'fortnightly');
  return concessional * (1 - ASSUMPTIONS.contributionsTax) + afterTax;
}

/** Rent and managed-fund income for the year (percent units use current values). */
function investmentIncome(state: RetirementProjectionState, sim: SimState): number {
  const p = state.investmentProperty;
  const m = state.managedFunds;
  const rent =
    state.ownInvestmentProperty === 'yes'
      ? amountOrPercent(p.rentalIncome, p.rentalIncomeUnit, sim.propertyValue)
      : 0;
  const distributions =
    state.hasManagedFunds === 'yes'
      ? amountOrPercent(m.netIncome, m.netIncomeUnit, sim.managed)
      : 0;
  return rent + distributions;
}

/** Debts settled as a lump sum at retirement: home loan + unpaid personal debts. */
function retirementDebts(state: RetirementProjectionState): number {
  const homeLoan = state.ownHome === 'yes' ? num(state.homeLoan.mortgageBalance) : 0;
  const personal =
    state.debts.expectToPayOff === 'yes' ? 0 : num(state.debts.personalLoansBalance);
  return homeLoan + personal;
}

/** Draw `amount` across pools in order; mutates sim, returns what was funded. */
function drawFromPools(sim: SimState, amount: number, superAccessible: boolean): { fromOther: number; fromSuper: number } {
  let remaining = amount;
  const fromSavings = Math.min(sim.savings, remaining);
  sim.savings -= fromSavings;
  remaining -= fromSavings;
  const fromManaged = Math.min(sim.managed, remaining);
  sim.managed -= fromManaged;
  remaining -= fromManaged;
  let fromSuper = 0;
  if (superAccessible) {
    fromSuper = Math.min(sim.memberSuper + sim.partnerSuper, remaining);
    const memberShare = Math.min(sim.memberSuper, fromSuper);
    sim.memberSuper -= memberShare;
    sim.partnerSuper -= fromSuper - memberShare;
  }
  return { fromOther: fromSavings + fromManaged, fromSuper };
}

/** Apply end-of-year growth at real rates; mutates sim. */
function growPools(inputs: SimInputs, sim: SimState, age: number): void {
  const { state } = inputs;
  const memberRate = real(age < inputs.retirementAge ? ASSUMPTIONS.superReturnAccumulation : ASSUMPTIONS.superReturnRetirement);
  const partnerAge = age + inputs.partnerAgeOffset;
  const partnerRate = real(partnerAge < inputs.partnerRetirementAge ? ASSUMPTIONS.superReturnAccumulation : ASSUMPTIONS.superReturnRetirement);
  sim.memberSuper *= 1 + memberRate;
  sim.partnerSuper *= 1 + partnerRate;
  sim.savings *= 1 + real(num(state.savings.expectedInterest) / 100);
  const m = state.managedFunds;
  sim.managed = m.capitalGrowthUnit === 'dollar'
    ? sim.managed + num(m.capitalGrowth)
    : sim.managed * (1 + real(num(m.capitalGrowth) / 100));
  const p = state.investmentProperty;
  sim.propertyValue = p.capitalGrowthUnit === 'dollar'
    ? sim.propertyValue + num(p.capitalGrowth)
    : sim.propertyValue * (1 + real(num(p.capitalGrowth) / 100));
  const salaryGrowth = 1 + real(ASSUMPTIONS.salaryGrowth);
  sim.salary *= salaryGrowth;
  sim.partnerSalary *= salaryGrowth;
}

function assessableAssets(state: RetirementProjectionState, sim: SimState): number {
  const propertyLoans =
    state.ownInvestmentProperty === 'yes' ? num(state.investmentProperty.currentLoans) : 0;
  const propertyEquity = Math.max(0, sim.propertyValue - propertyLoans);
  const managedLoans =
    state.hasManagedFunds === 'yes' ? num(state.managedFunds.loansAgainst) : 0;
  const managedEquity = Math.max(0, sim.managed - managedLoans);
  return sim.memberSuper + sim.partnerSuper + sim.savings + managedEquity + propertyEquity;
}

/** One simulated year; mutates sim and returns the chart row. */
function simulateYear(inputs: SimInputs, sim: SimState, age: number): ProjectionYear {
  const { state } = inputs;
  const memberWorking = age < inputs.retirementAge;
  const partnerWorking =
    inputs.couple && age + inputs.partnerAgeOffset < inputs.partnerRetirementAge;
  const salaryIncome = (memberWorking ? sim.salary : 0) + (partnerWorking ? sim.partnerSalary : 0);
  if (memberWorking) sim.memberSuper += memberContributions(state, sim.salary);
  if (partnerWorking) {
    sim.partnerSuper += partnerContributions(state, sim.partnerSalary);
  }
  if (age === inputs.retirementAge) drawFromPools(sim, retirementDebts(state), age >= ASSUMPTIONS.preservationAge);

  let investment = investmentIncome(state, sim);
  let pension = 0;
  let superIncome = 0;
  if (!memberWorking) {
    if (age >= ASSUMPTIONS.pensionEligibilityAge) {
      pension = agePension(assessableAssets(state, sim), inputs.couple, inputs.homeowner);
    }
    const shortfall = Math.max(0, inputs.targetIncome - investment - pension - salaryIncome);
    const drawn = drawFromPools(sim, shortfall, age >= ASSUMPTIONS.preservationAge);
    investment += drawn.fromOther;
    superIncome = drawn.fromSuper;
  }
  const row: ProjectionYear = {
    age,
    salary: Math.round(salaryIncome),
    investment: Math.round(investment),
    superIncome: Math.round(superIncome),
    agePension: Math.round(pension),
    superBalance: Math.round(sim.memberSuper + sim.partnerSuper),
    savings: Math.round(sim.savings + sim.managed),
  };
  growPools(inputs, sim, age);
  return row;
}

/** Whether drawing `target` a year leaves any retirement year short of it. */
function hasShortfall(inputs: SimInputs, target: number): boolean {
  const trial: SimInputs = { ...inputs, targetIncome: target };
  const sim = initialSimState(trial);
  for (let age = trial.currentAge; age <= ASSUMPTIONS.planningHorizonAge; age++) {
    const row = simulateYear(trial, sim, age);
    if (age >= trial.retirementAge) {
      const total = row.salary + row.investment + row.superIncome + row.agePension;
      if (total < target - 1) return true;
    }
  }
  return false;
}

/** Highest level annual income (incl. pension) sustainable to the horizon. */
function solveSustainableIncome(inputs: SimInputs): number {
  let hi = 200000;
  while (!hasShortfall(inputs, hi) && hi < 1e8) hi *= 2;
  let lo = 0;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (hasShortfall(inputs, mid)) hi = mid;
    else lo = mid;
  }
  return lo;
}

export function computeProjection(state: RetirementProjectionState): ProjectionResult {
  const inputs = parseSimInputs(state);

  // Solve sustainable income first — this is the max annual income that lasts to the horizon.
  const sustainableIncome = solveSustainableIncome(inputs);

  // Run the chart simulation drawing at the sustainable rate so bars reflect
  // actual projected income. The target line on the chart shows the goal —
  // the gap between bars and line communicates the shortfall visually.
  const chartInputs: SimInputs = { ...inputs, targetIncome: sustainableIncome };
  const sim = initialSimState(chartInputs);
  const years: ProjectionYear[] = [];
  let projectedBalance = 0;
  let fundsDepletedAge: number | null = null;
  for (let age = chartInputs.currentAge; age <= ASSUMPTIONS.planningHorizonAge; age++) {
    if (age === chartInputs.retirementAge) {
      projectedBalance = sim.memberSuper + sim.partnerSuper;
    }
    const row = simulateYear(chartInputs, sim, age);
    years.push(row);
    const retired = age >= chartInputs.retirementAge;
    const totalIncome = row.salary + row.investment + row.superIncome + row.agePension;
    if (retired && fundsDepletedAge === null && totalIncome < inputs.targetIncome - 1) {
      fundsDepletedAge = age;
    }
  }
  const drawdownYears = ASSUMPTIONS.planningHorizonAge - inputs.retirementAge;
  const factor = annuityFactor(real(ASSUMPTIONS.superReturnRetirement), drawdownYears);
  // Estimate Age Pension at retirement to determine how much must be self-funded
  const pensionAtRetirement = inputs.retirementAge >= ASSUMPTIONS.pensionEligibilityAge
    ? agePension(projectedBalance, inputs.couple, inputs.homeowner)
    : 0;
  const selfFundedTarget = Math.max(0, inputs.targetIncome - pensionAtRetirement);
  return {
    retirementAge: inputs.retirementAge,
    projectedBalance: Math.round(projectedBalance),
    projectedIncome: Math.round(sustainableIncome),
    targetIncome: Math.round(inputs.targetIncome),
    targetBalance: Math.round(selfFundedTarget * factor),
    fundsDepletedAge,
    years,
  };
}
