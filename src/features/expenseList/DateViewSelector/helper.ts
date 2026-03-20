import type { DateViewValue } from "@features/Expense/types";
import moment from "moment";

export const clampDateViewValue = (dateView: DateViewValue) => {
  const daysInMonth = moment()
    .year(dateView.year)
    .month(dateView.month)
    .daysInMonth();

  if (dateView.date <= daysInMonth) {
    return dateView;
  }

  return { ...dateView, date: daysInMonth };
};
