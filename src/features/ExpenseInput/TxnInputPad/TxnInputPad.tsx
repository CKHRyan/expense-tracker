import { Text } from "@components";
import { TxnActionPad } from "@features/ExpenseInput/TxnInputPad/TxnActionPad";
import { TxnAmountPad } from "@features/ExpenseInput/TxnInputPad/TxnAmountPad";
import type { CalculatorInterface } from "@hooks/useCalculator";

type Props = {
  isEdit?: boolean;
  calculatorProps: CalculatorInterface;
};

export const TxnInputPad = ({ isEdit, calculatorProps }: Props) => {
  const { displayValue: amount } = calculatorProps;

  return (
    <div className="bg-zinc-800 p-4 flex flex-col gap-4">
      <Text className="font-bold text-xl">$ {amount.toLocaleString()}</Text>

      <div className="flex gap-2">
        <TxnAmountPad {...calculatorProps} className="flex-1" />
        <TxnActionPad isEdit={isEdit} {...calculatorProps} />
      </div>
    </div>
  );
};
