import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { PadButtonCard } from "@/features/expenseList/PadButtonCard";
import { TxnAmountPad } from "@/features/expenseList/TxnAmountPad";
import { useCalculator } from "@/hooks/useCalculator";
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
  const {
    displayValue: amount,
    clear: resetCalculator,
    calculate,
    isCalculable,
  } = calculatorInterface;

  const _onClose = useCallback(() => {
    resetCalculator();
    onClose();
  }, [resetCalculator, onClose]);

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
          <div className="flex-1"></div>
          <div className="bg-zinc-800 p-4 flex flex-col gap-4">
            <Text className="font-bold text-xl">
              $ {amount.toLocaleString()}
            </Text>
            <div className="flex gap-2">
              <TxnAmountPad {...calculatorInterface} className="flex-1" />
              <div className="flex flex-col gap-2 min-w-[70px]">
                {isEdit ? (
                  <PadButtonCard className="bg-red-500">Remove</PadButtonCard>
                ) : (
                  <div className="flex items-center justify-center flex-1">
                    <Icon
                      name="icon-[streamline-stickies-color--money-briefcase]"
                      className="text-5xl"
                    />
                  </div>
                )}
                <PadButtonCard className="bg-green-600">
                  <Icon
                    name="icon-[solar--calendar-bold]"
                    className="text-3xl"
                  />
                </PadButtonCard>
                {isCalculable ? (
                  <PadButtonCard className="bg-blue-500" onClick={calculate}>
                    <Icon name="icon-[fa7-solid--equals]" />
                  </PadButtonCard>
                ) : (
                  <PadButtonCard className="bg-blue-500">
                    <Icon
                      name="icon-[icon-park-solid--transaction]"
                      className="text-3xl"
                    />
                  </PadButtonCard>
                )}
              </div>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={_onClose} />
    </Sheet>
  );
};
