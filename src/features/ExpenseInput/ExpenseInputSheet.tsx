import { TxnInputPad } from "@features/ExpenseInput/TxnInputPad";
import {
  useCalculator,
  useTransactionInput,
} from "@features/ExpenseInput/hooks";
import moment from "moment";
import { useCallback, useEffect, useRef } from "react";
import { Sheet, type SheetRef } from "react-modal-sheet";

const snapPoints = [1, 0];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
};

export const ExpenseInputSheet = ({
  isOpen,
  isEdit = false,
  onClose,
}: Props) => {
  const ref = useRef<SheetRef>(null);

  const calculatorInterface = useCalculator();
  const transactionInputInterface = useTransactionInput();

  useEffect(() => {
    if (isOpen) {
      transactionInputInterface.setDate(moment());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const _onClose = useCallback(() => {
    calculatorInterface.clear();
    transactionInputInterface.clear();
    onClose();
  }, [calculatorInterface, onClose, transactionInputInterface]);

  return (
    <Sheet
      ref={ref}
      isOpen={isOpen}
      onClose={_onClose}
      initialSnap={0}
      snapPoints={snapPoints}
      tweenConfig={{ ease: "easeOut", duration: 0.4 }}
    >
      <Sheet.Container className="overflow-hidden !rounded-tl-xl !rounded-tr-xl">
        <Sheet.Content className="bg-zinc-800 pt-4 h-full">
          <TxnInputPad
            isEdit={isEdit}
            calculatorProps={calculatorInterface}
            transactionInputProps={transactionInputInterface}
            className="h-full"
          />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={_onClose} />
    </Sheet>
  );
};
