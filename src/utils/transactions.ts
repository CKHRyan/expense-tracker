import { StorageMode } from "@features/ExpenseInput/types";
import { useTransactionStore } from "@stores";
import { facadeRawExpenseRowToSheetRecord } from "@utils/google/googleSheet/helpers/facade";
import type { BaseExpenseRecord } from "@utils/google/googleSheet/types";
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
  const localTransactionUtils = useLocalTransactionUtils();
  const sheetTransactionUtils = useSheetTransactionUtils({
    skip: storageMode !== StorageMode.SHEET,
  });

  switch (storageMode) {
    case StorageMode.LOCAL:
      return localTransactionUtils;
    case StorageMode.SHEET:
      return sheetTransactionUtils;
  }
};
