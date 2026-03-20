import moment from "moment";
import { useCallback } from "react";
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

  const changeMonth = useCallback(
    (diff: number) => {
      const newYearMonthMoment = moment()
        .startOf("month")
        .year(value.year)
        .month(value.month + diff);

      onChange?.({
        year: newYearMonthMoment.year(),
        month: newYearMonthMoment.month(),
        date: value.date,
      });
    },
    [onChange, value],
  );

  const onBackClick = useCallback(() => changeMonth(-1), [changeMonth]);

  const onNextClick = useCallback(() => changeMonth(1), [changeMonth]);

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
