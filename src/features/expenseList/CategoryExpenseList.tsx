import { CategoryExpenseCard } from "@features/ExpenseList/CategoryExpenseCard";
import { useExpenseData } from "@features/ExpenseList/hooks";
import type { ExpenseRecordWithIndex, MonthViewValue } from "src/types/expense";

type Props = { data: ExpenseRecordWithIndex[]; monthView?: MonthViewValue };

export const CategoryExpenseList = ({ data, monthView }: Props) => {
  const { groupsInExpenseOrder, totalExpenseByGroup } = useExpenseData(data, {
    filter: { monthView },
  });

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
