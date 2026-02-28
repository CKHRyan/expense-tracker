import moment from "moment";
import {
  type ExpenseRecordWithIndex,
  type DateViewValue,
  DateViewMode,
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
const initialDateView = {
  year: now.year(),
  month: now.month(),
  date: now.date(),
};
const initialDateViewMode = DateViewMode.MONTH_VIEW;

interface ViewState {
  expenseSheetParams: ExpenseSheetParams;
  dateView: DateViewValue;
  dateViewMode: DateViewMode;
  openNewExpenseSheet: () => void;
  openEditExpenseSheet: (expenseRecord: ExpenseRecordWithIndex) => void;
  closeExpenseInputSheet: () => void;
  setDateView: (dateView: DateViewValue) => void;
  setDateViewMode: (dateViewMode: DateViewMode) => void;
}

export const useViewStore = create<ViewState>()((set) => ({
  expenseSheetParams: initialExpenseSheetParams,
  dateView: initialDateView,
  dateViewMode: initialDateViewMode,
  openNewExpenseSheet: () =>
    set({ expenseSheetParams: { isOpen: true, isEdit: false } }),
  openEditExpenseSheet: (expenseRecord) =>
    set({ expenseSheetParams: { isOpen: true, isEdit: true, expenseRecord } }),
  closeExpenseInputSheet: () =>
    set({ expenseSheetParams: initialExpenseSheetParams }),
  setDateView: (dateView) => set({ dateView }),
  setDateViewMode: (dateViewMode) => set({ dateViewMode }),
}));
