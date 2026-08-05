import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConfigState {
  payerList: string[];
  setPayerList: (payerList: string[]) => void;
  clearPayerList: () => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      payerList: [],
      setPayerList: (payerList: string[]) => set({ payerList }),
      clearPayerList: () => set({ payerList: [] }),
    }),
    {
      name: "transaction-storage",
      partialize: ({ payerList }) => ({
        payerList,
      }),
    },
  ),
);
