import { Loading, Text, Title } from "@components";
import { CategoryExpenseList } from "@features/ExpenseList";
import { DateViewSelector } from "@features/ExpenseList/DateViewSelector";
import { useViewStore } from "@stores";
import { useTranslation } from "react-i18next";
import { ExpenseSummaryCard } from "src/features/Expense/components/ExpenseSummaryCard";
import { useGetExpenses } from "src/queries/hooks/useGetExpenses";

export const AnalysisPage = () => {
  const { t } = useTranslation();

  const { dateView, setDateView, dateViewMode } = useViewStore();

  const { data = [], isLoading } = useGetExpenses();

  if (isLoading) return <Loading isFullScreen />;

  return (
    <div className="p-6 w-full h-full flex flex-col gap-6">
      <ExpenseSummaryCard
        expenses={data}
        dateView={dateView}
        dateViewMode={dateViewMode}
      />

      <div className="flex gap-4 items-center">
        <Text className="text-xl font-bold flex-1">
          {t("analysis.spendingCategory")}
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
