import { useConfigStore } from "src/stores/configStore";
import { useTranslation } from "react-i18next";
import { BackButtonProps, TopNavBar } from "src/components/TopNavBar";
import { useNavigate } from "node_modules/react-router/dist/development/index.mjs";
import { path } from "src/routes/constants/path";
import { Button, Icon, Text, Title } from "src/components";
import { ListItemCard } from "src/components/ListItemCard";
import { useLocale } from "src/hooks/useLocale";
import { useToggle } from "src/hooks/useToggle";
import type { Currency, CurrencyRate } from "src/features/Currency/types";
import { DEFAULT_CURRENCY } from "src/features/Currency/constants";
import { useState } from "react";
import { formatCurrencyRate } from "src/features/Currency/helpers";
import { CurrencyRateInputModal } from "src/features/Currency/components/CurrencyRateInputModal";

export const CurrencyConfigPage = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  const navigate = useNavigate();

  const navigateBackToMenu = () => navigate(path.menu, { replace: true });

  const {
    defaultCurrency,
    setDefaultCurrency,
    currencyRateList,
    setCurrencyRateList,
  } = useConfigStore();

  const [isCurrencyRateInputModalOpen, _, setOpenCurrencyRateInputModal] =
    useToggle(false);

  const [selectedUpdateCurrencyRate, setSelectedUpdateCurrencyRate] =
    useState<CurrencyRate>();

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
      closeCurrencyRateInputModal();
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
      closeCurrencyRateInputModal();
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
        setDefaultCurrency(DEFAULT_CURRENCY);
      }
    } catch (e) {
      alert(e);
    }
  };

  const selectDefaultCurrency = (selectedCurrencyRate: CurrencyRate) => {
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
      setDefaultCurrency(selectedCurrencyRate.currency);
    } catch (e) {
      alert(e);
    }
  };

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

  const isEditCurrencyRate = !!selectedUpdateCurrencyRate;

  const displayedCurrencyRateList = currencyRateList
    .filter(
      (currencyRate) => currencyRate.currency.unit !== defaultCurrency.unit,
    )
    .sort((a, b) => a.currency.unit.localeCompare(b.currency.unit));

  return (
    <>
      <CurrencyRateInputModal
        isOpen={isCurrencyRateInputModalOpen}
        onRequestClose={closeCurrencyRateInputModal}
        isEdit={isEditCurrencyRate}
        initialValue={selectedUpdateCurrencyRate}
        onConfirm={isEditCurrencyRate ? updateCurrencyRate : addCurrencyRate}
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
              {defaultCurrency.name[locale]} ({defaultCurrency.unit})
            </Text>
          </ListItemCard>
        </div>

        <div className="w-full flex flex-col gap-4">
          <Title className="text-xl">{t("currencyConfig.currencies")}</Title>
          {displayedCurrencyRateList.map((currencyRate) => (
            <ListItemCard
              key={`currency-item-${currencyRate.currency.unit}`}
              className="p-0 overflow-hidden gap-0 sm:gap-1"
            >
              <div className="flex-1 flex gap-4 px-3 py-2">
                <div>
                  <Text className="w-full flex-1">
                    {currencyRate.currency.name[locale]} (
                    {currencyRate.currency.unit})
                  </Text>
                  <Text className="text-left text-gray-400">
                    1 {currencyRate.currency.unit} ={" "}
                    {formatCurrencyRate(currencyRate.rate)}{" "}
                    {defaultCurrency.unit}
                  </Text>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <Button
                    onClick={() => selectDefaultCurrency(currencyRate)}
                    variant="text"
                    className="text-right text-yellow-600 p-0"
                  >
                    {t("currencyConfig.currency.cta.setDefault")}{" "}
                    <Icon name="icon-[material-symbols--move-up-rounded]" />
                  </Button>
                  <Button
                    onClick={() => openCurrencyRateInputModal(currencyRate)}
                    variant="text"
                    className="text-right text-blue-500 p-0"
                  >
                    {t("currencyConfig.currency.cta.setRate")}{" "}
                    <Icon name="icon-[ix--pen]" />
                  </Button>
                </div>
              </div>

              <div className="bg-zinc-600 h-full px-2 py-2 items-center flex">
                <Icon
                  name="icon-[famicons--trash-bin-outline]"
                  onClick={() => removeCurrencyRate(currencyRate)}
                  className="w-[20px] h-[20px]"
                />
              </div>
            </ListItemCard>
          ))}

          <ListItemCard
            onClick={() => openCurrencyRateInputModal()}
            className="p-3 items-center justify-center gap-2"
          >
            <Text className="text-center">
              {t("currencyConfig.currency.cta.add")}
            </Text>
            <Icon name="icon-[fa7-solid--add]" />
          </ListItemCard>
        </div>
      </div>
    </>
  );
};
