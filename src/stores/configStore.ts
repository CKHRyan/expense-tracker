import { SHARED_PAYER_KEY } from "src/features/Payer/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConfigState {
  defaultPayer: string;
  setDefaultPayer: (defaultPayer: string) => void;
  payerList: string[];
  setPayerList: (payerList: string[]) => void;
  clearPayerList: () => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      defaultPayer: SHARED_PAYER_KEY,
      setDefaultPayer: (defaultPayer: string) => set({ defaultPayer }),
      payerList: [],
      setPayerList: (payerList: string[]) => set({ payerList }),
      clearPayerList: () => set({ payerList: [] }),
    }),
    {
      name: "config-storage",
      partialize: ({ defaultPayer, payerList }) => ({
        defaultPayer,
        payerList,
      }),
    },
  ),
);
