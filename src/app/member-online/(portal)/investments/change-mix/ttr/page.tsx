import { InvestmentAccountSelect } from '@/features/investment-mix/InvestmentAccountSelect';
import { MOCK_ACCOUNTS } from '@/features/investment-mix/mockData';

export default function ChangeMixTTRPage() {
  return (
    <InvestmentAccountSelect
      accounts={MOCK_ACCOUNTS.filter((a) => !!a.isIncomeAccount)}
      formPath="/member-online/investments/change-mix/ttr/new"
    />
  );
}
