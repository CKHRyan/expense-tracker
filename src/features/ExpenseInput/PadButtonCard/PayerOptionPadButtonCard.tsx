import { twMerge } from "tailwind-merge";
import { PayerPadButtonCard } from "./PayerPadButtonCard";
import { Icon } from "src/components";

type Props = {
  payer: string | null;
  onClick?: () => void;
  isSelected?: boolean;
  enableRemoveButton?: boolean;
  onRemoveClick?: () => void;
  className?: string;
};

export const PayerOptionPadButtonCard = ({
  payer,
  onClick,
  enableRemoveButton,
  onRemoveClick,
  isSelected,
}: Props) => (
  <PayerPadButtonCard
    key={`payer-option-${payer}`}
    payer={payer}
    onClick={onClick}
    suffixComponent={
      enableRemoveButton && (
        <Icon
          name="icon-[fa7-solid:circle-xmark]"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveClick?.();
          }}
          className="w-[22px] h-[22px]"
        />
      )
    }
    className={twMerge(
      "flex-0 shrink max-w-full",
      !isSelected && "bg-zinc-700",
    )}
  />
);
