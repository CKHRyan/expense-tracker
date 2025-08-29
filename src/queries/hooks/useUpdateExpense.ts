import { useGetSheetRows } from "src/queries/hooks/useGetSheet";
import { useMutation } from "@tanstack/react-query";
import {
  facadeRawExpenseRowToSheetRecord,
  isValidBaseExpenseRecord,
} from "@utils/google/googleSheet/helpers/facade";
import { getSheetRowsQueryKeys } from "@utils/google/googleSheet/helpers/spreadsheet";
import { facadeExpenseRecordToBase } from "src/helpers/expense";
import type { ExpenseRecordWithIndex } from "@features/Expense/types";
import { invalidateGetExpenses, logError } from "src/queries/helpers";

export const useUpdateExpenseKey = ["updateExpense"];

export const useUpdateExpense = () => {
  const { data: sheetRows } = useGetSheetRows();

  return useMutation({
    mutationKey: [...useUpdateExpenseKey, ...getSheetRowsQueryKeys(sheetRows)],
    mutationFn: async (record: ExpenseRecordWithIndex) => {
      if (!sheetRows) {
        throw new Error("Missing sheet rows");
      }
      if (!isValidBaseExpenseRecord(record)) {
        throw new Error("Invalid expense record");
      }
      if (record.index < 0 || record.index >= sheetRows.length) {
        throw new Error("Invalid row index");
      }
      const baseExpenseRecord = facadeExpenseRecordToBase(record);
      const rawRecord = facadeRawExpenseRowToSheetRecord(baseExpenseRecord);
      sheetRows[record.index].assign(rawRecord);
      await sheetRows[record.index].save();
    },
    onSuccess: invalidateGetExpenses,
    onError: logError,
  });
};
