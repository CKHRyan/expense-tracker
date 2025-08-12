import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { useState, useCallback } from "react";
import {
  facadeRawExpenseRowToSheetRecord,
  isValidRawExpenseRecord,
} from "../helpers";
import type { RawExpenseRecord } from "../types";
import { isAxiosError } from "axios";
import { useAuthStore, useSheetStore } from "@stores";

type Params = {
  sheet?: GoogleSpreadsheetWorksheet;
};

export const useGoogleSheetMutation = ({ sheet }: Params) => {
  const { setToken } = useAuthStore();
  const { triggerMutationCounter } = useSheetStore();
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const onError = useCallback(
    (err: any) => {
      console.error(err);
      if (isAxiosError(err) && err.status === 401) {
        setToken(undefined);
      }
    },
    [setToken]
  );

  const createExpenseRecord = useCallback(
    async (record: RawExpenseRecord) => {
      try {
        setIsCreateLoading(true);
        if (!sheet) {
          throw new Error("Missing focused sheet");
        }
        if (!isValidRawExpenseRecord(record)) {
          throw new Error("Invalid expense record");
        }
        await sheet.addRow(facadeRawExpenseRowToSheetRecord(record));
        triggerMutationCounter();
      } catch (err) {
        onError(err);
        throw err;
      } finally {
        setIsCreateLoading(false);
      }
    },
    [onError, sheet, triggerMutationCounter]
  );

  const updateExpenseRecord = useCallback(
    async (index: number, record: RawExpenseRecord) => {
      try {
        setIsUpdateLoading(true);
        if (!sheet) {
          throw new Error("Missing focused sheet");
        }
        if (!isValidRawExpenseRecord(record)) {
          throw new Error("Invalid expense record");
        }
        const rows = await sheet.getRows();
        if (index < 0 || index >= rows.length) {
          throw new Error("Invalid row index");
        }
        rows[index].assign(facadeRawExpenseRowToSheetRecord(record));
        await rows[index].save();
        triggerMutationCounter();
      } catch (err) {
        onError(err);
        throw err;
      } finally {
        setIsUpdateLoading(false);
      }
    },
    [onError, sheet, triggerMutationCounter]
  );

  const deleteExpenseRecord = useCallback(
    async (index: number) => {
      try {
        setIsDeleteLoading(true);
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
        setIsDeleteLoading(false);
      }
    },
    [onError, sheet, triggerMutationCounter]
  );

  return {
    createExpenseRecord,
    isCreateLoading,
    updateExpenseRecord,
    isUpdateLoading,
    deleteExpenseRecord,
    isDeleteLoading,
  };
};
