import { Text } from "@/components/Text";
import type { ExpenseRecord } from "@/utils/googleSheet/types";
import moment from "moment";

type Props = { record: ExpenseRecord };

export const TransactionCard = ({ record }: Props) => {
  const { date, category, item, amount } = record;
  return (
    <div className="px-3 py-2 bg-[#2c2c2c] flex gap-4 rounded-md items-center">
      <Text className="text-xl">💸</Text>
      <div className="flex-1">
        <Text>{item}</Text>
        <Text className="text-sm text-gray-400">
          {category} {moment(date).format("HH:mm")}
        </Text>
      </div>
      <Text>-${amount.toLocaleString()}</Text>
    </div>
  );
};
