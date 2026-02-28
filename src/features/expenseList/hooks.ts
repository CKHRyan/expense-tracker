import { DateViewMode, type DateViewValue } from "@features/Expense/types";
import {
  serverDateFormat,
  displayDateFormat,
} from "@utils/google/googleSheet/constants";
import { groupBy } from "lodash";
import moment from "moment";
import { useMemo } from "react";
import { CATEGORY_GROUP } from "src/constants/expense";
import type {
  CategoryGroup,
  ExpenseRecordWithIndex,
} from "@features/Expense/types";

export type ExpenseDisplayOptions = {
  filter?: { dateView?: DateViewValue; dateViewMode?: DateViewMode };
};

export const useExpenseData = (
  data: ExpenseRecordWithIndex[],
  options?: ExpenseDisplayOptions,
) => {
  const { filter } = options ?? {};

  const expenseData = useMemo(() => {
    const { dateView, dateViewMode } = filter ?? {};

    let filteredData = data;

    if (dateView) {
      const dateViewMoment = moment().year(dateView.year).month(dateView.month);

      const granularity: moment.unitOfTime.Base = {
        [DateViewMode.MONTH_VIEW]: "month" as const,
        [DateViewMode.YEAR_VIEW]: "year" as const,
      }[dateViewMode ?? DateViewMode.MONTH_VIEW];

      filteredData = data.filter(({ date }) =>
        date.isSame(dateViewMoment, granularity),
      );
    }

    return filteredData;
  }, [data, filter]);

  const recordsByDay = useMemo(() => {
    const recordGrops = groupBy(expenseData, (result) =>
      moment(result.date, serverDateFormat).format(displayDateFormat),
    );
    return Object.entries(recordGrops).reduce(
      (obj, [key, value]) => ({
        ...obj,
        [key]: value.sort((a, b) => (a.date.isBefore(b.date) ? 1 : -1)),
      }),
      {} as Record<string, ExpenseRecordWithIndex[]>,
    );
  }, [expenseData]);

  const transactionDates = useMemo(
    () =>
      Object.keys(recordsByDay).sort((a, b) =>
        moment(a).isBefore(moment(b)) ? 1 : -1,
      ),
    [recordsByDay],
  );

  const totalExpenseByGroup = useMemo(() => {
    const groups = Object.values(CATEGORY_GROUP);
    const initial = Object.fromEntries(
      groups.map((group) => [group, 0]),
    ) as Record<CategoryGroup, number>;
    const groupExpense = expenseData.reduce(
      (obj, { category, amount }) => ({
        ...obj,
        [category]: obj[category] + amount,
      }),
      initial,
    );
    return groupExpense;
  }, [expenseData]);

  const groupsInExpenseOrder = useMemo(
    () =>
      (Object.keys(totalExpenseByGroup) as CategoryGroup[]).sort(
        (a, b) => totalExpenseByGroup[b] - totalExpenseByGroup[a],
      ),
    [totalExpenseByGroup],
  );

  const totalExpense = useMemo(
    () => expenseData.reduce((sum, { amount }) => amount + sum, 0),
    [expenseData],
  );

  return {
    recordsByDay,
    transactionDates,
    totalExpenseByGroup,
    totalExpense,
    groupsInExpenseOrder,
  };
};
