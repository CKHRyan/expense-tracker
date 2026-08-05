import type { BaseExpenseRecord } from "@utils/google/googleSheet/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TransactionState {
  transactions: BaseExpenseRecord[];
  setTransactions: (transactions: BaseExpenseRecord[]) => void;
  clearTransactions: () => void;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      setTransactions: (transactions: BaseExpenseRecord[]) =>
        set({ transactions }),
      clearTransactions: () => set({ transactions: [] }),
    }),
    {
      name: "transaction-storage",
      partialize: ({ transactions }) => ({
        transactions,
      }),
    },
  ),
);
