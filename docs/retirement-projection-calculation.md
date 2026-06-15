# Retirement Projection — Calculation Methodology & Assumptions

**Audience:** Financial advisers reviewing the Retirement Projection tool.
**Source of truth:** `src/features/retirement-projection/projection.ts` — every figure in this document comes from the `ASSUMPTIONS` and `PENSION` constants in that file. If this document and the code disagree, the code wins; please flag the discrepancy.
**Status:** Prototype calculation engine. Figures current as at June 2026 (2025 rates). Not actuarially reviewed.

---

## 1. What the tool does

The tool runs a deterministic, year-by-year household simulation from the member's current age to age **92** (the planning horizon). It projects:

1. **Projected super balance** — household super (member + partner) at the member's retirement age.
2. **Projected yearly retirement income** — the highest *level* annual income (including Age Pension) the household can sustain every year from retirement to age 92 without running out.
3. **Income and capital charts** — a year-by-year view of where income comes from (salary, investments, super drawdown, Age Pension) and how capital depletes, assuming the member draws their **target income**.
4. **Shortfall warning** — the first year, if any, in which total income falls below the target.

All results are expressed in **today's dollars** (see §3).

---

## 2. Inputs

| Input | Used for |
|---|---|
| Current age, retirement age | Simulation span and phase switch |
| Salary (+ frequency) | Employer contributions, pre-retirement income on the chart |
| Partner (age, retirement age, salary, super balance) | Household accumulation, couple pension rates |
| Home ownership + mortgage balance | Pension homeowner thresholds; lump-sum payoff at retirement |
| Current super balance (+ other fund balance) | Opening super pool |
| Employer contribution rate (% or $) | Concessional contributions (blank % = 12% Super Guarantee) |
| Salary sacrifice, after-tax contributions, other-fund contributions (+ frequencies) | Annual contributions |
| Lifestyle goal (Modest / Comfortable / Custom) | Target retirement income |
| Investment property (value, rental income, capital growth, loans) | Retirement income, assets test, equity growth |
| Savings (balance, interest rate) | Capital pool |
| Managed funds (value, net income, capital growth, loans) | Capital pool, retirement income, assets test |
| Personal/credit card debts (+ expect to pay off before retirement) | Lump-sum payoff at retirement if not paid off |

### Target income (lifestyle goal)

| Goal | Annual target (today's dollars) |
|---|---|
| ASFA Modest | $51,299 |
| ASFA Comfortable | $77,375 |
| Custom | User-entered amount |

---

## 3. Core economic assumptions

All rates are **nominal** and converted to **real** rates before use, so the entire projection reads in today's purchasing power:

> real rate = (1 + nominal) ÷ (1 + inflation) − 1

| Assumption | Value | Notes |
|---|---|---|
| Inflation (deflator) | 2.5% p.a. | Applied to every nominal rate |
| Super return — accumulation | 6.5% p.a. nominal (≈3.9% real) | Net of investment fees and taxes |
| Super return — retirement | 6.0% p.a. nominal (≈3.4% real) | Net of investment fees and taxes |
| Salary growth | 3.0% p.a. nominal (≈0.5% real) | Applied to member and partner salaries |
| Contributions tax | 15% | On all concessional (before-tax) contributions |
| Super Guarantee | 12% | Default when employer rate is left blank |
| Preservation age | 60 | Super cannot be drawn before this age |
| Age Pension eligibility | 67 | |
| Planning horizon | Age 92 | Simulation and sustainability end point |
| Savings interest | User-entered, else 0% nominal | Converted to real, so unspecified = ≈ −2.4% real |
| Property / managed-fund growth and income | User-entered, else 0% nominal | Percent inputs use the asset's current value each year |

**Note for advisers:** any growth/interest rate the member leaves blank is treated as **0% nominal**, which is slightly negative in real terms. This is deliberate (conservative) but worth knowing when a projection looks pessimistic.

---

## 4. Accumulation phase (current age → retirement age)

Each year while the member works:

1. **Concessional contributions** = employer (rate × salary, or fixed $) + salary sacrifice + before-tax contributions to other funds. All are taxed at 15% on the way in.
2. **After-tax contributions** (member + other fund) are added untaxed.
3. The partner, while working, contributes **Super Guarantee only** (12% of their salary, less 15% tax) to their own balance. Partner salary sacrifice is not collected.
4. End of year: each super pool grows at the accumulation return until *that person's* retirement age, then at the retirement return; savings grow at the user's interest rate; property and managed funds grow at their entered rates (a dollar-amount growth input adds a flat amount per year); salaries grow at real salary growth.

The member's opening super pool is their ART balance plus any other-fund balance.

**At the retirement year**, before anything else: the outstanding **home loan balance** and any **personal/credit card debts** the member does not expect to pay off are settled as a **lump sum**, drawn from savings, then managed funds, then super.

---

## 5. Retirement phase (retirement age → 92)

Each year after the member retires, income is assembled in this order:

1. **Investment income** — net rental income plus managed-fund distributions (percent inputs are applied to the asset's current value).
2. **Partner salary** — if the partner is still working, their salary counts toward household income.
3. **Age Pension** — from age 67, means-tested (see §6).
4. **Drawdown** — any shortfall against the target income is drawn from **savings → managed funds → super**. Super can only be drawn from age 60 (preservation age). If the member retires before 60 and the non-super pools run dry, income falls short until super unlocks — the tool surfaces this in the shortfall warning.

Capital pools continue to earn their respective returns on the remaining balance each year.

---

## 6. Age Pension model (simplified)

The model applies the **assets test only** — no income test and no deeming. The family home is exempt (it affects only which threshold applies). 2025 rates:

| | Single | Couple (combined) |
|---|---|---|
| Maximum pension | $29,874 p.a. | $45,037 p.a. |
| Assets threshold — homeowner | $314,000 | $470,000 |
| Assets threshold — non-homeowner | $566,000 | $722,000 |
| Taper | $78 p.a. reduction per $1,000 of assets over the threshold | same |

**Assessable assets** = all super (member + partner) + savings + managed funds (net of loans against them) + investment property equity (value − loans). The family home is excluded.

Because assets deplete through retirement, the pension typically **increases over time** in the projection — visible as the rising green line on the income chart.

**Couple status** follows the "include a partner" answer; couple rates apply to the household as a whole.

---

## 7. Headline figures — how each is computed

**Projected super balance** — member + partner super pools at the start of the member's retirement year, before the debt lump-sum settlement.

**Projected yearly retirement income** — solved by bisection: the tool repeatedly re-runs the full simulation with trial income levels and converges (40 iterations) on the highest level income that never falls short in any year through to age 92. Because each trial is a full simulation, the interplay between drawdown, asset depletion, and the rising Age Pension is fully captured.

**Target balance** ("balance needed") — the present value of an annuity paying the target income from retirement to age 92 at the real retirement return. This is the capital required to self-fund the target *without* the Age Pension.

**Shortfall age** — in the target-drawdown simulation, the first retirement year in which total income (investments + partner salary + pension + drawdown) is more than $1 below the target.

---

## 8. Known simplifications and limitations

Advisers should be aware the engine deliberately does **not** model:

- **Income tax** — in accumulation (beyond the 15% contributions tax) or in retirement. Pension-phase earnings are implicitly assumed tax-free via the net return assumption.
- **Age Pension income test and deeming** — assets test only. For income-rich/asset-poor households this overstates the pension.
- **Concessional cap enforcement** — the form warns at $30,000 p.a., but the projection does not apply Division 293 or excess-contribution tax.
- **Other taxable income / tax deductions** — collected on the form but not used in the calculation (reserved for future tax modelling).
- **Loan amortisation** — property and managed-fund loan balances are held static; their monthly repayment inputs are not modelled. Debts are settled as a lump sum at retirement rather than amortised.
- **Reinvestment of investment income while working** — rental and managed-fund income earned before retirement is treated as spent (it appears as income on the chart but is not added to savings).
- **Minimum pension drawdown rates** — drawdown is needs-based only.
- **Sequencing/market risk** — returns are flat deterministic rates; no stochastic modelling.
- **Defined benefit accounts, lifetime pensions, transition-to-retirement strategies.**
- **Longevity beyond 92** — capital remaining at 92 is not annuitised or reported.
- Pension rates and thresholds are **fixed in today's dollars** (no legislated indexation modelling).

---

## 9. Where to change the numbers

| What | Where |
|---|---|
| Returns, inflation, salary growth, tax, ages | `ASSUMPTIONS` in `src/features/retirement-projection/projection.ts` |
| Age Pension rates, thresholds, taper | `PENSION` in the same file |
| ASFA Modest/Comfortable targets | `LIFESTYLE_TARGETS` in `src/features/retirement-projection/constants.ts` |
| Concessional cap shown on the form | `CONCESSIONAL_CAP` in `src/features/retirement-projection/steps/StepSuper.tsx` |

When updating rates, update **this document** in the same change.
