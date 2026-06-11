import { InvestmentMixFlow } from '@/features/investment-mix/InvestmentMixFlow';

export default function QSuperChangeMixTTRNewPage() {
  return (
    <InvestmentMixFlow
      overviewPath="/qsuper/member-online/investments/change-mix/ttr"
      accountFilter="income"
      brandName="QSuper"
    />
  );
}
