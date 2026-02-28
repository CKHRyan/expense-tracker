import { useCallback } from "react";
import type { GenericDateViewSelectorProps } from "./DateViewSelector";
import { defaultDateViewValue } from "@features/ExpenseList/DateViewSelector/constants";
import { ChevronSelector } from "@features/ExpenseList/DateViewSelector/ChevronSelector";

export const YearSelector = ({
  value = defaultDateViewValue,
  onChange,
  className,
}: GenericDateViewSelectorProps) => {
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
    <ChevronSelector
      onLeftClick={onBackClick}
      onRightClick={onNextClick}
      className={className}
      titleClassName="min-w-[2.8rem]"
    >
      {value.year}
    </ChevronSelector>
  );
};
