import { Icon, Text } from "src/components";
import { Dropdown } from "src/components/Dropdwon";
import { ListItemCard } from "src/components/ListItemCard";
import { formatCurrencyRate } from "../../helpers";
import type { Currency, CurrencyRate } from "../../types";
import { useLocale } from "src/hooks/useLocale";
import { useTranslation } from "node_modules/react-i18next";
import type { CurrencyRateAction } from "./types";
import { compact } from "lodash";
import { DEFAULT_CURRENCY } from "../../constants";

export type CurrencyRateListItemProps = {
  currencyRate: CurrencyRate;
  baseCurrency: Currency;
  defaultCurrency: Currency;
  action: CurrencyRateAction;
};

export const CurrencyRateListItem = ({
  currencyRate,
  baseCurrency,
  defaultCurrency,
  action: {
    setBaseCurrency,
    setDefaultCurrency,
    setCurrencyRate,
    removeCurrencyRate,
  },
}: CurrencyRateListItemProps) => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  const dropdownOptions = compact([
    currencyRate.currency.unit !== baseCurrency.unit && {
      label: t("currencyConfig.currency.cta.setBase"),
      onClick: () => setBaseCurrency(currencyRate),
    },
    currencyRate.currency.unit !== defaultCurrency.unit && {
      label: t("currencyConfig.currency.cta.setDefault"),
      onClick: () => setDefaultCurrency(currencyRate),
    },
    currencyRate.currency.unit !== baseCurrency.unit && {
      label: t("currencyConfig.currency.cta.setRate"),
      onClick: () => setCurrencyRate(currencyRate),
    },
    currencyRate.currency.unit !== DEFAULT_CURRENCY.unit && {
      label: t("currencyConfig.currency.cta.remove"),
      onClick: () => removeCurrencyRate(currencyRate),
      danger: true,
    },
  ]);

  const isShowDropdown = !!dropdownOptions.length;

  return (
    <ListItemCard
      key={`currency-item-${currencyRate.currency.unit}`}
      className="flex-1 flex gap-4 px-3 py-2"
    >
      <div className="flex-1">
        <Text className="w-full flex-1">
          {currencyRate.currency.name[locale]} ({currencyRate.currency.unit})
        </Text>
        <Text className="text-left text-gray-400">
          1 {currencyRate.currency.unit} ={" "}
          {formatCurrencyRate(currencyRate.rate)} {defaultCurrency.unit}
        </Text>
      </div>

      {isShowDropdown && (
        <Dropdown
          buttonComponent={
            <Icon
              name="icon-[mage--dots]"
              className="w-[32px] h-[24px] text-white"
            />
          }
          options={dropdownOptions}
        />
      )}
    </ListItemCard>
  );
};
