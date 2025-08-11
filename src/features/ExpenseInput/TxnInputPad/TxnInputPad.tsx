import { Text } from "@components";
import { TxnActionPad } from "./TxnActionPad";
import { TxnAmountPad } from "./TxnAmountPad";
import { TxnDescriptionPad } from "./TxnDescriptionPad";
import type {
  CalculatorInterface,
  TransactionInputInterface,
} from "@features/ExpenseInput/hooks";
import { twMerge } from "tailwind-merge";
import { TxnCategoryPad } from "@features/ExpenseInput/TxnInputPad/TxnCategoryPad";

type Props = {
  calculatorProps: CalculatorInterface;
  transactionInputProps: TransactionInputInterface;
  isEdit?: boolean;
  className?: string;
};

export const TxnInputPad = ({
  isEdit,
  calculatorProps,
  transactionInputProps,
  className,
}: Props) => {
  const { displayValue: amount } = calculatorProps;
  const { description, setDescription, date, setDate } = transactionInputProps;

  return (
    <div className={twMerge("flex flex-col", className)}>
      <TxnCategoryPad categoryListClassName="shrink overflow-auto" />
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
