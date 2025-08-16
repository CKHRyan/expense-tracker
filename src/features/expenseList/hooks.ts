import {
  serverDateFormat,
  displayDateFormat,
} from "@utils/googleSheet/constants";
import { groupBy } from "lodash";
import moment from "moment";
import { useMemo } from "react";
import { CATEGORY_GROUP } from "src/constants/expense";
import type { CategoryGroup, ExpenseRecordWithIndex } from "src/types/expense";

export const useExpenseData = (data: ExpenseRecordWithIndex[]) => {
  const recordsByDay = useMemo(
    () =>
      groupBy(data, (result) =>
        moment(result.date, serverDateFormat).format(displayDateFormat)
      ),
    [data]
  );

  const transactionDates = useMemo(
    () =>
      Object.keys(recordsByDay).sort((a, b) =>
        moment(a).isBefore(moment(b)) ? 1 : -1
      ),
    [recordsByDay]
  );

  const totalExpenseByGroup = useMemo(() => {
    const groups = Object.values(CATEGORY_GROUP);
    const initial = Object.fromEntries(
      groups.map((group) => [group, 0])
    ) as Record<CategoryGroup, number>;
    const groupExpense = data.reduce(
      (obj, { category, amount }) => ({
        ...obj,
        [category]: obj[category] + amount,
      }),
      initial
    );
    return groupExpense;
  }, [data]);

  const groupsInExpenseOrder = useMemo(
    () =>
      (Object.keys(totalExpenseByGroup) as CategoryGroup[]).sort(
        (a, b) => totalExpenseByGroup[b] - totalExpenseByGroup[a]
      ),
    [totalExpenseByGroup]
  );

  const totalExpense = useMemo(
    () => data.reduce((sum, { amount }) => amount + sum, 0),
    [data]
  );

  return {
    recordsByDay,
    transactionDates,
    totalExpenseByGroup,
    totalExpense,
    groupsInExpenseOrder,
  };
};
