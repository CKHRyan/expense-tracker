import { Loading, Title, ValueCard } from "@components";
import { CategoryExpenseList } from "@features/ExpenseList";
import { useExpenseData } from "@features/ExpenseList/hooks";
import { useExpenseQuery } from "@hooks/useExpenseQuery";

export const AnalysisPage = () => {
  const { data = [], isLoading } = useExpenseQuery();

  const { totalExpense } = useExpenseData(data);

  if (isLoading) return <Loading isFullScreen />;

  return (
    <div className="p-6 w-full h-full flex flex-col gap-6">
      <Title>Analysis</Title>
      <ValueCard
        title="Cumulative Expense"
        value={`$${totalExpense.toLocaleString()}`}
        bgColor="#FF4433"
      />
      <CategoryExpenseList data={data} />
    </div>
  );
};
