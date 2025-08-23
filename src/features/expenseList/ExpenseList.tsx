import type { ExpenseRecordWithIndex } from "src/types/expense";
import { Icon, Text } from "@components";
import { TransactionCard } from "./TransactionCard";
import { useExpenseData } from "./hooks";

type Props = {
  data: ExpenseRecordWithIndex[];
  onItemPress?: (item: ExpenseRecordWithIndex) => void;
};

export const ExpenseList = ({ data, onItemPress }: Props) => {
  const { recordsByDay, transactionDates } = useExpenseData(data);

  const isEmpty = transactionDates.length === 0;

  if (isEmpty)
    return (
      <div className="flex flex-col flex-1 items-center justify-center gap-6">
        <Icon name="icon-[game-icons--wallet]" className="w-[80px] h-[80px]" />
        <div className="flex flex-col items-center gap-2 px-4">
          <Text className="font-semibold text-center">
            YOU DON'T HAVE EXPENSE YET
          </Text>
          <Text className="text-gray-400 text-center">
            Begin adding your spending to keep track of your money!
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
