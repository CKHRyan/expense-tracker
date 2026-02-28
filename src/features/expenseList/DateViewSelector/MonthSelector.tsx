import { Icon, Text } from "@components";
import moment from "moment";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import type { DateViewSelectorProps } from "./DateViewSelector";
import { defaultDateViewValue } from "@features/ExpenseList/DateViewSelector/constants";

export const MonthSelector = ({
  value = defaultDateViewValue,
  onChange,
  className,
}: DateViewSelectorProps) => {
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
    <div className={twMerge("flex items-center gap-0", className)}>
      <Icon
        name="icon-[material-symbols--chevron-left-rounded]"
        onClick={onBackClick}
        className="text-3xl"
      ></Icon>
      <Text className="text-xl font-bold text-center min-w-[5rem]">
        {yearMonthTitle}
      </Text>
      <Icon
        name="icon-[material-symbols--chevron-right-rounded]"
        onClick={onNextClick}
        className="text-3xl"
      />
    </div>
  );
};
