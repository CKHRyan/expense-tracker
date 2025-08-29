import { PadButtonCard } from "@features/ExpenseInput/PadButtonCard/PadButtonCard";
import { useTranslation } from "react-i18next";

type Props = { onClick?: () => void; disabled?: boolean };

export const ConfirmPadButtonCard = ({ onClick, disabled }: Props) => {
  const { t } = useTranslation();
  return (
    <PadButtonCard
      className="bg-blue-500 font-semibold"
      onClick={onClick}
      disabled={disabled}
    >
      {t("expenseInput.done")}
    </PadButtonCard>
  );
};
