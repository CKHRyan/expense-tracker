import { Modal, Text } from "@components";
import type { TransactionInputInterface } from "@features/ExpenseInput/hooks";
import { useToggle } from "@hooks/useToggle";
import { PayerPadButtonCard } from "../PadButtonCard/PayerPadButtonCard";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { AddPayerPadButtonCard } from "../PadButtonCard/AddPayerPadButtonCard";
import { useConfigStore } from "src/stores/configStore";
import { SHARED_PAYER_KEY } from "src/features/Payer/constants";
import { PayerList } from "src/features/Payer/components/PayerList";

type Props = { className?: string; style?: CSSProperties } & Pick<
  TransactionInputInterface,
  "payer" | "setPayer"
>;

export const TxnPayerPad = ({ payer, setPayer, className, style }: Props) => {
  const { t } = useTranslation();

  const [openPayerModal, togglePayerModal, setOpenPayerModal] =
    useToggle(false);

  const { payerList, setPayerList } = useConfigStore();

  const selectPayer = (payerOption: string) => {
    setPayer(payerOption);
    setOpenPayerModal(false);
  };

  const removePayerOption = (removedPayer: string) => {
    try {
      if (!payerList.includes(removedPayer)) {
        throw new Error("Removed payer does not exist");
      }
      setPayerList(payerList.filter((p) => p !== removedPayer));
    } catch (e) {
      alert(e);
    }
  };

  const payerOptions = [SHARED_PAYER_KEY, ...payerList];

  return (
    <>
      <PayerPadButtonCard
        payer={payer}
        onClick={togglePayerModal}
        className={className}
        style={style}
      />
      <Modal
        isOpen={openPayerModal}
        onRequestClose={togglePayerModal}
        contentClassname="pt-4 pb-6 gap-6 items-center min-h-[35vh]"
      >
        <Text className="text-lg font-semibold">{t("expenseInput.payer")}</Text>

        <PayerList
          payers={payerOptions}
          selectedPayer={payer}
          onPayerSelect={selectPayer}
          onPayerRemove={removePayerOption}
          suffixComponent={<AddPayerPadButtonCard />}
        />
      </Modal>
    </>
  );
};
