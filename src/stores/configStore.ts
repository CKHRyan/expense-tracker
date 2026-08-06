import { DEFAULT_CURRENCY } from "src/features/Currency/constants";
import type { Currency, CurrencyRate } from "src/features/Currency/types";
import { SHARED_PAYER_KEY } from "src/features/Payer/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConfigState {
  defaultPayer: string;
  setDefaultPayer: (defaultPayer: string) => void;
  payerList: string[];
  setPayerList: (payerList: string[]) => void;
  clearPayerList: () => void;
  defaultCurrency: Currency;
  setDefaultCurrency: (defaultCurrency: Currency) => void;
  currencyRateList: CurrencyRate[];
  setCurrencyRateList: (currencyRateList: CurrencyRate[]) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      defaultPayer: SHARED_PAYER_KEY,
      setDefaultPayer: (defaultPayer: string) => set({ defaultPayer }),
      payerList: [],
      setPayerList: (payerList: string[]) => set({ payerList }),
      clearPayerList: () => set({ payerList: [] }),
      defaultCurrency: DEFAULT_CURRENCY,
      setDefaultCurrency: (defaultCurrency: Currency) =>
        set({ defaultCurrency }),
      currencyRateList: [{ currency: DEFAULT_CURRENCY, rate: 1 }],
      setCurrencyRateList: (currencyRateList: CurrencyRate[]) =>
        set({ currencyRateList }),
    }),
    {
      name: "config-storage",
      partialize: ({
        defaultPayer,
        payerList,
        defaultCurrency,
        currencyRateList,
      }) => ({
        defaultPayer,
        payerList,
        defaultCurrency,
        currencyRateList,
      }),
    },
  ),
);
