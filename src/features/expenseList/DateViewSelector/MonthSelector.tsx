import moment from "moment";
import type { GenericDateViewSelectorProps } from "./DateViewSelector";
import { defaultDateViewValue } from "@features/ExpenseList/DateViewSelector/constants";
import { ChevronSelector } from "@features/ExpenseList/DateViewSelector/ChevronSelector";

export const MonthSelector = ({
  value = defaultDateViewValue,
  onChange,
  className,
}: GenericDateViewSelectorProps) => {
  const yearMonthTitle = `${value.year}-${(value.month + 1)
    .toString()
    .padStart(2, "0")}`;

  const changeMonth = (diff: number) => {
    const newYearMonthMoment = moment()
      .startOf("month")
      .year(value.year)
      .month(value.month + diff);

    onChange?.({
      year: newYearMonthMoment.year(),
      month: newYearMonthMoment.month(),
      date: value.date,
    });
  };

  const onBackClick = () => changeMonth(-1);

  const onNextClick = () => changeMonth(1);

  return (
    <ChevronSelector
      onLeftClick={onBackClick}
      onRightClick={onNextClick}
      className={className}
      titleClassName="min-w-[5rem]"
    >
      {yearMonthTitle}
    </ChevronSelector>
  );
};
