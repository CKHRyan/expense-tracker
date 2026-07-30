import { Icon } from "@components";
import {
  RemovePadButtonCard,
  CalcluatePadButtonCard,
  ConfirmPadButtonCard,
} from "@features/ExpenseInput/PadButtonCard";
import { TxnDatePad } from "@features/ExpenseInput/TxnInputPad/TxnDatePad";
import type {
  CalculatorFunc,
  CalculatorStatus,
  TransactionInputInterface,
} from "@features/ExpenseInput/hooks";
import { TxnPayerPad } from "./TxnPayerPad";
import { useComponentSize } from "src/helpers/useComponentSize";

type Props = { isEdit?: boolean } & CalculatorStatus &
  CalculatorFunc &
  Pick<
    TransactionInputInterface,
    | "date"
    | "setDate"
    | "payer"
    | "setPayer"
    | "create"
    | "edit"
    | "remove"
    | "disabledSubmit"
  >;

export const TxnActionPad = ({
  isEdit,
  isError,
  calculate,
  isCalculable,
  date,
  setDate,
  payer,
  setPayer,
  create,
  edit,
  remove,
  disabledSubmit,
}: Props) => {
  const { width: datePadWidth, ref: datePadRef } = useComponentSize();

  return (
    <div className="flex flex-col gap-2 min-w-[70px]">
      {isEdit ? (
        <RemovePadButtonCard onClick={remove} />
      ) : (
        <div className="flex items-center justify-center flex-1">
          <Icon
            name="icon-[streamline-stickies-color--money-briefcase]"
            className="text-5xl"
          />
        </div>
      )}
      <TxnPayerPad
        payer={payer}
        setPayer={setPayer}
        style={{ maxWidth: Math.max(datePadWidth, 50) }}
      />
      <TxnDatePad ref={datePadRef} date={date} setDate={setDate} />
      {isCalculable ? (
        <CalcluatePadButtonCard onClick={calculate} />
      ) : (
        <ConfirmPadButtonCard
          onClick={isEdit ? edit : create}
          disabled={disabledSubmit || isError}
        />
      )}
    </div>
  );
};
