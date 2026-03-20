import { useGetExpensesKey } from "src/queries/hooks/useGetExpenses";
import { useGetSheetRowsKey } from "src/queries/hooks/useGetSheet";
import { useGoogleUserInfoKey } from "src/queries/hooks/useGoogleUserInfo";
import { queryClient } from "src/queries/utils";

export const logError = (err: any) => {
  console.error(err);
};

export const removeUserInfo = () =>
  queryClient.removeQueries({
    queryKey: useGoogleUserInfoKey,
  });

export const removeGetExpenses = () =>
  Promise.all([
    queryClient.removeQueries({
      queryKey: useGetSheetRowsKey,
    }),
    queryClient.removeQueries({
      queryKey: useGetExpensesKey,
    }),
  ]);
