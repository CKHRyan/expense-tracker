import type { CurrencyRate } from "../../types";

export type CurrencyRateAction = Record<
  | "setBaseCurrency"
  | "setDefaultCurrency"
  | "setCurrencyRate"
  | "removeCurrencyRate",
  (currencyRate: CurrencyRate) => void
>;
