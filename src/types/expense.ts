import type { category, categoryGroup } from "src/constants/expense";

export type CategoryGroup = (typeof categoryGroup)[keyof typeof categoryGroup];

export type Category = (typeof category)[keyof typeof category];
