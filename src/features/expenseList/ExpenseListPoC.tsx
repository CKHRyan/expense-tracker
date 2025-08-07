import { useGoogleSheet } from "@utils/googleSheet/hooks/useGoogleSheet";
import { useMemo } from "react";
import type { ExpenseRecord } from "@utils/googleSheet/types";

import moment from "moment";
import { useAuthStore } from "@stores/authStore";
import { useSheetStore } from "@stores/sheetStore";
import { Button } from "@components/Button";
import { serverDatetimeFormat } from "@/utils/googleSheet/constants";
import { useGoogleSheetDoc } from "@/utils/googleSheet/hooks/useGoogleSheetDoc";
import { useGoogleSheetQuery } from "@/utils/googleSheet/hooks/useGoogleSheetQuery";
import { useGoogleSheetMutation } from "@/utils/googleSheet/hooks/useGoogleSheetMutation";

export const ExpenseListPoC = () => {
  const { token = "" } = useAuthStore();
  const { sheetId = "", sheetIndex } = useSheetStore();
  const googleSheetDocOptions = useMemo(
    () => ({ token, sheetId, sheetIndex }),
    [sheetId, sheetIndex, token]
  );

  const { doc } = useGoogleSheetDoc(googleSheetDocOptions);
  const { sheet } = useGoogleSheet({ doc, sheetIndex });
  const { data } = useGoogleSheetQuery({ sheet });
  const { createExpenseRecord, updateExpenseRecord, deleteExpenseRecord } =
    useGoogleSheetMutation({ sheet });

  const create = async () => {
    const record: ExpenseRecord = {
      date: moment().format(serverDatetimeFormat),
      category: "food",
      item: "lunch",
      amount: 342,
      remark: "remark",
    };
    await createExpenseRecord(record);
  };

  const update = async () => {
    const record: ExpenseRecord = {
      date: moment().format(serverDatetimeFormat),
      category: "food",
      item: "dinner",
      amount: 342,
      remark: "remark",
    };
    await updateExpenseRecord(0, record);
  };

  const remove = async () => {
    await deleteExpenseRecord(2);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Button onClick={create}>Add expense</Button>
      <Button onClick={update}>Update expense</Button>
      <Button onClick={remove}>Delete expense</Button>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};
