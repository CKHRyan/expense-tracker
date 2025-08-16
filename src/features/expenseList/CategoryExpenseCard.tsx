import { Icon, Text } from "@components";
import { ListItemCard } from "@components/ListItemCard";
import { categoryGroupAttributes } from "src/constants/expense";
import type { CategoryGroup } from "src/types/expense";

type Props = { categoryGroup: CategoryGroup; expense: number };

export const CategoryExpenseCard = ({ categoryGroup, expense }: Props) => {
  const { title, icon } = categoryGroupAttributes[categoryGroup];
  return (
    <ListItemCard>
      <Icon name={icon} className="text-xl" />
      <Text className="flex-1">{title}</Text>
      <Text>-${expense.toLocaleString()}</Text>
    </ListItemCard>
  );
};
