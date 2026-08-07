import type { CurrencyRate } from "../../types";
import {
  CurrencyRateListItem,
  type CurrencyRateListItemProps,
} from "./CurrencyRateListItem";
import type { ReactNode } from "node_modules/@types/react";

type Props = {
  currencyRates: CurrencyRate[];
  footerComponent?: ReactNode;
} & Pick<CurrencyRateListItemProps, "action" | "defaultCurrency">;

export const CurrencyRateList = ({
  currencyRates,
  defaultCurrency,
  action,
  footerComponent,
}: Props) => (
  <div className="flex flex-col gap-4">
    {currencyRates.map((currencyRate) => (
      <CurrencyRateListItem
        key={`currency-rate-${currencyRate.currency.unit}`}
        currencyRate={currencyRate}
        defaultCurrency={defaultCurrency}
        action={action}
      />
    ))}
    {footerComponent}
  </div>
);
