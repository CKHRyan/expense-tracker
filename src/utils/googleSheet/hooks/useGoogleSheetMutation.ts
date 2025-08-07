import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { useState, useCallback } from "react";
import {
  facadeExpenseRowToSheetRecord,
  isValidExpenseRecord,
} from "../helpers";
import type { ExpenseRecord } from "../types";
import { useSheetStore } from "@/stores/sheetStore";
import { isAxiosError } from "axios";
import { useAuthStore } from "@/stores/authStore";

type Params = {
  sheet?: GoogleSpreadsheetWorksheet;
};

export const useGoogleSheetMutation = ({ sheet }: Params) => {
  const { setToken } = useAuthStore();
  const { triggerMutationCounter } = useSheetStore();
  const [isLoading, setIsLoading] = useState(false);

  const onError = (err: any) => {
    console.error(err);
    if (isAxiosError(err) && err.status === 401) {
      setToken(undefined);
    }
  };

  const createExpenseRecord = useCallback(
    async (record: ExpenseRecord) => {
      try {
        setIsLoading(true);
        if (!sheet) {
          throw new Error("Missing focused sheet");
        }
        if (!isValidExpenseRecord(record)) {
          throw new Error("Invalid expense record");
        }
        await sheet.addRow(facadeExpenseRowToSheetRecord(record));
        triggerMutationCounter();
      } catch (err) {
        onError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [sheet, triggerMutationCounter]
  );

  const updateExpenseRecord = useCallback(
    async (index: number, record: ExpenseRecord) => {
      try {
        setIsLoading(true);
        if (!sheet) {
          throw new Error("Missing focused sheet");
        }
        if (!isValidExpenseRecord(record)) {
          throw new Error("Invalid expense record");
        }
        const rows = await sheet.getRows();
        if (index < 0 || index >= rows.length) {
          throw new Error("Invalid row index");
        }
        rows[index].assign(facadeExpenseRowToSheetRecord(record));
        await rows[index].save();
        triggerMutationCounter();
      } catch (err) {
        onError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [sheet, triggerMutationCounter]
  );

  const deleteExpenseRecord = useCallback(
    async (index: number) => {
      try {
        setIsLoading(true);
        if (!sheet) {
          throw new Error("Missing focused sheet");
        }
        const rows = await sheet.getRows();
        if (index < 0 || index >= rows.length) {
          throw new Error("Invalid row index");
        }
        await rows[index].delete();
        triggerMutationCounter();
      } catch (err) {
        onError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [sheet, triggerMutationCounter]
  );

  return {
    createExpenseRecord,
    updateExpenseRecord,
    deleteExpenseRecord,
    isLoading,
  };
};
