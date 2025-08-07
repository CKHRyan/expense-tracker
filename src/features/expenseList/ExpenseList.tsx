import { useGoogleSheet } from "@utils/googleSheet/hooks/useGoogleSheet";
import { useMemo, useState } from "react";

import { useAuthStore } from "@stores/authStore";
import { useSheetStore } from "@stores/sheetStore";
import { useGoogleSheetDoc } from "@/utils/googleSheet/hooks/useGoogleSheetDoc";
import { useGoogleSheetQuery } from "@/utils/googleSheet/hooks/useGoogleSheetQuery";
import { Text } from "@/components/Text";
import { TransactionCard } from "@/features/expenseList/TransactionCard";
import { groupBy } from "lodash";
import moment from "moment";
import {
  displayDateFormat,
  serverDateFormat,
} from "@/utils/googleSheet/constants";
import { Button } from "@/components/Button";
import { ExpenseInputModal } from "@/features/expenseList/ExpenseInputModal";

export const ExpenseList = () => {
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
        <div className="bg-[#FF4433] p-4 rounded-md">
          <Text>Cumulative Expense</Text>
          <Text className="text-lg font-extrabold">
            ${totalExpense.toLocaleString()}
          </Text>
        </div>

        <div className="flex flex-col gap-4 pb-26">
          <Text className="text-xl font-bold">Transaction Records</Text>
          <div className="flex flex-col gap-4">
            {transactionDates.map((date) => (
              <div className="flex flex-col gap-4">
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

      <div className="fixed z-90 bottom-6 inset-x-0 flex items-center justify-center">
        <Button
          onClick={() => setIsOpenExpenseInputModal(true)}
          className="bg-zinc-700 hover:bg-zinc-600 py-3 px-10 text-lg rounded-full duration-100 cursor-pointer"
        >
          Add
        </Button>
      </div>
      <ExpenseInputModal
        isOpen={isOpenExpenseInputModal}
        onClose={() => setIsOpenExpenseInputModal(false)}
      />
    </>
  );
};
