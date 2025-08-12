import { Icon, Text } from "@components";
import moment from "moment";
import { categoryAttributes } from "src/constants/expense";
import type { ExpenseRecord } from "src/types/expense";

type Props = { record: ExpenseRecord };

export const TransactionCard = ({ record }: Props) => {
  const { date, category, item, amount, remark } = record;
  return (
    <div className="px-3 py-2 bg-[#2c2c2c] flex gap-4 rounded-md items-center">
      <Icon name={categoryAttributes[item].icon} className="text-xl" />
      <div className="flex-1 overflow-hidden">
        <Text>{item}</Text>
        <Text className="text-sm text-gray-400 truncate">
          {category} {moment(date).format("HH:mm")} {remark}
        </Text>
      </div>
      <Text>-${amount.toLocaleString()}</Text>
    </div>
  );
};
