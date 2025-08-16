import { useGetExpensesKey } from "src/queries/hooks/useGetExpenses";
import { useGetSheetRowsKey } from "src/queries/hooks/useGetSheet";
import { queryClient } from "src/queries/utils";

export const logError = (err: any) => {
  console.error(err);
};

export const invalidateGetExpenses = () => {
  console.log("invalidate");
  return Promise.all([
    queryClient.invalidateQueries({
      queryKey: useGetSheetRowsKey,
    }),
    queryClient.invalidateQueries({
      queryKey: useGetExpensesKey,
    }),
  ]);
};
