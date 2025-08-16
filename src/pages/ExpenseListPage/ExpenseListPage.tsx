import { useAppStore } from "@stores";
import { Text, ValueCard, Loading } from "@components";
import { ExpenseInputModal } from "@features/ExpenseInput";
import { ExpenseList } from "@features/ExpenseList";
import { useExpenseQuery } from "@hooks/useExpenseQuery";
import { OverlayFab } from "@components/Fab";
import { useExpenseData } from "@features/ExpenseList/hooks";

export const ExpenseListPage = () => {
  const { data = [], isLoading } = useExpenseQuery();

  const { totalExpense } = useExpenseData(data);

  const {
    expenseSheetParams,
    openNewExpenseSheet,
    openEditExpenseSheet,
    closeExpenseInputSheet,
  } = useAppStore();

  if (isLoading) return <Loading isFullScreen />;

  return (
    <>
      <div className="p-6 w-full h-full flex flex-col gap-4">
        <ValueCard
          title="Cumulative Expense"
          value={`$${totalExpense.toLocaleString()}`}
          bgColor="#FF4433"
        />

        <div className="flex flex-col gap-4 pb-26">
          <Text className="text-xl font-bold">Transaction Records</Text>
          <ExpenseList data={data} onItemPress={openEditExpenseSheet} />
        </div>
      </div>

      <OverlayFab onClick={openNewExpenseSheet}>Add</OverlayFab>

      <ExpenseInputModal
        {...expenseSheetParams}
        onClose={closeExpenseInputSheet}
      />
    </>
  );
};
