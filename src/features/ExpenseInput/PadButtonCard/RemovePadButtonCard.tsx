import { PadButtonCard } from "@features/ExpenseInput/PadButtonCard/PadButtonCard";
import { useTranslation } from "react-i18next";

type Props = { onClick?: () => void };

export const RemovePadButtonCard = ({ onClick }: Props) => {
  const { t } = useTranslation();

  return (
    <PadButtonCard className="bg-red-500" onClick={onClick}>
      {t("expenseInput.remove")}
    </PadButtonCard>
  );
};
