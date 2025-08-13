import { useAuthStore, useSheetStore } from "@stores";
import {
  useGoogleSheetDoc,
  useGoogleSheet,
  useGoogleSheetMutation,
} from "@utils/googleSheet/hooks";
import { useMemo } from "react";
import { facadeExpenseRecordToRaw } from "src/helpers/expense";
import type { ExpenseRecord } from "src/types/expense";

export const useExpenseMutation = () => {
  const { token = "" } = useAuthStore();

  const { sheetId = "", sheetIndex } = useSheetStore();

  const googleSheetDocOptions = useMemo(
    () => ({ token, sheetId, sheetIndex }),
    [sheetId, sheetIndex, token]
  );

  const { doc } = useGoogleSheetDoc(googleSheetDocOptions);

  const { sheet } = useGoogleSheet({ doc, sheetIndex });

  const {
    createExpenseRecord,
    updateExpenseRecord,
    deleteExpenseRecord: deleteExpense,
  } = useGoogleSheetMutation({
    sheet,
  });

  const createExpense = (record: ExpenseRecord) =>
    createExpenseRecord(facadeExpenseRecordToRaw(record));

  const updateExpense = (index: number, record: ExpenseRecord) =>
    updateExpenseRecord(index, facadeExpenseRecordToRaw(record));

  return { createExpense, updateExpense, deleteExpense };
};
