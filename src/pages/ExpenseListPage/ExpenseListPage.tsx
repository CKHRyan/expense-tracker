import { useGoogleSheet } from "@utils/googleSheet/hooks/useGoogleSheet";
import { useMemo, useState } from "react";

import { useAuthStore, useSheetStore } from "@stores";
import { useGoogleSheetDoc } from "@utils/googleSheet/hooks/useGoogleSheetDoc";
import { useGoogleSheetQuery } from "@utils/googleSheet/hooks/useGoogleSheetQuery";
import { Text, Fab, ValueCard } from "@components";
import { groupBy } from "lodash";
import moment from "moment";
import {
  displayDateFormat,
  serverDateFormat,
} from "@utils/googleSheet/constants";
import { ExpenseInputModal } from "@features/ExpenseInput";
import { TransactionCard } from "@features/ExpenseList";

export const ExpenseListPage = () => {
  const { token = "" } = useAuthStore();
  const { sheetId = "", sheetIndex } = useSheetStore();
  const googleSheetDocOptions = useMemo(
    () => ({ token, sheetId, sheetIndex }),
    [sheetId, sheetIndex, token]
  );
  const { doc } = useGoogleSheetDoc(googleSheetDocOptions);
  const { sheet } = useGoogleSheet({ doc, sheetIndex });
  const { data = [] } = useGoogleSheetQuery({ sheet });

  const [isOpenExpenseInputModal, setIsOpenExpenseInputModal] = useState(false);

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
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Fab onClick={() => setIsOpenExpenseInputModal(true)}>Add</Fab>

      <ExpenseInputModal
        isOpen={isOpenExpenseInputModal}
        onClose={() => setIsOpenExpenseInputModal(false)}
      />
    </>
  );
};
