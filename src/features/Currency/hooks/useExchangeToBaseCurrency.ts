import { useCurrencyRateMap } from "./useCurrencyRate";

export const useExchangeToBaseCurrency = () => {
  const currencyRateMap = useCurrencyRateMap();

  return (amount: number, fromCurrency: string) => {
    const { rate } = currencyRateMap.get(fromCurrency) ?? {};
    return rate !== undefined ? amount * rate : undefined;
  };
};
