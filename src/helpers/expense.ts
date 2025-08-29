import { serverDatetimeFormat } from "@utils/google/googleSheet/constants";
import type { BaseExpenseRecord } from "@utils/google/googleSheet/types";
import type { Optional } from "@utils/types";
import { isNaN, isObject } from "lodash";
import moment from "moment";
import {
  CATEGORY,
  CATEGORY_GROUP,
  categoryGroupMap,
} from "src/constants/expense";
import type {
  Category,
  CategoryGroup,
  ExpenseRecord,
  ExpenseRecordWithIndex,
} from "@features/Expense/types";

export const isValidCategory = (value: string): value is Category =>
  value in CATEGORY;

export const isValidCategoryGroup = (value: string): value is CategoryGroup =>
  value in CATEGORY_GROUP;

export const isValidExpense = (
  value: Partial<Record<keyof ExpenseRecord, any>>
): value is ExpenseRecord =>
  isObject(value) &&
  isValidCategory(value.item) &&
  isValidCategoryGroup(value.category) &&
  moment(value.date).isValid();

export const isValidExpenseWithIndex = (
  value: Partial<Record<keyof ExpenseRecordWithIndex, any>>
): value is ExpenseRecordWithIndex =>
  !isNaN(value.index) && isValidExpense(value);

export const facadeBaseExpenseRecordWithIndex = (
  record: BaseExpenseRecord,
  index: number
): Optional<ExpenseRecordWithIndex, "date"> => {
  const dateMoment = moment(record.date, serverDatetimeFormat);
  const category = isValidCategory(record.item) ? record.item : CATEGORY.Other;
  return {
    ...record,
    category: categoryGroupMap[category],
    item: category,
    date: dateMoment.isValid() ? dateMoment : undefined,
    index,
  };
};

export const facadeExpenseRecordToBase = (
  record: ExpenseRecord
): BaseExpenseRecord => ({
  ...record,
  date: record.date.format(serverDatetimeFormat),
});
