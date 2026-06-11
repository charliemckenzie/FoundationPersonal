import { InvestmentMixFlow } from '@/features/investment-mix/InvestmentMixFlow';

export default function QSuperChangeMixAccumNewPage() {
  return (
    <InvestmentMixFlow
      overviewPath="/qsuper/member-online/investments/change-mix/accum"
      accountFilter="accum"
      brandName="QSuper"
    />
  );
}
