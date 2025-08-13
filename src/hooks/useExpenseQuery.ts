import { useAuthStore, useSheetStore } from "@stores";
import {
  useGoogleSheetDoc,
  useGoogleSheet,
  useGoogleSheetQuery,
} from "@utils/googleSheet/hooks";

import { useMemo } from "react";
import {
  facadeRawExpenseRecordWithIndex,
  isValidExpenseWithIndex,
} from "src/helpers/expense";
import type { ExpenseRecordWithIndex } from "src/types/expense";

type ExpenseQueryResult = {
  data?: ExpenseRecordWithIndex[];
  isLoading: boolean;
  error: any;
};

export const useExpenseQuery = (): ExpenseQueryResult => {
  const { token = "" } = useAuthStore();

  const { sheetId = "", sheetIndex } = useSheetStore();

  const googleSheetDocOptions = useMemo(
    () => ({ token, sheetId, sheetIndex }),
    [sheetId, sheetIndex, token]
  );

  const { doc, isLoading: isDocLoading } = useGoogleSheetDoc(
    googleSheetDocOptions
  );

  const { sheet, isLoading: isSheetLoading } = useGoogleSheet({
    doc,
    sheetIndex,
  });

  const {
    data: rawData,
    isLoading: isQueryLoading,
    ...otherParams
  } = useGoogleSheetQuery({ sheet });

  const data = useMemo(
    () =>
      rawData
        ?.map(facadeRawExpenseRecordWithIndex)
        .filter(isValidExpenseWithIndex),
    [rawData]
  );

  const isLoading = isDocLoading || isSheetLoading || isQueryLoading;

  return { data, isLoading, ...otherParams };
};
