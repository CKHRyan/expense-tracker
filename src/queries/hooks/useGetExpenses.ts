import { useGetSheetRows } from "src/queries/hooks/useGetSheet";
import { useQuery } from "@tanstack/react-query";
import {
  facadeSheetExpenseRow,
  facadeSheetBaseExpenseRecord,
} from "@utils/googleSheet/helpers/facade";
import { getSheetRowsQueryKeys } from "@utils/googleSheet/helpers/spreadsheet";
import {
  facadeBaseExpenseRecordWithIndex,
  isValidExpenseWithIndex,
} from "src/helpers/expense";

type Params = { lazy?: boolean };

export const useGetExpensesKey = ["getExpenses"];

export const useGetExpenses = (params?: Params) => {
  const { lazy = false } = params ?? {};
  const {
    data: sheetRows,
    isFetched: isSheetRowsFetched,
    isLoading: isSheetRowsLoading,
  } = useGetSheetRows();

  const { isLoading: isQueryLoading, ...queryResult } = useQuery({
    queryKey: [...useGetExpensesKey, ...getSheetRowsQueryKeys(sheetRows)],
    queryFn: async () => {
      if (!sheetRows) {
        throw new Error("Missing sheet rows");
      }
      return sheetRows
        .map((row, index) => {
          const rawSheetRecord = facadeSheetExpenseRow(row);
          const baseExpenseRecord =
            facadeSheetBaseExpenseRecord(rawSheetRecord);
          const expense = facadeBaseExpenseRecordWithIndex(
            baseExpenseRecord,
            index
          );
          return expense;
        })
        .filter(isValidExpenseWithIndex);
    },
    enabled: isSheetRowsFetched && !lazy,
  });

  return { isLoading: isSheetRowsLoading || isQueryLoading, ...queryResult };
};
