import type { Moment } from "moment";
import type { CATEGORY, CATEGORY_GROUP } from "src/constants/expense";

export type ExpenseRecord = {
  date: Moment;
  category: CategoryGroup;
  item: Category;
  amount: number;
  remark: string;
};

export type CategoryGroup =
  (typeof CATEGORY_GROUP)[keyof typeof CATEGORY_GROUP];

export type Category = (typeof CATEGORY)[keyof typeof CATEGORY];
