import { PadButtonCard } from "@features/ExpenseInput/PadButtonCard/PadButtonCard";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import { Text } from "src/components";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  payer: string | null;
  onClick?: () => void;
  className?: string;
  suffixComponent?: ReactNode;
  style?: CSSProperties;
};

export const PayerPadButtonCard = ({
  payer,
  onClick,
  suffixComponent,
  className,
  style,
}: Props) => {
  const { t } = useTranslation();

  return (
    <PadButtonCard
      className={twMerge(
        "font-semibold flex gap-2",
        "bg-yellow-600",
        className,
      )}
      onClick={onClick}
      style={style}
    >
      <Text className="overflow-hidden whitespace-nowrap text-ellipsis">
        {payer ?? t("expenseInput.sharedTransaction")}
      </Text>
      {suffixComponent}
    </PadButtonCard>
  );
};
