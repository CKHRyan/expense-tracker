import { Icon } from "@components";
import { DateViewMode, type DateViewValue } from "@features/Expense/types";
import { MonthSelector } from "./MonthSelector";
import { YearSelector } from "./YearSelector";
import { useViewStore } from "@stores";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { DaySelector } from "@features/ExpenseList/DateViewSelector/DaySelector";
import { clampDateViewValue } from "@features/ExpenseList/DateViewSelector/helper";

export type GenericDateViewSelectorProps = {
  value?: DateViewValue;
  onChange?: (value: DateViewValue) => void;
  className?: string;
};

type DateViewSelectorProps = GenericDateViewSelectorProps & {
  selectorClassName?: string;
  modePickerPosition?: "start" | "end";
};

type DateViewSelectorOption = {
  dateViewMode: DateViewMode;
  icon: string;
  className?: string;
  onClick?: () => void;
};

export const DateViewSelector = ({
  className,
  modePickerPosition = "end",
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
    const _selectorProps = {
      ...selectorProps,
      className: twMerge(selectorProps.selectorClassName, "mr-[-12px]"),
    };
    switch (dateViewMode) {
      case DateViewMode.MONTH_VIEW:
        return <MonthSelector {..._selectorProps} />;
      case DateViewMode.YEAR_VIEW:
        return <YearSelector {..._selectorProps} />;
      case DateViewMode.DAY_VIEW:
        return <DaySelector {..._selectorProps} />;
    }
  }, [dateViewMode, selectorProps]);

  const modePicker = (
    <div className="flex gap-4">
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

  return (
    <div className={twMerge("flex flex-col gap-3 items-end", className)}>
      {modePickerPosition === "start"
        ? [modePicker, selector]
        : [selector, modePicker]}
    </div>
  );
};
