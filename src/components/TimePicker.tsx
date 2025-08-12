import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@components/WheelPicker";
import {
  convertToHour12,
  convertToHour24,
  getHour24Period,
} from "src/helpers/datetime";
import { isNil } from "lodash";
import { useCallback } from "react";

const createArray = (length: number, add = 0): WheelPickerOption[] =>
  Array.from({ length }, (_, i) => {
    const value = i + add;
    return {
      label: value.toString().padStart(2, "0"),
      value: value.toString(),
    };
  });

const hourOptions = createArray(12, 1);
const minuteOptions = createArray(60);
const meridiemOptions: WheelPickerOption[] = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];

export type PeriodValue = "AM" | "PM";

export type TimeValue = { hour: number; minute: number; second: number };

export type TimePickerProps = {
  value?: TimeValue;
  onChange?: (value: TimeValue) => void;
  className?: string;
};

export const TimePicker = ({ value, onChange, className }: TimePickerProps) => {
  const { hour, minute, second } = value ?? { hour: 0, minute: 0, second: 0 };
  const hour12 = convertToHour12(hour);
  const period = getHour24Period(hour);

  const _onChange = useCallback(
    ({
      hour: updatedHour,
      period: updatedPeriod,
      ...updatedValue
    }: Partial<TimeValue & { period: PeriodValue }>) => {
      const updatedHour24 =
        !isNil(updatedHour) || !isNil(updatedPeriod)
          ? convertToHour24(updatedHour ?? hour12, updatedPeriod ?? period)
          : undefined;
      onChange?.({
        hour: updatedHour24 ?? hour,
        minute,
        second,
        ...updatedValue,
      });
    },
    [hour, hour12, minute, onChange, period, second]
  );

  return (
    <div className={className}>
      <WheelPickerWrapper>
        <WheelPicker
          options={hourOptions}
          infinite
          value={hour12.toString()}
          onValueChange={(value) => _onChange({ hour: Number(value) })}
        />
        <WheelPicker
          options={minuteOptions}
          infinite
          value={minute.toString()}
          onValueChange={(value) => _onChange({ minute: Number(value) })}
        />
        <WheelPicker
          options={meridiemOptions}
          value={period}
          onValueChange={(value) => _onChange({ period: value as PeriodValue })}
        />
      </WheelPickerWrapper>
    </div>
  );
};
