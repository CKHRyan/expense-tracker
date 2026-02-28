import { Icon, Text } from "@components";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import type { DateViewSelectorProps } from "./DateViewSelector";
import { defaultDateViewValue } from "@features/ExpenseList/DateViewSelector/constants";

export const YearSelector = ({
  value = defaultDateViewValue,
  onChange,
  className,
}: DateViewSelectorProps) => {
  const changeYear = useCallback(
    (diff: number) => {
      onChange?.({
        year: value.year + diff,
        month: value.month,
        date: value.date,
      });
    },
    [onChange, value],
  );

  const onBackClick = useCallback(() => changeYear(-1), [changeYear]);

  const onNextClick = useCallback(() => changeYear(1), [changeYear]);

  return (
    <div className={twMerge("flex items-center gap-0", className)}>
      <Icon
        name="icon-[material-symbols--chevron-left-rounded]"
        onClick={onBackClick}
        className="text-3xl"
      ></Icon>
      <Text className="text-xl font-bold text-center min-w-[5rem]">
        {value.year}
      </Text>
      <Icon
        name="icon-[material-symbols--chevron-right-rounded]"
        onClick={onNextClick}
        className="text-3xl"
      />
    </div>
  );
};
