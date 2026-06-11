import { InvestmentAccountSelect } from '@/features/investment-mix/InvestmentAccountSelect';
import { MOCK_ACCOUNTS } from '@/features/investment-mix/mockData';

export default function ChangeMixAccumAndTTRPage() {
  return (
    <InvestmentAccountSelect
      accounts={MOCK_ACCOUNTS}
      formPath="/member-online/investments/change-mix/accum-and-ttr/new"
    />
  );
}
