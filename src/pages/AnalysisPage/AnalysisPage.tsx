import { Loading, Title, ValueCard } from "@components";
import { CategoryExpenseList } from "@features/ExpenseList";
import { useExpenseData } from "@features/ExpenseList/hooks";
import { useTranslation } from "react-i18next";
import { useGetExpenses } from "src/queries/hooks/useGetExpenses";

export const AnalysisPage = () => {
  const { t } = useTranslation();
  const { data = [], isLoading } = useGetExpenses();

  const { totalExpense } = useExpenseData(data);

  if (isLoading) return <Loading isFullScreen />;

  return (
    <div className="p-6 w-full h-full flex flex-col gap-6">
      <Title>{t("anaylsis.spendingAnalysis")}</Title>
      <ValueCard
        title={t("anaylsis.monthlyCumulativeExpense")}
        value={`$${totalExpense.toLocaleString()}`}
        bgColor="#FF4433"
      />
      <CategoryExpenseList data={data} />
    </div>
  );
};
