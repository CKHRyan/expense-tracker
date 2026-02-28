import { Icon, Text } from "@components";
import moment from "moment";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import type { DateViewSelectorProps } from "./DateViewSelector";
import { defaultDateViewValue } from "@features/ExpenseList/DateViewSelector/constants";

export const DaySelector = ({
  value = defaultDateViewValue,
  onChange,
  className,
}: DateViewSelectorProps) => {
  const yearMonthDayTitle = `${value.year}-${(value.month + 1)
    .toString()
    .padStart(2, "0")}-${value.date.toString().padStart(2, "0")}`;

  const changeDay = useCallback(
    (diff: number) => {
      const newYearMonthMoment = moment()
        .year(value.year)
        .month(value.month)
        .date(value.date + diff);

      onChange?.({
        year: newYearMonthMoment.year(),
        month: newYearMonthMoment.month(),
        date: newYearMonthMoment.date(),
      });
    },
    [onChange, value],
  );

  const onBackClick = useCallback(() => changeDay(-1), [changeDay]);

  const onNextClick = useCallback(() => changeDay(1), [changeDay]);

  return (
    <div className={twMerge("flex items-center gap-0", className)}>
      <Icon
        name="icon-[material-symbols--chevron-left-rounded]"
        onClick={onBackClick}
        className="text-3xl"
      ></Icon>
      <Text className="text-xl font-bold text-center min-w-[5rem]">
        {yearMonthDayTitle}
      </Text>
      <Icon
        name="icon-[material-symbols--chevron-right-rounded]"
        onClick={onNextClick}
        className="text-3xl"
      />
    </div>
  );
};
