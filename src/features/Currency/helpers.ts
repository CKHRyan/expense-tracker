import { CURRENCY_AMOUNT_DECIMAL_PLACES, RATE_PRICISION } from "./constants";

export const formatCurrencyRate = (rate: number) => {
  if (rate < 0) {
    return rate.toPrecision(RATE_PRICISION);
  }
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: RATE_PRICISION,
  });
  return formatter.format(rate);
};

export const formatCurrencyAmount = (amount: number) => {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: CURRENCY_AMOUNT_DECIMAL_PLACES,
  });
};
