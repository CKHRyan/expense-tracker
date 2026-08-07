import type { Moment } from "moment";
import type { CATEGORY, CATEGORY_GROUP } from "src/constants/expense";
import type { ExpenseAttributeValue } from "src/utils/google/googleSheet/types";

type DefinedExpenseRecord<T extends Record<ExpenseAttributeValue, unknown>> = T;

export type ExpenseRecord = DefinedExpenseRecord<{
  date: Moment;
  category: CategoryGroup;
  item: Category;
  amount: number;
  currency: string;
  payer: string;
  remark: string;
}>;

export type ExpenseRecordWithIndex = { index: number } & ExpenseRecord;

export type CategoryGroup =
  (typeof CATEGORY_GROUP)[keyof typeof CATEGORY_GROUP];

export type Category = (typeof CATEGORY)[keyof typeof CATEGORY];

export type DateViewValue = {
  year: number;
  month: number;
  date: number;
};

export enum DateViewMode {
  MONTH_VIEW = "MONTH_VIEW",
  YEAR_VIEW = "YEAR_VIEW",
  DAY_VIEW = "DAY_VIEW",
}
