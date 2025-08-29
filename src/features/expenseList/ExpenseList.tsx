import type { ExpenseRecordWithIndex } from "src/types/expense";
import { Icon, Text } from "@components";
import { TransactionCard } from "./TransactionCard";
import { useExpenseData } from "./hooks";
import type { MonthViewValue } from "@features/ExpenseList/type";
import { useTranslation } from "react-i18next";

type Props = {
  data: ExpenseRecordWithIndex[];
  onItemPress?: (item: ExpenseRecordWithIndex) => void;
  monthView?: MonthViewValue;
};

export const ExpenseList = ({ data, onItemPress, monthView }: Props) => {
  const { t } = useTranslation();

  const { recordsByDay, transactionDates } = useExpenseData(data, {
    filter: { monthView },
  });

  const isEmpty = transactionDates.length === 0;

  if (isEmpty)
    return (
      <div className="flex flex-col flex-1 items-center justify-center gap-6">
        <Icon name="icon-[game-icons--wallet]" className="w-[80px] h-[80px]" />
        <div className="flex flex-col items-center gap-2 px-4">
          <Text className="font-semibold text-center">
            {t("expenseList.emptyRecord")}
          </Text>
          <Text className="text-gray-400 text-center">
            {t("expenseList.addSpendingPrompt")}
          </Text>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {transactionDates.map((date) => (
        <div key={`transaction-on-${date}`} className="flex flex-col gap-4">
          <Text>{date}</Text>
          {recordsByDay[date].map((record, index) => (
            <TransactionCard
              key={`transaction-${index}`}
              record={record}
              onClick={onItemPress}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
