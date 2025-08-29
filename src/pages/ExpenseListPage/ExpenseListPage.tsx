import { useViewStore } from "@stores";
import { Text, ValueCard, Loading } from "@components";
import { ExpenseInputModal } from "@features/ExpenseInput";
import { ExpenseList, MonthSelector } from "@features/ExpenseList";
import { OverlayFab } from "@components/Fab";
import { useExpenseData } from "@features/ExpenseList/hooks";
import { useGetExpenses } from "src/queries/hooks/useGetExpenses";

export const ExpenseListPage = () => {
  const { monthView, setMonthView } = useViewStore();

  const { data = [], isLoading } = useGetExpenses();

  const { totalExpense } = useExpenseData(data, { filter: { monthView } });

  const {
    expenseSheetParams,
    openNewExpenseSheet,
    openEditExpenseSheet,
    closeExpenseInputSheet,
  } = useViewStore();

  if (isLoading) return <Loading isFullScreen />;

  return (
    <>
      <div className="p-6 w-full h-full flex flex-col gap-4">
        <ValueCard
          title="Cumulative Expense"
          value={`$${totalExpense.toLocaleString()}`}
          bgColor="#FF4433"
        />

        <div className="flex flex-col gap-4 pb-26 flex-1">
          <div className="flex gap-4 items-center">
            <Text className="text-xl font-bold flex-1">
              Transaction Records
            </Text>
            <MonthSelector value={monthView} onChange={setMonthView} />
          </div>
          <ExpenseList
            data={data}
            onItemPress={openEditExpenseSheet}
            monthView={monthView}
          />
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
