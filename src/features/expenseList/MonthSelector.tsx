import { Icon, Text } from "@components";
import type { MonthViewValue } from "@features/ExpenseList/type";
import moment from "moment";
import { useCallback } from "react";

type Props = {
  value?: MonthViewValue;
  onChange?: (value: MonthViewValue) => void;
};

export const MonthSelector = ({
  value = { year: moment().year(), month: moment().month() },
  onChange,
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
    <div className="flex items-center gap-0">
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
