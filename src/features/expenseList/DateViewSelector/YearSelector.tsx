import type { GenericDateViewSelectorProps } from "./DateViewSelector";
import { defaultDateViewValue } from "@features/ExpenseList/DateViewSelector/constants";
import { ChevronSelector } from "@features/ExpenseList/DateViewSelector/ChevronSelector";

export const YearSelector = ({
  value = defaultDateViewValue,
  onChange,
  className,
}: GenericDateViewSelectorProps) => {
  const changeYear = (diff: number) => {
    onChange?.({
      year: value.year + diff,
      month: value.month,
      date: value.date,
    });
  };

  const onBackClick = () => changeYear(-1);

  const onNextClick = () => changeYear(1);

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
