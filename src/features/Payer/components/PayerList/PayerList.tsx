import { PayerOptionPadButtonCard } from "src/features/ExpenseInput/PadButtonCard/PayerOptionPadButtonCard";
import { SHARED_PAYER_KEY } from "../../constants";
import type { ReactNode } from "react";

type Props = {
  payers: string[];
  selectedPayer?: string;
  onPayerSelect: (payer: string) => void;
  onPayerRemove: (payer: string) => void;
  suffixComponent?: ReactNode;
};

export const PayerList = ({
  payers,
  selectedPayer,
  onPayerSelect,
  onPayerRemove,
  suffixComponent,
}: Props) => (
  <div className="flex flex-wrap gap-4 items-center overflow-hidden w-full overflow-visible">
    {payers.map((payer) => (
      <PayerOptionPadButtonCard
        key={`payer-${payer}`}
        payer={payer}
        onClick={() => onPayerSelect(payer)}
        isSelected={payer === selectedPayer}
        enableRemoveButton={payer !== SHARED_PAYER_KEY}
        onRemoveClick={() => onPayerRemove(payer)}
      />
    ))}
    {suffixComponent}
  </div>
);
