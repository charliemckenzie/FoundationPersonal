import { InvestmentAccountSelect } from '@/features/investment-mix/InvestmentAccountSelect';
import { MOCK_ACCOUNTS } from '@/features/investment-mix/mockData';

export default function QSuperChangeMixAccumAndTTRPage() {
  return (
    <InvestmentAccountSelect
      accounts={MOCK_ACCOUNTS}
      formPath="/qsuper/member-online/investments/change-mix/accum-and-ttr/new"
    />
  );
}
