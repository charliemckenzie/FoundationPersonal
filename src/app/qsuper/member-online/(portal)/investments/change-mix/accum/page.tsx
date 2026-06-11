import { InvestmentAccountSelect } from '@/features/investment-mix/InvestmentAccountSelect';
import { MOCK_ACCOUNTS } from '@/features/investment-mix/mockData';

export default function QSuperChangeMixAccumPage() {
  return (
    <InvestmentAccountSelect
      accounts={MOCK_ACCOUNTS.filter((a) => !a.isIncomeAccount)}
      formPath="/qsuper/member-online/investments/change-mix/accum/new"
    />
  );
}
