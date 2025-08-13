import { Text } from "@components";
import { TxnInputPad } from "@features/ExpenseInput/TxnInputPad";
import {
  useCalculator,
  useTransactionInput,
} from "@features/ExpenseInput/hooks";
import type { ExpenseSheetParams } from "@stores/appStore";
import moment from "moment";
import { useCallback, useEffect, useRef } from "react";
import { Sheet, type SheetRef } from "react-modal-sheet";

const snapPoints = [1, 0];

type Props = {
  onClose: () => void;
} & ExpenseSheetParams;

export const ExpenseInputSheet = ({
  isOpen,
  isEdit = false,
  expenseRecord,
  onClose,
}: Props) => {
  const ref = useRef<SheetRef>(null);

  const transactionInputInterface = useTransactionInput({
    onSubmit: onClose,
    editIndex: expenseRecord?.index,
  });
  const {
    setDate,
    setCategory,
    setAmount,
    setDescription,
    clear: clearTransactionInput,
  } = transactionInputInterface;

  const calculatorInterface = useCalculator({
    onChange: setAmount,
  });
  const { setCalculatorValue, clear: clearCalculator } = calculatorInterface;

  useEffect(() => {
    if (isOpen) {
      if (isEdit) {
        if (!expenseRecord) throw new Error("Missing expense record");
        setDate(expenseRecord.date);
        setCategory(expenseRecord.item);
        setCalculatorValue(expenseRecord.amount);
        setDescription(expenseRecord.remark);
      } else {
        setDate(moment());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const _onClose = useCallback(() => {
    clearCalculator();
    clearTransactionInput();
    onClose();
  }, [clearCalculator, clearTransactionInput, onClose]);

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
        <Sheet.Content className="bg-zinc-800 pt-4 h-full gap-1">
          <Text className="text-center font-semibold">
            {isEdit ? "Edit Transaction" : "Add Transaction"}
          </Text>
          <TxnInputPad
            isEdit={isEdit}
            calculatorProps={calculatorInterface}
            transactionInputProps={transactionInputInterface}
            className="flex-1"
          />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={_onClose} />
    </Sheet>
  );
};
