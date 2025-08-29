import moment from "moment";
import type {
  ExpenseRecordWithIndex,
  MonthViewValue,
} from "@features/Expense/types";
import { create } from "zustand";

export type ExpenseSheetParams = {
  isOpen: boolean;
  isEdit: boolean;
  expenseRecord?: ExpenseRecordWithIndex;
};

const initialExpenseSheetParams: ExpenseSheetParams = {
  isOpen: false,
  isEdit: false,
  expenseRecord: undefined,
};

const now = moment();
const initialMonthView = { year: now.year(), month: now.month() };

interface ViewState {
  expenseSheetParams: ExpenseSheetParams;
  monthView: MonthViewValue;
  openNewExpenseSheet: () => void;
  openEditExpenseSheet: (expenseRecord: ExpenseRecordWithIndex) => void;
  closeExpenseInputSheet: () => void;
  setMonthView: (monthView: MonthViewValue) => void;
}

export const useViewStore = create<ViewState>()((set) => ({
  expenseSheetParams: initialExpenseSheetParams,
  monthView: initialMonthView,
  openNewExpenseSheet: () =>
    set({ expenseSheetParams: { isOpen: true, isEdit: false } }),
  openEditExpenseSheet: (expenseRecord) =>
    set({ expenseSheetParams: { isOpen: true, isEdit: true, expenseRecord } }),
  closeExpenseInputSheet: () =>
    set({ expenseSheetParams: initialExpenseSheetParams }),
  setMonthView: (monthView) => set({ monthView }),
}));
