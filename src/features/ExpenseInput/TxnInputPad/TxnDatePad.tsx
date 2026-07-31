import { Button, Modal, TimePicker, Calendar } from "@components";
import type { TimeValue } from "@components/TimePicker";
import type { TransactionInputInterface } from "@features/ExpenseInput/hooks";
import { DatePadButtonCard } from "@features/ExpenseInput/PadButtonCard";
import { useLocale } from "@hooks/useLocale";
import { useToggle } from "@hooks/useToggle";
import type { Moment } from "moment";
import moment from "moment";
import { useEffect, useMemo, useState, type Ref } from "react";
import { useTranslation } from "react-i18next";

type Props = { ref?: Ref<HTMLButtonElement> } & Pick<
  TransactionInputInterface,
  "date" | "setDate"
>;

export const TxnDatePad = ({ ref, date, setDate }: Props) => {
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
    [value],
  );

  const onDateChange = (date: Date) => {
    setValue((_value) => {
      const updatedMoment = moment(date);
      return _value
        ? updatedMoment
            .hour(_value.hours())
            .minute(_value.minutes())
            .second(_value.seconds())
        : updatedMoment;
    });
  };

  const onTimeChange = (time: TimeValue) => {
    setValue((_value) => {
      const updatedMoment = moment(_value);
      return _value
        ? updatedMoment.hour(time.hour).minute(time.minute).second(time.second)
        : updatedMoment;
    });
  };

  const onDateConfirm = () => {
    setDate(value);
    toggleDateModal();
  };

  useEffect(() => {
    if (openDateModal) {
      setValue(date);
    }
  }, [date, openDateModal]);

  return (
    <>
      <DatePadButtonCard ref={ref} date={date} onClick={toggleDateModal} />
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
