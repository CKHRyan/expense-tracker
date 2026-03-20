import { useMutation } from "@tanstack/react-query";
import { removeGetExpenses, logError } from "src/queries/helpers";
import { useAppStore } from "@stores";
import { useTransactionUtils } from "@utils/transactions";

export const useDeleteExpense = () => {
  const { storageMode } = useAppStore();
  const { remove } = useTransactionUtils(storageMode);

  return useMutation({
    mutationFn: async (index: number) => {
      await remove(index);
    },
    onSuccess: removeGetExpenses,
    onError: logError,
  });
};
