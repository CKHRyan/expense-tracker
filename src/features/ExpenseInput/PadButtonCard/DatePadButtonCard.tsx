import { PadButtonCard } from "@features/ExpenseInput/PadButtonCard/PadButtonCard";
import type { Moment } from "moment";
import moment from "moment";
import { useTranslation } from "react-i18next";

type Props = { date: Moment | null; onClick?: () => void };

export const DatePadButtonCard = ({ date, onClick }: Props) => {
  const { t } = useTranslation();

  const isToday = !date || date.isSame(moment(), "day");

  return (
    <PadButtonCard className="bg-green-600 font-semibold" onClick={onClick}>
      {isToday ? (
        t("expenseInput.today")
      ) : (
        <>
          {date.year()}
          <br />
          {date.format("MM-DD")}
        </>
      )}
    </PadButtonCard>
  );
};
