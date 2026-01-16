import { useMutation } from "@tanstack/react-query";
import { isValidBaseExpenseRecord } from "@utils/google/googleSheet/helpers/facade";
import { facadeExpenseRecordToBase } from "src/helpers/expense";
import type { ExpenseRecord } from "@features/Expense/types";
import { invalidateGetExpenses, logError } from "src/queries/helpers";
import { useAppStore } from "@stores";
import { useTransactionUtils } from "@utils/transactions";

export const useCreateExpense = () => {
  const { storageMode } = useAppStore();
  const { create } = useTransactionUtils(storageMode);

  return useMutation({
    mutationFn: async (record: ExpenseRecord) => {
      const baseExpenseRecord = facadeExpenseRecordToBase(record);
      if (!isValidBaseExpenseRecord(baseExpenseRecord)) {
        throw new Error("Invalid expense record");
      }
      await create(baseExpenseRecord);
    },
    onSuccess: invalidateGetExpenses,
    onError: logError,
  });
};
