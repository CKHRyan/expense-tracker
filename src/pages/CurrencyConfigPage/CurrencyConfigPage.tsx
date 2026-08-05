import { useConfigStore } from "src/stores/configStore";
import { useTranslation } from "react-i18next";
import { BackButtonProps, TopNavBar } from "src/components/TopNavBar";
import { useNavigate } from "node_modules/react-router/dist/development/index.mjs";
import { path } from "src/routes/constants/path";
import { Title } from "src/components";

export const CurrencyConfigPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const navigateBackToMenu = () => navigate(path.menu, { replace: true });

  const {} = useConfigStore();

  const addCurrencyOption = (removedCurrency: string) => {
    try {
      // if (!payerList.includes(removedPayer)) {
      //   throw new Error("Removed payer does not exist");
      // }
      // setPayerList(payerList.filter((p) => p !== removedPayer));
      // if (removedPayer === defaultPayer) {
      //   setDefaultPayer(SHARED_PAYER_KEY);
      // }
    } catch (e) {
      alert(e);
    }
  };

  const removeCurrencyOption = (removedCurrency: string) => {
    try {
      // if (!payerList.includes(removedPayer)) {
      //   throw new Error("Removed payer does not exist");
      // }
      // setPayerList(payerList.filter((p) => p !== removedPayer));
      // if (removedPayer === defaultPayer) {
      //   setDefaultPayer(SHARED_PAYER_KEY);
      // }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <TopNavBar
        title={t("currencyConfig.currencySettings")}
        leftButtonProps={{ ...BackButtonProps, onClick: navigateBackToMenu }}
      />
      <div className="px-6 py-8 flex flex-col gap-6">
        <div className="w-full flex flex-col gap-4">
          <Title className="text-xl">{t("currencyConfig.baseCurrency")}</Title>
          Coming soon...
        </div>

        <div className="w-full flex flex-col gap-4">
          <Title className="text-xl">{t("currencyConfig.currencies")}</Title>
          Coming soon...
        </div>
      </div>
    </>
  );
};
