import { Icon, Text } from "@components";
import { ListItemCard } from "@components/ListItemCard";
import {
  useCategoryAttributes,
  useCategoryGroupAttributes,
} from "@features/Expense/hooks";
import moment from "moment";
import type { ExpenseRecordWithIndex } from "src/types/expense";

type Props = {
  record: ExpenseRecordWithIndex;
  onClick?: (record: ExpenseRecordWithIndex) => void;
};

export const TransactionCard = ({ record, onClick }: Props) => {
  const { date, category, item, amount, remark } = record;

  const categoryAttributes = useCategoryAttributes();
  const categoryGroupAttributes = useCategoryGroupAttributes();

  const { icon: categoryIcon, title: categoryTitle } = categoryAttributes[item];
  const { title: categoryGroupTitle } = categoryGroupAttributes[category];

  return (
    <ListItemCard onClick={() => onClick?.(record)}>
      <Icon name={categoryIcon} className="text-xl" />
      <div className="flex-1 overflow-hidden">
        <Text>{categoryTitle}</Text>

        <Text className="text-sm text-gray-400 truncate">
          {categoryGroupTitle}
          &ensp;
          {moment(date).format("HH:mm")}
          &ensp;
          {remark}
        </Text>
      </div>
      <Text>-${amount.toLocaleString()}</Text>
    </ListItemCard>
  );
};
