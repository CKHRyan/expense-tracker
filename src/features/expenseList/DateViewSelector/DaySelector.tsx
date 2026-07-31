import moment from "moment";
import type { GenericDateViewSelectorProps } from "./DateViewSelector";
import { defaultDateViewValue } from "@features/ExpenseList/DateViewSelector/constants";
import { ChevronSelector } from "@features/ExpenseList/DateViewSelector/ChevronSelector";

export const DaySelector = ({
  value = defaultDateViewValue,
  onChange,
  className,
}: GenericDateViewSelectorProps) => {
  const yearMonthDayTitle = `${value.year}-${(value.month + 1)
    .toString()
    .padStart(2, "0")}-${value.date.toString().padStart(2, "0")}`;

  const changeDay = (diff: number) => {
    const newYearMonthMoment = moment()
      .year(value.year)
      .month(value.month)
      .date(value.date + diff);

    onChange?.({
      year: newYearMonthMoment.year(),
      month: newYearMonthMoment.month(),
      date: newYearMonthMoment.date(),
    });
  };

  const onBackClick = () => changeDay(-1);

  const onNextClick = () => changeDay(1);

  return (
    <ChevronSelector
      onLeftClick={onBackClick}
      onRightClick={onNextClick}
      className={className}
      titleClassName="min-w-[6.6rem]"
    >
      {yearMonthDayTitle}
    </ChevronSelector>
  );
};
