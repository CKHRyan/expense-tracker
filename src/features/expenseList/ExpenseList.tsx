import type { ExpenseRecordWithIndex } from "src/types/expense";
import { Text } from "@components";
import { TransactionCard } from "./TransactionCard";
import { useExpenseData } from "./hooks";

type Props = {
  data: ExpenseRecordWithIndex[];
  onItemPress?: (item: ExpenseRecordWithIndex) => void;
};

export const ExpenseList = ({ data, onItemPress }: Props) => {
  const { recordsByDay, transactionDates } = useExpenseData(data);

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
