export type Currency = {
  unit: string;
  name: {
    en: string;
    zh: string;
  };
};

export type CurrencyRate = {
  currency: Currency;
  rate: number;
};
