import { Icon } from "@components";
import { DateViewMode, type DateViewValue } from "@features/Expense/types";
import { MonthSelector } from "@features/ExpenseList/MonthSelector";
import { YearSelector } from "@features/ExpenseList/YearSelector";
import { useViewStore } from "@stores";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export type DateViewSelectorProps = {
  value?: DateViewValue;
  onChange?: (value: DateViewValue) => void;
  className?: string;
};

export const DateViewSelector = ({
  className,
  ...selectorProps
}: DateViewSelectorProps) => {
  const { dateViewMode, setDateViewMode } = useViewStore();

  const selector = useMemo(() => {
    switch (dateViewMode) {
      case DateViewMode.MONTH_VIEW:
        return <MonthSelector {...selectorProps} />;
      case DateViewMode.YEAR_VIEW:
        return <YearSelector {...selectorProps} />;
    }
  }, [dateViewMode, selectorProps]);

  return (
    <div className={twMerge("flex gap-3 items-center", className)}>
      {selector}
      <Icon
        name="icon-[fluent-mdl2:calendar]"
        className={twMerge(
          "w-[20px] h-[20px]",
          dateViewMode === DateViewMode.MONTH_VIEW && "opacity-50",
        )}
        onClick={() => setDateViewMode(DateViewMode.MONTH_VIEW)}
        disabled={dateViewMode === DateViewMode.MONTH_VIEW}
      />
      <Icon
        name="icon-[fluent-mdl2:calendar-year]"
        className={twMerge(
          "w-[20px] h-[20px]",
          dateViewMode === DateViewMode.YEAR_VIEW && "opacity-50",
        )}
        onClick={() => setDateViewMode(DateViewMode.YEAR_VIEW)}
        disabled={dateViewMode === DateViewMode.YEAR_VIEW}
      />
    </div>
  );
};
