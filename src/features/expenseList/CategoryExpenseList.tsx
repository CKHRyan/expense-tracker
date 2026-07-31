import { CategoryExpenseCard } from "@features/ExpenseList/CategoryExpenseCard";
import { useExpenseData } from "@features/ExpenseList/hooks/useExpenseData";
import type {
  ExpenseRecordWithIndex,
  DateViewValue,
  DateViewMode,
} from "@features/Expense/types";

type Props = {
  data: ExpenseRecordWithIndex[];
  dateView?: DateViewValue;
  dateViewMode?: DateViewMode;
};

export const CategoryExpenseList = ({
  data,
  dateView,
  dateViewMode,
}: Props) => {
  const { groupsInExpenseOrder, totalExpenseByGroup } = useExpenseData(data, {
    filter: { dateView, dateViewMode },
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
