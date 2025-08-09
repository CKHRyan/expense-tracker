import { Icon } from "@components";
import {
  RemovePadButtonCard,
  DatePadButtonCard,
  CalcluatePadButtonCard,
  ConfirmPadButtonCard,
} from "@features/ExpenseInput/PadButtonCard";
import type { CalculatorFunc, CalculatorStatus } from "@hooks/useCalculator";

type Props = {
  isEdit?: boolean;
} & CalculatorStatus &
  CalculatorFunc;

export const TxnActionPad = ({
  isEdit,
  isError,
  calculate,
  isCalculable,
}: Props) => {
  return (
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
      <DatePadButtonCard />
      {isCalculable ? (
        <CalcluatePadButtonCard onClick={calculate} />
      ) : (
        <ConfirmPadButtonCard disabled={isError} />
      )}
    </div>
  );
};
