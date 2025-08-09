import { TxnInputPad } from "@features/ExpenseInput/TxnInputPad";
import { useCalculator } from "@hooks/useCalculator";
import { useCallback, useRef } from "react";
import { Sheet, type SheetRef } from "react-modal-sheet";

const snapPoints = [1, 0];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
};

export const ExpenseInputModal = ({
  isOpen,
  isEdit = false,
  onClose,
}: Props) => {
  const ref = useRef<SheetRef>(null);

  const calculatorInterface = useCalculator();

  const _onClose = useCallback(() => {
    calculatorInterface.clear();
    onClose();
  }, [calculatorInterface, onClose]);

  return (
    <Sheet
      ref={ref}
      isOpen={isOpen}
      onClose={_onClose}
      initialSnap={0}
      snapPoints={snapPoints}
      tweenConfig={{ ease: "easeOut", duration: 0.4 }}
    >
      <Sheet.Container className="bg-[#242424]!">
        <Sheet.Content>
          <div className="flex-1" />

          <TxnInputPad isEdit={isEdit} calculatorProps={calculatorInterface} />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={_onClose} />
    </Sheet>
  );
};
