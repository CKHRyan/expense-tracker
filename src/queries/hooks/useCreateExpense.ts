import { useGetSheet } from "src/queries/hooks/useGetSheet";
import { useMutation } from "@tanstack/react-query";
import {
  facadeRawExpenseRowToSheetRecord,
  isValidBaseExpenseRecord,
} from "@utils/googleSheet/helpers/facade";
import { getSheetQueryKeys } from "@utils/googleSheet/helpers/spreadsheet";
import { facadeExpenseRecordToBase } from "src/helpers/expense";
import type { ExpenseRecord } from "src/types/expense";
import { invalidateGetExpenses, logError } from "src/queries/helpers";

export const useCreateExpenseKey = ["createExpense"];

export const useCreateExpense = () => {
  const { data: sheet } = useGetSheet();

  return useMutation({
    mutationKey: [...useCreateExpenseKey, ...getSheetQueryKeys(sheet)],
    mutationFn: async (record: ExpenseRecord) => {
      if (!sheet) {
        throw new Error("Missing sheet");
      }
      if (!isValidBaseExpenseRecord(record)) {
        throw new Error("Invalid expense record");
      }
      const baseExpenseRecord = facadeExpenseRecordToBase(record);
      const rawRecord = facadeRawExpenseRowToSheetRecord(baseExpenseRecord);
      await sheet.addRow(rawRecord);
    },
    onSuccess: invalidateGetExpenses,
    onError: logError,
  });
};
