import { useConfigStore } from "src/stores/configStore";
import { useTranslation } from "react-i18next";
import { BackButtonProps, TopNavBar } from "src/components/TopNavBar";
import { useNavigate } from "react-router";
import { path } from "src/routes/constants/path";
import { Text, Title } from "src/components";
import { ListItemCard } from "src/components/ListItemCard";
import { useLocale } from "src/hooks/useLocale";
import { useToggle } from "src/hooks/useToggle";
import type { Currency, CurrencyRate } from "src/features/Currency/types";
import { useState } from "react";
import { CurrencyRateInputModal } from "src/features/Currency/components/CurrencyRateInputModal";
import {
  AddCurrencyRateListItem,
  CurrencyRateList,
} from "src/features/Currency/components/CurrencyRateList";
import type { CurrencyRateAction } from "src/features/Currency/components/CurrencyRateList/types";
import { useCurrencyRateHelper } from "src/features/Currency/hooks/useCurrencyRateHelper";

export const CurrencyConfigPage = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  const navigate = useNavigate();

  const navigateBackToMenu = () => navigate(path.menu, { replace: true });

  const { baseCurrency, defaultCurrency, currencyRateList } = useConfigStore();

  const {
    addCurrencyRate,
    selectBaseCurrency,
    selectDefaultCurrency,
    updateCurrencyRate,
    removeCurrencyRate,
  } = useCurrencyRateHelper();

  const [isCurrencyRateInputModalOpen, _, setOpenCurrencyRateInputModal] =
    useToggle(false);

  const [selectedUpdateCurrencyRate, setSelectedUpdateCurrencyRate] =
    useState<CurrencyRate>();

  const isEditCurrencyRate = !!selectedUpdateCurrencyRate;

  const openCurrencyRateInputModal = (updatedCurrencyRate?: CurrencyRate) => {
    if (updatedCurrencyRate) {
      setSelectedUpdateCurrencyRate(updatedCurrencyRate);
    }
    setOpenCurrencyRateInputModal(true);
  };

  const closeCurrencyRateInputModal = () => {
    setSelectedUpdateCurrencyRate(undefined);
    setOpenCurrencyRateInputModal(false);
  };

  const onCurrencyRateConfirm = (currency: Currency, rate: number) => {
    (isEditCurrencyRate ? updateCurrencyRate : addCurrencyRate)(currency, rate);
    closeCurrencyRateInputModal();
  };

  const displayedCurrencyRateList = currencyRateList
    .filter((currencyRate) => currencyRate.currency.unit !== baseCurrency.unit)
    .sort((a, b) => a.currency.unit.localeCompare(b.currency.unit));

  const currencyRateAction: CurrencyRateAction = {
    setBaseCurrency: selectBaseCurrency,
    setDefaultCurrency: selectDefaultCurrency,
    setCurrencyRate: openCurrencyRateInputModal,
    removeCurrencyRate,
  };

  return (
    <>
      <CurrencyRateInputModal
        isOpen={isCurrencyRateInputModalOpen}
        onRequestClose={closeCurrencyRateInputModal}
        isEdit={isEditCurrencyRate}
        initialValue={selectedUpdateCurrencyRate}
        onConfirm={onCurrencyRateConfirm}
      />

      <TopNavBar
        title={t("currencyConfig.currencySettings")}
        leftButtonProps={{ ...BackButtonProps, onClick: navigateBackToMenu }}
      />

      <div className="px-6 py-8 flex flex-col gap-6 overflow-scroll">
        <div className="w-full flex flex-col gap-4">
          <Title className="text-xl">{t("currencyConfig.baseCurrency")}</Title>
          <ListItemCard className="p-4">
            <Text className="text-center w-full">
              {baseCurrency.name[locale]} ({baseCurrency.unit})
            </Text>
          </ListItemCard>
        </div>

        <div className="w-full flex flex-col gap-4">
          <Title className="text-xl">
            {t("currencyConfig.defaultCurrency")}
          </Title>
          <ListItemCard className="p-4">
            <Text className="text-center w-full">
              {defaultCurrency.name[locale]} ({defaultCurrency.unit})
            </Text>
          </ListItemCard>
        </div>

        <div className="w-full flex flex-col gap-4">
          <Title className="text-xl">{t("currencyConfig.currencies")}</Title>

          <CurrencyRateList
            currencyRates={displayedCurrencyRateList}
            defaultCurrency={defaultCurrency}
            action={currencyRateAction}
            footerComponent={
              <AddCurrencyRateListItem onClick={openCurrencyRateInputModal} />
            }
          />
        </div>
      </div>
    </>
  );
};
