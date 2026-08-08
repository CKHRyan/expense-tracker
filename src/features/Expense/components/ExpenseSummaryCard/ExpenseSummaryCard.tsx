import { useTranslation } from "react-i18next";
import {
  DateViewMode,
  type DateViewValue,
  type ExpenseRecord,
} from "../../types";
import type { TFunction } from "i18next";
import { Icon, ValueCard } from "src/components";
import { useExpenseData } from "src/features/ExpenseList/hooks/useExpenseData";
import { useToggle } from "src/hooks/useToggle";
import { ExpenseSummaryModal } from "../ExpenseSummaryModal";

const getTitle = (t: TFunction, dateViewMode: DateViewMode) => {
  switch (dateViewMode) {
    case DateViewMode.MONTH_VIEW:
      return t("analysis.monthlyCumulativeExpense");
    case DateViewMode.YEAR_VIEW:
      return t("analysis.yearlyCumulativeExpense");
    case DateViewMode.DAY_VIEW:
      return t("analysis.dailyCumulativeExpense");
    default:
      return "";
  }
};

type Props = {
  dateView: DateViewValue;
  dateViewMode: DateViewMode;
  expenses: ExpenseRecord[];
};

export const ExpenseSummaryCard = ({
  dateView,
  dateViewMode,
  expenses,
}: Props) => {
  const { t } = useTranslation();

  const { totalExpense, totalExpenseByCurrency, totalBaseExpenseByCurrency } =
    useExpenseData(expenses, {
      filter: { dateView, dateViewMode },
    });

  const cumulativeExpenseTitle = getTitle(t, dateViewMode);

  const [isInfoModalOpen, toggleInfoModal] = useToggle(false);

  return (
    <>
      <ValueCard
        title={cumulativeExpenseTitle}
        value={`$${totalExpense.toLocaleString()}`}
        bgColor="var(--brand-red)"
        suffixComponent={
          <Icon
            name="icon-[material-symbols--info-outline-rounded]"
            className="w-[26px] h-[26px]"
            onClick={toggleInfoModal}
          />
        }
      />
      <ExpenseSummaryModal
        isOpen={isInfoModalOpen}
        onRequestClose={toggleInfoModal}
        totalExpense={totalExpense}
        totalExpenseByCurrency={totalExpenseByCurrency}
        totalBaseExpenseByCurrency={totalBaseExpenseByCurrency}
      />
    </>
  );
};
