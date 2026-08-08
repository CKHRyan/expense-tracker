import { useViewStore } from "@stores";
import { Text, Loading } from "@components";
import { ExpenseInputModal } from "@features/ExpenseInput";
import { ExpenseList } from "@features/ExpenseList";
import { OverlayFab } from "@components/Fab";
import { useGetExpenses } from "src/queries/hooks/useGetExpenses";
import { useTranslation } from "react-i18next";
import { DateViewSelector } from "@features/ExpenseList/DateViewSelector";
import { ExpenseSummaryCard } from "src/features/Expense/components/ExpenseSummaryCard";

export const ExpenseListPage = () => {
  const { t } = useTranslation();

  const {
    expenseSheetParams,
    openNewExpenseSheet,
    openEditExpenseSheet,
    closeExpenseInputSheet,
    dateView,
    setDateView,
    dateViewMode,
  } = useViewStore();

  const { data = [], isLoading } = useGetExpenses();

  if (isLoading) return <Loading isFullScreen />;

  return (
    <>
      <div className="p-6 w-full h-full flex flex-col gap-6">
        <ExpenseSummaryCard
          expenses={data}
          dateView={dateView}
          dateViewMode={dateViewMode}
        />

        <div className="flex flex-col gap-4 pb-26 flex-1">
          <div className="flex gap-4 items-center">
            <Text className="text-xl font-bold flex-1">
              {t("expenseList.spendingRecords")}
            </Text>
            <DateViewSelector value={dateView} onChange={setDateView} />
          </div>
          <ExpenseList
            data={data}
            onItemPress={openEditExpenseSheet}
            dateView={dateView}
            dateViewMode={dateViewMode}
          />
        </div>
      </div>

      <OverlayFab onClick={openNewExpenseSheet}>
        {t("expenseInput.add")}
      </OverlayFab>

      <ExpenseInputModal
        {...expenseSheetParams}
        onClose={closeExpenseInputSheet}
      />
    </>
  );
};
