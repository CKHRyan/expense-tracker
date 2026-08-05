import type { ExpenseRecordWithIndex } from "@features/Expense/types";
import { StorageMode } from "@features/ExpenseInput/types";
import { useAuthStore, useSheetStore, useTransactionStore } from "@stores";
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
import { compact, isNil, uniq } from "lodash";
import { useMemo } from "react";
import {
  facadeBaseExpenseRecordWithIndex,
  isValidExpenseWithIndex,
} from "src/helpers/expense";
import { useGetSheet, useGetSheetRows } from "src/queries/hooks/useGetSheet";
import type { QueryOptions } from "src/queries/types";
import { useConfigStore } from "src/stores/configStore";

interface TransactionUtils {
  get: () => ExpenseRecordWithIndex[] | Promise<ExpenseRecordWithIndex[]>;
  create: (transaction: BaseExpenseRecord) => void | Promise<void>;
  update: (
    index: number,
    transaction: BaseExpenseRecord,
  ) => void | Promise<void>;
  remove: (index: number) => void | Promise<void>;
}

const useLocalTransactionUtils = (): TransactionUtils => {
  const { transactions, setTransactions } = useTransactionStore();

  const get: TransactionUtils["get"] = () => {
    return transactions
      .map(facadeBaseExpenseRecordWithIndex)
      .filter(isValidExpenseWithIndex);
  };

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

  return { get, create, update, remove };
};

const useSheetTransactionUtils = (
  queryOptions?: QueryOptions,
): TransactionUtils => {
  const { data: sheet } = useGetSheet(queryOptions);
  const { data: sheetRows } = useGetSheetRows(queryOptions);

  const { token } = useAuthStore();
  const { spreadsheetId, sheetId } = useSheetStore();

  const get: TransactionUtils["get"] = async () => {
    if (!spreadsheetId || isNil(sheetId)) {
      throw new Error("Missing spreadsheet info");
    }
    const sheetRows = await getSheetRows(spreadsheetId, sheetId, {
      token: token ?? "",
    });
    return sheetRows
      .map((row, index) => {
        const rawSheetRecord = facadeSheetExpenseRow(row);
        const baseExpenseRecord = facadeSheetBaseExpenseRecord(rawSheetRecord);
        const expense = facadeBaseExpenseRecordWithIndex(
          baseExpenseRecord,
          index,
        );
        return expense;
      })
      .filter(isValidExpenseWithIndex);
  };

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

  return { create, update, remove, get };
};

export const useTransactionUtils = (storageMode: StorageMode) => {
  const { token } = useAuthStore();
  const { transactions, setTransactions, clearTransactions } =
    useTransactionStore();
  const { payerList, setPayerList } = useConfigStore();

  const localTransactionUtils = useLocalTransactionUtils();
  const sheetTransactionUtils = useSheetTransactionUtils({
    skip: storageMode !== StorageMode.SHEET,
  });

  const crudUtils = useMemo(() => {
    switch (storageMode) {
      case StorageMode.LOCAL:
        return localTransactionUtils;
      case StorageMode.SHEET:
        return sheetTransactionUtils;
    }
  }, [localTransactionUtils, sheetTransactionUtils, storageMode]);

  const load = async (spreadsheetId: string, sheetId: number) => {
    const sheetRows = await getSheetRows(spreadsheetId, sheetId, {
      token: token ?? "",
    });
    const baseExpenseRecords = sheetRows.map((row) => {
      const rawSheetRecord = facadeSheetExpenseRow(row);
      return facadeSheetBaseExpenseRecord(rawSheetRecord);
    });
    setTransactions(baseExpenseRecords);
    return baseExpenseRecords;
  };

  const loadPayers = async (
    spreadsheetId: string,
    sheetId: number,
    isAppend?: boolean,
  ) => {
    const records = await load(spreadsheetId, sheetId);
    const payers = compact(
      uniq([
        ...(isAppend ? payerList : []),
        ...records.map(({ payer }) => payer),
      ]),
    );
    setPayerList(payers);
    return payers;
  };

  const upload = async (spreadsheetId: string, sheetId: number) => {
    if (!transactions.every(isValidBaseExpenseRecord)) {
      throw new Error("Invalid expense records");
    }

    const doc = await getDoc({ token }, spreadsheetId);
    const sheet = await getSheet(doc, sheetId);

    const rawRecords = transactions.map(facadeRawExpenseRowToSheetRecord);
    await sheet.clearRows();
    await sheet.addRows(rawRecords);
  };

  return {
    ...crudUtils,
    load,
    loadPayers,
    upload,
    clearLocalTransactions: clearTransactions,
  };
};
