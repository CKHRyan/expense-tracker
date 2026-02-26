import { useGetExpensesKey } from "src/queries/hooks/useGetExpenses";
import { useGetSheetRowsKey } from "src/queries/hooks/useGetSheet";
import { queryClient } from "src/queries/utils";

export const logError = (err: any) => {
  console.error(err);
};

export const removeGetExpenses = () =>
  Promise.all([
    queryClient.removeQueries({
      queryKey: useGetSheetRowsKey,
    }),
    queryClient.removeQueries({
      queryKey: useGetExpensesKey,
    }),
  ]);
