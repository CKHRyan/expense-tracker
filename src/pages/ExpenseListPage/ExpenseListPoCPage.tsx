import { useGoogleSheet } from "@utils/googleSheet/hooks/useGoogleSheet";
import { useMemo } from "react";
import type { RawExpenseRecord } from "@utils/googleSheet/types";
import moment from "moment";
import { useAuthStore, useSheetStore } from "@stores";
import { serverDatetimeFormat } from "@utils/googleSheet/constants";
import { Button } from "@components";
import {
  useGoogleSheetDoc,
  useGoogleSheetQuery,
  useGoogleSheetMutation,
} from "@utils/googleSheet/hooks";
import { CATEGORY, CATEGORY_GROUP } from "src/constants/expense";

export const ExpenseListPoCPage = () => {
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
    const record: RawExpenseRecord = {
      date: moment().format(serverDatetimeFormat),
      category: CATEGORY_GROUP.Dining,
      item: CATEGORY.Lunch,
      amount: 342,
      remark: "remark",
    };
    await createExpenseRecord(record);
  };

  const update = async () => {
    const record: RawExpenseRecord = {
      date: moment().format(serverDatetimeFormat),
      category: CATEGORY_GROUP.Dining,
      item: CATEGORY.Dinner,
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
