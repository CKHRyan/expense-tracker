import { useAuthStore } from "@/stores/authStore";
import { useSheetStore } from "@/stores/sheetStore";
import {
  facadeSheetExpenseRow,
  facadeRawExpenseRecord,
} from "@/utils/googleSheet/helpers";
import { isAxiosError } from "axios";
import {
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { useState, useEffect, useMemo } from "react";

type Params = {
  sheet?: GoogleSpreadsheetWorksheet;
};

export const useGoogleSheetQuery = ({ sheet }: Params) => {
  const { setToken } = useAuthStore();
  const { mutationCounter } = useSheetStore();
  const [rows, setRows] =
    useState<GoogleSpreadsheetRow<Record<string, any>>[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const onError = (err: any) => {
    console.error(err);
    setError(err);
    if (isAxiosError(err) && err.status === 401) {
      setToken(undefined);
    }
  };

  // Init doc
  useEffect(() => {
    if (!sheet) return;

    const setup = async () => {
      try {
        setIsLoading(true);
        const rows = await sheet.getRows();
        setRows(rows);
      } catch (err) {
        onError(err);
      } finally {
        setIsLoading(false);
      }
    };
    setup();
  }, [sheet, mutationCounter]);

  const data = useMemo(
    () =>
      rows?.map((row) => {
        const rawRecord = facadeSheetExpenseRow(row);
        const record = facadeRawExpenseRecord(rawRecord);
        return record;
      }),
    [rows]
  );

  return { data, isLoading, error };
};
