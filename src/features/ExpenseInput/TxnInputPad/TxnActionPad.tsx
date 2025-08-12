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

type Props = { isEdit?: boolean } & CalculatorStatus &
  CalculatorFunc &
  Pick<
    TransactionInputInterface,
    "date" | "setDate" | "submit" | "disabledSubmit"
  >;

export const TxnActionPad = ({
  isEdit,
  isError,
  calculate,
  isCalculable,
  date,
  setDate,
  submit,
  disabledSubmit,
}: Props) => (
  <div className="flex flex-col gap-2 min-w-[70px]">
    {isEdit ? (
      <RemovePadButtonCard />
    ) : (
      <div className="flex items-center justify-center flex-1">
        <Icon
          name="icon-[streamline-stickies-color--money-briefcase]"
          className="text-5xl"
        />
      </div>
    )}
    <TxnDatePad date={date} setDate={setDate} />
    {isCalculable ? (
      <CalcluatePadButtonCard onClick={calculate} />
    ) : (
      <ConfirmPadButtonCard
        onClick={submit}
        disabled={disabledSubmit || isError}
      />
    )}
  </div>
);
