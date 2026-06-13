import { InvestmentMixFlow } from '@/features/investment-mix/InvestmentMixFlow';

export default function QSuperManageInvestmentsChangeMixPage() {
  return (
    <InvestmentMixFlow
      overviewPath="/qsuper/member-online/investments/manage-investments"
      accountFilter="all"
      brandName="QSuper"
    />
  );
}
