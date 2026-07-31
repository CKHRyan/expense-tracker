import { ConfirmModal, type ConfirmModalProps } from "./ConfirmModal";
import { createContext, useState, type ReactNode } from "react";

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

  const openConfirmModal: ConfirmModalContextType["openConfirmModal"] = (
    params,
  ) => {
    setConfirmModalParams({ isOpen: true, ...params });
  };

  const onClose = () => {
    setConfirmModalParams({ isOpen: false });
  };

  const _onConfirm = () => {
    confirmModalParams.onConfirm?.();
    onClose();
  };

  const _onCancel = () => {
    confirmModalParams.onCancel?.();
    onClose();
  };

  const contextValue = { openConfirmModal };

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
