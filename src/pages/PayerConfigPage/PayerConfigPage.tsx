import { useConfigStore } from "src/stores/configStore";
import { PayerOptionPadButtonCard } from "src/features/ExpenseInput/PadButtonCard/PayerOptionPadButtonCard";
import { AddPayerPadButtonCard } from "src/features/ExpenseInput/PadButtonCard/AddPayerPadButtonCard";
import { useTranslation } from "react-i18next";
import { BackButtonProps, TopNavBar } from "src/components/TopNavBar";
import { useNavigate } from "react-router";
import { path } from "src/routes/constants/path";
import { Title } from "src/components";
import { SHARED_PAYER_KEY } from "src/features/Payer/constants";
import { PayerList } from "src/features/Payer/components/PayerList";

export const PayerConfigPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const navigateBackToMenu = () => navigate(path.menu, { replace: true });

  const { defaultPayer, setDefaultPayer, payerList, setPayerList } =
    useConfigStore();

  const removePayerOption = (removedPayer: string) => {
    try {
      if (!payerList.includes(removedPayer)) {
        throw new Error("Removed payer does not exist");
      }
      setPayerList(payerList.filter((p) => p !== removedPayer));
      if (removedPayer === defaultPayer) {
        setDefaultPayer(SHARED_PAYER_KEY);
      }
    } catch (e) {
      alert(e);
    }
  };

  const payerOptions = [SHARED_PAYER_KEY, ...payerList];

  return (
    <>
      <TopNavBar
        title={t("payerConfig.payerSettings")}
        leftButtonProps={{ ...BackButtonProps, onClick: navigateBackToMenu }}
      />
      <div className="px-6 py-8 flex flex-col gap-6  overflow-scroll">
        <div className="w-full flex flex-col gap-4">
          <Title className="text-xl">{t("payerConfig.defaultPayer")}</Title>
          <PayerOptionPadButtonCard payer={defaultPayer} isSelected />
        </div>

        <div className="w-full flex flex-col gap-4">
          <Title className="text-xl">{t("payerConfig.payers")}</Title>
          <PayerList
            payers={payerOptions}
            selectedPayer={defaultPayer}
            onPayerSelect={setDefaultPayer}
            onPayerRemove={removePayerOption}
            suffixComponent={<AddPayerPadButtonCard />}
          />
        </div>
      </div>
    </>
  );
};
