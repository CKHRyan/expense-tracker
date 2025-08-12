import ReactCalendar, { type CalendarProps } from "react-calendar";
import "./style2.css";
import { useCallback } from "react";
import type { Value } from "react-calendar/dist/shared/types.js";

type Props = { onChange?: (date: Date) => void } & Omit<
  CalendarProps,
  "onChange"
>;

export const Calendar = ({ onChange, ...otherProps }: Props) => {
  const _onChange = useCallback(
    (value: Value) => {
      onChange?.(value as Date);
    },
    [onChange]
  );

  return <ReactCalendar locale="en" onChange={_onChange} {...otherProps} />;
};
