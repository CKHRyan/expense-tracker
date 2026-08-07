import { Button, Modal, Text } from "src/components";
import type { TransactionInputInterface } from "../hooks";
import { useTranslation } from "react-i18next";
import { useToggle } from "src/hooks/useToggle";
import { FormSelect } from "src/components/FormSelect";
import { useConfigStore } from "src/stores/configStore";
import { useLocale } from "src/hooks/useLocale";

type Props = Pick<TransactionInputInterface, "currency" | "setCurrency">;

export const TxnCurrency = ({ currency, setCurrency }: Props) => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  const { currencyRateList } = useConfigStore();

  const [isCurrencyModalOpen, toggleCurrencyModal, setOpenCurrencyModal] =
    useToggle(false);

  const selectCurrencyOption = (option: { label: string; value: string }) => {
    const selectedCurrencyRate = currencyRateList.find(
      (currencyRate) => currencyRate.currency.unit === option?.value,
    );
    if (selectedCurrencyRate) {
      setCurrency(selectedCurrencyRate.currency.unit);
    }
    setOpenCurrencyModal(false);
  };

  const currencyOptions = currencyRateList.map((currencyRate) => ({
    label: `${currencyRate.currency.name[locale]} (${currencyRate.currency.unit})`,
    value: currencyRate.currency.unit,
  }));

  const selectedCurrencyRate = currencyRateList.find(
    (currencyRate) => currencyRate.currency.unit === currency,
  );

  const selectedCurrencyOption = selectedCurrencyRate
    ? {
        label: `${selectedCurrencyRate.currency.name[locale]} (${selectedCurrencyRate.currency.unit})`,
        value: selectedCurrencyRate.currency.unit,
      }
    : undefined;

  return (
    <>
      <Button
        onClick={toggleCurrencyModal}
        variant="text"
        className="p-0 text-xl hover:text-blue-400"
      >
        {currency}
      </Button>
      <Modal
        isOpen={isCurrencyModalOpen}
        onRequestClose={toggleCurrencyModal}
        contentClassname="gap-6 items-center"
      >
        <Text className="text-lg font-semibold">
          {t("expenseInput.currency")}
        </Text>

        <FormSelect
          required
          options={currencyOptions}
          value={selectedCurrencyOption}
          onChange={selectCurrencyOption as any}
          className="w-full"
        />
      </Modal>
    </>
  );
};
