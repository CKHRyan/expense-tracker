import { Modal, Text } from "@components";
import type { TransactionInputInterface } from "@features/ExpenseInput/hooks";
import { useToggle } from "@hooks/useToggle";
import { PayerPadButtonCard } from "../PadButtonCard/PayerPadButtonCard";
import { useTransactionStore } from "src/stores";
import { PayerOptionPadButtonCard } from "../PadButtonCard/PayerOptionPadButtonCard";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { AddPayerPadButtonCard } from "../PadButtonCard/AddPayerPadButtonCard";

type Props = { className?: string; style?: CSSProperties } & Pick<
  TransactionInputInterface,
  "payer" | "setPayer"
>;

export const TxnPayerPad = ({ payer, setPayer, className, style }: Props) => {
  const { t } = useTranslation();

  const [openPayerModal, togglePayerModal, setOpenPayerModal] =
    useToggle(false);

  const { payerList, setPayerList } = useTransactionStore();

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

        <div className="flex flex-wrap gap-4 items-center overflow-hidden w-full overflow-visible">
          <PayerOptionPadButtonCard
            payer={null}
            onClick={() => selectPayer("")}
            isSelected={payer === null}
          />
          {payerList.map((payerOption) => (
            <PayerOptionPadButtonCard
              key={`payer-option-${payerOption}`}
              payer={payerOption}
              onClick={() => selectPayer(payerOption)}
              isSelected={payer === payerOption}
              enableRemoveButton
              onRemoveClick={() => removePayerOption(payerOption)}
            />
          ))}
          <AddPayerPadButtonCard />
        </div>
      </Modal>
    </>
  );
};
