import { ConfirmModalContext } from "@components/Modal/ConfirmModal/ConfirmModalProvider";
import { useCallback, useContext } from "react";

type ConfirmFunc = (
  params: Partial<Record<"title" | "description", string>>,
) => Promise<boolean>;

export const useConfirmModal = () => {
  const { openConfirmModal } = useContext(ConfirmModalContext);

  const confirm: ConfirmFunc = useCallback(
    async ({ title, description }) => {
      const promise = new Promise((resolve, reject) => {
        openConfirmModal({
          title,
          description,
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
    },
    [openConfirmModal],
  );

  return { confirm };
};
