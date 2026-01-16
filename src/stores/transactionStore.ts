import type { BaseExpenseRecord } from "@utils/google/googleSheet/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TransactionState {
  transactionSheet?: { sheetId: number; spreadsheetId: string };
  setTransactionSheet: (transactionSheet: {
    sheetId: number;
    spreadsheetId: string;
  }) => void;
  transactions: BaseExpenseRecord[];
  setTransactions: (transactions: BaseExpenseRecord[]) => void;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactionSheet: undefined,
      setTransactionSheet: (transactionSheet) => set({ transactionSheet }),
      transactions: [],
      setTransactions: (transactions: BaseExpenseRecord[]) =>
        set({ transactions }),
    }),
    { name: "transaction-storage" }
  )
);
