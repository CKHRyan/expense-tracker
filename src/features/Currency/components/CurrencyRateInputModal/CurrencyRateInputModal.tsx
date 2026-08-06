import { useTranslation } from "react-i18next";
import { Button, FormInput, Modal, Text } from "src/components";
import { CURRENCY_LIST } from "src/features/Currency/constants";
import { FormSelect } from "src/components/FormSelect";
import { useConfigStore } from "src/stores/configStore";
import { useLocale } from "src/hooks/useLocale";
import { useState } from "react";
import type { Currency, CurrencyRate } from "../../types";
import type { ModalProps } from "src/components/Modal/Modal";
import { twMerge } from "tailwind-merge";

type Props = {
  isEdit: boolean;
  initialValue?: CurrencyRate;
  onConfirm?: (currency: Currency, rate: number) => void;
} & ModalProps;

export const CurrencyRateInputModal = ({
  isEdit,
  initialValue,
  onConfirm,
  onRequestClose,
  ...modalProps
}: Props) => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  const { currencyRateList } = useConfigStore();

  const [inputCurrency, setInputCurrency] = useState<Currency | null>(
    initialValue?.currency ?? null,
  );
  const [inputCurrencyRate, setInputCurrencyRate] = useState<number>(
    initialValue?.rate ?? 1,
  );

  const [prevInitialValue, setPrevInitialValue] = useState<
    CurrencyRate | undefined
  >(initialValue);

  if (prevInitialValue !== initialValue) {
    if (initialValue) {
      setInputCurrency(initialValue.currency);
      setInputCurrencyRate(initialValue.rate);
    }
    setPrevInitialValue(initialValue);
  }

  const _onRequestClose: ModalProps["onRequestClose"] = (event) => {
    setInputCurrency(null);
    setInputCurrencyRate(1);
    onRequestClose?.(event);
  };

  const currencyOptions = CURRENCY_LIST.filter(
    (currency) =>
      !currencyRateList.some(
        (currencyRate) => currencyRate.currency.unit === currency.unit,
      ),
  ).map((currency) => ({
    label: `${currency.name[locale]} (${currency.unit})`,
    value: currency.unit,
  }));

  const value = inputCurrency
    ? {
        label: inputCurrency
          ? `${inputCurrency.name[locale]} (${inputCurrency.unit})`
          : "",
        value: inputCurrency?.unit,
      }
    : undefined;

  return (
    <Modal
      {...modalProps}
      onRequestClose={_onRequestClose}
      contentClassname={twMerge(
        "pt-4 pb-6 gap-6 items-center",
        modalProps.contentClassname,
      )}
    >
      <Text className="text-lg font-semibold">
        {isEdit
          ? t("currencyConfig.currency.input.setRate")
          : t("currencyConfig.currency.input.addCurrency")}
      </Text>
      <FormSelect
        label={t("currencyConfig.currency.input.currencyRate.label")}
        required
        options={currencyOptions}
        value={value}
        onChange={(option: any) => {
          const currency = CURRENCY_LIST.find(
            (currency) => currency.unit === option?.value,
          );
          if (currency) {
            setInputCurrency(currency);
          }
        }}
        isDisabled={isEdit}
        className="w-full"
      />
      <FormInput
        required
        value={inputCurrencyRate}
        onChange={(e) => setInputCurrencyRate(Number(e.target.value))}
        label={t("currencyConfig.currency.input.currencyRate.label")}
        className="w-full"
        type="number"
      />
      <Button
        onClick={() =>
          inputCurrency &&
          inputCurrencyRate &&
          onConfirm?.(inputCurrency, inputCurrencyRate)
        }
        disabled={!inputCurrency || !inputCurrencyRate}
        className="w-full font-semibold"
      >
        {t("expenseInput.confirm")}
      </Button>
    </Modal>
  );
};
