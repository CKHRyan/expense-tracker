import { Icon } from "@components";
import { DateViewMode, type DateViewValue } from "@features/Expense/types";
import { MonthSelector } from "./MonthSelector";
import { YearSelector } from "./YearSelector";
import { useViewStore } from "@stores";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { DaySelector } from "@features/ExpenseList/DateViewSelector/DaySelector";
import { clampDateViewValue } from "@features/ExpenseList/DateViewSelector/helper";

export type DateViewSelectorProps = {
  value?: DateViewValue;
  onChange?: (value: DateViewValue) => void;
  className?: string;
};

type DateViewSelectorOption = {
  dateViewMode: DateViewMode;
  icon: string;
  className?: string;
  onClick?: () => void;
};

export const DateViewSelector = ({
  className,
  ...selectorProps
}: DateViewSelectorProps) => {
  const { dateView, setDateView, dateViewMode, setDateViewMode } =
    useViewStore();

  const dateViewSelectorOptions = useMemo(
    (): DateViewSelectorOption[] => [
      {
        dateViewMode: DateViewMode.DAY_VIEW,
        icon: "icon-[bi--calendar-day]",
        onClick: () => setDateView(clampDateViewValue(dateView)),
      },
      {
        dateViewMode: DateViewMode.MONTH_VIEW,
        icon: "icon-[fluent-mdl2:calendar]",
      },
      {
        dateViewMode: DateViewMode.YEAR_VIEW,
        icon: "icon-[fluent-mdl2:calendar-year]",
      },
    ],
    [dateView, setDateView],
  );

  const selector = useMemo(() => {
    switch (dateViewMode) {
      case DateViewMode.MONTH_VIEW:
        return <MonthSelector {...selectorProps} />;
      case DateViewMode.YEAR_VIEW:
        return <YearSelector {...selectorProps} />;
      case DateViewMode.DAY_VIEW:
        return <DaySelector {...selectorProps} />;
    }
  }, [dateViewMode, selectorProps]);

  return (
    <div className={twMerge("flex gap-3 items-center", className)}>
      {selector}
      {dateViewSelectorOptions.map((option) => (
        <Icon
          key={`date-view-selector-option-${option.dateViewMode}`}
          name={option.icon}
          className={twMerge(
            "w-[20px] h-[20px]",
            option.dateViewMode === dateViewMode && "opacity-50",
            option.className,
          )}
          onClick={() => {
            setDateViewMode(option.dateViewMode);
            option.onClick?.();
          }}
          disabled={dateViewMode === option.dateViewMode}
        />
      ))}
    </div>
  );
};
