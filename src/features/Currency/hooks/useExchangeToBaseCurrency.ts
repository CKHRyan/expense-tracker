import { useConfigStore } from "src/stores/configStore";

export const useExchangeToBaseCurrency = () => {
  const { currencyRateList } = useConfigStore();

  const currencyRateMap = new Map<string, number>(
    currencyRateList.map((currencyRate) => [
      currencyRate.currency.unit,
      currencyRate.rate,
    ]),
  );

  return (amount: number, fromCurrency: string) => {
    const currencyRate = currencyRateMap.get(fromCurrency);
    return currencyRate !== undefined ? amount * currencyRate : undefined;
  };
};
