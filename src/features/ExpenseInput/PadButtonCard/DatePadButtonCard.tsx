import { PadButtonCard } from "@features/ExpenseInput/PadButtonCard/PadButtonCard";
import type { Moment } from "moment";
import moment from "moment";

type Props = { date: Moment | null; onClick?: () => void };

export const DatePadButtonCard = ({ date, onClick }: Props) => {
  const isToday = !date || date.isSame(moment(), "day");

  return (
    <PadButtonCard className="bg-green-600 font-semibold" onClick={onClick}>
      {isToday ? (
        "Today"
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
