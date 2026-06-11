import { InvestmentMixFlow } from '@/features/investment-mix/InvestmentMixFlow';

export default function QSuperChangeMixAccumAndTTRNewPage() {
  return (
    <InvestmentMixFlow
      overviewPath="/qsuper/member-online/investments/change-mix/accum-and-ttr"
      accountFilter="all"
      brandName="QSuper"
    />
  );
}
