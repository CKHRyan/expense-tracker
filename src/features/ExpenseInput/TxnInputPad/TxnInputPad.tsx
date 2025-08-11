import { Text } from "@components";
import { TxnActionPad } from "./TxnActionPad";
import { TxnAmountPad } from "./TxnAmountPad";
import { TxnDescriptionPad } from "./TxnDescriptionPad";
import type {
  CalculatorInterface,
  TransactionInputInterface,
} from "@features/ExpenseInput/hooks";

type Props = {
  calculatorProps: CalculatorInterface;
  transactionInputProps: TransactionInputInterface;
  isEdit?: boolean;
};

export const TxnInputPad = ({
  isEdit,
  calculatorProps,
  transactionInputProps,
}: Props) => {
  const { displayValue: amount } = calculatorProps;
  const { description, setDescription, date, setDate } = transactionInputProps;

  return (
    <div className="bg-zinc-800">
      <TxnDescriptionPad
        description={description}
        setDescription={setDescription}
      />
      <div className="flex flex-col gap-4 px-4 pb-4 pt-3">
        <Text className="font-bold text-xl">$ {amount.toLocaleString()}</Text>
        <div className="flex gap-2">
          <TxnAmountPad {...calculatorProps} className="flex-1" />
          <TxnActionPad
            isEdit={isEdit}
            {...calculatorProps}
            date={date}
            setDate={setDate}
          />
        </div>
      </div>
    </div>
  );
};
