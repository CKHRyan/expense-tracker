import { useGetSheetRows } from "src/queries/hooks/useGetSheet";
import { useMutation } from "@tanstack/react-query";
import { getSheetRowsQueryKeys } from "@utils/google/googleSheet/helpers/spreadsheet";
import { invalidateGetExpenses, logError } from "src/queries/helpers";

export const useDeleteExpenseKey = ["deleteExpense"];

export const useDeleteExpense = () => {
  const { data: sheetRows } = useGetSheetRows();

  return useMutation({
    mutationKey: [...useDeleteExpenseKey, ...getSheetRowsQueryKeys(sheetRows)],
    mutationFn: async (index: number) => {
      if (!sheetRows) {
        throw new Error("Missing sheet rows");
      }
      if (index < 0 || index >= sheetRows.length) {
        throw new Error("Invalid row index");
      }
      await sheetRows[index].delete();
    },
    onSuccess: invalidateGetExpenses,
    onError: logError,
  });
};
