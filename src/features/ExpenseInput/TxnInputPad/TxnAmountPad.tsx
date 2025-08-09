import { Icon } from "@components";
import { PadButtonCard } from "../PadButtonCard";
import type {
  CalculatorDecimalKey,
  CalculatorDigitKey,
  CalculatorFunc,
  CalculatorOpKey,
  CalculatorStatus,
} from "@hooks/useCalculator";
import { twMerge } from "tailwind-merge";

const operatorIcons: Record<CalculatorOpKey, string> = {
  "+": "icon-[fa7-solid--plus]",
  "-": "icon-[fa7-solid--minus]",
  "×": "icon-[fa7-solid--times]",
};

type Props = {
  className?: string;
} & CalculatorStatus &
  CalculatorFunc;

export const TxnAmountPad = ({
  className,
  input,
  del,
  clear,
  isError,
}: Props) => {
  const NumPadButtonCard = ({
    padKey,
  }: {
    padKey: CalculatorDigitKey | CalculatorDecimalKey;
  }) => (
    <PadButtonCard onClick={() => input(padKey)} disabled={isError}>
      {padKey}
    </PadButtonCard>
  );

  const OpPadButtonCard = ({ padKey }: { padKey: CalculatorOpKey }) => (
    <PadButtonCard onClick={() => input(padKey)} disabled={isError}>
      <Icon name={operatorIcons[padKey]} />
    </PadButtonCard>
  );

  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      <div className="flex gap-2">
        <NumPadButtonCard padKey="1" />
        <NumPadButtonCard padKey="2" />
        <NumPadButtonCard padKey="3" />
        <OpPadButtonCard padKey="×" />
      </div>
      <div className="flex gap-2">
        <NumPadButtonCard padKey="4" />
        <NumPadButtonCard padKey="5" />
        <NumPadButtonCard padKey="6" />
        <OpPadButtonCard padKey="+" />
      </div>
      <div className="flex gap-2">
        <NumPadButtonCard padKey="7" />
        <NumPadButtonCard padKey="8" />
        <NumPadButtonCard padKey="9" />
        <OpPadButtonCard padKey="-" />
      </div>
      <div className="flex gap-2">
        <NumPadButtonCard padKey="." />
        <NumPadButtonCard padKey="0" />
        <PadButtonCard onClick={del} disabled={isError}>
          <Icon name="icon-[fa6-solid--delete-left]" />
        </PadButtonCard>
        <PadButtonCard onClick={clear}>AC</PadButtonCard>
      </div>
    </div>
  );
};
