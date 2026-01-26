import { StorageMode } from "@features/ExpenseInput/types";
import { useAuthStore, useTransactionStore } from "@stores";
import {
  facadeRawExpenseRowToSheetRecord,
  facadeSheetBaseExpenseRecord,
  facadeSheetExpenseRow,
  isValidBaseExpenseRecord,
} from "@utils/google/googleSheet/helpers/facade";
import {
  getDoc,
  getSheet,
  getSheetRows,
} from "@utils/google/googleSheet/helpers/spreadsheet";
import type { BaseExpenseRecord } from "@utils/google/googleSheet/types";
import { useCallback, useMemo } from "react";
import { useGetSheet, useGetSheetRows } from "src/queries/hooks/useGetSheet";
import type { QueryOptions } from "src/queries/types";

interface TransactionUtils {
  create: (transaction: BaseExpenseRecord) => void | Promise<void>;
  update: (
    index: number,
    transaction: BaseExpenseRecord
  ) => void | Promise<void>;
  remove: (index: number) => void | Promise<void>;
}

const useLocalTransactionUtils = (): TransactionUtils => {
  const { transactions, setTransactions } = useTransactionStore();

  const create: TransactionUtils["create"] = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const update: TransactionUtils["update"] = (index, transaction) => {
    const updatedTransactions = [...transactions];
    updatedTransactions[index] = transaction;
    setTransactions(updatedTransactions);
  };

  const remove: TransactionUtils["remove"] = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  return { create, update, remove };
};

const useSheetTransactionUtils = (
  queryOptions?: QueryOptions
): TransactionUtils => {
  const { data: sheet } = useGetSheet(queryOptions);
  const { data: sheetRows } = useGetSheetRows(queryOptions);

  const create: TransactionUtils["create"] = async (transaction) => {
    if (!sheet) {
      throw new Error("Missing sheet");
    }
    const rawRecord = facadeRawExpenseRowToSheetRecord(transaction);
    await sheet.addRow(rawRecord);
  };

  const update: TransactionUtils["update"] = async (index, transaction) => {
    if (!sheetRows) {
      throw new Error("Missing sheet rows");
    }
    if (index < 0 || index >= sheetRows.length) {
      throw new Error("Invalid row index");
    }
    const rawRecord = facadeRawExpenseRowToSheetRecord(transaction);
    sheetRows[index].assign(rawRecord);
    await sheetRows[index].save();
  };

  const remove: TransactionUtils["remove"] = async (index) => {
    if (!sheetRows) {
      throw new Error("Missing sheet rows");
    }
    if (index < 0 || index >= sheetRows.length) {
      throw new Error("Invalid row index");
    }
    await sheetRows[index].delete();
  };

  return { create, update, remove };
};

export const useTransactionUtils = (storageMode: StorageMode) => {
  const { token } = useAuthStore();
  const {
    transactions,
    transactionSheet,
    setTransactions,
    setTransactionSheet,
  } = useTransactionStore();

  const localTransactionUtils = useLocalTransactionUtils();
  const sheetTransactionUtils = useSheetTransactionUtils({
    skip: storageMode !== StorageMode.SHEET,
  });

  const mutationUtils = useMemo(() => {
    switch (storageMode) {
      case StorageMode.LOCAL:
        return localTransactionUtils;
      case StorageMode.SHEET:
        return sheetTransactionUtils;
    }
  }, [localTransactionUtils, sheetTransactionUtils, storageMode]);

  const load = useCallback(
    async (spreadsheetId: string, sheetId: number) => {
      if (
        transactionSheet &&
        (transactionSheet.spreadsheetId !== spreadsheetId ||
          transactionSheet.sheetId !== sheetId)
        // TODO: Add condition for un-uploaded local transactions
      ) {
        // TODO: Prompt to save to sheet before load
      }
      const sheetRows = await getSheetRows(spreadsheetId, sheetId, {
        token: token ?? "",
      });
      const baseExpenseRecords = sheetRows.map((row) => {
        const rawSheetRecord = facadeSheetExpenseRow(row);
        return facadeSheetBaseExpenseRecord(rawSheetRecord);
      });
      setTransactionSheet({ spreadsheetId, sheetId });
      setTransactions(baseExpenseRecords);
    },
    [setTransactionSheet, setTransactions, token, transactionSheet]
  );

  const upload = useCallback(
    async (spreadsheetId: string, sheetId: number) => {
      if (!transactions.every(isValidBaseExpenseRecord)) {
        throw new Error("Invalid expense records");
      }

      const doc = await getDoc({ token }, spreadsheetId);
      const sheet = await getSheet(doc, sheetId);

      const rawRecords = transactions.map(facadeRawExpenseRowToSheetRecord);
      await sheet.clearRows();
      await sheet.addRows(rawRecords);
    },
    [token, transactions]
  );

  return { ...mutationUtils, load, upload };
};
