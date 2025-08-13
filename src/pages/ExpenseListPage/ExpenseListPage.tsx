import { useMemo } from "react";

import { useAppStore } from "@stores";
import { Text, Fab, ValueCard, Loading } from "@components";
import { groupBy } from "lodash";
import moment from "moment";
import {
  displayDateFormat,
  serverDateFormat,
} from "@utils/googleSheet/constants";
import { ExpenseInputModal } from "@features/ExpenseInput";
import { TransactionCard } from "@features/ExpenseList";
import { useExpenseQuery } from "@hooks/useExpenseQuery";

export const ExpenseListPage = () => {
  const { data = [], isLoading } = useExpenseQuery();

  const {
    expenseSheetParams,
    openNewExpenseSheet,
    openEditExpenseSheet,
    closeExpenseInputSheet,
  } = useAppStore();

  const totalExpense = useMemo(
    () => data.reduce((sum, { amount }) => amount + sum, 0),
    [data]
  );

  const recordsByDay = useMemo(
    () =>
      groupBy(data, (result) =>
        moment(result.date, serverDateFormat).format(displayDateFormat)
      ),
    [data]
  );

  const transactionDates = useMemo(
    () =>
      Object.keys(recordsByDay).sort((a, b) =>
        moment(a).isBefore(moment(b)) ? 1 : -1
      ),
    [recordsByDay]
  );

  if (isLoading) return <Loading isFullScreen />;

  return (
    <>
      <div className="p-8 w-full h-full flex flex-col gap-4">
        <ValueCard
          title="Cumulative Expense"
          value={`$${totalExpense.toLocaleString()}`}
          bgColor="#FF4433"
        />

        <div className="flex flex-col gap-4 pb-26">
          <Text className="text-xl font-bold">Transaction Records</Text>
          <div className="flex flex-col gap-4">
            {transactionDates.map((date) => (
              <div
                key={`transaction-on-${date}`}
                className="flex flex-col gap-4"
              >
                <Text>{date}</Text>
                {recordsByDay[date].map((record, index) => (
                  <TransactionCard
                    key={`transaction-${index}`}
                    record={record}
                    onClick={openEditExpenseSheet}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Fab onClick={openNewExpenseSheet}>Add</Fab>

      <ExpenseInputModal
        {...expenseSheetParams}
        onClose={closeExpenseInputSheet}
      />
    </>
  );
};
