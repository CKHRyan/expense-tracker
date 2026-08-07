import { useConfigStore } from "src/stores/configStore";
import type { Currency, CurrencyRate } from "src/features/Currency/types";
import { DEFAULT_CURRENCY } from "src/features/Currency/constants";
import { formatCurrencyRate } from "src/features/Currency/helpers";

export const useCurrencyRateHelper = () => {
  const {
    setBaseCurrency,
    defaultCurrency,
    setDefaultCurrency,
    currencyRateList,
    setCurrencyRateList,
  } = useConfigStore();

  const addCurrencyRate = (addedCurrency: Currency, rate: number) => {
    try {
      if (
        currencyRateList.some(
          ({ currency }) => currency.unit === addedCurrency.unit,
        )
      ) {
        throw new Error("Currency is already added");
      }
      setCurrencyRateList([
        ...currencyRateList,
        { currency: addedCurrency, rate },
      ]);
    } catch (e) {
      alert(e);
    }
  };

  const updateCurrencyRate = (updatedCurrency: Currency, rate: number) => {
    try {
      if (
        !currencyRateList.some(
          ({ currency }) => currency.unit === updatedCurrency.unit,
        )
      ) {
        throw new Error("Updated currency rate does not exist");
      }
      setCurrencyRateList(
        currencyRateList.map((currencyRate) => ({
          ...currencyRate,
          rate:
            currencyRate.currency.unit === updatedCurrency.unit
              ? rate
              : currencyRate.rate,
        })),
      );
    } catch (e) {
      alert(e);
    }
  };

  const removeCurrencyRate = (removedCurrencyRate: CurrencyRate) => {
    try {
      if (
        !currencyRateList.some(
          ({ currency }) => currency.unit === removedCurrencyRate.currency.unit,
        )
      ) {
        throw new Error("Removed currency rate does not exist");
      }
      setCurrencyRateList(
        currencyRateList.filter(
          (currencyRate) =>
            currencyRate.currency.unit !== removedCurrencyRate.currency.unit,
        ),
      );
      if (removedCurrencyRate.currency.unit === defaultCurrency.unit) {
        setBaseCurrency(DEFAULT_CURRENCY);
      }
    } catch (e) {
      alert(e);
    }
  };

  const selectBaseCurrency = (selectedCurrencyRate: CurrencyRate) => {
    try {
      setCurrencyRateList(
        currencyRateList.map((currencyRate) => {
          let rate: number;
          if (
            currencyRate.currency.unit === selectedCurrencyRate.currency.unit
          ) {
            rate = 1;
          } else if (currencyRate.currency.unit === defaultCurrency.unit) {
            rate = 1 / selectedCurrencyRate.rate;
          } else {
            rate = currencyRate.rate / selectedCurrencyRate.rate;
          }
          return {
            ...currencyRate,
            rate: +formatCurrencyRate(rate),
          };
        }),
      );
      setBaseCurrency(selectedCurrencyRate.currency);
    } catch (e) {
      alert(e);
    }
  };

  const selectDefaultCurrency = (selectedCurrencyRate: CurrencyRate) =>
    setDefaultCurrency(selectedCurrencyRate.currency);

  return {
    addCurrencyRate,
    selectBaseCurrency,
    selectDefaultCurrency,
    updateCurrencyRate,
    removeCurrencyRate,
  };
};
