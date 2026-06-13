import type { InvestmentOption } from './types';

export interface AllocationWarning {
  id: string;
  title: string;
  message: string;
}

const DEFENSIVE_IDS = new Set(['opt-cash', 'opt-bonds', 'opt-conservative', 'opt-conservative-balanced']);

const HIGH_CONCENTRATION_IDS = new Set([
  'opt-aus-shares',
  'opt-intl-shares-hedged',
  'opt-intl-shares-unhedged',
  'opt-listed-property',
  'opt-high-growth',
  'opt-high-growth-index',
]);

export function detectAllocationWarning(
  allocations: Record<string, number>,
  options: InvestmentOption[],
): AllocationWarning | null {
  const allocated = Object.entries(allocations).filter(([, v]) => v > 0);
  if (allocated.length === 0) return null;

  const allocatedIds = allocated.map(([id]) => id);

  // 100% Cash
  if (allocatedIds.length === 1 && allocatedIds[0] === 'opt-cash') {
    return {
      id: 'all-cash',
      title: 'Is 100% Cash right for you?',
      message:
        'Cash typically earns lower returns than growth options and may not keep pace with inflation over time. For most members, this can significantly reduce how much super you build before retirement.',
    };
  }

  // 100% in a single high-volatility, undiversified option
  if (allocatedIds.length === 1 && HIGH_CONCENTRATION_IDS.has(allocatedIds[0])) {
    const option = options.find((o) => o.id === allocatedIds[0]);
    return {
      id: 'single-concentration',
      title: `100% in ${option?.name ?? 'one option'}`,
      message: `Concentrating everything in ${option?.name ?? 'a single option'} means your entire balance moves with that one market. A significant downturn could substantially reduce your super with nothing else to cushion the impact.`,
    };
  }

  // All allocated options are defensive (Cash, Bonds, Conservative, Conservative Balanced)
  if (allocatedIds.length > 1 && allocatedIds.every((id) => DEFENSIVE_IDS.has(id))) {
    return {
      id: 'all-defensive',
      title: 'Your mix is entirely defensive',
      message:
        "Your new allocation is spread across low-growth, defensive options only. These aim to protect against loss, but typically won't deliver the growth needed to build your super meaningfully over the long term.",
    };
  }

  // >= 50% in Unlisted Assets (illiquidity risk)
  const unlistedPct = allocations['opt-unlisted-assets'] ?? 0;
  if (unlistedPct >= 50) {
    return {
      id: 'high-unlisted',
      title: 'High concentration in Unlisted Assets',
      message: `You've put ${unlistedPct}% into Unlisted Assets. These are less liquid than other options — in some market conditions it may be harder to switch out quickly. Consider whether this level of exposure suits your circumstances.`,
    };
  }

  return null;
}
