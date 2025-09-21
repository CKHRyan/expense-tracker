import { CATEGORY_GROUP, CATEGORY } from "src/constants/expense";
import type { Category } from "@features/Expense/types";

export const categoryGroupOptions = [
  "All",
  ...Object.values(CATEGORY_GROUP),
] as const;

export const categoryOptions: {
  category: Category;
  isOther?: boolean;
  hiddenFromAll?: boolean;
}[] = [
  { category: CATEGORY.Other, isOther: true },
  { category: CATEGORY.OtherShopping, isOther: true, hiddenFromAll: true },
  { category: CATEGORY.OtherDining, isOther: true, hiddenFromAll: true },
  { category: CATEGORY.OtherLife, isOther: true, hiddenFromAll: true },
  { category: CATEGORY.OtherEntertainment, isOther: true, hiddenFromAll: true },
  { category: CATEGORY.OtherVacation, isOther: true, hiddenFromAll: true },
  { category: CATEGORY.Lunch },
  { category: CATEGORY.Dinner },
  { category: CATEGORY.Breakfast },
  { category: CATEGORY.Dessert },
  { category: CATEGORY.Bread },
  { category: CATEGORY.Cook },
  { category: CATEGORY.Utensil },
  { category: CATEGORY.Fruit },
  { category: CATEGORY.Snack },
  { category: CATEGORY.Drink },
  { category: CATEGORY.Clothes },
  { category: CATEGORY.Shoes },
  { category: CATEGORY.Gift },
  { category: CATEGORY.Electron },
  { category: CATEGORY.Daily },
  { category: CATEGORY.SkinCare },
  { category: CATEGORY.Transport },
  { category: CATEGORY.Party },
  { category: CATEGORY.Movie },
  { category: CATEGORY.Game },
  { category: CATEGORY.Sport },
  { category: CATEGORY.Medic },
  { category: CATEGORY.Travel },
  { category: CATEGORY.Hostel },
  { category: CATEGORY.Equipment },
  { category: CATEGORY.Lifestyle },
] as const;
