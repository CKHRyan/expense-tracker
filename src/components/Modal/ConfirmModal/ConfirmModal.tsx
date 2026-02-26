import { Text } from "@components/Text";
import { Modal, type ModalProps } from "@components/Modal/Modal";
import { Button } from "@components/Button";
import { useTranslation } from "react-i18next";

export type ConfirmModalProps = Pick<ModalProps, "isOpen"> & {
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const ConfirmModal = ({
  title,
  description,
  onConfirm,
  onCancel,
  ...modalProps
}: ConfirmModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      {...modalProps}
      onRequestClose={onCancel}
      contentClassname="p-6 gap-6 w-[500px]"
    >
      <Text className="text-lg font-semibold">{title}</Text>
      <Text className="text-gray-400">{description}</Text>
      <div className="w-full flex gap-2 justify-end w-100">
        <Button onClick={onCancel} colorVariant="secondary">
          {t("common.cta.cancel")}
        </Button>
        <Button onClick={onConfirm}>{t("common.cta.confirm")}</Button>
      </div>
    </Modal>
  );
};
