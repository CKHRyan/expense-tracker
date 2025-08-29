import { Icon, Text } from "@components";
import moment from "moment";
import { useCallback } from "react";
import type { MonthViewValue } from "src/types/expense";
import { twMerge } from "tailwind-merge";

type Props = {
  value?: MonthViewValue;
  onChange?: (value: MonthViewValue) => void;
  className?: string;
};

export const MonthSelector = ({
  value = { year: moment().year(), month: moment().month() },
  onChange,
  className,
}: Props) => {
  const yearMonthTitle = `${value.year}-${(value.month + 1)
    .toString()
    .padStart(2, "0")}`;

  const changeMonth = useCallback(
    (diff: number) => {
      const newYearMonthMoment = moment()
        .year(value.year)
        .month(value.month + diff);

      onChange?.({
        year: newYearMonthMoment.year(),
        month: newYearMonthMoment.month(),
      });
    },
    [onChange, value]
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
