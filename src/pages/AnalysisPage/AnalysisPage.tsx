import { Loading, Title, ValueCard } from "@components";
import { DateViewMode } from "@features/Expense/types";
import { CategoryExpenseList } from "@features/ExpenseList";
import { DateViewSelector } from "@features/ExpenseList/DateViewSelector";
import { useExpenseData } from "@features/ExpenseList/hooks";
import { useViewStore } from "@stores";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetExpenses } from "src/queries/hooks/useGetExpenses";

export const AnalysisPage = () => {
  const { t } = useTranslation();

  const { dateView, setDateView, dateViewMode } = useViewStore();

  const { data = [], isLoading } = useGetExpenses();

  const expenseFilter = useMemo(
    () => ({ dateView, dateViewMode }),
    [dateView, dateViewMode],
  );

  const { totalExpense } = useExpenseData(data, {
    filter: expenseFilter,
  });

  if (isLoading) return <Loading isFullScreen />;

  return (
    <div className="p-6 w-full h-full flex flex-col gap-6">
      <Title>{t("anaylsis.spendingAnalysis")}</Title>
      <ValueCard
        title={
          dateViewMode === DateViewMode.MONTH_VIEW
            ? t("anaylsis.monthlyCumulativeExpense")
            : dateViewMode === DateViewMode.YEAR_VIEW
              ? t("anaylsis.yearlyCumulativeExpense")
              : ""
        }
        value={`$${totalExpense.toLocaleString()}`}
        bgColor="#FF4433"
      />
      <DateViewSelector
        value={dateView}
        onChange={setDateView}
        className="self-end"
      />
      <CategoryExpenseList
        data={data}
        dateView={dateView}
        dateViewMode={dateViewMode}
      />
    </div>
  );
};
