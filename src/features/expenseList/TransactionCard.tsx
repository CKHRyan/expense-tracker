import { Icon, Text } from "@components";
import { ListItemCard } from "@components/ListItemCard";
import {
  useCategoryAttributes,
  useCategoryGroupAttributes,
} from "@features/Expense/hooks";
import moment from "moment";
import type { ExpenseRecordWithIndex } from "@features/Expense/types";

type Props = {
  record: ExpenseRecordWithIndex;
  onClick?: (record: ExpenseRecordWithIndex) => void;
};

export const TransactionCard = ({ record, onClick }: Props) => {
  const { date, category, item, amount, payer, remark } = record;

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

      <div className="text-right">
        <Text>-${amount.toLocaleString()}</Text>
        {payer && (
          <Text className="text-sm text-gray-400 truncate max-w-[5rem] sm:max-w-[8rem] md:max-w-[12rem] lg:max-w-[18rem]">
            ({payer})
          </Text>
        )}
      </div>
    </ListItemCard>
  );
};
