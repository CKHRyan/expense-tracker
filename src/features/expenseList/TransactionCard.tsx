import { Icon, Text } from "@components";
import { ListItemCard } from "@components/ListItemCard";
import {
  useCategoryAttributes,
  useCategoryGroupAttributes,
} from "@features/Expense/hooks";
import moment from "moment";
import type { ExpenseRecordWithIndex } from "@features/Expense/types";
import { useTranslation } from "react-i18next";

type Props = {
  record: ExpenseRecordWithIndex;
  onClick?: (record: ExpenseRecordWithIndex) => void;
};

export const TransactionCard = ({ record, onClick }: Props) => {
  const { t } = useTranslation();
  const { date, category, item, amount, currency, payer, remark } = record;

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

      <div className="flex flex-col items-end text-right">
        <Text>
          -{amount.toLocaleString()} {currency}
        </Text>
        {payer && (
          <Text className="text-sm text-gray-400 truncate max-w-[7rem] sm:max-w-[10rem] md:max-w-[14rem] lg:max-w-[20rem]">
            {t("expenseList.paid", { payer })}
          </Text>
        )}
      </div>
    </ListItemCard>
  );
};
