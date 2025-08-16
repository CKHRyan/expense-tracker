import { Icon, Text } from "@components";
import { ListItemCard } from "@components/ListItemCard";
import moment from "moment";
import { categoryAttributes } from "src/constants/expense";
import type { ExpenseRecordWithIndex } from "src/types/expense";

type Props = {
  record: ExpenseRecordWithIndex;
  onClick?: (record: ExpenseRecordWithIndex) => void;
};

export const TransactionCard = ({ record, onClick }: Props) => {
  const { date, category, item, amount, remark } = record;
  return (
    <ListItemCard onClick={() => onClick?.(record)}>
      <Icon name={categoryAttributes[item].icon} className="text-xl" />
      <div className="flex-1 overflow-hidden">
        <Text>{item}</Text>
        <Text className="text-sm text-gray-400 truncate">
          {category} {moment(date).format("HH:mm")} {remark}
        </Text>
      </div>
      <Text>-${amount.toLocaleString()}</Text>
    </ListItemCard>
  );
};
