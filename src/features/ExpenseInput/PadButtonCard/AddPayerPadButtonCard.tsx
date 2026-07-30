import { Button, FormInput, Icon, Modal, Text } from "@components";
import { useToggle } from "@hooks/useToggle";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PadButtonCard } from "./PadButtonCard";
import { useTransactionStore } from "src/stores";

export const AddPayerPadButtonCard = () => {
  const { t } = useTranslation();

  const { payerList, setPayerList } = useTransactionStore();

  const [openAddPayerModal, toggleAddPayerModal, setOpenAddPayerModal] =
    useToggle(false);
  const [prevOpenAddPayerModal, setPrevOpenAddPayerModal] = useState(false);

  const [value, setValue] = useState("");

  // Reset value on closing add payer modal
  if (openAddPayerModal !== prevOpenAddPayerModal) {
    setValue("");
    setPrevOpenAddPayerModal(openAddPayerModal);
  }

  const confirmAddPayerOption = (newPayer: string) => {
    try {
      if (payerList.includes(newPayer.trim())) {
        throw new Error("Payer already exists");
      }
      setPayerList([...payerList, newPayer.trim()]);
      setOpenAddPayerModal(false);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <PadButtonCard
        className="flex-0 min-w-[4rem]"
        onClick={toggleAddPayerModal}
      >
        <Icon name="icon-[fa7-solid--add]" />
      </PadButtonCard>
      <Modal
        isOpen={openAddPayerModal}
        onRequestClose={toggleAddPayerModal}
        contentClassname="pt-4 pb-6 gap-6 items-center"
      >
        <Text className="text-lg font-semibold">
          {t("expenseInput.addPayer")}
        </Text>
        <FormInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t("expenseInput.addPayerPlaceholder")}
          autoFocus
          className="w-full"
        />
        <Button
          onClick={() => confirmAddPayerOption?.(value)}
          disabled={!value.trim()}
          className="w-full font-semibold"
        >
          {t("expenseInput.confirm")}
        </Button>
      </Modal>
    </>
  );
};
