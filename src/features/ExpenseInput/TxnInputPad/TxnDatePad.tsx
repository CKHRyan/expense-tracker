import { Button, Modal, TimePicker, Calendar } from "@components";
import type { TimeValue } from "@components/TimePicker";
import type { TransactionInputInterface } from "@features/ExpenseInput/hooks";
import { DatePadButtonCard } from "@features/ExpenseInput/PadButtonCard";
import { useLocale } from "@hooks/useLocale";
import { useToggle } from "@hooks/useToggle";
import type { Moment } from "moment";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = Pick<TransactionInputInterface, "date" | "setDate">;

export const TxnDatePad = ({ date, setDate }: Props) => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  const [openDateModal, toggleDateModal] = useToggle(false);
  const [value, setValue] = useState<Moment | null>(date ?? null);

  const timeValue: TimeValue | undefined = useMemo(
    () =>
      value
        ? {
            hour: value.hour(),
            minute: value.minute(),
            second: value.second(),
          }
        : undefined,
    [value]
  );

  const onDateChange = useCallback((date: Date) => {
    setValue((_value) => {
      const updatedMoment = moment(date);
      return _value
        ? updatedMoment
            .hour(_value.hours())
            .minute(_value.minutes())
            .second(_value.seconds())
        : updatedMoment;
    });
  }, []);

  const onTimeChange = useCallback((time: TimeValue) => {
    setValue((_value) => {
      const updatedMoment = moment(_value);
      return _value
        ? updatedMoment.hour(time.hour).minute(time.minute).second(time.second)
        : updatedMoment;
    });
  }, []);

  const onDateConfirm = useCallback(() => {
    setDate(value);
    toggleDateModal();
  }, [setDate, toggleDateModal, value]);

  useEffect(() => {
    if (openDateModal) {
      setValue(date);
    }
  }, [date, openDateModal]);

  return (
    <>
      <DatePadButtonCard date={date} onClick={toggleDateModal} />
      <Modal
        isOpen={openDateModal}
        onRequestClose={toggleDateModal}
        contentClassname="pt-4 pb-6 gap-6 items-center"
      >
        <TimePicker
          value={timeValue}
          onChange={onTimeChange}
          className="w-full"
          locale={locale}
        />
        <Calendar
          value={value?.toDate()}
          onChange={onDateChange}
          className="w-full"
          locale={locale}
        />
        <Button onClick={onDateConfirm} className="w-full font-semibold">
          {t("expenseInput.confirm")}
        </Button>
      </Modal>
    </>
  );
};
