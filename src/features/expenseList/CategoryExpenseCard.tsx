import { Icon, Text } from "@components";
import { ListItemCard } from "@components/ListItemCard";
import { categoryGroupAttributes } from "src/constants/expense";
import type { CategoryGroup } from "src/types/expense";
import { twMerge } from "tailwind-merge";

type Props = {
  categoryGroup: CategoryGroup;
  expense: number;
  className?: string;
};

export const CategoryExpenseCard = ({
  categoryGroup,
  expense,
  className,
}: Props) => {
  const { title, icon } = categoryGroupAttributes[categoryGroup];
  return (
    <ListItemCard className={twMerge("py-4", className)}>
      <Icon name={icon} className="text-xl" />
      <Text className="flex-1">{title}</Text>
      <Text>-${expense.toLocaleString()}</Text>
    </ListItemCard>
  );
};
