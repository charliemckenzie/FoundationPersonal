import { InvestmentMixFlow } from '@/features/investment-mix/InvestmentMixFlow';

export default function ManageInvestmentsChangeMixPage() {
  return (
    <InvestmentMixFlow
      overviewPath="/member-online/investments/manage-investments"
      accountFilter="all"
    />
  );
}
