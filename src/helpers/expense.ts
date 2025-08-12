import { serverDatetimeFormat } from "@utils/googleSheet/constants";
import type { RawExpenseRecord } from "@utils/googleSheet/types";
import type { Optional } from "@utils/types";
import { isObject } from "lodash";
import moment from "moment";
import {
  CATEGORY,
  CATEGORY_GROUP,
  categoryGroupMap,
} from "src/constants/expense";
import type { Category, CategoryGroup, ExpenseRecord } from "src/types/expense";

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

export const facadeRawExpenseRecord = (
  record: RawExpenseRecord
): Optional<ExpenseRecord, "date"> => {
  const dateMoment = moment(record.date);
  const category = isValidCategory(record.item) ? record.item : CATEGORY.Other;
  return {
    ...record,
    category: categoryGroupMap[category],
    item: category,
    date: dateMoment.isValid() ? dateMoment : undefined,
  };
};

export const facadeExpenseRecordToRaw = (
  record: ExpenseRecord
): RawExpenseRecord => ({
  ...record,
  date: record.date.format(serverDatetimeFormat),
});
