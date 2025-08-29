import { Button, FormTextArea, Icon, Modal, Text } from "@components";
import type { TransactionInputInterface } from "@features/ExpenseInput/hooks";
import { useToggle } from "@hooks/useToggle";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = Pick<TransactionInputInterface, "description" | "setDescription">;

export const TxnDescriptionPad = ({ description, setDescription }: Props) => {
  const { t } = useTranslation();
  const [openDescModal, toggleDescModal] = useToggle(false);
  const [value, setValue] = useState(description ?? "");

  const onDescriptionConfirm = useCallback(() => {
    setDescription(value);
    toggleDescModal();
  }, [setDescription, toggleDescModal, value]);

  useEffect(() => {
    if (openDescModal) {
      setValue(description);
    }
  }, [description, openDescModal]);

  return (
    <>
      <div onClick={toggleDescModal} className="bg-zinc-600 py-1.5 px-4">
        <Text className="font-medium text-center text-ellipsis w-full">
          {description || (
            <>
              {t("expenseInput.addRemarksCta")}&nbsp;&nbsp;
              <Icon
                name="icon-[streamline-ultimate-color--paper-write]"
                className="text-lg"
              />
            </>
          )}
        </Text>
      </div>
      <Modal
        isOpen={openDescModal}
        onRequestClose={toggleDescModal}
        contentClassname="pt-4 pb-6 gap-6 items-center"
      >
        <Text className="text-lg font-semibold">
          {t("expenseInput.remarks")}
        </Text>
        <FormTextArea
          rows={4}
          placeholder={t("expenseInput.remarksPlaceHolder")}
          autoFocus
          className="w-full"
          textAreaClassname="font-medium"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={onDescriptionConfirm} className="w-full font-semibold">
          {t("expenseInput.confirm")}
        </Button>
      </Modal>
    </>
  );
};
