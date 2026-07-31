import { ConfirmModalContext } from "@components/Modal/ConfirmModal/ConfirmModalProvider";
import { useContext } from "react";
import type { ConfirmModalProps } from "./ConfirmModal";

type ConfirmFunc = (
  params: Partial<
    Pick<
      ConfirmModalProps,
      "title" | "description" | "confirmLabel" | "cancelLabel"
    >
  >,
) => Promise<boolean>;

export const useConfirmModal = () => {
  const { openConfirmModal } = useContext(ConfirmModalContext);

  const confirm: ConfirmFunc = async ({
    title,
    description,
    confirmLabel,
    cancelLabel,
  }) => {
    const promise = new Promise((resolve, reject) => {
      openConfirmModal({
        title,
        description,
        confirmLabel,
        cancelLabel,
        onConfirm: () => resolve("confirm"),
        onCancel: () => reject("cancel"),
      });
    });

    try {
      await promise;
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_: any) {
      return false;
    }
  };

  return { confirm };
};
