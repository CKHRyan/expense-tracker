import { ConfirmModal, type ConfirmModalProps } from "./ConfirmModal";
import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ConfirmModalContextType = {
  openConfirmModal: (params: Omit<ConfirmModalProps, "isOpen">) => void;
};

const initialValues: ConfirmModalContextType = {
  openConfirmModal: () => {},
};

export const ConfirmModalContext =
  createContext<ConfirmModalContextType>(initialValues);

type Props = { children?: ReactNode };

export const ConfirmModalProvider = ({ children }: Props) => {
  const [confirmModalParams, setConfirmModalParams] =
    useState<ConfirmModalProps>({ isOpen: false });

  const openConfirmModal: ConfirmModalContextType["openConfirmModal"] =
    useCallback((params) => {
      setConfirmModalParams({ isOpen: true, ...params });
    }, []);

  const onClose = useCallback(() => {
    setConfirmModalParams({ isOpen: false });
  }, []);

  const _onConfirm = useCallback(() => {
    confirmModalParams.onConfirm?.();
    onClose();
  }, [confirmModalParams, onClose]);

  const _onCancel = useCallback(() => {
    confirmModalParams.onCancel?.();
    onClose();
  }, [confirmModalParams, onClose]);

  const contextValue = useMemo(
    () => ({ openConfirmModal }),
    [openConfirmModal],
  );

  return (
    <ConfirmModalContext value={contextValue}>
      {children}
      <ConfirmModal
        {...confirmModalParams}
        onConfirm={_onConfirm}
        onCancel={_onCancel}
      />
    </ConfirmModalContext>
  );
};
