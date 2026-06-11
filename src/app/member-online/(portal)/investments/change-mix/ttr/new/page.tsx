import { InvestmentMixFlow } from '../../../../../../../features/investment-mix/InvestmentMixFlow';

export default function ChangeMixTTRNewPage() {
  return (
    <InvestmentMixFlow
      overviewPath="/member-online/investments/change-mix/ttr"
      accountFilter="income"
    />
  );
}
