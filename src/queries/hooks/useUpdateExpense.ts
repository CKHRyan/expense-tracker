import { useMutation } from "@tanstack/react-query";
import { isValidBaseExpenseRecord } from "@utils/google/googleSheet/helpers/facade";
import type { ExpenseRecordWithIndex } from "@features/Expense/types";
import { removeGetExpenses, logError } from "src/queries/helpers";
import { useTransactionUtils } from "@utils/transactions";
import { useAppStore } from "@stores";
import { facadeExpenseRecordToBase } from "src/helpers/expense";

export const useUpdateExpenseKey = ["updateExpense"];

export const useUpdateExpense = () => {
  const { storageMode } = useAppStore();
  const { update } = useTransactionUtils(storageMode);

  return useMutation({
    mutationFn: async (record: ExpenseRecordWithIndex) => {
      const baseExpenseRecord = facadeExpenseRecordToBase(record);
      if (!isValidBaseExpenseRecord(baseExpenseRecord)) {
        throw new Error("Invalid expense record");
      }
      await update(record.index, baseExpenseRecord);
    },
    onSuccess: removeGetExpenses,
    onError: logError,
  });
};
