import { CategoryExpenseCard } from "@features/ExpenseList/CategoryExpenseCard";
import { useExpenseData } from "@features/ExpenseList/hooks";
import type { ExpenseRecordWithIndex } from "src/types/expense";

type Props = { data: ExpenseRecordWithIndex[] };

export const CategoryExpenseList = ({ data }: Props) => {
  const { groupsInExpenseOrder, totalExpenseByGroup } = useExpenseData(data);

  return (
    <div className="flex flex-col gap-4">
      {groupsInExpenseOrder.map((group) => (
        <CategoryExpenseCard
          key={`category-group-${group}`}
          categoryGroup={group}
          expense={totalExpenseByGroup[group]}
        />
      ))}
    </div>
  );
};
