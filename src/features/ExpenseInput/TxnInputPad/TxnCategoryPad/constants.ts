import { CATEGORY_GROUP, CATEGORY } from "src/constants/expense";
import type { Category } from "@features/Expense/types";
import _ from "lodash";

export const categoryGroupOptions = [
  "All",
  ...Object.values(CATEGORY_GROUP),
] as const;

const groupOtherCategories: Category[] = [
  CATEGORY.OtherShopping,
  CATEGORY.OtherDining,
  CATEGORY.OtherLife,
  CATEGORY.OtherEntertainment,
  CATEGORY.OtherVacation,
];

const categories: Category[] = Object.values(
  _.omit(CATEGORY, [CATEGORY.Other, ...groupOtherCategories]),
);

export const categoryOptions: {
  category: Category;
  isOther?: boolean;
  hiddenFromAll?: boolean;
}[] = [
  { category: CATEGORY.Other, isOther: true },
  ...groupOtherCategories.map((category) => ({
    category,
    isOther: true,
    hiddenFromAll: true,
  })),
  ...categories.map((category) => ({ category })),
];
