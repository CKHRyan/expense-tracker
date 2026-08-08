import { useConfigStore } from "src/stores/configStore";
import type { CurrencyRate } from "../types";

export const useCurrencyRateMap = () => {
  const { currencyRateList } = useConfigStore();

  return new Map<string, CurrencyRate>(
    currencyRateList.map((currencyRate) => [
      currencyRate.currency.unit,
      currencyRate,
    ]),
  );
};
