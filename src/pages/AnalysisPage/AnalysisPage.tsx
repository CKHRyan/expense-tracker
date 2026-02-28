import { Loading, Text, Title, ValueCard } from "@components";
import { DateViewMode } from "@features/Expense/types";
import { CategoryExpenseList } from "@features/ExpenseList";
import { DateViewSelector } from "@features/ExpenseList/DateViewSelector";
import { useExpenseData } from "@features/ExpenseList/hooks/useExpenseData";
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

  const cumulativeExpenseTitle = useMemo(() => {
    switch (dateViewMode) {
      case DateViewMode.MONTH_VIEW:
        return t("anaylsis.monthlyCumulativeExpense");
      case DateViewMode.YEAR_VIEW:
        return t("anaylsis.yearlyCumulativeExpense");
      case DateViewMode.DAY_VIEW:
        return t("anaylsis.dailyCumulativeExpense");
      default:
        return "";
    }
  }, [dateViewMode, t]);

  if (isLoading) return <Loading isFullScreen />;

  return (
    <div className="p-6 w-full h-full flex flex-col gap-6">
      <Title>{t("anaylsis.spendingAnalysis")}</Title>
      <ValueCard
        title={cumulativeExpenseTitle}
        value={`$${totalExpense.toLocaleString()}`}
        bgColor="#FF4433"
      />
      <div className="flex gap-4 items-center">
        <Text className="text-xl font-bold flex-1">
          {t("anaylsis.spendingCategory")}
        </Text>
        <DateViewSelector value={dateView} onChange={setDateView} />
      </div>
      <CategoryExpenseList
        data={data}
        dateView={dateView}
        dateViewMode={dateViewMode}
      />
    </div>
  );
};
